module.exports = (bot, db, admins) => {
  bot.hears(/deleteUser/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    let user_id = Number(ctx.match.input.split(" ")[1]);

    if (!isNaN(user_id)) {
      db.doc(user_id.toString())
        .delete()
        .then(async function () {
          await bot.telegram.sendMessage(
            ctx.update.message.chat.id,
            "Se ha eliminado el usuario de la base de datos correctamente."
          );
          // const findOneUser = require("./findOneUser");
          // ctx.reply(await findOneUser(user_id, db));
        });
    } else {
      ctx.reply("El uso del comando es `delete <user_id>`.", {
        parse_mode: "Markdown",
      });
    }
  });
};

