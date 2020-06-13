module.exports = (bot, usersRef) => {
  const { masTardeInvitacion } = require("../messages/messages");

  bot.action("masTardeInvitacion", async (ctx) => {
    ctx.editMessageText(masTardeInvitacion);
    ctx.reply(
      "De acuerdo. Si cambias de opinión, cualquier mensaje activa el menú principal. ¡Que tengas un lindo día!"
    );
  });

  bot.hears(/\b[0-9]{9}\b/, async (ctx) => {
    let user_id = ctx.update.message.from.id;
    let match = ctx.match[0];

    const msgInfo = await ctx.reply("`Dame un segundo...`", {
      parse_mode: "Markdown",
    });

    usersRef.get().then(async (snapshot) => {
      var doc = null;
      snapshot.forEach((user_doc) => {
        if (user_doc.id == user_id) {
          doc = user_doc.data();
          return;
        }
      });
      if (doc) {
        if (!doc.has_invited && user_id != match) {
          try {
            let ret = await aumentarInvitacionStatus(match, ctx, usersRef);
            if (ret) {
              usersRef.doc(user_id + "").update({ has_invited: true });
              bot.telegram.editMessageText(
                msgInfo.chat.id,
                msgInfo.message_id,
                undefined,
                "*Muy bien*. Ahora tu amigo recibirá un COLE por haberte invitado.\n\n*¿Quieres recibir tú también?* Usa el comando /recompensas y averigua tu código.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.",
                { parse_mode: "Markdown" }
              );
              bot.telegram.sendMessage(
                match,
                "*¡Un amigo te ha referenciado al crear una cuenta!* Bien hecho. Pronto mandaremos tu COLE de recompensa.\nPara ver tus recompensas usa el comando /recompensas.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.",
                { parse_mode: "Markdown" }
              );
            } else {
              ctx.reply(
                "*Lo lamento, pero... no tenemos a ese usuario en nuestra base de datos.* ¿Estás seguro de tener el código correcto?\n\nCualquier duda puedes contárnosla mediante el bot de soporte: @ColeCoinSoporteBot.",
                { parse_mode: "Markdown" }
              );
            }
          } catch (err) {
            ctx.reply("Hubo un error: " + err);
          }
        } else if (user_id == match) {
          bot.telegram.editMessageText(
            console.log(msgInfo)
            msgInfo.chat.id,
            msgInfo.message_id,
            undefined,
            "*¿Te crees muy listo?* Ese es tu propio código, no puedes referenciarte a ti mismo.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.",
            { parse_mode: "Markdown" }
          );
        } else {
          bot.telegram.editMessageText(
            msgInfo.chat.id,
            msgInfo.message_id,
            undefined,
            "Ya has mandado antes un código de invitación, no puedes hacerlo de nuevo.\n\n*¿Quieres recibir recompensas tú también?* Usa el comando /recompensas y averigua tu código.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.",
            { parse_mode: "Markdown" }
          );
        }
      } else {
        bot.telegram.editMessageText(
          msgInfo.chat.id,
          msgInfo.message_id,
          undefined,
          masTardeInvitacion,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "✅ Sí", callback_data: "comenzarTutorial" },
                  { text: "⏳ Más tarde", callback_data: "masTardeInvitacion" },
                ],
              ],
              remove_keyboard: true,
            },
          }
        );
      }
    });
  });
};

async function aumentarInvitacionStatus(user_id, ctx, usersRef) {
  return usersRef
    .get()
    .then((snapshot) => {
      var user_doc = undefined;
      var exists = false;
      snapshot.forEach((doc) => {
        if (doc.id == user_id) {
          user_doc = doc.data();
          exists = true;
          return;
        }
      });

      if (exists) {
        usersRef
          .doc(user_id + "")
          .update({ invitations: user_doc.invitations + 1 });
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      const { huboError } = require("../messages/messages");
      ctx.reply(huboError + err);
      console.log(err);
    });
}
