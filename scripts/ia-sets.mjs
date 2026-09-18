/**
 * ============================================================================
 *  SETS DE ILUSTRACIÓN GENERADA — definiciones
 * ============================================================================
 *
 *  Todo el "arte" de esto vive acá: las biblias de estilo, los tonos y el
 *  encuadre de cada lámina. El generador (`generate-ia.mjs`) no sabe nada de
 *  diseño, solo ejecuta lo que esté en este archivo.
 *
 *  Tres reglas que atraviesan todos los prompts:
 *
 *   1. NADA DE TEXTO en la imagen. Los rótulos se ponen en HTML: se pueden
 *      corregir, traducir y leer con lector de pantalla, y no dependemos de
 *      que el modelo escriba bien en español.
 *   2. NADA DE FOTORREALISMO. Es el punto entero del ejercicio, y además una
 *      ilustración no se puede confundir con una foto de un proyecto que
 *      todavía no está construido.
 *   3. La paleta es la del manual de marca, con sus hex exactos. Sin eso cada
 *      lámina sale de un mundo distinto.
 * ============================================================================
 */

/** Los seis colores oficiales (docs/02-paleta-colores.md). */
export const PALETTE = {
  grafito: "#1F2328",
  oliva: "#31463A",
  verde: "#839485",
  arena: "#E9E3DB",
  ocre: "#FFB035",
  terracota: "#8C5338",
};

/**
 * El mundo que se dibuja. Es común a los dos estilos: sin esto el modelo
 * inventa una casita rústica de techo a dos aguas, que es lo contrario de lo
 * que el cliente construye.
 */
const SUBJECT = `
SUBJECT WORLD — always the same place:
A gated residential development on the desert coast of southern Peru (Punta de Bombon, Arequipa province), two minutes from a small town and two minutes from the Pacific.
Architecture is CONTEMPORARY and restrained: simple white cubic volumes with FLAT roofs and parapets, large square openings, dark stone-clad base walls, slatted wood pergolas and slatted wood fences, cobbled paved streets, low clipped hedges.
NEVER draw pitched roofs, clay roof tiles, thatch, adobe cottages, colonial or mediterranean architecture, skyscrapers or apartment blocks.
Landscape: flat coastal desert, irrigated green farm fields, distant low dry hills, the Pacific ocean on the horizon, bougainvillea in bloom, a few low palms.
People, when present, are small, calm and integrated into the scene. Never the subject, never a close-up face, never a posed model.
`.trim();

/** Prohibiciones comunes. Se repiten en cada lámina a propósito. */
const NEGATIVE = `
HARD CONSTRAINTS:
No lettering, no text, no numbers, no signage, no labels, no watermark, no logo of any kind.
No photorealism, no 3D render, no CGI, no depth-of-field blur, no lens flare, no glossy highlights, no drop shadows.
No modern vector-app gloss, no gradient meshes, no neon.
`.trim();

/**
 * Encuadre. Sin esto el modelo dibuja la lámina flotando dentro de un marco de
 * papel, que en una banda a sangre de la web se ve como un error.
 */
const BLEED = `
FRAMING: full bleed. The illustration fills the entire frame edge to edge. No paper border, no white frame, no rounded corners, no drop shadow around the artwork, no mockup of a printed sheet.
`.trim();

/**
 * Las viñetas se ven a 64-80 px. Si el dibujo flota pequeño en medio de la
 * lámina, en la página no se ve nada: tiene que llenar el cuadro.
 */
const VIGNETTE = `
FRAMING: one single object group, CENTRED and LARGE — it must fill roughly 85% of the frame, touching close to all four edges, with only a thin even margin. Do not draw it small in the middle of a big empty field.
Flat, uniform paper background behind it and nothing else: no scene, no horizon, no frame, no border, no circle or badge behind the object, no cast shadow on the paper.
Drawn as a small isometric or three-quarter view, simple enough to read at 64 pixels.
`.trim();

/* ==========================================================================
   Los dos estilos
   ========================================================================== */

