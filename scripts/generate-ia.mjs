/**
 * ============================================================================
 *  GENERADOR DE LOS SETS DE ILUSTRACIÓN
 * ============================================================================
 *
 *   node scripts/generate-ia.mjs --seed              → solo las láminas madre
 *   node scripts/generate-ia.mjs --style riso        → todo un set
 *   node scripts/generate-ia.mjs --only manifiesto   → una lámina (o varias)
 *   node scripts/generate-ia.mjs --all               → los dos sets completos
 *   node scripts/generate-ia.mjs --manifest          → solo rehacer el manifiesto
 *
 *   Modificadores:  --force  rehace lo que ya existe
 *                   --model <id>
 *
 *  CÓMO SE MANTIENE LA CONSISTENCIA
 *  Primero se genera una "lámina madre" por estilo. Después, cada lámina se
 *  pide enviando esa madre como imagen de referencia junto al prompt. Sin eso
 *  cada imagen sale de una mano distinta y el set no se sostiene, que es el
 *  problema real de generar series, no el estilo.
 *
 *  Este script NO toca `scripts/media.mjs` ni `src/content/media.generated.ts`:
 *  escribe en `public/media-ia/` y en su propio manifiesto, para no interferir
 *  con los assets que entregó el cliente.
 * ============================================================================
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { ALL_SLOTS, STYLES, buildPrompt, plan } from "./ia-sets.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/media-ia");
const MANIFEST = join(root, "src/components/estudio/media-ia.generated.ts");

const DEFAULT_MODEL = "gemini-3.1-flash-image";
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

/* ── Clave ─────────────────────────────────────────────────────────────── */

function apiKey() {
  const fromEnv = process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (fromEnv) return fromEnv;
  const file = join(root, ".env.local");
  if (!existsSync(file)) {
    throw new Error("Falta .env.local con GOOGLE_AI_STUDIO_API_KEY");
  }
  const line = readFileSync(file, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("GOOGLE_AI_STUDIO_API_KEY="));
  if (!line) throw new Error("Falta GOOGLE_AI_STUDIO_API_KEY en .env.local");
  return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
}

const KEY = apiKey();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── Llamada ───────────────────────────────────────────────────────────── */

