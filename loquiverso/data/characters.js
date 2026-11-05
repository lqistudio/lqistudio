/**
 * LOQUIVERSO — Base de datos de personajes
 * ------------------------------------------------------------
 * Para agregar un personaje nuevo:
 *   1. Copia el bloque de plantilla al final de este archivo.
 *   2. Rellena los campos. Si algo no está definido en el lore,
 *      usa el string "Por definir" — nunca inventes contenido.
 *   3. Coloca sus imágenes en assets/characters/<id>/
 *   4. Guarda. No necesitas tocar ningún archivo HTML.
 *
 * El resto del sitio (tarjetas, buscador, filtros, página
 * individual, relaciones) se genera automáticamente a partir
 * de este arreglo.
 * ------------------------------------------------------------
 */

const LOQUIVERSO_CHARACTERS = [
  {
    id: "loqui",
    name: "LoQui",
    alias: "Streamer de Esférion",
    category: "Protagonista",
    status: "Activo",
    image: "assets/characters/loqui/main.webp",
    gallery: [
      { src: "assets/characters/loqui/glitch.webp", alt: "LoQui con su espada glitcheada" },
      { src: "assets/characters/loqui/alt-form.webp", alt: "LoQui con la botarga de pollo" }
    ],
    shortDescription: "Esfera streamer, adaptable y curiosa, que recibió el rayo gamma por completo.",
    description: "LoQui es un personaje esférico de estilo cartoon que vive en Esférion y transmite su vida como streamer junto a su grupo de amigos. Representa la adaptabilidad y la capacidad de aprender cosas muy distintas entre sí.",
    personality: ["Creativo", "Expresivo", "Curioso", "Hablador", "Impulsivo"],
    powers: [
      "Recibió el rayo gamma por completo: puede replicar los poderes de sus amigos afectados por la anomalía, con un porcentaje superior al de ellos.",
      "Regla: no puede duplicar un poder si el amigo correspondiente no está cerca — su verdadero potencial depende de la conexión con su grupo.",
      "Espada glitcheada: una manifestación propia de LoQui que no depende de tener a un amigo cerca."
    ],
    relationships: [
      { character: "lord-umbral", type: "Némesis" },
      { character: "el-tren", type: "Amigo" },
      { character: "lady-lumina", type: "Amiga" },
      { character: "ancho", type: "Amiga" },
      { character: "alluka", type: "Amiga" },
      { character: "fur", type: "Amigo" },
      { character: "roh", type: "Amigo" },
      { character: "laura", type: "Vínculo meta" }
    ],
    lore: "LoQui es el punto donde el glitch se vuelve algo más que una transformación física: es el único habitante capaz de percibir la alteración de LQI, su creador, y reconocer cambios que el resto de Esférion no notaría.",
    easterEggs: [
      "Al intentar copiar el poder de Ancho, la anomalía no produce invocación animal — genera una interpretación absurda: la botarga de pollo. LoQui no es furro; es un gag y una versión especial dentro de la historia."
    ],
    appearances: ["Cosas varias (prólogo)"]
  },
  {
    id: "lord-umbral",
    name: "Lord Umbral",
    alias: "Tirano de la corrupción",
    category: "Enemigo",
    status: "Activo",
    image: "assets/characters/lord-umbral/main.webp",
    gallery: [
      { src: "assets/characters/lord-umbral/nave.webp", alt: "La nave de Lord Umbral: una papa frita" }
    ],
    shortDescription: "Esfera maligna con bigote, bufanda y sombrero de copa. Su nave es una papa frita.",
    description: "Esfera maligna con bigote frondoso, oculta bajo una bufanda blanca y naranja. Lleva sombrero de copa con listón rojo y tiene una voz ronca y grave. Fachada de tirano cruel, arrogante, dominante y teatral, convencido de estar destinado a gobernar.",
    personality: ["Arrogante", "Teatral", "Dramático", "Inseguro (bajo la fachada)"],
    powers: [
      "Látigo capaz de despertar zombis-esfera glitcheados y corromper mundos.",
      "Puede extender el glitch a otros mundos."
    ],
    relationships: [
      { character: "loqui", type: "Némesis" },
      { character: "lady-lumina", type: "Reacciona a sus colores" }
    ],
    lore: "Su motivación real es buscar respeto y aceptación: su ansia de poder es una máscara para una inseguridad profunda. Cuando recibe respeto o amabilidad genuina, aparece Luziel — un lado sensible, tierno, inseguro y exageradamente agradecido — que no tolera mantener por mucho tiempo antes de destruir el momento al sentirse expuesto. Puede ser una amenaza real y, al mismo tiempo, tropezarse o explotar accidentalmente por un gag de caricatura, sin dejar de ser peligroso.",
    easterEggs: [
      "Su nave es, deliberadamente, una papa frita.",
      "Puede tropezarse y explotar sin razón aparente, incluso en medio de una escena dramática."
    ],
    appearances: ["Cosas varias (prólogo)"]
  },
  {
    id: "el-tren",
    name: "El Tren",
    alias: "Tren / Tres / Teresa",
    category: "Aliado",
    status: "Activo",
    image: "assets/characters/el-tren/main.webp",
    gallery: [],
    shortDescription: "Convertido en tabla de skate por la anomalía. Rockero, torpe y le teme a las alturas.",
    description: "Tras el rayo gamma, adoptó la forma de una tabla de skate. Es creativo, expresivo y apasionado por la música y el rock, con una mezcla de seguridad, torpeza y humor.",
    personality: ["Apasionado", "Torpe", "Seguro de sí mismo", "Con humor propio"],
    powers: ["Por definir"],
    relationships: [
      { character: "loqui", type: "Amigo" },
      { character: "roh", type: "Sus construcciones le dan miedo" }
    ],
    lore: "Tiene ruedas, pero no sabe usarlas bien — muchas veces corre con sus pies como si fuera una criatura normal. Siente rechazo o miedo hacia construcciones altas y rampas, sobre todo cuando los gemelos las crean. Le fascinan las luces del cielo y suele hacer comentarios conspirativos sobre ellas.",
    easterEggs: [
      "Odia que LoQui le cambie el nombre: si LoQui dice \"Tres\", Tren responde \"Cuatro\"; si dice \"Teresa\", puede responder \"Casandra\".",
      "La tabla de skate es un guiño a una historia real que el cómic no necesita contar."
    ],
    appearances: []
  },
  {
    id: "lady-lumina",
    name: "Lady Lumina",
    alias: "",
    category: "Aliado",
    status: "Activo",
    image: "assets/characters/lady-lumina/main.webp",
    gallery: [],
    shortDescription: "Antes una esfera; tras el rayo, un foco luminoso que expresa emociones con color.",
    description: "Amigable, juguetona y expresiva. Capaz de ayudar o trolear al grupo por igual.",
    personality: ["Amigable", "Juguetona", "Expresiva"],
    powers: ["Puede expresar sus emociones cambiando el color de la luz de su cuerpo."],
    relationships: [
      { character: "loqui", type: "Amiga" },
      { character: "lord-umbral", type: "Ciertos colores alteran su actitud" }
    ],
    lore: "Sus emociones son visibles: puede revelar lo que siente sin necesidad de explicarlo verbalmente. De forma rara e inconstante, determinados colores de su luz pueden desestabilizar la fachada de Lord Umbral.",
    easterEggs: [],
    appearances: []
  },
  {
    id: "ancho",
    name: "Ancho",
    alias: "",
    category: "Aliado",
    status: "Activo",
    image: "assets/characters/ancho/main.webp",
    gallery: [],
    shortDescription: "El contrapeso normal del grupo. Cariñosa, paciente y capaz de llamar animales.",
    description: "Persona normal dentro del mundo de Esférion — no es furro. Súper amigable, cariñosa y paciente; suele soportar las tonterías de sus amigos.",
    personality: ["Cariñosa", "Paciente", "Realista frente al caos"],
    powers: [
      "Puede llamar animales: mapache, zorrillo, tlacuache, marmota, geko y pato.",
      "Cuando LoQui copia su poder, no se produce invocación animal — se produce la botarga de pollo como interpretación glitch."
    ],
    relationships: [
      { character: "loqui", type: "Amiga" }
    ],
    lore: "Suele ver venir el desastre, intenta advertir al grupo y, aun así, termina involucrada.",
    easterEggs: [],
    appearances: []
  },
  {
    id: "alluka",
    name: "ALLuKa",
    alias: "",
    category: "Aliado",
    status: "Activo",
    image: "assets/characters/alluka/main.webp",
    gallery: [],
    shortDescription: "Esfera verde con alas de dragón. Artista fascinada por el terror y las criaturas extrañas.",
    description: "Curiosa, imaginativa y artista. Ante algo monstruoso o perturbador, su primera reacción suele ser interés artístico en lugar de miedo.",
    personality: ["Artista", "Curiosa", "Imaginativa"],
    powers: ["Por definir"],
    relationships: [
      { character: "loqui", type: "Amiga" }
    ],
    lore: "Puede olvidar cosas que hizo días antes, generando situaciones en las que el resto del grupo tiene que recordarle sus propias acciones. Su imaginación puede llevarla a probar ideas extrañas sin medir del todo las consecuencias.",
    easterEggs: [],
    appearances: []
  },
  {
    id: "fur",
    name: "Fur",
    alias: "",
    category: "Aliado",
    status: "Activo",
    image: "assets/characters/fur/main.webp",
    gallery: [],
    shortDescription: "Crea personajes a través de su arte. Hermano de Roh.",
    description: "Imaginativo, creativo y muy orientado a la creación de personajes.",
    personality: ["Imaginativo", "Creativo"],
    powers: ["Puede crear personajes mediante su arte; dependiendo de la escena, esas creaciones pueden materializarse y enfrentarse a Lord Umbral."],
    relationships: [
      { character: "roh", type: "Hermano" },
      { character: "loqui", type: "Amigo" }
    ],
    lore: "Para Fur, un dibujo no es solo una imagen: puede ser el comienzo de una criatura que existe.",
    easterEggs: [],
    appearances: []
  },
  {
    id: "roh",
    name: "Roh",
    alias: "",
    category: "Aliado",
    status: "Activo",
    image: "assets/characters/roh/main.webp",
    gallery: [],
    shortDescription: "Construye el entorno con arte urbano. Hermano de Fur.",
    description: "Creativo, experimental y con una relación muy natural con el espacio que lo rodea.",
    personality: ["Creativo", "Experimental"],
    powers: ["Puede usar grafiti para generar edificaciones, estructuras y elementos del entorno; lo que dibuja puede volverse parte física del escenario."],
    relationships: [
      { character: "fur", type: "Hermano" },
      { character: "el-tren", type: "Sus construcciones le provocan miedo" }
    ],
    lore: "Roh ve Esférion como un lienzo que todavía puede modificarse.",
    easterEggs: [],
    appearances: []
  },
  {
    id: "laura",
    name: "Laura",
    alias: "El chat",
    category: "Otros",
    status: "Activo",
    image: "assets/characters/laura/main.webp",
    gallery: [],
    shortDescription: "No tiene cuerpo ni voz convencional. Representa al chat y al público.",
    description: "Laura representa la interacción del público en los streams: no tiene cuerpo, voz ni forma física convencional. Su existencia se percibe principalmente desde la perspectiva de LQI/LoQui — para el resto de personajes, no necesariamente existe de la misma manera.",
    personality: ["Presencia meta", "Interviene sin aparecer"],
    powers: ["Puede intervenir en el mundo desde una lógica meta, incluso ayudando a LoQui en momentos extremos, sin necesidad de aparecer físicamente."],
    relationships: [
      { character: "loqui", type: "Vínculo meta" }
    ],
    lore: "Laura pertenece a una capa meta de la historia: es el público convertido en una presencia narrativa sin cuerpo, capaz de influir en la interpretación y en situaciones del mundo.",
    easterEggs: [],
    appearances: []
  }

  /* ------------------------------------------------------------
   * PLANTILLA — copia este bloque para un personaje nuevo
   * ------------------------------------------------------------
  ,{
    id: "id-en-minusculas-y-guiones",
    name: "Nombre visible",
    alias: "",
    category: "Protagonista | Aliado | Enemigo | Habitante | Creador | Otros",
    status: "Activo | Por definir",
    image: "assets/characters/id/main.webp",
    gallery: [
      { src: "assets/characters/id/otra.webp", alt: "Descripción para accesibilidad" }
    ],
    shortDescription: "Una frase corta para la tarjeta.",
    description: "Descripción completa del personaje.",
    personality: ["Rasgo 1", "Rasgo 2"],
    powers: ["Por definir"],
    relationships: [
      { character: "id-de-otro-personaje", type: "Amigo" }
    ],
    lore: "Por definir",
    easterEggs: [],
    appearances: []
  }
  */
];

// Categorías reconocidas por el sistema de filtros (personajes.html)
const LOQUIVERSO_CATEGORIES = [
  "Protagonista",
  "Aliado",
  "Enemigo",
  "Habitante",
  "Creador",
  "Otros"
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LOQUIVERSO_CHARACTERS, LOQUIVERSO_CATEGORIES };
}
