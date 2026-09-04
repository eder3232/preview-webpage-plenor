import {
  IMAGES,
  LOGOS,
  VIDEOS,
  type MediaImage,
  type MediaLogo,
  type MediaVideo,
} from "./media.generated";

export type { MediaImage, MediaLogo, MediaVideo };

type ImageId = (typeof IMAGES)[number]["id"];
type LogoId = (typeof LOGOS)[number]["id"];
type VideoId = (typeof VIDEOS)[number]["id"];

const imageIndex = new Map<string, MediaImage>(IMAGES.map((i) => [i.id, i]));
const logoIndex = new Map<string, MediaLogo>(LOGOS.map((l) => [l.id, l]));
const videoIndex = new Map<string, MediaVideo>(VIDEOS.map((v) => [v.id, v]));

/**
 * Devuelve una imagen del manifiesto. Falla en tiempo de ejecución si el id no
 * existe, lo cual es deliberado: significa que alguien renombró un asset en
 * scripts/media.mjs y olvidó actualizar el componente.
 */
export function img(id: ImageId | (string & {})): MediaImage {
  const found = imageIndex.get(id);
  if (!found) throw new Error(`Imagen desconocida: "${id}". ¿Corriste \`pnpm media\`?`);
  return found;
}

export function logo(id: LogoId | (string & {})): MediaLogo {
  const found = logoIndex.get(id);
  if (!found) throw new Error(`Logo desconocido: "${id}"`);
  return found;
}

export function video(id: VideoId | (string & {})): MediaVideo {
  const found = videoIndex.get(id);
  if (!found) throw new Error(`Video desconocido: "${id}"`);
  return found;
}

/** Galería principal: el recorrido que cuenta el proyecto en 8 imágenes. */
export const galleryIds = [
  "ingreso",
  "piscina",
  "general-club",
  "fogatas",
  "parrillas",
  "juegos",
  "fronton",
  "casa-tipo",
] as const;

/** Equivalente vertical, para el carrusel de móvil. */
export const galleryVerticalIds = [
  "v-ingreso",
  "v-clubhouse",
  "v-parrillas",
  "v-parques",
  "v-multiusos",
  "v-vias",
  "v-cerco",
  "v-general",
] as const;

export { IMAGES, LOGOS, VIDEOS };
