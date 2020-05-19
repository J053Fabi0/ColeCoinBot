const functions = require('firebase-functions');
const Telegraf = require('telegraf');

let config = require('./env.json');

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

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
//   console.log(ctx.update)
// })

const listo = require("./src/callbackHandlers/listo");
listo(bot);

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