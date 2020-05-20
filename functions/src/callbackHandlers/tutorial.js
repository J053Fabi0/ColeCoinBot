module.exports = bot => {
  const { tutorial } = require('../messages/messages');

  bot.action('comenzarTutorial', ctx => {
    ctx.editMessageText(tutorial[0], {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "PlayStore", url: "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.incognito.wallet&ddl=1&pcampaignid=web_ddl_1" }, { text: "AppStore", url: "https://apps.apple.com/us/app/incognito-crypto-wallet/id1475631606" },
          ],
          [
            { text: "🏠 Volver a inicio", callback_data: "start" }, { text: "➡️ Siguiente paso", callback_data: "segundoPaso" }, 
          ]
        ]
      },
      parse_mode: "Markdown"
    });
    ctx.answerCbQuery();
  })

  bot.action('segundoPaso', ctx => {
    ctx.editMessageText(tutorial[1], {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️ Volver un paso", callback_data: "comenzarTutorial" }, { text: "🏠 Volver al inicio", callback_data: "start"}
          ]
        ]
      },
      parse_mode: "Markdown"
    });
    ctx.answerCbQuery();
  })
}