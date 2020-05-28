const findOneUser = require('./findOneUser')

module.exports = (bot, db, admins) => {
  bot.hears(/\buser/i, async (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next()
      return
    }
    
    let user_id = Number(ctx.match.input.split(" ")[1]);
    
    if (isNaN(user_id)) { // Si no puse un user_id 
      db.find({}, (err, doc) => {
          let users = "";
          doc.forEach(user => {
            users = users + JSON.stringify(user, null, 1) + "\n"
          })
          ctx.reply("`" + users + "`*" + doc.length + " total users.*", { parse_mode : "Markdown" })
        }) 
    }
    else { // Si puse un user_id en el texto
      ctx.reply( await findOneUser(user_id, db), {parse_mode: "Markdown"})
    }
  })
  
}