/**
 * PIPELINE DE ASSETS — de los 3.7 GB del drive a lo que sí puede vivir en la web.
 *
 *   pnpm media          → procesa lo que falte
 *   pnpm media --force  → reprocesa todo
 *
 * Qué hace:
 *   · Imágenes → un "master" WebP del ancho máximo que necesita cada uso.
 *     next/image se encarga después de generar el srcset y el AVIF por
 *     dispositivo, así que no hace falta versionar cinco tamaños de cada una.
 *   · Genera un LQIP (placeholder borroso en base64) por imagen para que
 *     `placeholder="blur"` funcione sin subir un archivo extra.
 *   · Videos → MP4 H.264 optimizado para web + poster.
 *   · Emite src/content/media.generated.ts con rutas, dimensiones reales y
 *     blurDataURL, para que los componentes nunca hardcodeen medidas.
 *
 * Los originales NO se versionan: viven en tmp/resources/ (ver docs/04).
 */
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FORCE = process.argv.includes("--force");

const D1 = join(root, "tmp/resources/PAGINA WEB -20260903T221658Z-1-001/PAGINA WEB");
const D2 = join(root, "tmp/resources/PAGINA WEB -20260903T221658Z-1-002/PAGINA WEB");

const OUT_IMG = join(root, "public/media");
const OUT_VID = join(root, "public/video");
const MANIFEST = join(root, "src/content/media.generated.ts");

const R = (p) => join(D1, "AONAMI - Renders finales", p);
const V = (p) => join(D1, "AONAMI - Videos finales", p);
const VERT = (p) => join(D1, "04. ENTREGA (VERTICAL)/01. VISTAS VERTICALES", p);
const VERTV = (p) => join(D1, "04. ENTREGA (VERTICAL)/02. VIDEOS VERTICALES", p);
const PLAN = (p) => join(D1, "04. ENTREGA (VERTICAL)", p);
const LOGO = (p) => join(D1, "LOGOS", p);

/* ==========================================================================
   SELECCIÓN
   De 27 imágenes y 23 videos entregados se usan 21 y 4. El criterio es
   cobertura: cada amenidad documentada aparece una vez, más las vistas
   generales y las planimetrías. El resto queda disponible en el drive.
   ========================================================================== */

/** @type {{id:string,src:string,w:number,alt:string,alpha?:boolean,q?:number}[]} */
const IMAGES = [
  // ── Renders horizontales (desktop) ──────────────────────────────────────
  { id: "ingreso", src: R("01. INGRESO.png"), w: 2560,
    alt: "Pórtico de ingreso a Residencial Aonami al atardecer, con marquesina blanca y portón de listones de madera" },
  { id: "piscina", src: R("02. PISCINA.png"), w: 2560,
    alt: "Piscina de Residencial Aonami con el club house de muro de piedra y palmeras al fondo" },
  { id: "casa-tipo", src: R("03. CASA TIPO 01.png"), w: 2560,
    alt: "Casas tipo de tres niveles frente a la piscina, con tumbonas y bar" },
  { id: "casa-tipo-piscina", src: R("04.CASA TIPO CON PISCINA.png"), w: 2560,
    alt: "Fila de casas tipo con la piscina en primer plano y estacionamientos" },
  { id: "parrillas", src: R("05. PARRILLAS.png"), w: 2560,
    alt: "Pérgolas de madera con parrillas y mesas de picnic sobre césped" },
  { id: "juegos", src: R("06. JUEGOS DE NIÑOS.png"), w: 2560,
    alt: "Módulo de juegos infantiles con torre, tobogán y columpios entre las casas" },
  { id: "fronton", src: R("07. FRONTON.png"), w: 2560,
    alt: "Cancha de frontón con muro terracota y malla perimetral" },
  { id: "fogatas", src: R("08. FOGATAS.png"), w: 2560,
    alt: "Fogata circular encendida al atardecer con bancas radiales y la piscina al fondo" },
  { id: "general-club", src: R("10. GENERAL CLUB.png"), w: 2560,
    alt: "Vista aérea del club house, la piscina y la zona de fogatas" },
  { id: "general-piscina", src: R("11. GENERAL PISCINA.png"), w: 2560,
    alt: "Vista aérea cenital de la piscina y el club house de Residencial Aonami" },
  { id: "aereo", src: R("Aonamifotomontaje_final (1).png"), w: 3200,
    alt: "Fotomontaje aéreo de Residencial Aonami insertado en la campiña de Punta de Bombón con el mar al fondo" },

  // ── Vistas verticales (móvil) ───────────────────────────────────────────
  { id: "v-general", src: VERT("01.GENERAL VERTICAL.png"), w: 1440,
    alt: "Vista aérea vertical del conjunto de Residencial Aonami con el mar al fondo" },
  { id: "v-ingreso", src: VERT("02. INGRESO.png"), w: 1440,
    alt: "Pórtico de ingreso a Residencial Aonami visto desde la calle" },
  { id: "v-cerco", src: VERT("03. CERCO PERIMETRICO.png"), w: 1440,
    alt: "Cerco perimétrico de listones verticales sobre la vía adoquinada" },
  { id: "v-vias", src: VERT("04. VIAS ADOQUINADAS.png"), w: 1440,
    alt: "Vía interna adoquinada en perspectiva, con casas y cruce peatonal" },
  { id: "v-parques", src: VERT("05. PARQUES.png"), w: 1440,
    alt: "Vista aérea del parque deportivo con cancha multiusos, frontón y juegos" },
  { id: "v-clubhouse", src: VERT("06. CLUBHOUSE.png"), w: 1440,
    alt: "Club house y piscina de Residencial Aonami vistos desde el borde del agua" },
  { id: "v-parrillas", src: VERT("07. AREA DE PARRILAS Y FOGATAS.png"), w: 1440,
    alt: "Vista aérea de la piscina, la zona de fogatas y las pérgolas de parrilla" },
  { id: "v-multiusos", src: VERT("08. CANCHA MULTIUSOS.png"), w: 1440,
    alt: "Cancha multiusos con la marca Plenor pintada en el piso" },

  // ── Planimetrías ────────────────────────────────────────────────────────
  { id: "planimetria", src: PLAN("01. Planimetria 15.04.png"), w: 3840, q: 84,
    alt: "Planimetría cenital del masterplan de Residencial Aonami con los lotes vacíos sobre la fotografía aérea del terreno" },
  { id: "planimetria-casas", src: PLAN("02. PLANIMETRIA TOUR VIRTUAL_15.04.png"), w: 3200, q: 84,
    alt: "Planimetría cenital de Residencial Aonami con todas las casas construidas" },
  { id: "planimetria-3d", src: R("planimetria sin fondo (1).png"), w: 1777, alpha: true,
    alt: "Planimetría en perspectiva 3D de Residencial Aonami sobre fondo transparente" },
];

