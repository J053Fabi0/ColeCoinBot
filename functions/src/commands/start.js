module.exports = bot => {
  bot.command(['start', 'help', 'ayuda'], ctx => {
    start(ctx, false);
  })
  bot.action('start', ctx => {
    ctx.answerCbQuery();
    start(ctx, true);
  })
  bot.action('volver_ayuda', ctx => {
    ctx.deleteMessage();
    ctx.answerCbQuery();
    start(ctx, false);
  })

  const infoDelProyecto = require('../callbackHandlers/infoDelProyecto');
  infoDelProyecto(bot);

  const tutorial = require('../callbackHandlers/tutorial');
  tutorial(bot);
}

function start(ctx, shouldEdit) {
  const { startMessage } = require('../messages/messages');

  let buttons = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📲 Comenzar a usar COLE', callback_data: "comenzarTutorial" },
        ],
        [
          { text: '👀 Conocer más sobre el proyecto', callback_data: "infoDelProyecto" },
        ],
        [
          { text: '👥 Hablar con los desarrolladores', callback_data: "contacto" },
        ]
      ]
    },
    parse_mode: "Markdown"
  };

  if (shouldEdit) {
    ctx.editMessageText(startMessage, buttons)
  }
  else {
    ctx.reply(startMessage, buttons)
  }
}