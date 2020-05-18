module.exports = bot => {
  const { startMessage } = require('../messages/messages');

  bot.command('start', ctx => {
    try {
      ctx.reply(startMessage, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Quiero comenzar a usar COLE', callback_data: "comenzarTutorial" },
            ],
            [
              { text: 'Hablar con los desarrolladores', callback_data: "contacto" },
            ]
          ]
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
}