async function generate({ prompt, aspect, reference, model }) {
  const parts = [];
  if (reference) {
    // La referencia va PRIMERO y con una instrucción explícita: si va después
    // del prompt el modelo tiende a copiar el contenido en vez del estilo.
    parts.push({
      inlineData: { mimeType: "image/webp", data: reference.toString("base64") },
    });
    parts.push({
      text: "Use the attached image ONLY as the style reference: same inks, same paper, same grain, same line quality, same hand. Do NOT reproduce its subject or composition.",
    });
  }
  parts.push({ text: prompt });

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: aspect },
    },
  };

  let lastError = "";
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(
      `${ENDPOINT}/${model}:generateContent?key=${KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const json = await res.json().catch(() => ({}));
    const image = json?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (image) return Buffer.from(image.inlineData.data, "base64");

    lastError =
      json?.error?.message ??
      json?.candidates?.[0]?.finishReason ??
      `HTTP ${res.status}`;

    // 429 y 5xx se reintentan con espera creciente; el resto no tiene arreglo.
    if (res.status !== 429 && res.status < 500 && !json?.candidates) break;
    await sleep(attempt * 4000);
  }

  throw new Error(lastError || "sin imagen en la respuesta");
}

/* ── Escritura ─────────────────────────────────────────────────────────── */

/** Ancho máximo por formato. Son ilustraciones planas: no necesitan 4K. */
const MAX_WIDTH = { "21:9": 2000, "16:9": 1800, "4:3": 1400, "1:1": 700 };

async function writeWebp(buffer, file, aspect) {
  const width = MAX_WIDTH[aspect] ?? 1600;
  mkdirSync(dirname(file), { recursive: true });
  await sharp(buffer)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(file);
}

/** Miniatura en base64 para que next/image no provoque salto de maquetación. */
async function blurDataURL(file) {
  const buf = await sharp(file).resize(16).webp({ quality: 40 }).toBuffer();
  return "data:image/webp;base64," + buf.toString("base64");
}

/* ── Láminas madre ─────────────────────────────────────────────────────── */

function seedPath(style) {
  return join(OUT, style, "_seed.webp");
}

async function ensureSeed(style, model, force) {
  const file = seedPath(style);
  if (existsSync(file) && !force) return readFileSync(file);

  const def = STYLES[style];
  const prompt = buildPrompt(style, { prompt: def.seed, toned: false }, null);
  process.stdout.write(`  ⟳ ${style}/_seed …`);
  const raw = await generate({
    prompt,
    aspect: def.seedAspect,
    reference: null,
    model,
  });
  await writeWebp(raw, file, def.seedAspect);
  console.log(" ✓");
  return readFileSync(file);
}

/* ── Manifiesto ────────────────────────────────────────────────────────── */

async function buildManifest() {
  const entries = [];

  for (const style of Object.keys(STYLES)) {
    const dir = join(OUT, style);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir).sort()) {
      if (!file.endsWith(".webp") || file.startsWith("_")) continue;
      const name = file.replace(/\.webp$/, "");
      const [slotId, tone = null] = name.split("--");
      const slot = ALL_SLOTS.find((s) => s.id === slotId);
      if (!slot) continue;

      const full = join(dir, file);
      const meta = await sharp(full).metadata();
      entries.push({
        key: `${style}/${name}`,
        style,
        slot: slotId,
        tone,
        amenity: slot.amenity ?? null,
        src: `/media-ia/${style}/${file}`,
        width: meta.width,
        height: meta.height,
        alt: slot.alt,
        blurDataURL: await blurDataURL(full),
      });
    }
  }

  const header = `// ⚠️ ARCHIVO GENERADO — no editar a mano.
// Regenerar con: node scripts/generate-ia.mjs --manifest
//
// Manifiesto de los sets de ilustración generada. Vive aparte de
// src/content/media.generated.ts a propósito: aquello son los assets que
// entregó el cliente, esto es material nuestro y opcional.

export interface IaImage {
  key: string;
  style: string;
  slot: string;
  tone: string | null;
  amenity: string | null;
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
}

export const IA_IMAGES = ${JSON.stringify(entries, null, 2)} as const satisfies readonly IaImage[];
`;

  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, header, "utf8");
  console.log(`\n📄 manifiesto: ${entries.length} láminas → ${MANIFEST.replace(root, ".")}`);
}

/* ── Programa ──────────────────────────────────────────────────────────── */

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const valueOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : undefined;
};

const model = valueOf("--model") ?? DEFAULT_MODEL;
const force = has("--force");
const onlyStyle = valueOf("--style");
const onlySlots = (() => {
  // Atajo: las diez viñetas de amenidades son las que más se retocan.
  if (has("--vignettes")) return ALL_SLOTS.filter((s) => s.vignette).map((s) => s.id);
  const i = argv.indexOf("--only");
  if (i < 0) return null;
  return argv.slice(i + 1).filter((a) => !a.startsWith("--"));
})();

if (has("--manifest")) {
  await buildManifest();
  process.exit(0);
}

const styles = onlyStyle ? [onlyStyle] : Object.keys(STYLES);
let done = 0;
let failed = 0;

for (const style of styles) {
  if (!STYLES[style]) throw new Error(`Estilo desconocido: ${style}`);
  console.log(`\n══ ${STYLES[style].label} (${style}) · modelo ${model} ══`);

  const seed = await ensureSeed(style, model, force && !onlySlots);
  if (has("--seed")) continue;

  const jobs = plan(style).filter(
    (j) => !onlySlots || onlySlots.includes(j.slot.id),
  );

  for (const job of jobs) {
    const file = join(OUT, style, job.name + ".webp");
    if (existsSync(file) && !force) {
      console.log(`  · ${job.name} (ya existe)`);
      continue;
    }

    process.stdout.write(`  ⟳ ${job.name} …`);
    try {
      const raw = await generate({
        prompt: buildPrompt(style, job.slot, job.tone),
        aspect: job.slot.aspect,
        reference: seed,
        model,
      });
      await writeWebp(raw, file, job.slot.aspect);
      console.log(" ✓");
      done++;
    } catch (error) {
      console.log(` ✖ ${error.message}`);
      failed++;
    }
    await sleep(600); // margen para no golpear el límite de cuota
  }

  // El manifiesto se rehace al cerrar cada estilo, no solo al final: una tanda
  // completa son quince minutos, y hasta que el manifiesto no existe la página
  // no muestra NADA aunque las láminas ya estén en disco.
  await buildManifest();
}

console.log(`\n${done} generadas, ${failed} fallidas.`);
if (!has("--seed")) await buildManifest();
