const functions = require('firebase-functions');
const Telegraf = require('telegraf');
const axios = require('axios');

let config = require('./env.json');

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

// Cambiar a token_test cuando se hagan pruebas con el test bot
const bot = new Telegraf(config.service.token);

const firebase = require('firebase');

const app = firebase.initializeApp({
  apiKey: config.service.apikey,
  authDomain: config.service.authdomain,
  databaseURL: config.service.databaseurl,
  projectId: config.service.projectid,
  storageBucket: config.service.storagebucket,
  messagingSenderId: config.service.messagingsenderid,
  appId: config.service.appid
});

// bot.use(ctx => {
//   console.log(ctx.match)
// })

const listo = require("./src/callbackHandlers/listo");
listo(bot);

const codigoInvitacion = require("./src/callbackHandlers/codigoInvitacion");
codigoInvitacion(bot);

const recompensas = require("./src/commands/recompensas");
recompensas(bot);

const askAdress = require("./src/callbackHandlers/askAddress");
askAdress(bot);

const startCommand = require('./src/commands/start'); // Este va hasta el final porque tiene un RegEX que abarca todo
startCommand(bot);

// bot.use((ctx, next) => {
//   // Stickers
//   // console.log(ctx.update.message.sticker);

//   // GIFs
//   // console.log(ctx.update.message.animation.file_id); 
//   // ctx.replyWithAnimation(ctx.update.message.animation.file_id, {
//   //   caption: ctx.update.message.animation.file_id
//   // });

//   // console.log(ctx.update);
//   next(ctx)
// })

// Uncomment this when you run firebase serve
// bot.launch(); 

// Uncomment this when you tun firebase deploy
exports.bot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res)
});

let db = firebase.firestore();
let usersRef = db.collection('users');

exports.getUsers = functions.https.onRequest((req, res) => {
  if (req.query.api_key == "IkxnKPu6VaY8b0yz1Zh2t1wm9kxSEosB") {
    usersRef.get()
      .then(snapshot => {
        let lista = []
        snapshot.forEach(doc => {
          lista.push({ address: doc.data().address, invitations: doc.data().invitations, has_been_invited: doc.data().has_been_invited, user_id: doc.data().user_id });
        });
        res.send(lista)
      })
      .catch(err => {
        console.log(err);
        res.send([])
      })
  }
  else {
    res.send("¿Contraseña?")
  }
})

exports.getUser = functions.https.onRequest((req, res) => {
  let user_id = req.query.user_id;

  if (req.query.api_key == "IkxnKPu6VaY8b0yz1Zh2t1wm9kxSEosB") {
    usersRef.where('user_id', '==', user_id).get()
      .then(snapshot => {
        if (snapshot.empty) {
          res.send("Usuario no encontrado");
          return;
        }
        let lista = []
        snapshot.forEach(doc => {
          lista.push({ address: doc.data().address, invitations: doc.data().invitations, has_been_invited: doc.data().has_been_invited, user_id: doc.data().user_id });
        });
        res.send(lista[0]);
      })
      .catch(err => {
        console.log(err);
        res.send("Usuario no encontrado")
      })
  }
  else {
    res.send("¿Contraseña?")
  }
})

exports.getMissingUsers = functions.https.onRequest((req, res) => {
  if (req.query.api_key == "IkxnKPu6VaY8b0yz1Zh2t1wm9kxSEosB") {
    usersRef.where('invitations', '>=', 1).get()
      .then(snapshot => {
        if (snapshot.empty) {
          res.send("No hay cuentas pendientes");
          return;
        }

        let lista = []
        snapshot.forEach(doc => {
          lista.push({ address: doc.data().address, invitations: doc.data().invitations, has_been_invited: doc.data().has_been_invited, user_id: doc.data().user_id });
        });
        res.send(lista)
      })
      .catch(err => {
        console.log(err);
        res.send("No hay cuentas pendientes");
      })
  }
  else {
    res.send("¿Contraseña?")
  }
})

exports.updateInvitations = functions.https.onRequest((req, res) => {
  let user_id = req.query.user_id;
  let invitations = req.query.invitations;
  if (req.query.api_key == "IkxnKPu6VaY8b0yz1Zh2t1wm9kxSEosB") {
    try {
      usersRef.doc(user_id).update({ invitations: Number(invitations) });
      res.send("Hecho: " + user_id + " " + invitations);
    }
    catch (err) {
      res.send(err);
    }
  }
  else {
    res.send("¿Contraseña?")
  }
})

exports.updateHasBeenInvited = functions.https.onRequest((req, res) => {
  let user_id = req.query.user_id;
  let has_been_invited = req.query.has_been_invited;
  if (req.query.api_key == "IkxnKPu6VaY8b0yz1Zh2t1wm9kxSEosB") {
    try {
      usersRef.doc(user_id).update({ has_been_invited: (has_been_invited == 'true') });
      res.send("Hecho: " + user_id + " " + has_been_invited);
    }
    catch (err) {
      res.send(err);
    }
  }
  else {
    res.send("¿Contraseña?")
  }
})

exports.addUser = functions.https.onRequest((req, res) => {
  let user_id = req.query.user_id;
  let address = req.query.address;

  if (req.query.api_key == "IkxnKPu6VaY8b0yz1Zh2t1wm9kxSEosB") {
    try {
      usersRef.doc(user_id).set({
        address: address,
        user_id: user_id.toString(),
        invitations: 0,
        has_been_invited: false
      });
      res.send("Hecho: " + user_id + " " + address);
    }
    catch (err) {
      res.send(err);
    }
  }
  else {
    res.send("¿Contraseña?")
  }
})