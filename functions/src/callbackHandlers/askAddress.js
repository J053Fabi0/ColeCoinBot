module.exports = bot => {
  const firebase = require('firebase');

  bot.hears(/12(.){101}/, ctx => {
    let user_id = ctx.update.message.from.id;
    let address = ctx.match[0];
    let db = firebase.firestore();

    let usersRef = db.collection('users');
    let query = usersRef.get()
      .then(snapshot => {
        var foundUser = false
        snapshot.forEach(doc => {
          if (user_id == doc.id) {
            foundUser = true;
            return;
          }
        });

        if (foundUser) {
          ctx.reply("Hmm... Lo lamento, pero con esta cuenta de Telegram ya has pedido 5 COLEs.\n\n¿Estás intentando conseguir 5 COLEs para un amigo? Pídele que descargue Telegram y podrás ganar tú un COLE si él ingresa tu id: `" + user_id + "` cuando le preguntemos si alguien lo invitó.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinBot.", { parse_mode: "Markdown" })
          return;
        }
        else {
          let docRef = db.doc('users/' + user_id);
          let setData = docRef.set({
            address: address,
            done: false,
            user_id: user_id,
            invitations: 0
          });
          ctx.reply("¡Listo! Recibirás 5 COLE en un plazo máximo de 24 horas.\n\nTe mandaremos un mensaje aquí cuando lo hayamos hecho.");
          
          bot.telegram.sendMessage(-484205353, "*5 COLE a " + user_id + "*: `" + address + "`", {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ Listo', callback_data: "listo " + user_id },
                ]
              ]
            },
            parse_mode: "Markdown"
          });
        }
      })
      .catch(err => {
        const { huboError } = require('../messages/messages');
        ctx.reply(huboError + err);
        console.log(err);
      })
  })
}