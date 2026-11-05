# Doña Meche: del patio al poder

Abre `index.html` en un navegador. No requiere instalar paquetes ni un servidor. El guardado depende del almacenamiento local permitido por el navegador.

## Empezar

El menú principal permite entrar, empezar otra historia, cargar partidas, consultar el tutorial y ajustar el sonido. Durante la partida, Escape abre la pausa. El cuaderno, la tienda y los guardados están en la barra superior. Los menús detienen el movimiento.

Camina con WASD, flechas, clic o controles táctiles. La orientación del teclado sigue la pantalla isométrica. Haz clic en un vecino para acercarte automáticamente o pulsa E a su lado. Los edificios bloquean el paso. Los diálogos compactos usan bordes pixelados.

## Historias conectadas y pruebas

Hay cinco zonas de tamaño creciente. Cada una tiene un caso propio, dos personas implicadas, fuentes, un locutor y una autoridad que puede respaldarte. Cada acusación afecta a terceros y a la ciudad.

El primer caso trata sobre la recaudación de una fiesta. Puri señala al concejal Salcedo; una fotografía tiene un contexto que el recorte no muestra. Los documentos y una grabación permiten descubrir la responsabilidad de la tesorera Elena.

Puedes encontrar pistas hablando, recoger fotos, documentos y grabaciones del mapa, difundir una acusación inventada, usar una foto recortada, publicar las tres pruebas o aceptar un pacto para culpar a otra persona. Si investigas después de una acusación falsa, puedes rectificar con las tres pruebas.

El cuaderno guarda las pruebas, muestra la fotografía original, las noticias, las reputaciones y las consecuencias sobre las familias y los servicios del barrio. La escena muestra un cartel de cierre o recuperación según lo publicado. Para pedir el respaldo político necesitas haber difundido una historia y poner a todos los habitantes de tu lado, incluida la autoridad. Solo entonces se abre la salida a la siguiente zona.

## Tienda de Paco

Doña Meche empieza con 50 monedas. Las pistas dan 3, las pruebas 8, cada publicación 15 y el respaldo 25. Una misma acción no recompensa dos veces. El monedero y las mejoras se conservan entre zonas y en las partidas guardadas.

| Compra | Precio | Efecto |
| --- | --- | --- |
| Zapatillas de barrio | 45 | Caminar un 35 % más rápido, permanentemente |
| Cámara con zoom | 55 | Localizar la foto al entrar a cada zona; hay que recogerla |
| Libreta indiscreta | 35 | Cada pista de un testigo descubre una segunda ubicación pendiente |
| Café y perfil bajo | 12 | Reducir 16 de sospecha, consumo inmediato |
| Pastelitos para compartir | 18 | Recuperar 12 de confianza, consumo inmediato |

Un conflicto de ciudad de 55 o más encarece las ayudas consumibles un 25 %, redondeado hacia arriba. Las mejoras permanentes se compran una sola vez. No puedes comprar una ayuda sin efecto o seguir comprando después de un final.

## Guardados

Hay un autoguardado y tres espacios manuales independientes. Guardan posición, caso, pruebas, decisiones, consecuencias, monedas, mejoras, vidas, apoyos y sospechas individuales. Los registros malformados se descartan. Las horas de las partidas se muestran para Ecuador. Nueva historia reemplaza el autoguardado y conserva los espacios manuales.

## Arte y animación

Edificios, árboles y personajes secundarios usan geometría XYZ dibujada con proyección isométrica en Canvas 2D. No se descarga un motor 3D. La cámara mantiene el cuerpo de Doña Meche en el centro, incluso al entrar o cargar una zona. Cuando una casa, un árbol o la salida tapan su figura, aparece una silueta dorada recortada por el obstáculo. Las sombras transparentes no cuentan como obstáculos. Las burbujas ajustan líneas, tamaño y posición al espacio disponible, evitan el HUD y el minimapa y muestran una sola conversación ambiental a la vez en móvil. Hay ondas de rumores, destellos de aliados y transiciones de zona. Puedes reducir las animaciones en ajustes.

