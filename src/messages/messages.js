let startMessage = `
¡Hola! Es un gusto saber que te interesa nuestro proyecto.\n*Selecciona una opción:*
`
let infoMessage = `
*Puedes darle un vistazo a nuestra página web, en donde explicamos a detalle lo que es COLE: https://cole-coin.github.io.*

Si todavía tienes dudas, puedes mandarnos un mensaje directo mediante el bot de soporte: @ColeCoinSoporteBot.

*Un poco de los desarrolladores:*
`
let tutorial = [`
¡Perfecto!
*Primero descarga Incognito Wallet*. Te dejo los links aquí abajo.

*¿No estás seguro de querer descargarla?*
- La app creará una cartera virtual que no estará asociada a ti de ninguna forma, por lo que será totalmente anónima. No te pedirá datos personales.
- Pesa solo 43MB aprox. En perspectiva, Facebook pesa 57MB, un juego en promedio pesa 100MB.
`,
  `
- En la sección de cartera, añade la moneda COLE.
- Haz click en ella y en Recibir.
- Envía un mensaje con la dirección que encontrarás.
`]
let desarrollador1 = `@SenorBinario - Soy un estudiante del Tecmilenio. Desarrollé la página web y el bot del proyecto. Soy también fundador del bot @ALaColaJovenBot. Si necesitas un bot o una página web para algún proyecto, puedes mandarme un mensaje.
`
let contacto = `
*Puedes mandarnos un mensaje directo mediante el bot de soporte: @ColeCoinSoporteBot.*
Ese bot es nuestro portal directo para comunicarnos contigo. Contestaremos tus dudas o comentarios manualmente, así que sé paciente si llegamos tardamos mucho.

*Un poco de los fundadores:*
`
let huboError = "Hubo un error... Sería muy amable de tu parte si lo reenviaras a nuestro bot de soporte @ColeCoinSoporteBot para poder analizarlo.\n\n"
let sinRecompensas = `
*¿Quieres ganar algunas recompensas?*
Comparte con tus amigos el siguiente código, y cuando ellos se registren aquí, podrán ingresarlo. ¡Cada persona que ingrese tu código significa un COLE para ti!

  Tu código es: `
let yaDimos5 = `*¡Buenas noticias!* Ya hemos mandado tus primeros 5 COLE. También te hemos mandado 0.001 PRV, que usarás para pagar los costos de las transferencias. Con 0.001 PRV podrás hacer cerca de 125,000 transacciones. Llegarán a tu cartera en un par de minutos.
*¡Muchas gracias por ser parte del proyecto!*
Si quieres recargar el saldo de tus monedas, desliza el dedo hacia abajo en la cartera.

No olvides darle un vistazo a las _/recompensas_.

¿Tienes alguna duda? Puedes contactarnos mediante el bot de soporte: @ColeCoinSoporteBot.`
let masTardeInvitacion = "Para ingresar un código de invitación primero tienes que hacer completar el tutorial que te dará tus primeras 5 monedas. ¿Quieres hacerlo de una vez?"
let masTardeRecompensa = "Para ganar recompensas por invitar amigos primero tienes que completar el tutorial y ganar tus primeras 5 monedas. ¿Quieres hacerlo?"

exports.startMessage = startMessage;
exports.infoMessage = infoMessage + desarrollador1;
exports.tutorial = tutorial;
exports.contacto = contacto + desarrollador1;
exports.huboError = huboError;
exports.sinRecompensas = sinRecompensas;
exports.yaDimos5 = yaDimos5;
exports.masTardeInvitacion = masTardeInvitacion;
exports.masTardeRecompensa = masTardeRecompensa;