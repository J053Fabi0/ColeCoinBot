module.exports = (bot, db) => {
  const { tutorial } = require("../../messages/messages");
  const descargarApp =
    "AgACAgEAAxkBAAIF3V7lLapay0hjMoaSaIHnwFeZluiRAALXqDEb4vwpR2jO0MwDMNdDJvprBgAEAQADAgADbQADeEUEAAEaBA";

  bot.action("comenzarTutorial", async (ctx) => {
    await ctx.deleteMessage();
    ctx.replyWithPhoto(descargarApp, {
      caption: tutorial[0],
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "AppStore",
              url:
                "https://apps.apple.com/us/app/incognito-crypto-wallet/id1475631606",
            },
            {
              text: "PlayStore",
              url:
                "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.incognito.wallet&ddl=1&pcampaignid=web_ddl_1",
            },
          ],
          [
            { text: "🏠 Volver a inicio", callback_data: "start" },
            { text: "➡️ Siguiente paso", callback_data: "segundoPaso" },
          ],
        ],
      },
      parse_mode: "Markdown",
    });
    ctx.answerCbQuery();
  });

  bot.action("segundoPaso", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithVideo(
      "BAACAgEAAxkBAAIGrl7m9xT0NtgVoF01M14Uh99y-RnyAALfAAMqaThHVeCvW0nPiQ4aBA",
      {
        caption: tutorial[1],
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Volver un paso", callback_data: "comenzarTutorial" },
              { text: "🏠 Volver al inicio", callback_data: "start" },
            ],
          ],
        },
        parse_mode: "Markdown",
      }
    );
    ctx.answerCbQuery();
  });
};
