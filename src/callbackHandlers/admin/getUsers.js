module.exports = (bot, db, admins) => {
  const fsLibrary = require("fs");

  bot.hears(/\buser/i, async (ctx, next) => {
    if (!admins.includes(ctx.update.message.from.id)) {
      next();
      return;
    }

    let user_id = Number(ctx.match.input.split(" ")[1]);

    if (isNaN(user_id)) {
      // Si no puse un user_id
      let data = "";
      db.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = data + (doc.id + " => " + doc.data().address) + "\n";
        });
        fsLibrary.writeFile(
          process.env.PWD + "/getUsers.txt",
          data,
          (error) => {
            if (error) {
              console.log(`Hubo un error: ${error}`);
            } else {
              // console.log(process.env.PWD);
              console.log(process.env.PWD + "/getUsers.txt");
              bot.telegram.sendDocument(
                ctx.update.message.chat.id,
                process.env.PWD + "/getUsers.txt"
              );

              // fsLibrary.readFile("getUsers.txt", (error, txtString) => {
              //   if (error) {
              //     console.log(`Hubo un error: ${error}`);
              //   } else {
              //     // console.log(txtString.toString());
              //   }
              // });
            }
          }
        );
      });
      // db;
      // db.find({}, (err, doc) => {
      //   let users = "";
      //   doc.forEach((user) => {
      //     users = users + JSON.stringify(user, null, 1) + "\n";
      //   });
      //   ctx.reply("`" + users + "`*" + doc.length + " total users.*", {
      //     parse_mode: "Markdown",
      //   });
      // });
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
