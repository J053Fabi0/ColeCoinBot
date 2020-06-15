module.exports = (bot, db, admins) => {
  const updateValues = require("./updateValues");
  updateValues(bot, db, admins);

  const getUsers = require("./getUsers");
  getUsers(bot, db, admins);

  const deleteUser = require("./deleteUser");
  deleteUser(bot, db, admins);

  const addUser = require("./addUser");
  addUser(bot, db, admins);

  bot.hears(/admin/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next(ctx);
      return;
    }
    let instrucciones =
      "*Borrar usuario:* `deleteUser <user_id>`.\n" +
      "*Añadir usuario:* `addUser <user_id> <address_103_chars_long>`.\n" +
      "*Cambiar datos de un usuario:* `update <address/has_invited/invitations> <user_id> <new_value>`.\n" +
      "*Ver datos de un usuario:* `user <user_id>`.\n" +
      "*Ver todos los usuarios:* `user`.\n";
    ctx.reply(instrucciones, { parse_mode: "Markdown" });
  });
};