Doña Meche es un personaje original de 24×40 píxeles con moño gris, gafas azules, vestido floral, zapatillas y escoba. Tiene cuatro direcciones, cuatro fotogramas por dirección y gestos. `character.js` dibuja el personaje y su vista de menú. Los PNG exportados están en `assets/Characters/meche-portrait.png` y `assets/Characters/meche-walk-sheet.png`.

## Sonido y créditos

El sonido empieza activado, con la música al 12 % por defecto. Si el navegador bloquea el inicio automático, arranca con el primer clic o tecla sin pedir activarlo en ajustes. El usuario puede silenciar o activar el sonido desde Menú → Sonido y accesibilidad. Música y diálogos tienen volúmenes independientes; al ocultar la pestaña se pausan. Solo suena un tema musical a la vez: el anterior se detiene antes de arrancar el siguiente. Mientras suenan los samples del diálogo la música se pausa, y vuelve al terminar el último sample. El volumen musical recordado se limita al 15 % al abrir de nuevo para comenzar siempre bajo.

Morning acompaña la exploración; Shop, los comerciantes; Stupid Enemy, los enredos; Inconvenient Truth, las sospechas y revelaciones; Bad Boy, la caída por escándalo. Los dos samples de Dialogue se usan como sonidos breves de conversación. No son doblaje de las líneas escritas.

Los créditos de los siete archivos están dentro del juego y en `CREDITS.md`, conservando los autores de los nombres proporcionados.

## Comprobaciones

- `node tests/audio.test.cjs`: siete archivos y sus créditos, selección musical exclusiva, pausa del fondo durante diálogos, dos voces, volúmenes, silencio y reproducción bloqueada, con audio simulado.
- `node tests/browser-smoke.cjs`: abre Edge sin interfaz con un perfil temporal y un servidor exclusivamente local. Verifica teclado, recorridos, cinco mapas, menús, tutorial, pausa, guardado/carga, pruebas, acusación/rectificación, respaldo, tienda y diseño móvil. Exporta capturas a `tests/artifacts/` y los sprites a `assets/Characters/`.

El contenido y el balance siguen siendo de prototipo: las cinco historias comparten mecánicas y algunos diálogos de investigación.

## Puzle de influencias, vidas y disimulo

La campaña crece de manzana a pueblo, ciudad, país y mundo. Necesitas el apoyo de todos los personajes: 9, 11, 13, 15 y 17 personas respectivamente. El umbral individual sube de 35 a 45, 55, 65 y 80 puntos; la credibilidad exigida a los rumores sube de 40 a 80.

El mapa y el minimapa muestran conexiones entre fuentes y personas afectadas. Verde significa a tu favor; rojo, perjudicado por una acusación; ámbar, pendiente. Los personajes ganados y perjudicados cambian de color y tienen etiquetas en el cuaderno. El botón Conexiones permite ocultar la red.

Escuchar qué preocupa a una persona es seguro. Las fotos, documentos y grabaciones aportan apoyos distintos según su interés. En niveles posteriores, presentar una prueba inadecuada sin escuchar antes puede costar una vida; el riesgo se muestra antes de elegir. Los favores cuestan monedas y solo se pueden prometer una vez por persona. No se puede repetir el mismo argumento para obtener apoyo indefinidamente.

Tienes tres vidas compartidas durante la campaña. Un rechazo o una votación forzada sin todos los apoyos cuesta una vida. Al agotarlas puedes reintentar el nivel desde su punto de entrada, recuperando las mejoras que ya tenías antes de entrar. Completar un nivel recupera una vida, hasta un máximo de tres.

Cada persona conserva su propia sospecha. Las publicaciones falsas y los fallos la aumentan; las pruebas la reducen. Desde 80 % de sospecha rechaza otro rumor: debes calmarla o usar pruebas. El indicador del diálogo y las barras sobre los vecinos muestran las dudas.

Disimular permite cambiar de tema y escuchar (−18 sospecha personal y −8 tensión), o reconocer una exageración (−32 sospecha, −12 tensión y −4 influencia). También reduce parcialmente el conflicto, pero no sustituye una rectificación pública. Los gestos disponibles por persona bajan de 3 en los primeros niveles a 1 en el último. El café reduce además la sospecha de tu red, con mayor efecto en personas cercanas.

