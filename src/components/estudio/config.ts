/**
 * ============================================================================
 *  ESTUDIO — configuración del armador de página
 * ============================================================================
 *
 *  Este archivo es la única fuente de verdad de:
 *    · qué secciones tienen variantes y cuáles son
 *    · qué tokens globales se pueden tocar
 *    · los presets
 *    · cómo se codifica la elección en la URL
 *
 *  Añadir una variante = una entrada acá + un componente en `registry.tsx`.
 *  El panel se construye solo leyendo esto: no hay que tocarlo.
 * ============================================================================
 */

/** La app del proveedor, completa (con su propio menú lateral). */
export const TOUR_URL = "https://aonami.lienzo360.com/";

/** El recorrido 360 a secas (3DVista), sin la cáscara del proveedor. */
export const TOUR_ONLY_URL = "https://www.lienzo3d.com/AONAMI_TOUR/";

/* ==========================================================================
   Secciones con variantes
   ========================================================================== */

export const SECTION_IDS = [
  "hero",
  "galeria",
  "amenidades",
  "tour",
  "lotes",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface VariantMeta {
  id: string;
  label: string;
  /** Una línea en el panel: qué cambia de verdad respecto de las otras. */
  hint: string;
}

export interface SectionMeta {
  id: SectionId;
  label: string;
  /** Ancla en la página, para saltar a la sección al cambiar de variante. */
  anchor: string;
  variants: VariantMeta[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "hero",
    label: "Portada",
    anchor: "portada",
    variants: [
      {
        id: "cinematico",
        label: "Cinemático",
        hint: "Video a pantalla completa y titular gigante abajo.",
      },
      {
        id: "editorial",
        label: "Editorial",
        hint: "Pantalla partida: texto sobre arena, imagen vertical al costado.",
      },
      {
        id: "portada",
        label: "Portada",
        hint: "Una sola imagen, titular centrado y datos en una barra al pie.",
      },
    ],
  },
  {
    id: "galeria",
    label: "Galería",
    anchor: "galeria",
    variants: [
      {
        id: "horizontal",
        label: "Cine horizontal",
        hint: "Las imágenes se desplazan de lado mientras bajas. Es el sello de la propuesta A.",
      },
      {
        id: "mosaico",
        label: "Mosaico",
        hint: "Retícula editorial de tamaños distintos, con visor al hacer clic.",
      },
      {
        id: "pila",
        label: "Pila a sangre",
        hint: "Imágenes a pantalla completa, una tras otra, con el título encima.",
      },
    ],
  },
  {
    id: "amenidades",
    label: "Amenidades",
    anchor: "amenidades",
    variants: [
      {
        id: "alternado",
        label: "Alternado",
        hint: "Las 10 amenidades en filas grandes que alternan lado. Largo y detallado.",
      },
      {
        id: "mosaico",
        label: "Tarjetas",
        hint: "Las 10 en una retícula compacta; el detalle se abre en ventana.",
      },
      {
        id: "indice",
        label: "Índice",
        hint: "Lista numerada a un lado y una imagen grande que cambia al elegir cada una.",
      },
    ],
  },
  {
    id: "tour",
    label: "Tour 360 y disponibilidad",
    anchor: "tour",
    variants: [
      {
        id: "seccion",
        label: "Embebido aquí",
        hint: "El tour vive dentro de la página. Se activa al hacer clic para no cargarlo antes de tiempo.",
      },
      {
        id: "modal",
        label: "En ventana",
        hint: "Un botón lo abre a pantalla completa por encima de la página.",
      },
      {
        id: "enlace",
        label: "Página aparte",
        hint: "Un bloque de invitación que lleva a una página propia a pantalla completa.",
      },
    ],
  },
  {
    id: "lotes",
    label: "Lotes",
    anchor: "lotes",
    variants: [
      {
        id: "cifras",
        label: "Cifras",
        hint: "Banda oscura con las cuatro métricas y un enlace al inventario.",
      },
      {
        id: "buscador",
        label: "Buscador",
        hint: "Los 203 lotes filtrables dentro de la misma página. Era lo bueno de la propuesta B.",
      },
      {
        id: "sectores",
        label: "Sectores",
        hint: "Los siete sectores como tarjetas, con su carácter y sus rangos de área.",
      },
    ],
  },
];

export const SECTION_BY_ID = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
) as Record<SectionId, SectionMeta>;

/* ==========================================================================
   Tokens globales
   ========================================================================== */

