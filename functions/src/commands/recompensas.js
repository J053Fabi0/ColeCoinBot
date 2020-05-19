module.exports = bot => {
  const firebase = require('firebase');

  bot.command("recompensas", ctx => {
    let chat_id = ctx.update.message.chat.id;

    let db = firebase.firestore();
    let usersRef = db.collection('users');

    if (chat_id == "-484205353") {
      admin(ctx, usersRef);
    }
    else {
      user(ctx, usersRef);
    }
  })

  bot.action('masTarde', async ctx => {
    ctx.editMessageText("Para ganar recompensas por invitar amigos primero tienes que crear una cuenta. ¿Quieres hacerlo?")
    ctx.reply("De acuerdo. ¡Que tengas un lindo día!");
  })
}

function admin(ctx, usersRef) {
  ctx.deleteMessage();
  usersRef.where('invitations', '>=', 1).get()
    .then(snapshot => {
      if (snapshot.empty) {
        ctx.reply("No hay cuentas pendientes");
        return;
      }

      snapshot.forEach(doc => {
        ctx.reply("*Recompensa con " + doc.data().invitations + " COLE a* `" + doc.data().address + "`", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Listo', callback_data: "recompensado " + doc.id },
              ]
            ]
          },
          parse_mode: "Markdown"
        });
      });
    })
    .catch(err => {
      const { huboError } = require('../messages/messages');
      ctx.reply(huboError + err);
      console.log(err);
    });
}

function user(ctx, usersRef) {
  let user_id = ctx.update.message.from.id;

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
        const { sinRecompensas } = require('../messages/messages');
        let message = sinRecompensas + "`" + user_id + "`\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinBot."

        if (user_doc.invitations != 0) {
          message = "*Tienes " + user_doc.invitations + " recompensa/s en espera.* Cuando te las mandemos te llegará un mensaje, no te preocupes.\n" + message;
        }

        ctx.reply(message, { parse_mode: "Markdown" });
      }
      else {
        ctx.reply("Para ganar recompensas por invitar amigos primero tienes que crear una cuenta. ¿Quieres hacerlo?", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Sí', callback_data: "comenzarTutorial" }, { text: '⏳ Más tarde', callback_data: "masTarde" }
              ]
            ]
          }
        });
      }

    })
    .catch(err => {
      const { huboError } = require('../messages/messages');
      ctx.reply(huboError + err);
      console.log(err);
    }) 
}

