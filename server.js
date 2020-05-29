const dotenv = require("dotenv");
dotenv.config();

const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.token);

bot.catch((err, ctx) => {
  const { huboError } = require('./src/messages/messages');
  ctx.reply(huboError + err);
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

// Esta parte da una respuesta a las llamadas HTTPS y que UptimeRobot no de error al hacer ping
const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html"); 
});

app.get("/bot", (request, response) => {
  bot.handleUpdate(request.body, response)
});
const listener = app.listen(process.env.PORT);

const Nedb = require('nedb');
const db = new Nedb({ filename: process.env.PWD + '/users.db', autoload: true });

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

const admins = [861616600, 801112961]
const testers = [861616600, 843396996, 801112961]

const admin = require("./src/callbackHandlers/admin/admin");
admin(bot, db, admins);

const listo = require("./src/callbackHandlers/listo");
listo(bot, db);

const codigoInvitacion = require("./src/callbackHandlers/codigoInvitacion");
codigoInvitacion(bot, db);

const askAdress = require("./src/callbackHandlers/askAddress");
askAdress(bot, db);

const recompensas = require("./src/callbackHandlers/recompensas");
recompensas(bot, db);

const start = require("./src/callbackHandlers/start"); // Este va hasta el final porque tiene un RegEX que abarca todo
start(bot, db);

bot.launch();