export const STYLES = {
  riso: {
    id: "riso",
    label: "Risografía",
    hint: "Impresión a dos tintas sobre papel de fibra. Artesanal y sobria.",
    /** Lámina que se genera primero y sirve de referencia a todas las demás. */
    seed:
      "A wide calm view of the gated development's cobbled main street: white flat-roofed houses with slatted wood pergolas, a stone base wall, low hedges, a couple of low palms, dry hills far behind.",
    seedAspect: "16:9",
    bible: `
STYLE — two-colour risograph print:
Ink printed on warm sand-coloured toothy paper (${PALETTE.arena}), the bare paper acting as the lightest value.
Exactly TWO inks and nothing else: ochre (${PALETTE.ocre}) and graphite (${PALETTE.grafito}).
Coarse visible halftone dot texture. Real paper grain with fibre specks. Slight plate misregistration, the two inks offset by a millimetre or two. Uneven ink coverage with light patches and roller streaks.
Hand-cut rounded shapes. Confident contour lines of irregular weight, drawn not traced.
Flat colour only, texture comes from the halftone, never from shading.
Overall feel: an editorial illustration in a printed architecture brochure. Calm, understated, made by a person. Not advertising.
`.trim(),
  },

  retro: {
    id: "retro",
    label: "Cartel de verano",
    hint: "Afiche de turismo mid-century. Alegre, geométrico y llamativo.",
    seed:
      "A bold poster view of the development seen from the beach side: a big low sun, flat stylised waves, white flat-roofed houses among palms, long geometric shadows across the sand.",
    seedAspect: "16:9",
    bible: `
STYLE — mid-century silkscreen travel poster, 1955-1965:
In the manner of vintage national-park and airline tourism posters. Screenprinted on sand-coloured paper (${PALETTE.arena}).
Limited flat palette, ONLY these inks: ochre (${PALETTE.ocre}), terracotta (${PALETTE.terracota}), calm sage green (${PALETTE.verde}), deep olive (${PALETTE.oliva}), graphite (${PALETTE.grafito}).
Bold simplified geometry, hard edges, large flat shapes, a big graphic sun, long stylised shadows, flat stacked waves and cloud shapes, stylised radiating light.
Subtle screenprint texture: slight ink overlap where two colours cross, visible paper tooth, edges very slightly out of register. Gently faded, as if printed sixty years ago.
Flat colour only, no shading, no blends.
Overall feel: optimistic, warm, a little playful, designed to be seen from across a room.
`.trim(),
  },
};

/* ==========================================================================
   Los tres tonos
   --------------------------------------------------------------------------
   El cliente elige en el configurador. Solo se aplican a las láminas donde el
   tono realmente se ve: en una viñeta de 80 px de una parrilla, la diferencia
   entre "sobrio" y "con humor" no existe.
   ========================================================================== */

export const TONES = {
  sobrio: {
    id: "sobrio",
    label: "Sobrio",
    hint: "Sin personas ni anécdota. Arquitectura, paisaje y objetos.",
    modifier:
      "TONE: no people, no pets, no narrative incident. Architecture, landscape and objects only. Quiet and matter-of-fact, like a technical brochure with taste.",
  },
  calido: {
    id: "calido",
    label: "Cálido",
    hint: "Un par de señales de vida: una toalla, una bici, un perro.",
    modifier:
      "TONE: one or two small signs of life, noticed rather than staged — a towel left over a chair, a bicycle leaning on a wall, a dog asleep in the shade, a child's float ring on the ground. Warm and human. Never a joke, never a punchline.",
  },
  humor: {
    id: "humor",
    label: "Con humor",
    hint: "Un guiño gracioso en la escena. Encantador, nunca payaso.",
    modifier:
      "TONE: include one gentle, charming visual joke in the scene — for example a pelican that has claimed the best sun lounger, a dog in sunglasses supervising the barbecue, a surfboard reused as a garden gate, a cat asleep in a planter. Endearing and dry. Never slapstick, never a caricature of a person, never a cartoon mascot.",
  },
};

/* ==========================================================================
   Las láminas
   ========================================================================== */

/**
 * `toned: true`  → se genera una versión por cada tono.
 * `toned: false` → una sola, compartida por los tres.
 */
