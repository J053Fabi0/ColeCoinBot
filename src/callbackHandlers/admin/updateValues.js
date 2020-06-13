module.exports = (bot, db, admins) => {
  bot.hears(/update invitations/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    let user_id = Number(ctx.match.input.split(" ")[2]);
    let new_value = Number(ctx.match.input.split(" ")[3]);

    if (
      ctx.match.input.split(" ").length != 4 ||
      isNaN(user_id) ||
      isNaN(new_value)
    ) {
      bot.telegram.sendMessage(
        ctx.update.message.chat.id,
        "El uso del comando es `update invitations <user_id> <new_integer_value>`.",
        { parse_mode: "Markdown" }
      );
      return;
    }

    db.doc(user_id.toString())
      .update({
        invitations: new_value,
      })
      .then(function () {
        bot.telegram.sendMessage(
          ctx.update.message.chat.id,
          "Listo. Usa el comando `user " +
            user_id +
            "` si quieres ver los cambios.",
          { parse_mode: "Markdown" }
        );
      })
      .catch(function (error) {
        bot.telegram.sendMessage(
          ctx.update.message.chat.id,
          "Ese ID no existe en la base de datos."
        );
      });
  });

  bot.hears(/update has_invited/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    let user_id = Number(ctx.match.input.split(" ")[2]);
    let new_value = ["true", "verdadero", "1"].includes(
      ctx.match.input.split(" ")[3]
    );

    if (ctx.match.input.split(" ").length != 4 || isNaN(user_id)) {
      bot.telegram.sendMessage(
        ctx.update.message.chat.id,
        "El uso del comando es `update has_invited <user_id> <true/false>`.",
        { parse_mode: "Markdown" }
      );
      return;
    }

    db.doc(user_id.toString())
      .update({
        has_invited: new_value,
      })
      .then(function () {
        bot.telegram.sendMessage(
          ctx.update.message.chat.id,
          "Listo. Usa el comando `user " +
            user_id +
            "` si quieres ver los cambios.",
          { parse_mode: "Markdown" }
        );
      })
      .catch(function (error) {
        bot.telegram.sendMessage(
          ctx.update.message.chat.id,
          "Ese ID no existe en la base de datos."
        );
      });
  });

  bot.hears(/update address/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    let user_id = Number(ctx.match.input.split(" ")[2]);
    let new_value = ctx.match.input.split(" ")[3];

    if (
      ctx.match.input.split(" ").length != 4 ||
      isNaN(user_id) ||
      new_value.length != 103
    ) {
      bot.telegram.sendMessage(
        ctx.update.message.chat.id,
        "El uso del comando es `update address <user_id> <103_chars_long_string>`.",
        { parse_mode: "Markdown" }
      );
      return;
    }

    db.doc(user_id.toString())
      .update({
        address: new_value,
      })
      .then(function () {
        bot.telegram.sendMessage(
          ctx.update.message.chat.id,
          "Listo. Usa el comando `user " +
            user_id +
            "` si quieres ver los cambios.",
          { parse_mode: "Markdown" }
        );
      })
      .catch(function (error) {
        bot.telegram.sendMessage(
          ctx.update.message.chat.id,
          "Ese ID no existe en la base de datos."
        );
      });
  });

  bot.hears(/update/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    bot.telegram.sendMessage(
      ctx.update.message.chat.id,
      "El uso del comando es `update <address/has_invited/invitations> <user_id> <new_value>`.",
      { parse_mode: "Markdown" }
    );
  });
};

