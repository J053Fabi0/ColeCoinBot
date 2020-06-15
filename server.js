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

const admins = [861616600, 801112961];

bot.use((ctx, next) => {
  if (ctx.update.message) {
    if (admins.includes(ctx.update.message.from.id)) {
      // Stickers
      if (ctx.update.message.sticker) {
        ctx.reply(ctx.update.message.sticker.file_id);
      }

      // GIFs
      if (ctx.update.message.animation) {
        console.log(ctx.update.message.animation.file_id);
        ctx.replyWithAnimation(ctx.update.message.animation.file_id, {
          caption: ctx.update.message.animation.file_id,
        });
      }

      // Images
      if (ctx.update.message.photo) {
        console.log(ctx.update.message.photo[0].file_id);
        ctx.replyWithPhoto(ctx.update.message.photo[0].file_id, {
          caption: ctx.update.message.photo[0].file_id,
        });
      }

      // Video
      if (ctx.update.message.video) {
        console.log(ctx.update.message.video.file_id);
        ctx.replyWithVideo(ctx.update.message.video.file_id, {
          caption: ctx.update.message.video.file_id,
        });
      }
    }
  }
  next();
});

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

app.listen(process.env.PORT);

bot.launch();
