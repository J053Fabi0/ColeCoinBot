module.exports = (bot, db, admins) => {
  bot.hears(/\baddUser\b/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next()
      return
    }
    
    let user_id = Number(ctx.match.input.split(" ")[1]);
    let address = ctx.match.input.split(" ")[2];
    
    if (ctx.match.input.split(" ").length != 3 || isNaN(user_id) || address.length != 103) {
      ctx.reply("El uso del comando es `addUser <user_id> <address_103_chars_long>`.", { parse_mode: "Markdown" })
      return
    }
    else {
      const new_user = { 
        address: address, 
        invitations: 0, 
        has_invited: false,
        _id: user_id
      }

      db.insert(new_user, (err, newUser) => {
        ctx.reply("*Usuario añadido con éxito:*\n\n`" + JSON.stringify(newUser, null, 1) + "`", { parse_mode : "Markdown" })
      })
    }
  })
}