Las pruebas marcadas tienen siluetas azul claro cuando quedan detrás de edificios y conservan un marcador de ubicación, igual que la protagonista tiene su propia silueta dorada.
## Inventario y borradores

Abre **Inventario** en la barra superior o pulsa **I**. El bolso filtra documentos, fotos, audios y videos. Solo permite examinar las pruebas recogidas; las pendientes muestran cómo encontrarlas. La foto se amplía hasta el 300 %, el documento tiene su registro completo y los reproductores incluyen pausa y posición de reproducción.

Cada caso dispone de una lectura de la transcripción con voz sintetizada en español y de una recreación animada de cuatro segundos. Se identifican como lectura/recreación, ya que los assets entregados no incluían grabaciones de pruebas ni videos originales. Los archivos locales están en `assets/Evidence/`. El video se desbloquea al reunir foto y documento: es una ayuda de análisis y no una cuarta prueba necesaria para avanzar.

Al reproducir una prueba, la música y los blips se pausan. Al detenerla o cerrar el inventario, vuelve la música de la escena. El silencio general también afecta al reproductor. Las pruebas de casos anteriores se conservan en el selector de archivo; los nuevos borradores se preparan en el caso actual.

Usa **Preparar un chisme** para elegir estrategia, persona afectada, pruebas y titular. Publicar lo comprobado exige las tres pruebas y señalar al responsable del registro; un recorte requiere la foto; una acusación inventada puede prepararse sin pruebas. El borrador queda guardado con la partida. **Llevar a Radio Patio** camina hasta Beto, quien permite revisar y confirmar la publicación. Preparar el borrador por sí solo no cambia reputaciones ni consume una vida.

Comprobación específica: `node tests/browser-smoke.cjs --inventory-only`. Verifica lectura, ampliación, metadatos de los cinco audios y cinco videos, reproducción, borradores persistentes, publicación junto a Beto, archivo de casos y disposición móvil. Para regenerar los videos locales desde el código: `node tests/browser-smoke.cjs --generate-evidence`.
## Pantalla completa y HUD

El mapa ocupa toda la ventana, sin cabecera ni paneles exteriores. Las vidas, estadísticas, objetivos, minimapa, conexiones y accesos flotan sobre el escenario. El inventario, la tienda, los guardados y la pausa se abren encima del juego.

En el menú principal pulsa **Jugar a pantalla completa**. Durante la partida usa el botón **⛶** del HUD o la tecla **F** para entrar o salir. El navegador también permite salir con **Esc**. Se solicita pantalla completa para todo el documento, por lo que los menús y reproductores siguen visibles. Si el navegador no ofrece esa función, el HUD sigue ocupando toda su ventana.

En móvil, la cruceta y Hablar quedan sobre el mapa y se ocultan durante las conversaciones para no tapar las respuestas. Las burbujas evitan las posiciones del HUD y del minimapa. La resolución del lienzo se ajusta a la proporción de la pantalla.

Comprobación específica: `node tests/browser-smoke.cjs --hud-only`. Verifica pantalla completa nativa, salida, inventario dentro de pantalla completa, escritorio, móvil, orientación horizontal y rechazo controlado de la API.
## Lectura y búsqueda de vecinos

Los bocadillos ambientales usan al menos 14 píxeles reales de pantalla y ajustan sus líneas al ancho disponible. Los nombres de personas tienen etiquetas con fondo oscuro y color de estado; los lugares cercanos muestran su nombre en una placa propia. Las conversaciones y sus opciones tienen tamaños mayores, también en móvil.

Pulsa **Vecinos** en el HUD o **B** para buscar por nombre o lugar. **Localizar** empieza el recorrido automático, destaca la persona en dorado y la marca en el minimapa. Si está fuera de pantalla, aparece una flecha con su nombre. El indicador de búsqueda muestra la distancia en pasos y permite cancelar. También puedes pulsar una etiqueta del mapa para caminar hasta esa persona.

Comprobación específica: `node tests/browser-smoke.cjs --readability-only`. Comprueba los tamaños reales de texto, las etiquetas, la búsqueda, el marcador, la flecha fuera de pantalla y la disposición móvil.
