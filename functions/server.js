/*
This is the Glitch main file
*/
const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.token);

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

const listo = require("./src/callbackHandlers/listo");
listo(bot);

const codigoInvitacion = require("./src/callbackHandlers/codigoInvitacion");
codigoInvitacion(bot);

const askAdress = require("./src/callbackHandlers/askAddress");
askAdress(bot);

const recompensas = require("./src/callbackHandlers/recompensas");
recompensas(bot);

const start = require('./src/callbackHandlers/start'); // Este va hasta el final porque tiene un RegEX que abarca todo
start(bot);

bot.launch();