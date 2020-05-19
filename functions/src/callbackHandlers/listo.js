module.exports = bot => {
  const firebase = require('firebase');

  bot.action(/listo/, async ctx => {
    let user_id = ctx.match.input.split(" ")[1];
    const { yaDimos5 } = require('../messages/messages');

    bot.telegram.sendMessage(user_id, yaDimos5, {parse_mode: "Markdown"});
    await bot.telegram.forwardMessage(-1001472593674, ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, { disable_notification: true});
    ctx.deleteMessage();
  })

  bot.action(/recompensado/, ctx => {
    let user_id = ctx.match.input.split(" ")[1];
    let recompensa = ctx.update.callback_query.message.text.split(" ")[2];

    let db = firebase.firestore();
    let usersRef = db.collection('users');
    let user_invitations = 0;

    usersRef.get()
      .then(snapshot => {
        var user_doc;
        var exists = false;
        snapshot.forEach(doc => {
          if (doc.id == user_id) {
            user_doc = doc.data();
            exists = true;
            return;
          }
        });

        if (exists) {
          if (user_doc.invitations != 0) {
            let message = `*¡Buenas noticias!* Ya te hemos mandado tu recompensa de ${recompensa} COLE por invitar gente. Llegará a tu cartera en un par de minutos.
    
*¡Muchas gracias por apoyar el proyecto!* No dejes de contarle a todos 😉.

¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinBot.`

            if (user_doc.invitations - recompensa == 0) {
              usersRef.doc(user_id).update({ invitations: 0 });
              ctx.deleteMessage();
            }
            else {
              usersRef.doc(user_id).update({ invitations: user_doc.invitations - recompensa });
              message = `*¡Buenas noticias!* Ya te hemos mandado tu recompensa de ${recompensa} COLE por invitar gente. Llegará a tu cartera en un par de minutos.

Todavía tienes ${user_doc.invitations - recompensa} recompensa/s en espera. Llegarán pronto también.

*¡Muchas gracias por apoyar el proyecto!* No dejes de contarle a todos 😉.

¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinBot.`
              ctx.editMessageText(ctx.update.callback_query.message.text + "\n\nEntrega " + (user_doc.invitations - recompensa) + " más a esa persona.", {
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
            bot.telegram.sendMessage(user_id, message, { parse_mode: "Markdown" });
          }
        }
        else {
          ctx.reply("Por alguna razón no existe el usuario.");
        }

      })
      .catch(err => {
        const { huboError } = require('../messages/messages');
        ctx.reply(huboError + err);
        console.log(err);
      }) 
  })
}