export interface TokenOption {
  id: string;
  label: string;
  hint?: string;
  /** Muestra de color, solo para el selector de acento. */
  swatch?: string;
}

export const TOKEN_IDS = [
  "accent",
  "type",
  "density",
  "radius",
  "motion",
  // Los nuevos van SIEMPRE al final: el codec de la URL va por índice, así que
  // añadir al final mantiene válidos los enlaces ya compartidos.
  "ilustracion",
  "tono",
] as const;

export type TokenId = (typeof TOKEN_IDS)[number];

export interface TokenGroup {
  id: TokenId;
  label: string;
  /** Nombre del `data-*` que se escribe en el contenedor raíz. */
  attr: string;
  /** Texto de ayuda bajo el título del grupo en el panel. */
  note?: string;
  /** El grupo solo se muestra si otro token NO tiene este valor. */
  hiddenWhen?: { token: TokenId; is: string };
  options: TokenOption[];
}

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    id: "accent",
    label: "Color de acento",
    attr: "accent",
    options: [
      { id: "ocre", label: "Ocre de obra", swatch: "#ffb035" },
      { id: "terracota", label: "Terracota", swatch: "#8c5338" },
      { id: "oliva", label: "Oliva urbano", swatch: "#31463a" },
      { id: "verde", label: "Verde calmo", swatch: "#839485" },
    ],
  },
  {
    id: "type",
    label: "Tipografía de titulares",
    attr: "type",
    options: [
      { id: "sans", label: "Grotesca", hint: "La actual. Neutra y moderna." },
      { id: "serif", label: "Serif", hint: "Más señorial, tono editorial." },
      { id: "grotesk", label: "Geométrica", hint: "Más técnica y compacta." },
    ],
  },
  {
    id: "density",
    label: "Aire entre secciones",
    attr: "density",
    options: [
      { id: "compacta", label: "Compacta" },
      { id: "normal", label: "Normal" },
      { id: "amplia", label: "Amplia" },
    ],
  },
  {
    id: "radius",
    label: "Esquinas",
    attr: "radius",
    options: [
      { id: "recto", label: "Rectas" },
      { id: "suave", label: "Suaves" },
      { id: "redondo", label: "Redondas" },
    ],
  },
  {
    id: "motion",
    label: "Movimiento",
    attr: "motion",
    options: [
      { id: "completo", label: "Completo" },
      { id: "sutil", label: "Sutil" },
      { id: "ninguno", label: "Sin animación" },
    ],
  },
  {
    id: "ilustracion",
    label: "Ilustraciones",
    attr: "ilustracion",
    note: "Van solo donde hoy no hay imagen. Los renders del proyecto no se tocan.",
    options: [
      {
        id: "ninguna",
        label: "Ninguna",
        hint: "Solo el material fotográfico entregado por el cliente.",
      },
      {
        id: "riso",
        label: "Risografía",
        hint: "Dos tintas sobre papel de fibra. Artesanal y sobria.",
        swatch: "#ffb035",
      },
      {
        id: "retro",
        label: "Cartel de verano",
        hint: "Afiche de turismo mid-century. Alegre y llamativo.",
        swatch: "#8c5338",
      },
    ],
  },
  {
    id: "tono",
    label: "Tono de las ilustraciones",
    attr: "tono",
    hiddenWhen: { token: "ilustracion", is: "ninguna" },
    options: [
      { id: "sobrio", label: "Sobrio", hint: "Sin personas ni anécdota." },
      { id: "calido", label: "Cálido", hint: "Señales de vida: una toalla, una bici, un perro." },
      { id: "humor", label: "Con humor", hint: "Un guiño gracioso en la escena." },
    ],
  },
];

export const TOKEN_BY_ID = Object.fromEntries(
  TOKEN_GROUPS.map((g) => [g.id, g]),
) as Record<TokenId, TokenGroup>;

/* ==========================================================================
   La configuración
   ========================================================================== */

export interface StudioConfig {
  sections: Record<SectionId, string>;
  tokens: Record<TokenId, string>;
  /** Comentario libre del cliente. No viaja en la URL — ver el codec abajo. */
  notes: Partial<Record<SectionId | "general", string>>;
}

export interface Preset {
  id: string;
  label: string;
  hint: string;
  config: Omit<StudioConfig, "notes">;
}

