module.exports = bot => {
  bot.action(/listo/, async ctx => {
    let user_id = ctx.match.input.split(" ")[1];
    const { yaDimos5 } = require('../messages/messages');

    bot.telegram.sendMessage(user_id, yaDimos5, {parse_mode: "Markdown"});
    await bot.telegram.forwardMessage(-1001472593674, ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, { disable_notification: true});
    ctx.deleteMessage();
  })
}