module.exports = bot => {
  const { infoMessage } = require('../messages/messages');

  bot.action('infoDelProyecto', ctx => {
    ctx.editMessageText(infoMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️ Volver", callback_data: "start" }
          ]
        ]
      }
    });
    ctx.answerCbQuery();
  })
}