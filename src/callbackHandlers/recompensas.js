module.exports = (bot, db) => {
  bot.action("recargarRecompensasAdmin", ctx => {
    let chat_id = ctx.update.callback_query.message.chat.id;

    if (chat_id == "-1001482751413") {
      admin(ctx, db);
    }
    else {
      ctx.reply("`Dame un segundo...`", {parse_mode: "Markdown"});
      user(ctx, db);
    }
  })
  
  bot.hears(/recompensa/i, ctx => {
    let chat_id = ctx.update.message.chat.id;

    if (chat_id == "-1001482751413") {
      admin(ctx, db);
    }
    else {
      user(ctx, db);
    }
  })

  bot.action('masTarde', async ctx => {
    const { masTardeRecompensa } = require('../messages/messages');
    ctx.editMessageText(masTardeRecompensa);
    ctx.reply("De acuerdo. Si cambias de opinión, cualquier mensaje activa el menú de inicio. ¡Que tengas un lindo día!");
  })
}

function admin(ctx, db) {
  ctx.deleteMessage();
  db.find( { invitations: { $gte : 1 } }, (err, users) => {
    if (users.length != 0) {
      users.forEach(doc => {
        ctx.reply("*Recompensa con " + doc.invitations + " COLE a* `" + doc.address + "`", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '☝️ Yo lo hago', callback_data: "recompensado " + doc._id + " " + doc.invitations},
              ]
            ]
          },
          parse_mode: "Markdown"
        });
      })
      ctx.reply(".", {
        reply_markup: {
          inline_keyboard: [[{ text: '🔄 Recargar 🔄', callback_data: "recargarRecompensasAdmin" }]]
        },
      });
    }
    else {
      ctx.reply("No hay cuentas pendientes", {
        reply_markup: {
          inline_keyboard: [[{ text: '🔄 Recargar 🔄', callback_data: "recargarRecompensasAdmin" }]]
        },
      });
    }
  }) 
}

function user(ctx, db) {  
  let user_id = Number(ctx.update.message.from.id);
  
  db.findOne( { _id: user_id }, (err, user) => {
    if (user) {
      const { sinRecompensas } = require('../messages/messages');
      let message = sinRecompensas + "`" + user_id + "`\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot."
      
      if (user.invitations != 0) {
        message = "*Tienes " + user.invitations + ` recompensa${((user.invitations == 1) ? '' : 's')} en espera.* Cuando te la${((user.invitations == 1) ? '' : 's')} mandemos te llegará un mensaje, no te preocupes.\n` + message;
      }

      ctx.reply(message, { parse_mode: "Markdown" });
    }
    else {
      const { masTardeRecompensa } = require('../messages/messages');
      ctx.reply(masTardeRecompensa, {
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
  })
}

