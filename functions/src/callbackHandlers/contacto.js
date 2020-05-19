module.exports = bot => {
  const { contacto } = require('../messages/messages');

  bot.action('contacto', ctx => {
    ctx.editMessageText(contacto, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️ Volver", callback_data: "start" }
          ]
        ]
      },
      parse_mode: "Markdown" 
    });
    ctx.answerCbQuery();
  })
}