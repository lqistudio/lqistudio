/**
 * LOQUIVERSO — Datos de lore, cronología, easter eggs e idioma.
 * Igual que characters.js: para añadir una entrada nueva, copia
 * un bloque existente, edítalo y guarda. No hace falta tocar HTML.
 */

const LOQUIVERSO_LORE = [
  {
    id: "esferion",
    title: "Esférion",
    summary: "El mundo donde ocurre la historia.",
    body: "Esférion es un mundo habitado por seres esféricos y otros habitantes, hoy afectados por una anomalía intergaláctica. El mundo puede romper sus propias reglas visuales: los personajes pueden deformarse, quedar aplastados en 2D, salir disparados, explotar o sufrir accidentes caricaturescos sin que la escena tenga que obedecer a una física realista."
  },
  {
    id: "antes-de-la-anomalia",
    title: "Antes de la anomalía",
    summary: "La situación previa al desastre.",
    body: "Esférion vive en relativa paz. LoQui y sus amigos desarrollan su vida como streamers y creadores dentro de su propio mundo."
  },
  {
    id: "la-anomalia",
    title: "La anomalía intergaláctica",
    summary: "Qué ocurrió.",
    body: "Una anomalía intergaláctica rompe la paz de Esférion y provoca un glitch perpetuo que altera progresivamente la realidad. Está vinculada a Lord Umbral, quien utiliza su poder para corromper mundos."
  },
  {
    id: "rayo-gamma",
    title: "El rayo gamma",
    summary: "Cómo atravesó Esférion.",
    body: "Como parte del fenómeno, un rayo gamma atraviesa Esférion. La energía no solo cambia físicamente a sus habitantes: también puede alterar objetos, habilidades, estructuras, reglas visuales e incluso las letras y la gramática del mundo."
  },
  {
    id: "glitch-perpetuo",
    title: "El glitch perpetuo",
    summary: "Cómo empezó a alterar la realidad.",
    body: "El glitch no es un evento instantáneo: deja una alteración permanente en Esférion. No debe sentirse solamente como una enfermedad o una tecnología, sino como una alteración de la realidad capaz de convertir algo cotidiano en algo absurdo, romper la lógica de una escena o hacer que un elemento gráfico se vuelva parte de la historia."
  },
  {
    id: "transformaciones",
    title: "Transformaciones",
    summary: "Cómo afectó a los habitantes.",
    body: "El rayo cambió cuerpos, habilidades, objetos y comportamientos: El Tren se convirtió en tabla de skate, Lady Lumina en un foco luminoso, ALLuKa adoptó rasgos de dragón, y LoQui recibió el rayo por completo, desarrollando la espada glitcheada y la capacidad de replicar poderes ajenos."
  },
  {
    id: "corrupcion",
    title: "Corrupción",
    summary: "Cómo Lord Umbral puede extender la alteración.",
    body: "Lord Umbral puede extender el glitch a otros mundos mediante su poder. Su látigo puede despertar o corromper criaturas esféricas, convirtiéndolas en zombis-esfera glitcheados."
  },
  {
    id: "mundo-de-lqi",
    title: "El mundo de LQI",
    summary: "Cómo el glitch comienza a afectar al creador.",
    body: "La anomalía alcanza un nivel meta: LoQui puede alterar el mundo de LQI, su creador. LQI existe fuera de Esférion como la persona que crea y dibuja su mundo, pero la frontera entre creador y creación empieza a fallar. Una de las primeras señales es la firma artística: LQI normalmente firma como LQI, pero la alteración hace que aparezca λθι. LoQui puede reconocer que algo está mal porque la firma de su creador ha cambiado — y con ello, empieza a tener la capacidad de afectar el mundo de quien lo creó."
  }
];

