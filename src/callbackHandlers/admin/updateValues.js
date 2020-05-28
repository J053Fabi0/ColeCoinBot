module.exports = (bot, db, admins) => {
  bot.hears(/update invitations/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next()
      return
    }
    
    let user_id = Number(ctx.match.input.split(" ")[2]);
    let new_value = Number(ctx.match.input.split(" ")[3]);
    
    if (ctx.match.input.split(" ").length != 4 || (isNaN(user_id) || isNaN(new_value))) {
      ctx.reply("El uso del comando es `update invitations <user_id> <new_integer_value>`.", {parse_mode: "Markdown"})
      return
    }
    
    db.update( { _id : user_id }, { $set : { invitations : new_value } }, {returnUpdatedDocs: true}, (err, numberAffected, user) => {
      ctx.reply("`" + JSON.stringify(user, null, 1) + "`", { parse_mode : "Markdown" })
    })
  })
  
  bot.hears(/update has_invited/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next()
      return
    }
    
    let user_id = Number(ctx.match.input.split(" ")[2]);
    let new_value = ["true", "verdadero", "1"].includes(ctx.match.input.split(" ")[3]);
    
    if (ctx.match.input.split(" ").length != 4 || isNaN(user_id)) {
      ctx.reply("El uso del comando es `update has_invited <user_id> <true/false>`.", {parse_mode: "Markdown"})
      return
    }
    
    db.update( { _id : user_id }, { $set : { has_invited : new_value } }, {returnUpdatedDocs: true}, (err, numberAffected, user) => {
      ctx.reply("`" + JSON.stringify(user, null, 1) + "`", { parse_mode : "Markdown" })
    })
  })
  
  bot.hears(/update address/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next()
      return
    }
    
    let user_id = Number(ctx.match.input.split(" ")[2]);
    let new_value = ctx.match.input.split(" ")[3];
    
    if (ctx.match.input.split(" ").length != 4 || isNaN(user_id) || new_value.length != 103) {
      ctx.reply("El uso del comando es `update address <user_id> <103_chars_long_string>`.", {parse_mode: "Markdown"})
      return
    }
    
    db.update( { _id : user_id }, { $set : { address : new_value } }, {returnUpdatedDocs: true}, (err, numberAffected, user) => {
      ctx.reply("`" + JSON.stringify(user, null, 1) + "`", { parse_mode : "Markdown" })
    })
  })
  
  bot.hears(/update/i, (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next()
      return
    }
    
    ctx.reply("El uso del comando es `update <address/has_invited/invitations> <user_id> <new_value>`.", {parse_mode: "Markdown"})
  })
}