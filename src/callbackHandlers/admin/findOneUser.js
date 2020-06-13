module.exports = (user_id, db) => {
  return new Promise((resolve, reject) => {
    db.where("id", "==", user_id.toString())
      .get()
      .then((user) => {
        if (user) {
          return resolve("`" + JSON.stringify(user, null, 1) + "`", {
            parse_mode: "Markdown",
          });
        } else {
          return resolve("El usuario con ese id no existe");
        }
      });
  });
};

