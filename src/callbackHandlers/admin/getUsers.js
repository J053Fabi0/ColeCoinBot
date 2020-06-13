module.exports = (bot, db, admins) => {
  bot.hears(/\buser/i, async (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    let user_id = Number(ctx.match.input.split(" ")[1]);

    if (isNaN(user_id)) {
      // Si no puse un user_id
      db.find({}, (err, doc) => {
        let users = "";
        doc.forEach((user) => {
          users = users + JSON.stringify(user, null, 1) + "\n";
        });
        ctx.reply("`" + users + "`*" + doc.length + " total users.*", {
          parse_mode: "Markdown",
        });
      });
    } else {
      // Si puse un user_id en el texto
      const userInfo = await db
        .doc(user_id.toString())
        .get()
        .then(function (user) {
          if (user.exists) {
            return "`" + JSON.stringify(user.data(), null, 1) + "`";
          } else {
            return "El usuario con ese id no existe";
          }
        });

      await bot.telegram.sendMessage(ctx.update.message.chat.id, userInfo, {
        parse_mode: "Markdown",
      });
    }
  });
};
