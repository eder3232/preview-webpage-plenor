import {
  Blocks,
  DoorOpen,
  Fence,
  Flame,
  House,
  Route,
  Target,
  UtensilsCrossed,
  Volleyball,
  WavesLadder,
  type LucideIcon,
} from "lucide-react";

/**
 * LAS 10 AMENIDADES — leyenda oficial del plano comercial.
 * Fuente: docs/03-aonami-plano-comercial.md §2.
 *
 * `image` y `imageVertical` referencian ids del manifiesto generado por
 * `pnpm media` (src/content/media.generated.ts).
 */

export interface Amenity {
  /** Número tal como aparece en la leyenda del plano. */
  n: string;
  slug: string;
  name: string;
  /** Una línea, para tarjetas y listas. */
  short: string;
  /** Párrafo, para la vista de detalle. */
  description: string;
  icon: LucideIcon;
  image: string;
  imageVertical: string;
}

export const amenities: Amenity[] = [
  {
    n: "01",
    slug: "piscina",
    name: "Piscina",
    short: "Dos vasos: principal y poza infantil.",
    description:
      "El núcleo del proyecto. Dos vasos independientes —la piscina principal rectangular y una poza somera en L para los más chicos— rodeados de deck y tumbonas, con el club house dando sombra al borde.",
    icon: WavesLadder,
    image: "piscina",
    imageVertical: "v-clubhouse",
  },
  {
    n: "02",
    slug: "club-house",
    name: "Club house",
    short: "Muro de piedra y terrazas de madera.",
    description:
      "Edificación de muro de piedra con terrazas de madera abiertas hacia la piscina. Es el punto de encuentro del condominio y el espacio para reuniones y celebraciones.",
    icon: House,
    image: "general-club",
    imageVertical: "v-clubhouse",
  },
  {
    n: "03",
    slug: "fogatas",
    name: "Zona de fogatas",
    short: "Tres fogones circulares con bancas radiales.",
    description:
      "Tres fogones circulares con bancas radiales sobre una explanada de arena, junto a la piscina. Pensada para las noches: el proyecto está a dos minutos de la playa y la temperatura baja rápido al caer el sol.",
    icon: Flame,
    image: "fogatas",
    imageVertical: "v-parrillas",
  },
  {
    n: "04",
    slug: "parrillas",
    name: "Zona de parrillas",
    short: "Pérgolas de madera, parrillas y mesas de picnic.",
    description:
      "Área verde al este del club con pérgolas de madera, parrillas fijas y mesas de picnic. Puede usarse sin reserva y está a pasos de la piscina.",
    icon: UtensilsCrossed,
    image: "parrillas",
    imageVertical: "v-parrillas",
  },
  {
    n: "05",
    slug: "portico",
    name: "Pórtico de ingreso",
    short: "Acceso controlado sobre la vía Francisco Olazabal.",
    description:
      "Único acceso al condominio, en el extremo suroeste, sobre la pista asfaltada Francisco Olazabal. Marquesina volada, portón de listones de madera y caseta de control.",
    icon: DoorOpen,
    image: "ingreso",
    imageVertical: "v-ingreso",
  },
  {
    n: "06",
    slug: "fronton",
    name: "Canchas de frontón",
    short: "Muro terracota dentro del parque deportivo.",
    description:
      "Dentro del parque deportivo, entre los sectores A y E. Muro de frontón en terracota, piso pintado y malla perimetral.",
    icon: Target,
    image: "fronton",
    imageVertical: "v-parques",
  },
  {
    n: "07",
    slug: "juegos",
    name: "Juegos para niños",
    short: "Torre, tobogán y columpios.",
    description:
      "Módulo de juegos con torre, tobogán y columpios, ubicado junto a la cancha de frontón y a la vista desde las viviendas del entorno.",
    icon: Blocks,
    image: "juegos",
    imageVertical: "v-parques",
  },
  {
    n: "08",
    slug: "multiusos",
    name: "Cancha multiusos",
    short: "Básquet y fútbol en la misma losa.",
    description:
      "Losa polideportiva marcada para básquet y fútbol, con el logo de Plenor pintado al centro. Cierra el parque deportivo por el lado este.",
    icon: Volleyball,
    image: "v-multiusos",
    imageVertical: "v-multiusos",
  },
  {
    n: "09",
    slug: "vias",
    name: "Vías adoquinadas",
    short: "Todo el trazado interno, sin excepción.",
    description:
      "Las vías internas del condominio están adoquinadas en su totalidad, con aparejo de espiga, veredas y cruces peatonales marcados. Cuatro retornos circulares rematan los extremos.",
    icon: Route,
    image: "v-vias",
    imageVertical: "v-vias",
  },
  {
    n: "10",
    slug: "cerco",
    name: "Cerco perimétrico",
    short: "Todo el borde del terreno, cerrado.",
    description:
      "Cerco de listones verticales alrededor de todo el polígono. Junto con el pórtico único de ingreso, define el condominio como un recinto cerrado.",
    icon: Fence,
    image: "v-cerco",
    imageVertical: "v-cerco",
  },
];

export const amenityBySlug = (slug: string) =>
  amenities.find((a) => a.slug === slug);
