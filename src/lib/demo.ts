import type { Game, Profile } from "./types";

export const DEMO_PROFILE: Profile = {
  name: "Miguel Soto Blanco",
  handle: "@xMiguelSBx",
  bio: "De Algeciras. Juego y dejo por escrito lo que me interesa.\n\nNocteca es mi lista de partidas con nota propia. No suelo poner notas bajas. Si entro a un juego es porque ya intuyo a qué voy y sé que no es malo. Intento ser objetivo y no defiendo compañías.",
  photo: "/demo/profile.jpg",
  location: "Algeciras (Cádiz)",
  email: "xMiguelSBx@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/miguelsb-dev" },
    { label: "Instagram", url: "https://www.instagram.com/x_miguelsb_x/" },
    { label: "X", url: "https://x.com/xMiguelSBx" },
  ],
};

export const DEMO_GAMES: Game[] = [
  {
    id: "arceus",
    title: "Pokémon Leyendas Arceus",
    platform: "Switch",
    tags: ["pokémon", "acción", "open-world"],
    cover: "/demo/covers/arceus.jpg",
    screenshots: ["/demo/screenshots/arceus/01.jpg", "/demo/screenshots/arceus/02.jpg", "/demo/screenshots/arceus/03.jpg", "/demo/screenshots/arceus/04.jpg", "/demo/screenshots/arceus/05.jpg", "/demo/screenshots/arceus/06.jpg", "/demo/screenshots/arceus/07.jpg", "/demo/screenshots/arceus/08.jpg", "/demo/screenshots/arceus/09.jpg", "/demo/screenshots/arceus/10.jpg", "/demo/screenshots/arceus/11.jpg", "/demo/screenshots/arceus/12.jpg", "/demo/screenshots/arceus/13.jpg"],
    description:
      "De mis favoritos de los últimos años y de la saga. Experiencia muy distinta; postgame increíble. 100%.",
    playedAt: "2023-08-10",
    reviewPath: "review.md",
    review: `Uno de mis juegos favoritos de los últimos años e incluso de la saga en general. Tengo la esperanza de que continúen con otro Leyendas.

Aunque no sea perfecto, la experiencia fue muy diferente a los demás juegos, y un postgame increíble. Hice el 100%.`,
    addedAt: "2023-08-10T20:00:00.000Z",
    updatedAt: "2023-08-10T20:00:00.000Z",
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    platform: "PC",
    tags: ["souls", "open-world", "fromsoftware"],
    cover: "/demo/covers/elden-ring.jpg",
    description:
      "De los que más he disfrutado. Inmenso a propósito. Mi souls fav sigue siendo DS3. Incluye SotE.",
    score: 98,
    playedAt: "2023-08-11",
    reviewPath: "review.md",
    review: `De los juegos que más he disfrutado. Para mí ningún problema en que fuera inmenso; esperé al DLC con las mismas ganas que al principal y ojalá sean muchísimas horas más. Punto malo: el reciclaje de enemigos. Mi souls fav sigue siendo DS3.

### Shadow of the Erdtree
Me pareció tanto contenido y un mapa tan nivelado que me abrumó — y mira que me gusta el juego. Aún así le bajé un poco la valoración porque siguieron reciclando algunas cosas… Radahn me lo hice al intento 40.`,
    addedAt: "2023-08-11T20:00:00.000Z",
    updatedAt: "2025-10-01T20:00:00.000Z",
  },
  {
    id: "rift-apart",
    title: "Ratchet & Clank: Rift Apart",
    platform: "PS5",
    tags: ["ratchet", "plataforma", "acción"],
    cover: "/demo/covers/rift-apart.jpg",
    description:
      "Objetivamente el mejor de la saga. Lo platiné al comprarlo. Escenarios, armas, gráficos, referencias…",
    score: 93,
    playedAt: "2026-07-30",
    reviewPath: "review.md",
    review: `### Primera pasada (2023)
Increíble; objetivamente el mejor juego de la saga. No se puede decir nada malo excepto que no han puesto Nación Aniquilación. Los escenarios, las mecánicas, las armas, la historia, los gráficos, las referencias a los primeros juegos… En su momento le di la máxima.

### Tras comprarlo y platinarlo
Me lo pasé hace tiempo (pirata) pero ahora lo compré y lo platiné. Me encantó; objetivamente diría que es el mejor. Si contara la nostalgia, el 3 de la PS2. Gráficos muy buenos, la historia decente y el gameplay te hace querer jugar más.`,
    addedAt: "2023-08-14T20:00:00.000Z",
    updatedAt: "2026-07-29T23:45:51.000Z",
  },
  {
    id: "re4-remake",
    title: "Resident Evil 4 Remake",
    platform: "PC",
    tags: ["resident-evil", "survival", "remake"],
    cover: "/demo/covers/re4-remake.jpg",
    description:
      "Mi primer RE de verdad. Hecho con cariño, bien equilibrado, no muy largo (punto positivo) y sin partes aburridas.",
    score: 90,
    playedAt: "2023-08-15",
    reviewPath: "review.md",
    review: `Nunca había jugado a un RE; solo de pasarme el mando en casa de amigos. La verdad es que me gustó mucho.

Noté que está hecho con cariño, muy bien equilibrado en cuanto a todo, no muy largo (punto positivo) pero sin partes aburridas.`,
    addedAt: "2023-08-15T20:00:00.000Z",
    updatedAt: "2023-08-15T20:00:00.000Z",
  },
  {
    id: "bdsp",
    title: "Pokémon Diamante Brillante / Perla Reluciente",
    platform: "Switch",
    tags: ["pokémon", "remake"],
    cover: "/demo/covers/bdsp.jpg",
    description:
      "El peor remake de Pokémon, encima de la mejor gen. Lo decente: combate y OST.",
    score: 40,
    playedAt: "2023-08-16",
    reviewPath: "review.md",
    review: `El peor remake de Pokémon, encima de la mejor gen. Lo único decente es el combate. Prefiero mil veces jugar al original que a uno que parece una copia mala.

La OST está bien también, aunque la de Leyendas es mucho mejor (en las mismas canciones).`,
    addedAt: "2023-08-16T20:00:00.000Z",
    updatedAt: "2023-08-16T20:00:00.000Z",
  },
  {
    id: "mh-rise",
    title: "Monster Hunter Rise + Sunbreak",
    platform: "Switch",
    tags: ["monster-hunter", "acción", "co-op"],
    cover: "/demo/covers/mh-rise.jpg",
    screenshots: ["/demo/screenshots/mh-rise/01.jpg", "/demo/screenshots/mh-rise/02.jpg", "/demo/screenshots/mh-rise/03.jpg", "/demo/screenshots/mh-rise/04.jpg", "/demo/screenshots/mh-rise/05.jpg", "/demo/screenshots/mh-rise/06.jpg", "/demo/screenshots/mh-rise/07.jpg", "/demo/screenshots/mh-rise/08.jpg", "/demo/screenshots/mh-rise/09.jpg", "/demo/screenshots/mh-rise/10.jpg", "/demo/screenshots/mh-rise/11.jpg", "/demo/screenshots/mh-rise/12.jpg", "/demo/screenshots/mh-rise/13.jpg", "/demo/screenshots/mh-rise/14.jpg", "/demo/screenshots/mh-rise/15.jpg", "/demo/screenshots/mh-rise/16.png", "/demo/screenshots/mh-rise/17.png", "/demo/screenshots/mh-rise/18.png", "/demo/screenshots/mh-rise/19.png", "/demo/screenshots/mh-rise/20.png", "/demo/screenshots/mh-rise/21.png", "/demo/screenshots/mh-rise/22.png", "/demo/screenshots/mh-rise/23.png", "/demo/screenshots/mh-rise/24.png", "/demo/screenshots/mh-rise/25.png", "/demo/screenshots/mh-rise/26.png", "/demo/screenshots/mh-rise/27.jpg"],
    description:
      "De mis sagas favoritas. Recoge muy bien lo anterior en portátil. Malzeno tier god.",
    score: 90,
    playedAt: "2023-08-27",
    reviewPath: "review.md",
    review: `De mis sagas favoritas.

Siendo el último juego para consolas portátiles, creo que ha recogido muy bien todo lo anterior. Me da pena porque siempre me ha gustado jugar al MH en portátil, pero bueno: espero que todo sea por un bien mayor. Malzeno tier god.`,
    addedAt: "2023-08-27T18:00:00.000Z",
    updatedAt: "2023-08-27T18:00:00.000Z",
  },
  {
    id: "ffxv",
    title: "Final Fantasy XV",
    platform: "PS4",
    tags: ["final-fantasy", "rpg"],
    cover: "/demo/covers/ffxv.jpg",
    description:
      "OST, historia, gráficos y aventuras con colegas. Jugabilidad mejorable.",
    score: 90,
    playedAt: "2023-08-27",
    reviewPath: "review.md",
    review: `Sólo había jugado VII, Crisis Core y otros como Dissidia o Dirge of Cerberus. Vi que mucha gente odia el XV, pero yo creo que es muy bueno.

El OST, la historia, los gráficos y vivir aventuras con colegas te hacen coger mucho cariño al juego. Jugabilidad mejorable.`,
    addedAt: "2023-08-27T21:00:00.000Z",
    updatedAt: "2023-08-27T21:00:00.000Z",
  },
  {
    id: "blasphemous",
    title: "Blasphemous",
    platform: "PC",
    tags: ["metroidvania", "pixel-art"],
    cover: "/demo/covers/blasphemous.jpg",
    screenshots: ["/demo/screenshots/blasphemous/01.jpg", "/demo/screenshots/blasphemous/02.jpg", "/demo/screenshots/blasphemous/03.jpg", "/demo/screenshots/blasphemous/04.jpg", "/demo/screenshots/blasphemous/05.jpg"],
    description:
      "Mi primer metroidvania. Doblaje al castellano, diseño, referencias y música: obra de arte. Controles, lo peor.",
    score: 85,
    playedAt: "2023-09-10",
    reviewPath: "review.md",
    review: `Los metroidvania no me llaman; este es mi primero y, aunque este estilo me siga sin gustar mucho, me ha encantado el juego.

Lo mejor: el doblaje al castellano, el diseño general, las referencias y la música… Obra de arte.
Lo peor: movilidad / controles.`,
    addedAt: "2023-09-10T20:00:00.000Z",
    updatedAt: "2023-09-10T20:00:00.000Z",
  },
  {
    id: "crisis-core-reunion",
    title: "Final Fantasy VII Crisis Core: Reunion",
    platform: "PC",
    tags: ["final-fantasy", "action-rpg", "remaster"],
    cover: "/demo/covers/crisis-core-reunion.jpg",
    screenshots: ["/demo/screenshots/crisis-core-reunion/01.jpg", "/demo/screenshots/crisis-core-reunion/02.jpg", "/demo/screenshots/crisis-core-reunion/03.jpg", "/demo/screenshots/crisis-core-reunion/04.jpg", "/demo/screenshots/crisis-core-reunion/05.jpg", "/demo/screenshots/crisis-core-reunion/06.jpg", "/demo/screenshots/crisis-core-reunion/07.jpg", "/demo/screenshots/crisis-core-reunion/08.jpg", "/demo/screenshots/crisis-core-reunion/09.jpg", "/demo/screenshots/crisis-core-reunion/10.jpg", "/demo/screenshots/crisis-core-reunion/11.jpg"],
    description:
      "Juegazo de pequeño en PSP; lo volví a sentir. Port de puta madre. De los mejores FF.",
    score: 95,
    playedAt: "2023-12-28",
    reviewPath: "review.md",
    review: `No recordaba mucho de cuando lo jugué de pequeño en la PSP, pero sabía que era un juegazo, y así lo he vuelto a sentir. Encima, un port de puta madre.

Aunque no haya jugado a muchos, no dudo que sea de los mejores FF.`,
    addedAt: "2023-12-28T20:00:00.000Z",
    updatedAt: "2023-12-28T20:00:00.000Z",
  },
  {
    id: "botw",
    title: "Zelda: Breath of the Wild",
    platform: "Switch",
    tags: ["zelda", "open-world", "aventura"],
    cover: "/demo/covers/botw.jpg",
    screenshots: ["/demo/screenshots/botw/01.jpg", "/demo/screenshots/botw/02.jpg"],
    description:
      "Increíble que esto esté en Switch. Lo empecé 3 veces y me quemó; toqué todo sin hacer el 100%.",
    score: 95,
    playedAt: "2024-01-05",
    reviewPath: "review.md",
    review: `Soy adicto al 100% en los juegos, pero en este no lo hice, aunque sí toqué todo (santuarios, kolog, golems, etc.).

Me ha gustado mucho, pero lo tuve que empezar 3 veces y eso me quemó. Por lo general es increíble que esto esté en Switch.`,
    addedAt: "2024-01-05T20:00:00.000Z",
    updatedAt: "2024-01-05T20:00:00.000Z",
  },
  {
    id: "blasphemous-2",
    title: "Blasphemous II",
    platform: "PC",
    tags: ["metroidvania", "pixel-art"],
    cover: "/demo/covers/blasphemous-2.jpg",
    screenshots: ["/demo/screenshots/blasphemous-2/01.jpg", "/demo/screenshots/blasphemous-2/02.jpg", "/demo/screenshots/blasphemous-2/03.jpg", "/demo/screenshots/blasphemous-2/04.jpg", "/demo/screenshots/blasphemous-2/05.jpg", "/demo/screenshots/blasphemous-2/06.jpg", "/demo/screenshots/blasphemous-2/07.jpg", "/demo/screenshots/blasphemous-2/08.jpg", "/demo/screenshots/blasphemous-2/09.jpg", "/demo/screenshots/blasphemous-2/10.jpg", "/demo/screenshots/blasphemous-2/11.jpg", "/demo/screenshots/blasphemous-2/12.jpg", "/demo/screenshots/blasphemous-2/13.jpg", "/demo/screenshots/blasphemous-2/14.jpg", "/demo/screenshots/blasphemous-2/15.jpg", "/demo/screenshots/blasphemous-2/16.jpg", "/demo/screenshots/blasphemous-2/17.jpg", "/demo/screenshots/blasphemous-2/18.jpg", "/demo/screenshots/blasphemous-2/19.jpg", "/demo/screenshots/blasphemous-2/20.jpg", "/demo/screenshots/blasphemous-2/21.jpg", "/demo/screenshots/blasphemous-2/22.jpg", "/demo/screenshots/blasphemous-2/23.jpg", "/demo/screenshots/blasphemous-2/24.jpg", "/demo/screenshots/blasphemous-2/25.jpg", "/demo/screenshots/blasphemous-2/26.jpg", "/demo/screenshots/blasphemous-2/27.jpg", "/demo/screenshots/blasphemous-2/28.jpg", "/demo/screenshots/blasphemous-2/29.jpg", "/demo/screenshots/blasphemous-2/30.jpg"],
    description:
      "Mejoras respecto al 1: movilidad y fluidez de combates. Diseño, pixel art, OST… 100%.",
    score: 98,
    playedAt: "2024-01-15",
    reviewPath: "review.md",
    review: `Lo mejor: las mejoras respecto al 1; ahora destacaría la movilidad y la fluidez de los combates. Por lo general, en diseño de niveles, pixel art, OST y demás, es increíble. También me hice el 100%.`,
    addedAt: "2024-01-15T18:00:00.000Z",
    updatedAt: "2024-01-15T18:00:00.000Z",
  },
  {
    id: "pokemon-purpura",
    title: "Pokémon Púrpura",
    platform: "Switch",
    tags: ["pokémon", "rpg"],
    cover: "/demo/covers/pokemon-purpura.jpg",
    screenshots: ["/demo/screenshots/pokemon-purpura/01.jpg", "/demo/screenshots/pokemon-purpura/02.jpg", "/demo/screenshots/pokemon-purpura/03.jpg", "/demo/screenshots/pokemon-purpura/04.jpg", "/demo/screenshots/pokemon-purpura/05.jpg", "/demo/screenshots/pokemon-purpura/06.jpg", "/demo/screenshots/pokemon-purpura/07.jpg", "/demo/screenshots/pokemon-purpura/08.jpg", "/demo/screenshots/pokemon-purpura/09.jpg", "/demo/screenshots/pokemon-purpura/10.jpg", "/demo/screenshots/pokemon-purpura/11.jpg", "/demo/screenshots/pokemon-purpura/12.jpg", "/demo/screenshots/pokemon-purpura/13.jpg", "/demo/screenshots/pokemon-purpura/14.jpg", "/demo/screenshots/pokemon-purpura/15.jpg", "/demo/screenshots/pokemon-purpura/16.jpg", "/demo/screenshots/pokemon-purpura/17.jpg", "/demo/screenshots/pokemon-purpura/18.jpg", "/demo/screenshots/pokemon-purpura/19.jpg"],
    description:
      "Historia y diseños bien; teras chulos. Rendimiento mal, vacíos, combates fáciles.",
    score: 70,
    playedAt: "2024-01-15",
    reviewPath: "review.md",
    review: `La historia bien, los diseños de los Pokémon también bien por lo general y la mecánica de los teras está chula.

El rendimiento mal, sin interiores, mucho espacio vacío, zonas de campo totalmente iguales y combates fáciles; los entrenadores random, pereza.`,
    addedAt: "2024-01-15T20:00:00.000Z",
    updatedAt: "2024-01-15T20:00:00.000Z",
  },
  {
    id: "metroid-prime-remastered",
    title: "Metroid Prime Remastered",
    platform: "Switch",
    tags: ["metroid", "fps", "aventura"],
    cover: "/demo/covers/metroid-prime-remastered.jpg",
    description:
      "Pedazo de juego. Diseño de niveles, arte y música muy buenos. Sin teleports se hace largo.",
    score: 80,
    playedAt: "2024-01-15",
    reviewPath: "review.md",
    review: `Es un pedazo de juego. Para tenerlo todo tienes que romperte la cabeza si vas sin guía. El diseño de niveles, de arte y musical es muy bueno.

Yo me llevo muy mal con tener que ir de un sitio a otro sin teleports y tardar 30 min entre zonas.`,
    addedAt: "2024-01-15T22:00:00.000Z",
    updatedAt: "2024-01-15T22:00:00.000Z",
  },
  {
    id: "dmc5",
    title: "Devil May Cry 5",
    platform: "PC",
    tags: ["devil-may-cry", "acción", "combo"],
    cover: "/demo/covers/dmc5.jpg",
    description:
      "Lo terminé con el DLC de Vergil. Demasiado chulo; worth it. Me lo rejugareé con los demás.",
    score: 95,
    playedAt: "2024-01-19",
    reviewPath: "review.md",
    review: `Me lo empecé varias veces con Nero / V / Dante, pero al final me lo he terminado haciendo con el DLC de Vergil jajaja. Está demasiado chulo; me dará un ataque al corazón presionando botones, pero worth it. Me lo rejugareé con los demás.`,
    addedAt: "2024-01-19T20:00:00.000Z",
    updatedAt: "2024-01-19T20:00:00.000Z",
  },
  {
    id: "ff7-remake",
    title: "Final Fantasy VII Remake",
    platform: "PS5",
    tags: ["final-fantasy", "rpg", "remake"],
    cover: "/demo/covers/ff7-remake.jpg",
    description:
      "Experiencia de diez en su momento. Tras Rebirth, la valoré distinto.",
    score: 75,
    playedAt: "2024-01-29",
    reviewPath: "review.md",
    review: `Las alteraciones en la historia respecto al original deben de ser parte de algo canon; se verá en Rebirth, así que perfecto. Luego los gráficos, cinemáticas, los detalles de cada parte de cada poblado, etc.

Fue una experiencia de diez. Tras Rebirth, bajé su valoración para dejar el techo a ese.`,
    addedAt: "2024-01-29T20:00:00.000Z",
    updatedAt: "2026-01-07T20:00:00.000Z",
  },
  {
    id: "plza",
    title: "Pokémon Leyendas ZA",
    platform: "Switch",
    tags: ["pokémon", "acción"],
    cover: "/demo/covers/plza.jpg",
    screenshots: ["/demo/screenshots/plza/01.jpg", "/demo/screenshots/plza/02.jpg", "/demo/screenshots/plza/03.jpg", "/demo/screenshots/plza/04.jpg", "/demo/screenshots/plza/05.jpg", "/demo/screenshots/plza/06.jpg", "/demo/screenshots/plza/07.jpg", "/demo/screenshots/plza/08.jpg", "/demo/screenshots/plza/09.jpg", "/demo/screenshots/plza/10.jpg", "/demo/screenshots/plza/11.jpg", "/demo/screenshots/plza/12.jpg", "/demo/screenshots/plza/13.jpg", "/demo/screenshots/plza/14.jpg", "/demo/screenshots/plza/15.jpg", "/demo/screenshots/plza/16.jpg", "/demo/screenshots/plza/17.jpg"],
    description:
      "+70 h / 100%. Personajes muy buenos; combate raro; música muy buena.",
    score: 80,
    playedAt: "2025-10-25",
    reviewPath: "review.md",
    review: `+70 horas / 100%:
- Pokédex & Megadex
- Tareas de Melia
- Misiones principales y secundarias
- Tornillos coloridos

Personajes muy buenos, historia no muy impactante, buen mapeado pero soso y poco variado estéticamente, el combate es algo raro, la música muy buena.`,
    addedAt: "2025-10-25T20:00:00.000Z",
    updatedAt: "2025-10-25T20:00:00.000Z",
  },
  {
    id: "ffxvi",
    title: "Final Fantasy XVI",
    platform: "PS5",
    tags: ["final-fantasy", "action-rpg"],
    cover: "/demo/covers/ffxvi.jpg",
    description:
      "Arranque flojo; a mitad ya con cariño. Historia muy compleja, música en su línea, final perfecto.",
    score: 90,
    playedAt: "2026-01-04",
    reviewPath: "review.md",
    review: `(Fallo mío haberlo empezado después del Rebirth.) Aún así, las primeras 10 horas no me estaba enganchando, pero poco a poco, sobre mitad del juego, ya le estaba cogiendo cariño.

La historia muy muy buena y de las más complejas; la música en su línea. Final perfecto.`,
    addedAt: "2026-01-04T18:00:00.000Z",
    updatedAt: "2026-01-04T18:00:00.000Z",
  },
  {
    id: "links-awakening",
    title: "Zelda: Link's Awakening",
    platform: "Switch",
    tags: ["zelda", "aventura", "remake"],
    cover: "/demo/covers/links-awakening.jpg",
    screenshots: ["/demo/screenshots/links-awakening/01.jpg", "/demo/screenshots/links-awakening/02.jpg"],
    description:
      "No jugué al original. Estilo artístico muy bonito; fácil mecánicamente.",
    score: 80,
    playedAt: "2026-01-04",
    reviewPath: "review.md",
    review: `No jugué al original. Lo noté un poco «deberías de probar a ver qué pasa si le echas sal a las plantas»; alguna cosa tuve que mirarla en la guía por agilizar.

Estilo artístico muy bonito, la música está chula. Es bastante fácil mecánicamente.`,
    addedAt: "2026-01-04T20:00:00.000Z",
    updatedAt: "2026-01-04T20:00:00.000Z",
  },
  {
    id: "metroid-prime-4",
    title: "Metroid Prime 4: Beyond",
    platform: "Switch",
    tags: ["metroid", "fps", "aventura"],
    cover: "/demo/covers/metroid-prime-4.jpg",
    screenshots: ["/demo/screenshots/metroid-prime-4/01.jpg", "/demo/screenshots/metroid-prime-4/02.jpg", "/demo/screenshots/metroid-prime-4/03.jpg", "/demo/screenshots/metroid-prime-4/04.jpg"],
    description:
      "Me ha gustado; se siente algo distinto. Música y gameplay increíbles; el desierto, nefasto.",
    score: 80,
    playedAt: "2026-01-04",
    reviewPath: "review.md",
    review: `Mi favorito es el 3, aunque sé que el 1 está hecho con manos de cirujano. Este me ha gustado por lo general, pero sí es cierto que se siente algo diferente la experiencia.

La música es increíble, como el gameplay; lo del desierto ha sido nefasto.`,
    addedAt: "2026-01-04T22:00:00.000Z",
    updatedAt: "2026-01-04T22:00:00.000Z",
  },
  {
    id: "dragons-dogma-2",
    title: "Dragon's Dogma II",
    platform: "PC",
    tags: ["rpg", "acción", "open-world"],
    cover: "/demo/covers/dragons-dogma-2.jpg",
    description:
      "Experiencia singleplayer bastante única; a veces de comedia. Clases chulas. Entretenido.",
    score: 70,
    playedAt: "2026-01-07",
    reviewPath: "review.md",
    review: `Es un buen juego; puede ser hasta un juego de comedia por las cosas que te pasan. Es bastante única la experiencia singleplayer.

La historia no está mal, la música muy normal, y las clases muy chulas con sus ataques especiales. Es entretenido.`,
    addedAt: "2026-01-07T18:00:00.000Z",
    updatedAt: "2026-01-07T18:00:00.000Z",
  },
  {
    id: "ff7-rebirth",
    title: "Final Fantasy VII Rebirth",
    platform: "PS5",
    tags: ["final-fantasy", "rpg", "remake"],
    cover: "/demo/covers/ff7-rebirth.jpg",
    description:
      "Me tocó la fibra. Música, arte, guion, personajes, paisajes…",
    score: 100,
    playedAt: "2026-01-07",
    reviewPath: "review.md",
    review: `Hoy día es difícil sorprenderme con un juego o que me toque la fibra de alguna forma, pero este lo ha hecho. Música, arte, guion, personajes, paisajes y sus ciudades… No tengo espacio para más.

Al Remake le bajé la valoración para dejarle el techo a este.`,
    addedAt: "2026-01-07T20:00:00.000Z",
    updatedAt: "2026-01-07T20:00:00.000Z",
  },
  {
    id: "dq1-hd2d",
    title: "Dragon Quest I HD-2D",
    platform: "PC",
    tags: ["dragon-quest", "rpg", "hd-2d"],
    cover: "/demo/covers/dq1-hd2d.jpg",
    screenshots: ["/demo/screenshots/dq1-hd2d/01.jpg", "/demo/screenshots/dq1-hd2d/02.jpg", "/demo/screenshots/dq1-hd2d/03.jpg", "/demo/screenshots/dq1-hd2d/04.jpg", "/demo/screenshots/dq1-hd2d/05.jpg", "/demo/screenshots/dq1-hd2d/06.jpg", "/demo/screenshots/dq1-hd2d/07.jpg", "/demo/screenshots/dq1-hd2d/08.jpg", "/demo/screenshots/dq1-hd2d/09.jpg", "/demo/screenshots/dq1-hd2d/10.jpg", "/demo/screenshots/dq1-hd2d/11.jpg", "/demo/screenshots/dq1-hd2d/12.jpg"],
    description:
      "Mi primer DQ. Muy buena dirección de arte; complicado; da pie al segundo.",
    score: 92,
    playedAt: "2026-01-07",
    reviewPath: "review.md",
    review: `Mi primer DQ. Muy buena dirección de arte, diseño de mazmorras, de ciudades, de personajes. Es bastante complicado y hay que levelear bien.

La música es bonita pero poco variada. Me gusta cómo termina y da pie al segundo juego.`,
    addedAt: "2026-01-07T22:00:00.000Z",
    updatedAt: "2026-01-07T22:00:00.000Z",
  },
  {
    id: "albw",
    title: "Zelda: A Link Between Worlds",
    platform: "3DS",
    tags: ["zelda", "aventura", "puzles"],
    cover: "/demo/covers/albw.jpg",
    description:
      "Puzles muy bien; lo más lioso es saber a dónde ir. El final, para quedarse.",
    score: 86,
    playedAt: "2026-01-19",
    reviewPath: "review.md",
    review: `Completado al 100% (obvio miré cosas en guías), pero me ha dado una vibe rara en general.

Los puzles están muy bien; lo más lioso es saber a dónde ir. El diseño de monstruos y personajes, y sobre todo el final, me ha encantado.`,
    addedAt: "2026-01-19T20:00:00.000Z",
    updatedAt: "2026-01-19T20:00:00.000Z",
  },
  {
    id: "fe-awakening",
    title: "Fire Emblem: Awakening",
    platform: "3DS",
    tags: ["fire-emblem", "táctica", "rpg"],
    cover: "/demo/covers/fe-awakening.jpg",
    description:
      "Mi primer FE. Tablero de táctica con estilo anime, historia muy buena y relaciones que escalan.",
    score: 96,
    playedAt: "2026-02-03",
    reviewPath: "review.md",
    review: `Mi primer Fire Emblem. Me ha encantado: no esperaba que me gustara tanto combinar un tablero de táctica con un estilo anime.

Historia muy buena, la relación escalable entre personajes y la progresión de clases son geniales. El final es complicado.`,
    addedAt: "2026-02-03T20:00:00.000Z",
    updatedAt: "2026-02-03T20:00:00.000Z",
  },
  {
    id: "inazuma-eleven",
    title: "Inazuma Eleven",
    platform: "NDS",
    tags: ["inazuma", "rpg", "fútbol"],
    cover: "/demo/covers/inazuma-eleven.jpg",
    description:
      "Primera vez con un Inazuma. Historia increíble y una forma distinta de meter el fútbol en un videojuego.",
    score: 94,
    playedAt: "2026-02-15",
    reviewPath: "review.md",
    review: `Primera vez con un Inazuma y, aunque sea de hace casi 20 años, no se me ha hecho ni pesado ni aburrido: más bien todo lo contrario.

La historia es increíble y me ha gustado bastante esta forma diferente de implementar el fútbol en un videojuego.`,
    addedAt: "2026-02-15T20:00:00.000Z",
    updatedAt: "2026-02-15T20:00:00.000Z",
  },
  {
    id: "oras",
    title: "Pokémon Rubí Omega",
    platform: "3DS",
    tags: ["pokémon", "rpg", "remake"],
    cover: "/demo/covers/oras.jpg",
    description:
      "Remake que no pierde lo bueno de la tercera gen. Mapa, vuelo libre, megas, postgame.",
    score: 90,
    playedAt: "2026-02-27",
    reviewPath: "review.md",
    review: `Jugué de pequeño a los tres de Game Boy y este nunca lo había terminado.

Es un remake perfecto: no ha perdido lo bueno que tenía la tercera generación. Bien hecha la banda sonora, el mapa, el vuelo libre, las megas y el postgame. Mi segunda gen favorita.`,
    addedAt: "2026-02-27T20:00:00.000Z",
    updatedAt: "2026-02-27T20:00:00.000Z",
  },
  {
    id: "pokopia",
    title: "Pokémon Pokopia",
    platform: "Switch",
    tags: ["pokémon", "spin-off"],
    cover: "/demo/covers/pokopia.jpg",
    screenshots: ["/demo/screenshots/pokopia/01.jpg", "/demo/screenshots/pokopia/02.jpg", "/demo/screenshots/pokopia/03.jpg", "/demo/screenshots/pokopia/04.jpg", "/demo/screenshots/pokopia/05.jpg", "/demo/screenshots/pokopia/06.jpg", "/demo/screenshots/pokopia/07.png", "/demo/screenshots/pokopia/08.png"],
    description:
      "El mejor spin-off de Pokémon. Historia de las mejores de la saga; te deja entre alegría y tristeza.",
    score: 92,
    playedAt: "2026-03-27",
    reviewPath: "review.md",
    review: `El mejor spin-off de Pokémon. Hay cosas mejorables de eficiencia.

La historia es una de las mejores de Pokémon y realmente me dejó con un cuerpo raro entre alegría y tristeza. Ahora adoro aún más a los Pokémon y se merecen lo mejor. Me ha encantado.`,
    addedAt: "2026-03-27T20:00:00.000Z",
    updatedAt: "2026-03-27T20:00:00.000Z",
  },
  {
    id: "platinum",
    title: "Pokémon Platino",
    platform: "NDS",
    tags: ["pokémon", "rpg"],
    cover: "/demo/covers/platinum.jpg",
    description:
      "Después de 400 h de chico. Ambientación, jazz, lore, Liga, Helio, Mundo Distorsión. Para mí, perfecto.",
    score: 100,
    playedAt: "2026-05-26",
    reviewPath: "review.md",
    review: `Después de echarle 400 h de chico, pensaba que lo tenía sobrevalorado por la nostalgia. No.

La ambientación, el jazz, los legendarios, los diseños, el lore, la Liga, Helio, el Mundo Distorsión… Será mejorable, pero para mí ha sido y será perfecto.`,
    addedAt: "2026-05-26T20:00:00.000Z",
    updatedAt: "2026-05-26T20:00:00.000Z",
  },
  {
    id: "oot-3d",
    title: "Zelda: Ocarina of Time 3D",
    platform: "3DS",
    tags: ["zelda", "aventura", "remake"],
    cover: "/demo/covers/oot-3d.jpg",
    screenshots: ["/demo/screenshots/oot-3d/01.jpg", "/demo/screenshots/oot-3d/02.jpg", "/demo/screenshots/oot-3d/03.jpg", "/demo/screenshots/oot-3d/04.jpg", "/demo/screenshots/oot-3d/05.jpg", "/demo/screenshots/oot-3d/06.jpg", "/demo/screenshots/oot-3d/07.jpg", "/demo/screenshots/oot-3d/08.jpg", "/demo/screenshots/oot-3d/09.jpg", "/demo/screenshots/oot-3d/10.jpg", "/demo/screenshots/oot-3d/11.jpg", "/demo/screenshots/oot-3d/12.jpg", "/demo/screenshots/oot-3d/13.jpg", "/demo/screenshots/oot-3d/14.jpg", "/demo/screenshots/oot-3d/15.jpg", "/demo/screenshots/oot-3d/16.jpg", "/demo/screenshots/oot-3d/17.jpg", "/demo/screenshots/oot-3d/18.jpg", "/demo/screenshots/oot-3d/19.jpg", "/demo/screenshots/oot-3d/20.jpg", "/demo/screenshots/oot-3d/21.jpg", "/demo/screenshots/oot-3d/22.jpg"],
    description:
      "Muy buen juego. Cámara y fijado a enemigos, lo peor. Valorado hoy:",
    score: 89,
    playedAt: "2026-06-25",
    reviewPath: "review.md",
    review: `Muy buen juego. La cámara (aunque original) y el fijado a enemigos fueron lo peor.

Entiendo que para la época estuviera años adelantado y fuera un 10, pero después de haber jugado muchos juegos y valorándolo hoy le doy un 8,9, que no está mal.`,
    addedAt: "2026-06-25T20:00:00.000Z",
    updatedAt: "2026-06-25T20:00:00.000Z",
  },
  {
    id: "inazuma-eleven-2",
    title: "Inazuma Eleven 2",
    platform: "NDS",
    tags: ["inazuma", "rpg", "fútbol"],
    cover: "/demo/covers/inazuma-eleven-2.jpg",
    description:
      "Casi igual que el primero en gameplay; la historia menos interesante, aunque mejora al final.",
    score: 83,
    playedAt: "2026-07-02",
    reviewPath: "review.md",
    review: `Prácticamente igual que el primero en gameplay y gráficos, exceptuando la historia: me ha parecido menos interesante y demasiado fumadón en ciertos puntos, aunque mejora al final.

De igual forma me ha gustado bastante.`,
    addedAt: "2026-07-02T20:00:00.000Z",
    updatedAt: "2026-07-02T20:00:00.000Z",
  },
  {
    id: "inazuma-eleven-3",
    title: "Inazuma Eleven 3: Lightning Bolt",
    platform: "3DS",
    tags: ["inazuma", "rpg", "fútbol"],
    cover: "/demo/covers/inazuma-eleven-3.jpg",
    description:
      "Se nota la mejora general. Más cinemáticas y texto; la historia de este es muy buena.",
    score: 96,
    playedAt: "2026-07-12",
    reviewPath: "review.md",
    review: `Se nota la mejora general, aunque en mecánicas y gameplay sigue siendo igual. Hay correcciones de calidad de vida que se agradecen.

Me gusta que haya más cinemáticas y más texto. La historia de este es muy buena.`,
    addedAt: "2026-07-12T20:00:00.000Z",
    updatedAt: "2026-07-12T20:00:00.000Z",
  },
  {
    id: "metal-gear-rising",
    title: "Metal Gear Rising: Revengeance",
    platform: "PC",
    tags: ["metal-gear", "acción", "hack-and-slash"],
    cover: "/demo/covers/metal-gear-rising.jpg",
    description:
      "Mejora mucho a partir de la mitad. Combos fluidos, buena duración, música perfecta y speeches con trasfondo.",
    score: 82,
    playedAt: "2026-08-17",
    reviewPath: "review.md",
    review: `Mejora mucho a partir de la mitad; el principio es algo lento. La fluidez de combos y el combate, igual. Los personajes son buenos.

Punto positivo: la duración — no hay que extender si no hay motivo. La música es perfecta y el trasfondo / los speeches también.`,
    addedAt: "2026-08-17T01:11:47.000Z",
    updatedAt: "2026-08-17T01:11:47.000Z",
  }
];