export const SLOTS = [
  {
    id: "manifiesto",
    aspect: "16:9",
    toned: true,
    alt: "Vista general ilustrada de Residencial Aonami",
    prompt:
      "Wide establishing view of the whole gated development from a low rise: the entry portico at one end, cobbled streets lined with white flat-roofed houses, the central cluster of amenities with a rectangular pool and a stone club house, irrigated green fields around the perimeter fence, the ocean far behind.",
  },
  {
    id: "financiamiento",
    aspect: "4:3",
    toned: true,
    alt: "Ilustración de un plano del proyecto sobre una mesa de trabajo",
    prompt:
      "Overhead view of a wooden work table: an unrolled site plan of the development held down at the corners, a scale ruler, a set of keys on a wooden fob, a small white cardboard model of a flat-roofed house, a cup of coffee.",
  },
  {
    id: "contacto",
    aspect: "4:3",
    toned: true,
    alt: "Ilustración del pórtico de ingreso al condominio",
    prompt:
      "The entrance portico of the development seen straight on: a cantilevered flat canopy, a gate of vertical wood slats standing open, a small control booth, bougainvillea spilling over the stone wall, the paved road arriving from the left. Late afternoon.",
  },
  {
    id: "mapa",
    aspect: "21:9",
    toned: false,
    alt: "Mapa ilustrado: el pueblo, el proyecto y la playa",
    prompt:
      "A simple wayfinding map strip read left to right, drawn flat and diagrammatic from above: a small coastal town on the left, a paved road running right, the gated development in the middle drawn as a simplified block plan, the road continuing, and the beach with breaking waves on the right. A dashed route line links the three. Purely pictorial, absolutely no lettering or numbers anywhere.",
  },
  {
    id: "separador",
    aspect: "21:9",
    toned: false,
    alt: "Banda ilustrada con palmeras, cerco de listones y mar",
    prompt:
      "A quiet horizontal band, like a decorative rule across a page: the crowns of a few low palms, the top of a slatted wood fence, bougainvillea, and a thin strip of flat ocean behind. Mostly empty sky. Nothing in the centre of interest, it is a divider.",
  },
];

/**
 * Las diez amenidades como viñetas. Reemplazan los iconos genéricos de la
 * librería: es el uso más rentable del set, diez dibujos pequeños del mismo
 * pulso valen más que diez iconos que tiene todo el mundo.
 */
export const AMENITY_SLOTS = [
  ["piscina", "a rectangular swimming pool with a wooden deck, two loungers and a parasol"],
  ["club-house", "a low stone-walled club house with an open wooden terrace and a flat roof"],
  ["fogatas", "a circular fire pit ringed by curved benches on sand, with a small flame"],
  ["parrillas", "a wooden pergola over a masonry barbecue and a picnic table"],
  ["portico", "an entrance portico: a cantilevered flat canopy over an open slatted wood gate, with a small booth"],
  ["fronton", "a single tall handball court wall seen at an angle, with a painted floor line and a ball"],
  ["juegos", "a children's play structure: a small tower with a slide and two swings"],
  ["multiusos", "a flat sports court seen at an angle with a basketball hoop and painted line markings"],
  ["vias", "a short stretch of cobbled street with a kerb, a pedestrian crossing and a street lamp"],
  ["cerco", "a run of vertical slatted wood perimeter fence with a hedge at its base"],
].map(([slug, subject]) => ({
  id: "am-" + slug,
  aspect: "1:1",
  toned: false,
  amenity: slug,
  alt: "Ilustración de la amenidad: " + slug.replace("-", " "),
  vignette: true,
  prompt:
    "A single small pictorial vignette, drawn as one simple object group with no background scene beyond a suggestion of ground: " +
    subject +
    ". Keep it simple enough to read clearly at 80 pixels wide.",
}));

export const ALL_SLOTS = [...SLOTS, ...AMENITY_SLOTS];

/** Arma el prompt final de una lámina. */
export function buildPrompt(style, slot, tone) {
  const parts = [STYLES[style].bible, SUBJECT];
  if (slot.toned && tone) parts.push(TONES[tone].modifier);
  parts.push("SCENE: " + slot.prompt);
  parts.push(slot.vignette ? VIGNETTE : BLEED);
  parts.push(NEGATIVE);
  return parts.join("\n\n");
}

/** Nombre de archivo de una lámina: `<slot>` o `<slot>--<tono>`. */
export function fileName(slot, tone) {
  return slot.toned && tone ? slot.id + "--" + tone : slot.id;
}

/** Todas las combinaciones a generar para un estilo. */
export function plan(style) {
  const jobs = [];
  for (const slot of ALL_SLOTS) {
    if (slot.toned) {
      for (const tone of Object.keys(TONES)) {
        jobs.push({ style, slot, tone, name: fileName(slot, tone) });
      }
    } else {
      jobs.push({ style, slot, tone: null, name: fileName(slot, null) });
    }
  }
  return jobs;
}