/** Logos: se copian tal cual. Son PNG con alfa de 12–43 KB, ya optimizados. */
const LOGOS = [
  { id: "logotipo", src: LOGO("Plenor_Logotipo_SinTM.png"), file: "plenor-logotipo.png",
    alt: "Plenor" },
  { id: "isotipo", src: LOGO("Plenor_Icono_SinTM.png"), file: "plenor-isotipo.png",
    alt: "Isotipo Plenor" },
  { id: "lockup", src: LOGO("Plenor-Residencial Aonami.png"), file: "plenor-aonami.png",
    alt: "Plenor · Residencial Aonami" },
];

/**
 * Videos. `scale` es el ancho de salida (la altura se calcula manteniendo
 * proporción). `crf` más alto = archivo más chico.
 */
const VIDEOS = [
  { id: "hero", src: V("04. GENERAL.mp4"), scale: 1920, crf: 26, audio: false,
    poster: 0.5, alt: "Sobrevuelo aéreo de Residencial Aonami" },
  { id: "hero-vertical", src: VERTV("01. GENERAL VERTICAL.mp4"), scale: 720, crf: 27, audio: false,
    poster: 0.5, alt: "Sobrevuelo vertical de Residencial Aonami" },
  { id: "piscina", src: V("05. PISCINA.mp4"), scale: 1440, crf: 27, audio: false,
    poster: 1, alt: "La piscina de Residencial Aonami en movimiento" },
  // 98 s: es el único largo. Va en un modal con preload="none", así que se
  // prioriza el peso sobre la nitidez máxima.
  { id: "institucional", src: join(D2, "AONAMI - Renders finales/00. VIDEO_AONAMI.mp4"),
    scale: 1600, crf: 32, audio: true, poster: 3,
    alt: "Video institucional de Residencial Aonami" },
];

/* ========================================================================== */

const results = { images: [], logos: [], videos: [] };
let processed = 0;
let skipped = 0;

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2);
const fresh = (out, src) =>
  !FORCE && existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;

async function lqip(buffer) {
  const b = await sharp(buffer)
    .resize(16, null, { fit: "inside" })
    .webp({ quality: 30 })
    .toBuffer();
  return `data:image/webp;base64,${b.toString("base64")}`;
}

async function doImages() {
  mkdirSync(OUT_IMG, { recursive: true });

  for (const img of IMAGES) {
    if (!existsSync(img.src)) {
      console.error(`  ✖ no existe: ${img.src}`);
      process.exitCode = 1;
      continue;
    }
    const out = join(OUT_IMG, `${img.id}.webp`);

    if (!fresh(out, img.src)) {
      const pipeline = sharp(img.src, { limitInputPixels: false })
        .resize({ width: img.w, withoutEnlargement: true })
        .webp({ quality: img.q ?? 80, effort: 5, alphaQuality: img.alpha ? 90 : 100 });
      await pipeline.toFile(out);
      console.log(`  · ${img.id.padEnd(20)} ${mb(img.src).padStart(7)} MB → ${mb(out).padStart(6)} MB`);
      processed++;
    } else {
      skipped++;
    }

    const meta = await sharp(out).metadata();
    results.images.push({
      id: img.id,
      src: `/media/${img.id}.webp`,
      width: meta.width,
      height: meta.height,
      blurDataURL: await lqip(out),
      alt: img.alt,
    });
  }
}

