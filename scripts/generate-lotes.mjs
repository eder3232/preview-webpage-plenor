/**
 * Genera src/content/lotes.data.ts a partir de las tablas de
 * docs/03-aonami-plano-comercial.md.
 *
 * Se genera en vez de escribirse a mano para que el markdown siga siendo la
 * única fuente de verdad: si se corrigen áreas contra el .ai/CAD original,
 * basta con editar el doc y volver a correr `pnpm gen:lotes`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "docs", "03-aonami-plano-comercial.md");
const OUT = join(root, "src", "content", "lotes.data.ts");

const md = readFileSync(SRC, "utf8");

/** `| A-1 | 136.22 | 47.39 |` — puede aparecer dos veces en la misma fila. */
const CELL = /\|\s*([A-G])-(\d{1,2})\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|/g;

const lots = [];
const seen = new Set();

for (const line of md.split("\n")) {
  if (!line.startsWith("|")) continue;
  for (const m of line.matchAll(CELL)) {
    const [, sector, num, area, perimeter] = m;
    const id = `${sector}-${Number(num)}`;
    if (seen.has(id)) throw new Error(`Lote duplicado en el markdown: ${id}`);
    seen.add(id);
    lots.push([sector, Number(num), Number(area), Number(perimeter)]);
  }
}

// Orden natural: sector, luego número.
lots.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0].localeCompare(b[0])));

// ---- Validaciones contra los totales declarados en el doc -----------------
const EXPECTED = { A: 24, B: 15, C: 39, D: 12, E: 53, F: 42, G: 18 };
const counts = {};
for (const [s] of lots) counts[s] = (counts[s] ?? 0) + 1;

const problems = [];
for (const [sector, expected] of Object.entries(EXPECTED)) {
  const got = counts[sector] ?? 0;
  if (got !== expected) {
    problems.push(`Sector ${sector}: se esperaban ${expected} lotes, se leyeron ${got}`);
  }
  // La numeración debe ser contigua de 1 a N.
  const nums = lots.filter((l) => l[0] === sector).map((l) => l[1]);
  for (let i = 1; i <= expected; i++) {
    if (!nums.includes(i)) problems.push(`Falta el lote ${sector}-${i}`);
  }
}
if (lots.length !== 203) {
  problems.push(`Total de lotes: se esperaban 203, se leyeron ${lots.length}`);
}
if (problems.length) {
  console.error("✖ El parseo no cuadra con los totales del documento:");
  for (const p of problems) console.error("  · " + p);
  process.exit(1);
}

const totalArea = lots.reduce((sum, l) => sum + l[2], 0);
console.log(
  `✔ ${lots.length} lotes · ${totalArea.toFixed(2)} m² · ` +
    `min ${Math.min(...lots.map((l) => l[2]))} · max ${Math.max(...lots.map((l) => l[2]))}`,
);

// ---- Emisión --------------------------------------------------------------
const rows = lots
  .map(([s, n, a, p]) => `  ["${s}", ${n}, ${a}, ${p}],`)
  .join("\n");

const out = `// ⚠️ ARCHIVO GENERADO — no editar a mano.
// Fuente: docs/03-aonami-plano-comercial.md
// Regenerar con: pnpm gen:lotes
//
// Formato de cada fila: [sector, número, área en m², perímetro en ml]

export type LotRow = readonly [string, number, number, number];

export const LOT_ROWS: readonly LotRow[] = [
${rows}
] as const;
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out, "utf8");
console.log(`→ escrito ${OUT.replace(root, ".")}`);
