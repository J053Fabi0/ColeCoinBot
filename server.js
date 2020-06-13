const dotenv = require("dotenv");
dotenv.config();

const firebase = require("firebase");

const appFB = firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
});

let db = firebase.firestore();
let usersRef = db.collection("users");

const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.token);

bot.catch((err, ctx) => {
  const { huboError } = require("./src/messages/messages");
  ctx.reply(huboError + err);
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

// bot.use((ctx, next) => {
//   // Stickers
//   // console.log(ctx.update.message.sticker);

//   // GIFs
//   // console.log(ctx.update.message.animation.file_id);
//   // ctx.replyWithAnimation(ctx.update.message.animation.file_id, {
//   //     caption: ctx.update.message.animation.file_id
//   // });

//   // Images
//   // console.log(ctx.update.message.photo[0].file_id);
//   // ctx.replyWithPhoto(ctx.update.message.photo[0].file_id, {
//   //   caption: ctx.update.message.photo[0].file_id,
//   // });

//   // console.log(ctx.update);
//   next(ctx);
// });

const admins = [861616600, 801112961];
const testers = [861616600, 843396996, 801112961];

const adminControls = require("./src/callbackHandlers/admin/admin");
adminControls(bot, usersRef, admins);

const listo = require("./src/callbackHandlers/listo");
listo(bot, usersRef);

const codigoInvitacion = require("./src/callbackHandlers/codigoInvitacion");
codigoInvitacion(bot, usersRef);

const askAdress = require("./src/callbackHandlers/askAddress");
askAdress(bot, usersRef);

const recompensas = require("./src/callbackHandlers/recompensas");
recompensas(bot, usersRef);

const start = require("./src/callbackHandlers/start"); // Este va hasta el final porque tiene un RegEX que abarca todo
start(bot, usersRef);

// Esta parte da una respuesta a las llamadas HTTPS y que UptimeRobot no de error al hacer ping
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(bot.webhookCallback("/webhook"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

// app.get("/setUser", (req, res) => {
//     let user_id = "user_id"
//     // let user_id = req.query.user_id;
//     // let address = req.query.address;

//     try {
//         usersRef.doc(user_id).set({
//             address: "Hola",
//             user_id: "01409831",
//             invitations: 0,
//             has_been_invited: false
//         });
//         res.send("Hecho: " + user_id + " ");
//     }
//     catch (err) {
//         res.send(err);
//     }
// });

app.listen(process.env.PORT);

// bot.launch();
