module.exports = (bot, db) => {
    bot.hears(/12(.){101}/, async ctx => {
        let user_id = ctx.update.message.from.id;
        let address = ctx.match[0];
        
        let response = "Usuario no encontrado";
        
        db.findOne({ _id: user_id }, (err, doc) => {
            if (!doc) {
                const new_user = { 
                    address: address, 
                    invitations: 0, 
                    has_invited: false,
                    _id: user_id
                }
                
                db.insert(new_user, async (err, newDoc) => {
                    
                    await ctx.reply("*¡Listo!* Recibirás 5 COLE en cuanto tengamos tiempo de mandarlos.\nTe avisaremos con un mensaje aquí cuando lo hayamos hecho.", {parse_mode: "Markdown"});
                    ctx.reply("*Si tienes un código de invitación, es el momento de enviarlo.*\n¿Qué es un código de invitación?\nPuedes usar el comando /recompensas para obtener más información y el tuyo propio.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", {parse_mode: "Markdown"});

                    bot.telegram.sendMessage(-1001482751413, "*5 COLE a " + user_id + "* : `" + address + "`", {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '☝️ Yo lo hago', callback_data: "listo " + user_id },
                                ]
                            ]
                        },
                        parse_mode: "Markdown"
                    });
                })
            }
            else { // Si el usuario ya ha sido encontrado
                ctx.reply("<b>Hmm... Con esta cuenta de Telegram ya has pedido 5 COLEs.\n\n¿Estás intentando conseguir 5 COLEs para un amigo? <u>¡Pues es tu oportunidad de ganar una recompensa!</u></b> Usa el comando /recompensas para conocer más.\n\n¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.", { parse_mode: "HTML" })
            }
        });
    })
}
