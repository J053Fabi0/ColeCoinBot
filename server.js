const dotenv = require("dotenv");
dotenv.config();

// const functions = require('firebase-functions');
const db = require('firebase');

const app = db.initializeApp({
    apiKey: process.env.apikey,
    authDomain: process.env.authdomain,
    databaseURL: process.env.databaseurl,
    projectId: process.env.projectid,
    storageBucket: process.env.storagebucket,
    messagingSenderId: process.env.messagingsenderid,
    appId: process.env.appid
});

const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.token);

bot.catch((err, ctx) => {
    const { huboError } = require('./src/messages/messages');
    ctx.reply(huboError + err);
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

// const Nedb = require('nedb');
// const db = new Nedb({ filename: process.env.PWD + '/users.db', autoload: true });

// bot.use((ctx, next) => {
//     // Stickers
//     // console.log(ctx.update.message.sticker);

//     // GIFs
//     // console.log(ctx.update.message.animation.file_id);
//     // ctx.replyWithAnimation(ctx.update.message.animation.file_id, {
//     //     caption: ctx.update.message.animation.file_id
//     // });

//     // console.log(ctx.update);
//     next(ctx)
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

// Esta parte da una respuesta a las llamadas HTTPS y que UptimeRobot no de error al hacer ping
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(bot.webhookCallback('/webhook'))

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html"); 
});

let usersRef = db.collection('users');
app.get("setUser", (req, res) => {
    // let user_id = req.query.user_id;
    // let address = req.query.address;
    
    try {
        usersRef.doc(user_id).set({
            address: "Hola",
            user_id: "01409831",
            invitations: 0,
            has_been_invited: false
        });
        res.send("Hecho: " + user_id + " " + address);
    }
    catch (err) {
        res.send(err);
    }
});

const listener = app.listen(process.env.PORT);