export const PRESETS: Preset[] = [
  {
    id: "cinematico",
    label: "Cinemático",
    hint: "Lo más parecido a la propuesta A que ya viste. Vende la sensación.",
    config: {
      sections: {
        hero: "cinematico",
        galeria: "horizontal",
        amenidades: "alternado",
        tour: "seccion",
        lotes: "cifras",
      },
      tokens: {
        accent: "ocre",
        type: "sans",
        density: "amplia",
        radius: "suave",
        motion: "completo",
        // El preset de arranque muestra solo el material del cliente.
        ilustracion: "ninguna",
        tono: "calido",
      },
    },
  },
  {
    id: "editorial",
    label: "Editorial",
    hint: "Revista de arquitectura: serif, aire y retículas. Vende el criterio.",
    config: {
      sections: {
        hero: "editorial",
        galeria: "mosaico",
        amenidades: "indice",
        tour: "enlace",
        lotes: "sectores",
      },
      tokens: {
        accent: "terracota",
        type: "serif",
        density: "amplia",
        radius: "recto",
        motion: "sutil",
        ilustracion: "riso",
        tono: "sobrio",
      },
    },
  },
  {
    id: "comercial",
    label: "Comercial",
    hint: "Los datos arriba y a la mano. Vende el lote. Es lo que hacía la B.",
    config: {
      sections: {
        hero: "portada",
        galeria: "mosaico",
        amenidades: "mosaico",
        tour: "modal",
        lotes: "buscador",
      },
      tokens: {
        accent: "ocre",
        type: "grotesk",
        density: "compacta",
        radius: "redondo",
        motion: "sutil",
        ilustracion: "retro",
        tono: "humor",
      },
    },
  },
];

export const DEFAULT_CONFIG: StudioConfig = {
  ...PRESETS[0].config,
  notes: {},
};

export function clone(config: StudioConfig): StudioConfig {
  return {
    sections: { ...config.sections },
    tokens: { ...config.tokens },
    notes: { ...config.notes },
  };
}

/** Compara solo el diseño, ignorando comentarios. Para marcar el preset activo. */
export function sameDesign(a: StudioConfig, b: Omit<StudioConfig, "notes">) {
  return (
    SECTION_IDS.every((id) => a.sections[id] === b.sections[id]) &&
    TOKEN_IDS.every((id) => a.tokens[id] === b.tokens[id])
  );
}

/* ==========================================================================
   Codec de URL
   --------------------------------------------------------------------------
   El diseño se codifica por ÍNDICE, en el orden de SECTION_IDS y TOKEN_IDS:
   `?c=0.1.2.0.1&k=0.2.1.0.0`. Corto, legible y fácil de compartir.

   Los comentarios NO van en la URL a propósito: la harían larguísima y frágil.
   Viajan en el mensaje de WhatsApp y en el JSON de la exportación.
   ========================================================================== */

export function encodeConfig(config: StudioConfig): string {
  const c = SECTION_IDS.map((id) => {
    const i = SECTION_BY_ID[id].variants.findIndex(
      (v) => v.id === config.sections[id],
    );
    return i < 0 ? 0 : i;
  }).join(".");

  const k = TOKEN_IDS.map((id) => {
    const i = TOKEN_BY_ID[id].options.findIndex((o) => o.id === config.tokens[id]);
    return i < 0 ? 0 : i;
  }).join(".");

  return "c=" + c + "&k=" + k;
}

/** Tolerante por diseño: un enlace viejo al que le falte una sección abre igual. */
export function decodeConfig(
  c: string | null,
  k: string | null,
): StudioConfig | null {
  if (!c && !k) return null;

  const next = clone(DEFAULT_CONFIG);
  const ci = (c ?? "").split(".");
  const ki = (k ?? "").split(".");

  SECTION_IDS.forEach((id, i) => {
    const variant = SECTION_BY_ID[id].variants[Number(ci[i])];
    if (variant) next.sections[id] = variant.id;
  });

  TOKEN_IDS.forEach((id, i) => {
    const option = TOKEN_BY_ID[id].options[Number(ki[i])];
    if (option) next.tokens[id] = option.id;
  });

  return next;
}

/** Lo elegido en texto legible, para la exportación. */
export function describe(config: StudioConfig) {
  const sections = SECTIONS.map((s) => ({
    id: s.id,
    label: s.label,
    variant: s.variants.find((v) => v.id === config.sections[s.id])?.label ?? "—",
    note: config.notes[s.id]?.trim() ?? "",
  }));

  const tokens = TOKEN_GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    value: g.options.find((o) => o.id === config.tokens[g.id])?.label ?? "—",
  }));

  return { sections, tokens };
}
