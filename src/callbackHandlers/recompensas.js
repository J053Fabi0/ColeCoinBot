module.exports = (bot, db) => {
  bot.action("recargarRecompensasAdmin", (ctx) => {
    let chat_id = ctx.update.callback_query.message.chat.id;

    if (chat_id == "-1001482751413") {
      admin(ctx, db);
    } else {
      ctx.reply("`Dame un segundo...`", { parse_mode: "Markdown" });
      user(ctx, db);
    }
  });

  bot.hears(/recompensa/i, async (ctx) => {
    let chat_id = ctx.update.message.chat.id;

    if (chat_id == "-1001482751413") {
      admin(ctx, db);
    } else {
      await user(ctx, db);
    }
  });

  bot.action("masTarde", async (ctx) => {
    const { masTardeRecompensa } = require("../messages/messages");
    ctx.editMessageText(masTardeRecompensa);
    ctx.reply(
      "De acuerdo. Si cambias de opinión, cualquier mensaje activa el menú de inicio. ¡Que tengas un lindo día!"
    );
  });
};

function admin(ctx, usersRef) {
  ctx.deleteMessage();
  usersRef
    .where("invitations", ">=", 1)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        ctx.reply("No hay cuentas pendientes", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🔄 Recargar 🔄",
                  callback_data: "recargarRecompensasAdmin",
                },
              ],
            ],
          },
        });
        return;
      }

      snapshot.forEach((doc) => {
        ctx.reply(
          "*Recompensa con " +
            doc.data().invitations +
            " COLE a* `" +
            doc.data().address +
            "`",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "☝️ Yo lo hago",
                    callback_data: `recompensado ${doc.id} ${
                      doc.data().invitations
                    }`,
                  },
                ],
              ],
            },
            parse_mode: "Markdown",
          }
        );
      });
      ctx.reply(".", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔄 Recargar 🔄",
                callback_data: "recargarRecompensasAdmin",
              },
            ],
          ],
        },
      });
    })
    .catch((err) => {
      const { huboError } = require("../messages/messages");
      ctx.reply(huboError + err);
      console.log(err);
    });
}

async function user(ctx, usersRef) {
  let user_id = ctx.update.message.from.id;

  await usersRef
    .get()
    .then(async (snapshot) => {
      var user = null;
      snapshot.forEach((doc) => {
        if (doc.id == user_id) {
          user = doc.data();
          return;
        }
      });

      if (user) {
        const { sinRecompensas } = require("../messages/messages");
        let message =
          sinRecompensas +
          "`" +
          user_id +
          "`\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.";

        if (user.invitations != 0) {
          message =
            "*Tienes " +
            user.invitations +
            ` recompensa${
              user.invitations == 1 ? "" : "s"
            } en espera.* Cuando te la${
              user.invitations == 1 ? "" : "s"
            } mandemos te llegará un mensaje, no te preocupes.\n` +
            message;
        }

        await ctx.reply(message, { parse_mode: "Markdown" });
      } else {
        const { masTardeRecompensa } = require("../messages/messages");
        await ctx.reply(masTardeRecompensa, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "✅ Sí", callback_data: "comenzarTutorial" },
                { text: "⏳ Más tarde", callback_data: "masTarde" },
              ],
            ],
            remove_keyboard: true,
          },
        });
      }
    })
    .catch(async (err) => {
      const { huboError } = require("../messages/messages");
      await ctx.reply(huboError + err);
      console.log(err);
    });
}
