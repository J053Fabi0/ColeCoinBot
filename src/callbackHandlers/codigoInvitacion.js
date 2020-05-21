const axios = require('axios');

module.exports = bot => {
  const { masTardeInvitacion } = require('../messages/messages');

  bot.action('masTardeInvitacion', async ctx => {
    ctx.editMessageText(masTardeInvitacion)
    ctx.reply("De acuerdo. Si cambias de opinión, cualquier mensaje activa el menú principal. ¡Que tengas un lindo día!");
  })

  bot.hears(/\b[0-9]{9}\b/, async ctx => {
    let user_id = ctx.update.message.from.id;
    let match = ctx.match[0];

    ctx.reply("`Dame un segundo...`", { parse_mode: "Markdown" });
    try {
      const res = await axios.get(process.env.api_url + 'getUser?user_id=' + user_id + "&api_key=" + process.env.api_key);
      console.log(user_id);
      if (res.data != "Usuario no encontrado") {
        if (!res.data.has_been_invited && user_id != match) {
          try {
            let ret = await aumentarInvitacionStatus(match, ctx);

            if (ret) {
              try {
                await axios.get(process.env.api_url + 'updateHasBeenInvited?user_id=' + user_id + "&has_been_invited=true" + "&api_key=" + process.env.api_key);
                bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1,
                  "*Muy bien*. Ahora tu amigo recibirá un COLE por haberte invitado.\n\n*¿Quieres recibir tú también?* Usa el comando /recompensas y averigua tu código.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" })
                bot.telegram.sendMessage(match, "*¡Un amigo te ha referenciado al crear una cuenta!* Bien hecho. Pronto mandaremos tu COLE de recompensa.\nPara ver tus recompensas usa el comando /recompensas.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" });
              } catch (err) {
                const { huboError } = require('../messages/messages');
                ctx.reply(huboError + err);
                console.log(err);
              }
            }
            else {
              bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1,
                "*Lo lamento, pero... no tenemos a ese usuario en nuestra base de datos.* ¿Estás seguro de tener el código correcto?\n\nCualquier duda puedes contárnosla mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" })
            }
          }
          catch (err) {
            ctx.reply("Hubo un error: " + err);
          }
        }
        else if (user_id == match) {
          bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1, "*¿Te crees muy listo?* Ese es tu propio código, no puedes referenciarte a ti mismo.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" });
        }
        else {
          try {
            bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1,
              "Ya has mandado antes un código de invitación.\n*¿Quieres recibir recompensas tú también?* Usa el comando /recompensas y averigua tu código.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" });
          } catch (err) {
            const { huboError } = require('../messages/messages');
            ctx.reply(huboError + err);
            console.log(err);
            return false
          }
        }
      }
      else {
        bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1, masTardeInvitacion,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ Sí', callback_data: "comenzarTutorial" }, { text: '⏳ Más tarde', callback_data: "masTardeInvitacion" }
                ]
              ],
              remove_keyboard: true
            }
          });
      }
    }
    catch (err) {
      const { huboError } = require('../messages/messages');
      ctx.reply(huboError + err);
      console.log(err);
    }
  })
}

async function aumentarInvitacionStatus(user_id, ctx) {
  try {
    const res = await axios.get(process.env.api_url + 'getUser?user_id=' + user_id + "&api_key=" + process.env.api_key);
    if (res.data != "User not found") {
      try {
        await axios.get(process.env.api_url + 'updateInvitations?user_id=' + user_id + "&invitations=" + (Number(res.data.invitations) + 1) + "&api_key=" + process.env.api_key);
        return true
      }
      catch (err) {
        const { huboError } = require('../messages/messages');
        ctx.reply(huboError + err);
        console.log(err);
        return false
      }
    }
  }
  catch (err) {
    const { huboError } = require('../messages/messages');
    ctx.reply(huboError + err);
    console.log(err);
    return false
  }
}