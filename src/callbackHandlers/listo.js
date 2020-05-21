const axios = require('axios');

module.exports = bot => {
  bot.action(/listo/, async ctx => {
    let texto_boton = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text;

    if (texto_boton == "✅ Listo") {
      let user_id = ctx.match.input.split(" ")[1];
      const { yaDimos5 } = require('../messages/messages');
      try {
        bot.telegram.sendMessage(user_id, yaDimos5, { parse_mode: "Markdown" });
        await bot.telegram.forwardMessage(-1001472593674, ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, { disable_notification: true });
        ctx.deleteMessage();
      } catch (err) {
        const { huboError } = require('../messages/messages');
        ctx.reply(huboError + err);
        console.log(err);
      }
    }
    else {
      // This is fixed to reconstruct the message with markdown. If the message change, change this as well.
      let splitText = ctx.update.callback_query.message.text.split(" ");
      let message = "*"
      splitText.forEach((word, index) => {
        message = `${message}${word}`;
        if (index == 4) { message = message + "* `" }
        else { message = message + " " }
      })
      message = message + "`";

      ctx.answerCbQuery();
      ctx.editMessageText(message, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Listo', callback_data: ctx.match.input },
            ]
          ]
        },
        parse_mode: "Markdown"
      });
    }
  })

  bot.action(/recompensado/, async ctx => {
    let texto_boton = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text;

    if (texto_boton == "✅ Listo") {
      let user_id = ctx.match.input.split(" ")[1];
      let recompensaADar = ctx.match.input.split(" ")[2];

      let user_invitations = 0;
      let response = "Usuario no encontrado";

      try {
        let res = await axios.get(process.env.api_url + 'getUser?user_id=' + user_id + "&api_key=" + process.env.api_key);
        response = res.data;
      } catch (err) {
        const { huboError } = require('../messages/messages');
        ctx.reply(huboError + err);
        console.log(err);
      }
      let recompensasActuales = response.invitations

      if (response != "Usuario no encontrado") {
        let message = `*¡Buenas noticias!* Ya te hemos mandado tu recompensa de ${recompensaADar} COLE por invitar gente. Llegará a tu cartera en un par de minutos.

*¡Muchas gracias por apoyar el proyecto!* No dejes de contarle a más gente. 😉

¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.`

        if (recompensasActuales - recompensaADar == 0) {
          try {
            await axios.get(process.env.api_url + 'updateInvitations?user_id=' + user_id + "&invitations=0" + "&api_key=" + process.env.api_key);
            ctx.deleteMessage();
          } catch (err) {
            const { huboError } = require('../messages/messages');
            ctx.reply(huboError + err);
            console.log(err);
          }
        }
        else {
          try {
            await axios.get(process.env.api_url + 'updateInvitations?user_id=' + user_id + "&invitations=" + (recompensasActuales - recompensaADar) + "&api_key=" + process.env.api_key);
            message = `*¡Buenas noticias!* Ya te hemos mandado tu recompensa de ${recompensaADar} COLE por invitar gente. Llegará a tu cartera en un par de minutos.

Todavía tienes ${recompensasActuales - recompensaADar} recompensa${(((recompensasActuales - recompensaADar) == 1) ? '' : 's')} en espera. Llegarán pronto también.

*¡Muchas gracias por apoyar el proyecto!* No dejes de contarle a todos 😉.

¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.`

            ctx.editMessageText(ctx.update.callback_query.message.text + "\n\n*Entrega " + (recompensasActuales - recompensaADar) + " más a esa persona. Lo acaba de ganar.*", {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: '✅ Listo', callback_data: `recompensado ${user_id} ` + (recompensasActuales - recompensaADar) },
                  ]
                ]
              },
              parse_mode: "Markdown"
            });
          } catch (err) {
            const { huboError } = require('../messages/messages');
            ctx.reply(huboError + err);
            console.log(err);
          }
        }
        bot.telegram.sendMessage(user_id, message, { parse_mode: "Markdown" });
      }
      else {
        ctx.reply("Por alguna razón no existe el usuario.");
      }
    }
    else {
      // This is fixed to reconstruct the message with markdown. If the message change, change this as well.
      let splitText = ctx.update.callback_query.message.text.split(" ");
      let message = "*"
      splitText.forEach((word, index) => {
        message = `${message}${word}`;
        if (index == 4) { message = message + "* `" }
        else { message = message + " " }
      })
      message = message + "`";

      ctx.answerCbQuery();
      ctx.editMessageText(message, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Listo', callback_data: ctx.match.input },
            ]
          ]
        },
        parse_mode: "Markdown"
      });
    }
  })
}