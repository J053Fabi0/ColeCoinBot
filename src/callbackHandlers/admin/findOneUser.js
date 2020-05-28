module.exports = (user_id, db) => {
  return new Promise((resolve, reject) =>{
    db.findOne({ _id : user_id }, (err, user) => {
      if (err) {
        return reject(err)
      }

      if (user) {
        return resolve("`" + JSON.stringify(user, null, 1) + "`", { parse_mode : "Markdown" })
      } else {
        return resolve("El usuario con ese id no existe")
      }
    })
  })
}