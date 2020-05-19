module.exports = bot => {
  const firebase = require('firebase');

  bot.hears(/12(.){101}/, ctx => {
    let user_id = ctx.update.message.from.id;
    let db = firebase.firestore();

    let usersRef = db.collection('usuarios');
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
          let docRef = db.doc('usuarios/' + user_id);
          let setData = docRef.set({
            address: ctx.match[0],
            done: false,
            user_id: user_id,
            invitations: 0
          });
          ctx.reply("¡Listo! Te mandaremos las 5 COLE en un plazo máximo de 24 horas.\n\nTe mandaremos un mensaje aquí cuando lo hayamos hecho.");
        }
      })
      .catch(err => {
        console.log(err);
      })
  })
}