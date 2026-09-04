/**
 * Genera el favicon y el ícono de iOS a partir del isotipo "P".
 * El PNG entregado es arte negro sobre transparencia; acá se recolorea a
 * arena sillar y se monta sobre grafito para que se lea en la pestaña del
 * navegador con cualquier tema.
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public/media/plenor-isotipo.png");

async function build(size, inner, out, radius) {
  // Hay que materializar el redimensionado: metadata() sobre un pipeline sin
  // ejecutar devuelve las medidas del original, no las de la salida.
  const glyph = await sharp(SRC)
    .resize({ width: inner, height: inner, fit: "inside" })
    .png()
    .toBuffer();
  const { width, height } = await sharp(glyph).metadata();
  const alpha = await sharp(glyph).ensureAlpha().extractChannel("alpha").toBuffer();
  const light = await sharp({
    create: { width, height, channels: 3, background: "#FAF8F5" },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();

  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#1F2328"/></svg>`,
  );

  await sharp(mask)
    .composite([{ input: light, gravity: "center" }])
    .png()
    .toFile(out);
  console.log(`→ ${out.replace(root, ".")}  ${size}×${size}`);
}

await build(512, 300, join(root, "src/app/icon.png"), 96);
await build(180, 108, join(root, "src/app/apple-icon.png"), 0);
