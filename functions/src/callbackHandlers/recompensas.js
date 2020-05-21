const axios = require('axios');

module.exports = bot => {
  bot.action("recargarRecompensasAdmin", ctx => {
    let chat_id = ctx.update.callback_query.message.chat.id;

    if (chat_id == "-1001482751413") {
      admin(ctx, bot);
    }
    else {
      ctx.reply("`Dame un segundo...`", { parse_mode: "Markdown" });
      user(ctx, bot);
    }
  })

  bot.hears(/recompensa/i, ctx => {
    let chat_id = ctx.update.message.chat.id;

    if (chat_id == "-1001482751413") {
      admin(ctx, bot);
    }
    else {
      ctx.reply("`Dame un segundo...`", { parse_mode: "Markdown" });
      user(ctx, bot);
    }
  })

  bot.action('masTarde', async ctx => {
    const { masTardeRecompensa } = require('../messages/messages');
    ctx.editMessageText(masTardeRecompensa);
    ctx.reply("De acuerdo. Si cambias de opinión, cualquier mensaje activa el menú de inicio. ¡Que tengas un lindo día!");
  })
}

async function admin(ctx, bot) {
  ctx.deleteMessage();
  try {
    let users = await axios.get(process.env.api_url + 'getMissingUsers?api_key=' + process.env.api_key);
    users = users.data

    if (users != "No hay cuentas pendientes") {
      users.forEach(doc => {
        ctx.reply("*Recompensa con " + doc.invitations + " COLE a* `" + doc.address + "`", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '☝️ Yo lo hago', callback_data: "recompensado " + doc.user_id + " " + doc.invitations },
              ]
            ]
          },
          parse_mode: "Markdown"
        });
      })
    }
    else {
      ctx.reply(users, {
        reply_markup: {
          inline_keyboard: [[{ text: '🔄 Recargar 🔄', callback_data: "recargarRecompensasAdmin" }]]
        },
      });
    }
  }
  catch (err) {
    const { huboError } = require('../messages/messages');
    ctx.reply(huboError + err);
    console.log(err);
  }
}

async function user(ctx, bot) {
  let user_id = ctx.update.message.from.id;
  try {
    let user = await axios.get(process.env.api_url + 'getUser?user_id=' + user_id + "&api_key=" + process.env.api_key);
    user = user.data
    if (user != "Usuario no encontrado") {
      const { sinRecompensas } = require('../messages/messages');
      let message = sinRecompensas + "`" + user_id + "`\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot."

      if (user.invitations != 0) {
        message = "*Tienes " + user.invitations + ` recompensa${((user.invitations == 1) ? '' : 's')} en espera.* Cuando te las mandemos te llegará un mensaje, no te preocupes.\n` + message;
      }

      bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1,
        message, { parse_mode: "Markdown" });
    }
    else {
      const { masTardeRecompensa } = require('../messages/messages');
      bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id + 1, ctx.update.message.message_id + 1,
        masTardeRecompensa, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Sí', callback_data: "comenzarTutorial" }, { text: '⏳ Más tarde', callback_data: "masTarde" }
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
}

