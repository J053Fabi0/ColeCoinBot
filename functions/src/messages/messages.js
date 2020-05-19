let startMessage = `
¡Hola! Es un gusto saber que te interesa nuestro proyecto.\n*Selecciona una opción:*
`
let infoMessage = `
*Puedes darle un vistazo a nuestra página web, en donde explicamos a detalle lo que es COLE: https://cole-coin.github.io.*

Si todavía tienes dudas, puedes mandarnos un mensaje directo mediante el bot de soporte: @ColeCoinBot.

*Un poco de los desarrolladores:*
`
let tutorial = [`
*¡Perfecto!*
Primero descarga *Incognito Wallet*. Te dejo los links aquí abajo.

*¿No estás seguro de querer descargarla?*
- La app creará una cartera virtual que no estará asociada a ti de ninguna forma, por lo que será totalmente anónima. No te pedirá datos personales.
- Pesa solo 43MB aprox. En perspectiva, Facebook pesa 57MB, un juego en promedio pesa 100MB.
`,
`
- En la sección de cartera, añade la moneda COLE.
- Haz click en ella y en Recibir.
- Comparte con nosotros tu dirección.
`]
let desarrollador1 = `@SenorBinario - Soy un estudiante del Tecmilenio. Desarrollé la página web y el bot del proyecto. Soy también fundador del bot @ALaColaJovenBot. Si necesitas un bot o una página web para algún proyecto, puedes mandarme un mensaje.
`
let contacto = `
*Puedes mandarnos un mensaje directo mediante el bot de soporte: @ColeCoinBot.*
Ese bot es nuestro portal directo para comunicarnos contigo. Contestaremos tus dudas o comentarios manualmente, así que sé paciente si llegamos tardamos mucho.

*Un poco de los fundadores:*
`

exports.startMessage = startMessage;
exports.infoMessage = infoMessage+desarrollador1;
exports.tutorial = tutorial;
exports.contacto = contacto+desarrollador1;