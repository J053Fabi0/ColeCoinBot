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

const askAdress = require("./src/callbackHandlers/askAddress");
askAdress(bot);

const startCommand = require('./src/commands/start');
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

//  bot.launch();

exports.bot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res)
});