async function doLogos() {
  for (const l of LOGOS) {
    if (!existsSync(l.src)) {
      console.error(`  ✖ no existe: ${l.src}`);
      process.exitCode = 1;
      continue;
    }
    const out = join(OUT_IMG, l.file);
    if (!fresh(out, l.src)) {
      copyFileSync(l.src, out);
      processed++;
    } else skipped++;
    const meta = await sharp(out).metadata();
    results.logos.push({
      id: l.id,
      src: `/media/${l.file}`,
      width: meta.width,
      height: meta.height,
      alt: l.alt,
    });
  }
}

async function doVideos() {
  mkdirSync(OUT_VID, { recursive: true });

  for (const v of VIDEOS) {
    if (!existsSync(v.src)) {
      console.error(`  ✖ no existe: ${v.src}`);
      process.exitCode = 1;
      continue;
    }
    const out = join(OUT_VID, `${v.id}.mp4`);
    const posterPng = join(OUT_VID, `.${v.id}-poster.png`);
    const poster = join(OUT_IMG, `poster-${v.id}.webp`);

    if (!fresh(out, v.src)) {
      const args = [
        "-y", "-loglevel", "error", "-i", v.src,
        "-vf", `scale=${v.scale}:-2:flags=lanczos`,
        "-c:v", "libx264", "-crf", String(v.crf), "-preset", "slow",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
      ];
      // Los loops decorativos van mudos: reproducen en autoplay y el audio
      // solo añadiría peso que el navegador nunca usa.
      args.push(...(v.audio ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"]));
      args.push(out);

      console.log(`  · ${v.id} — codificando…`);
      await run("ffmpeg", args, { maxBuffer: 1024 * 1024 * 32 });
      console.log(`    ${v.id.padEnd(18)} ${mb(v.src).padStart(7)} MB → ${mb(out).padStart(6)} MB`);
      processed++;
    } else skipped++;

    if (!fresh(poster, out)) {
      await run("ffmpeg", [
        "-y", "-loglevel", "error", "-ss", String(v.poster), "-i", out,
        "-frames:v", "1", posterPng,
      ]);
      await sharp(posterPng).webp({ quality: 72 }).toFile(poster);
    }

    const meta = await sharp(poster).metadata();
    const probe = await run("ffprobe", [
      "-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=width,height:format=duration",
      "-of", "json", out,
    ]);
    const info = JSON.parse(probe.stdout);

    results.videos.push({
      id: v.id,
      src: `/video/${v.id}.mp4`,
      width: info.streams[0].width,
      height: info.streams[0].height,
      duration: Number(info.format.duration),
      poster: `/media/poster-${v.id}.webp`,
      posterBlur: await lqip(poster),
      posterWidth: meta.width,
      posterHeight: meta.height,
      alt: v.alt,
    });
  }
}

function emit() {
  const j = (v) => JSON.stringify(v, null, 2).replace(/\n/g, "\n");
  const out = `// ⚠️ ARCHIVO GENERADO — no editar a mano.
// Regenerar con: pnpm media
//
// Dimensiones reales medidas sobre los archivos ya procesados, para que
// next/image nunca provoque layout shift.

export interface MediaImage {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
}

export interface MediaLogo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface MediaVideo {
  id: string;
  src: string;
  width: number;
  height: number;
  duration: number;
  poster: string;
  posterBlur: string;
  posterWidth: number;
  posterHeight: number;
  alt: string;
}

export const IMAGES = ${j(results.images)} as const satisfies readonly MediaImage[];

export const LOGOS = ${j(results.logos)} as const satisfies readonly MediaLogo[];

export const VIDEOS = ${j(results.videos)} as const satisfies readonly MediaVideo[];
`;
  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, out, "utf8");
}

console.log("Imágenes");
await doImages();
console.log("Logos");
await doLogos();
console.log("Videos");
await doVideos();
emit();

const total = [...results.images, ...results.logos].reduce(
  (s, i) => s + statSync(join(root, "public", i.src)).size, 0,
) + results.videos.reduce((s, v) => s + statSync(join(root, "public", v.src)).size, 0);

console.log(
  `\n✔ ${results.images.length} imágenes · ${results.logos.length} logos · ` +
    `${results.videos.length} videos  (${processed} procesados, ${skipped} sin cambios)`,
);
console.log(`  Peso total en public/: ${(total / 1024 / 1024).toFixed(1)} MB`);
console.log(`  → ${MANIFEST.replace(root, ".")}`);
