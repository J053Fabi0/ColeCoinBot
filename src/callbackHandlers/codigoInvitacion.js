module.exports = (bot, db) => {
  const { masTardeInvitacion } = require('../messages/messages');

  bot.action('masTardeInvitacion', async ctx => {
    ctx.editMessageText(masTardeInvitacion)
    ctx.reply("De acuerdo. Si cambias de opinión, cualquier mensaje activa el menú principal. ¡Que tengas un lindo día!");
  })

  bot.hears(/\b[0-9]{9}\b/, async ctx => {
    let user_id = Number(ctx.update.message.from.id);
    let match = Number(ctx.match[0]);
    
    const msgInfo = await ctx.reply("`Dame un segundo...`", {parse_mode: "Markdown"});
    
    db.findOne({ _id: user_id }, (err, doc) => {
      if (doc) {
        if (!doc.has_invited && user_id != match) {
          db.findOne({ _id: match }, (err, doc) => {
            if (doc) {
              db.update({ _id: match }, { $inc: { invitations: 1 } }, {}, function() {
                db.update({ _id: user_id }, { $set: {has_invited: true} }, {}, function () {
                  bot.telegram.editMessageText(msgInfo.chat.id, msgInfo.message_id, undefined,
                                               "*Muy bien*. Ahora tu amigo recibirá un COLE por haberte invitado.\n\n*¿Quieres recibir tú también?* Usa el comando /recompensas y averigua tu código.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" })
                  bot.telegram.sendMessage(match, "*¡Un amigo te ha referenciado al crear una cuenta!* Bien hecho. Pronto mandaremos tu COLE de recompensa.\nPara ver tus recompensas usa el comando /recompensas.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" });
                })
              });
            }
            else {
              bot.telegram.editMessageText(msgInfo.chat.id, msgInfo.message_id, undefined, 
                                           "*Lo lamento, pero... no tenemos a ese usuario en nuestra base de datos.* ¿Estás seguro de tener el código correcto?\n\nCualquier duda puedes contárnosla mediante el bot de soporte: @ColeCoinSoporteBot.", {parse_mode: "Markdown"})
            }
          })
        }
        else if (user_id == match) {
          bot.telegram.editMessageText(msgInfo.chat.id, msgInfo.message_id, undefined, "*¿Te crees muy listo?* Ese es tu propio código, no puedes referenciarte a ti mismo.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "Markdown" });
        }
        else {
          bot.telegram.editMessageText(msgInfo.chat.id, msgInfo.message_id, undefined, 
                                         "Ya has mandado antes un código de invitación.\n\n*¿Quieres recibir recompensas tú también?* Usa el comando /recompensas y averigua tu código.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", {parse_mode: "Markdown"});
        }
      }
      else {
        bot.telegram.editMessageText(msgInfo.chat.id, msgInfo.message_id, undefined, masTardeInvitacion, 
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
    })
  });
}