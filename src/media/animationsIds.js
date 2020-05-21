const perroComputadora = "CgACAgEAAxkBAAIGmF55k0OqKrdjzMvUHoOR_P1xZs9NAAKNAAMji9FHugvrX92_itsYBA"
const pixel = "CgACAgEAAxkBAAIVE16NWaCtEPwDEGHnCuHlfMcHvt4-AAKPAANsUGlEE5mrf9xDviIYBA"
const niñoComputadora = "CgACAgEAAxkBAAIVF16NXFvB_u6ndJF-JG7GtJr64Zw8AAKxAAOH-2hEg65LMopnEEUYBA"
const señorHaciendoTrampa = "CgACAgEAAxkBAAIVHV6NXfP2R1bpqDY8vMAaCIdRl1erAAK-AAMOmnFEldZBFGZDhfAYBA"
const esperandoComputadoraAnimada = "CgACAgEAAxkBAAIWQ16UmnPUY8D9r1TBaLS0SHUwXbjAAAKIAAPDbahE9_kE19mOqgYYBA"
const gatoComputadora = "CgACAgEAAxkBAAIVIV6NXipMbd0kEBm-rxDlhmlmogfxAAJuAANnPGlEQ4epoWVw5V0YBA"
const presionandoF5 = "CgACAgEAAxkBAAIVI16NXmEFFeg8FMfdumk-Qkl-aaItAAJvAANnPGlE8zxu0FvcE04YBA"
const señorPantalones = "CgACAgEAAxkBAAIVJV6NXl0AAWZNa2gsgwpsOfJTOyTWCwACcAADZzxpROcqbqq6N-UXGAQ"
const perroEsperando = "CgACAgEAAxkBAAIVJ16NXnKxCesM-BhmY_PBv0-JD2fmAAJxAANnPGlEW4zzbNlTkgABGAQ"
const osoEsperando = "CgACAgEAAxkBAAIVKV6NXquBgm1-3AWJ5AIbN_eaRdV2AAL9AAPefHBEaZYBHfXl9IoYBA"
const gifsTrabajando = [perroComputadora, pixel, niñoComputadora, señorHaciendoTrampa, esperandoComputadoraAnimada, gatoComputadora, presionandoF5, señorPantalones, perroEsperando, osoEsperando]

const videotutorial = "CgACAgEAAxkBAAIJZV5-CKf0ExO25FzmkFo06aZo9ljBAALaAAOmZilFAtWz8hES_YkYBA"

const notificacionesAndroid = "CgACAgEAAxkBAAIJil5-H7FP-_Hcg4zwSJ4ePjMQ-zG0AAJ_AAMCJPFHdVRee3g4xtsYBA"
const notificacionesiOS = "CgACAgEAAxkBAAIJnF5-J-GGSmTIrvnGWfIc8aJP-XSzAAKAAAMCJPFHF5O3L-PVxYAYBA"

const accesorapidoios = "CgACAgEAAxkBAAIKRV5-yccIjApVEyvHgZYKx1r4IQonAALhAAN03flHYlNV91NAs9oYBA"
const accesorapidoandroid = "CgACAgEAAxkBAAIJ4l5-N_7Mgr3ZdWREQTn4GfIv1Da5AALRAAN03flHni2c7QdHcKAYBA"
const anclarmensajeandroid = "CgACAgEAAxkBAAIJ-V5-QbrkbtJcgAW0WCCXluBsTRXoAAKMAAP4dvFHUDUm4dlASboYBA"

// ####################################################################################### //

function getRantomGif(gifs) {
  return gifs[Math.floor(Math.random() * gifs.length)];
}

exports.gifTrabajando = getRantomGif(gifsTrabajando);

exports.videotutorial = videotutorial

exports.notificacionesAndroid = notificacionesAndroid
exports.notificacionesiOS = notificacionesiOS

exports.accesorapidoios = accesorapidoios
exports.accesorapidoandroid = accesorapidoandroid
exports.anclarmensajeandroid = anclarmensajeandroid