const LOQUIVERSO_TIMELINE = [
  { order: 1, title: "Esférion antes de la anomalía", body: "Esférion vive en relativa paz. LoQui y sus amigos desarrollan su vida como streamers y creadores." },
  { order: 2, title: "Aparición de la anomalía", body: "Aparece un fenómeno intergaláctico relacionado con Lord Umbral." },
  { order: 3, title: "El rayo gamma", body: "Atraviesa Esférion y altera a sus habitantes." },
  { order: 4, title: "Transformación de los habitantes", body: "El Tren se convierte en tabla de skate, Lumina en foco, ALLuKa adopta rasgos de dragón, entre otros." },
  { order: 5, title: "Aparición y acción de Lord Umbral", body: "Utiliza el glitch para corromper mundos y despertar zombis-esfera glitcheados." },
  { order: 6, title: "Expansión del glitch", body: "Las letras y la gramática de Esférion empiezan a alterarse." },
  { order: 7, title: "Aparición de los poderes", body: "Los habitantes afectados desarrollan habilidades vinculadas a su nueva forma." },
  { order: 8, title: "LoQui desarrolla su anomalía", body: "Recibe el rayo por completo, adquiere la espada glitcheada y la capacidad de replicar los poderes de sus amigos cuando están cerca." },
  { order: 9, title: "El glitch alcanza el mundo de LQI", body: "La anomalía llega hasta el creador y comienza a tocar su mundo." },
  { order: 10, title: "Alteración de la firma: LQI → λθι", body: "Señal de que el mundo de la creación está tocando el mundo del creador." },
  { order: 11, title: "Eventos posteriores del cómic", body: "La historia continúa. Prólogo: Cosas varias presenta a LoQui y Lord Umbral." }
];

const LOQUIVERSO_EASTER_EGGS = [
  {
    id: "tontos-con-suerte",
    name: "Tontos con suerte",
    description: "Un nombre que aparece escondido en algún punto de Esférion — en una pared, cartel, objeto, grafiti o pantalla, sin explicación."
  },
  {
    id: "tren-tres-teresa",
    name: "Tren / Tres / Teresa",
    description: "El Tren odia que le cambien el nombre. Si LoQui dice \"Tres\", Tren responde \"Cuatro\"; si dice \"Teresa\", puede responder \"Casandra\"."
  },
  {
    id: "jugadas-accidentales",
    name: "Jugadas accidentales",
    description: "Un personaje puede realizar una maniobra espectacular por accidente y luego intentar repetirla conscientemente, provocando un desastre o un autogol."
  },
  {
    id: "accidente-planificado",
    name: "El \"accidente planificado\"",
    description: "Durante una pelea puede romperse algo que aparentemente estaba planeado, aunque en realidad sea un accidente. Los personajes pueden fingir que estaba bajo control."
  },
  {
    id: "luces-del-cielo",
    name: "Las luces del cielo",
    description: "A El Tren le fascinan las luces del cielo y puede hacer comentarios conspirativos sobre ellas."
  },
  {
    id: "botarga-de-pollo",
    name: "La botarga de pollo",
    description: "Una versión animal/furro puntual de LoQui, sin que esto cambie que LoQui no es furro en el canon principal."
  },
  {
    id: "explosiones-random",
    name: "Explosiones por puro timing",
    description: "Un objeto cualquiera puede caerse y explotar durante una pelea o una escena normal, sin explicación. Lord Umbral también puede tropezarse y explotar."
  },
  {
    id: "construcciones-de-los-hermanos",
    name: "Las construcciones de los hermanos",
    description: "Las estructuras que Roh construye pueden provocar el miedo de El Tren a las alturas y las rampas."
  }
];

/**
 * AET_HARMONY — sistema de escritura de LQISTUDIO.
 * Se documenta como referencia visual del glitch, no como un
 * manual completo para el lector casual.
 */
const LOQUIVERSO_AET_HARMONY = {
  intro: "El proyecto de lenguaje de LQISTUDIO se documenta como AET_HARMONY, un sistema de escritura secreta que transforma el español mediante símbolos, prefijos, transiciones y funciones gramaticales. Dentro del Loquiverso funciona como referencia visual de la gramática alterada por el glitch: no hace falta explicarlo por completo cada vez que aparece — los símbolos son señales de que la realidad está siendo modificada.",
  signature: {
    original: "LQI",
    corrupted: "λθι",
    note: "La alteración de la firma habitual de LQI es una de las señales de que el glitch ha alcanzado el mundo del creador. El lenguaje también puede formar parte de la anomalía."
  },
  elements: [
    { label: "Minúsculas", value: "prefijo ψ-l" },
    { label: "Números", value: "β-N#" },
    { label: "Notas musicales", value: "símbolos ψ" },
    { label: "Sustantivo", value: "Σ-ν" },
    { label: "Verbo", value: "V-ψ" },
    { label: "Adjetivo", value: "∆-λ" },
    { label: "Fin de frase", value: "Ω-χ" },
    { label: "Transiciones", value: "δ, ξ, ρ" }
  ],
  source: "AET_HARMONY, Libro Sagrado de Aprendizaje, creado por LQI | cb4s_ | LQISTUDIO — lqistudio.com"
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    LOQUIVERSO_LORE,
    LOQUIVERSO_TIMELINE,
    LOQUIVERSO_EASTER_EGGS,
    LOQUIVERSO_AET_HARMONY
  };
}
