module.exports = bot => {
  bot.action(/listo/, async ctx => {
    let user_id = ctx.match.input.split(" ")[1];
    const { yaDimos5 } = require('../messages/messages');

    bot.telegram.sendMessage(user_id, yaDimos5, {parse_mode: "Markdown"});
    await bot.telegram.forwardMessage(-1001472593674, ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, { disable_notification: true});
    ctx.deleteMessage();
  })

  bot.action(/recompensado/, ctx => {
    let user_id = ctx.match.input.split(" ")[1];
    let recompensa = ctx.update.callback_query.message.text.split(" ")[2];
    let message = `*¡Buenas noticias!* Ya te hemos mandado tu recompensa de ${recompensa} COLE por invitar gente. Llegará a tu cartera en un par de minutos.
    
*¡Muchas gracias por apoyar el proyecto!* No dejes de contarle a todos 😉.

¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinBot.`

    bot.telegram.sendMessage(user_id, message, { parse_mode: "Markdown" });
    rctx.deleteMessage();
  })
}