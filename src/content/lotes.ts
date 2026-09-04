import { LOT_ROWS } from "./lotes.data";

/**
 * INVENTARIO DE LOTES — Residencial Aonami
 *
 * Los datos vienen de docs/03-aonami-plano-comercial.md, transcritos del plano
 * comercial `Aonami AMENIDADES.pdf` (fechado 24-ago-2026).
 *
 * ⚠️ Las áreas son REFERENCIALES: se leyeron del plano renderizado, no del
 *    archivo CAD original. Ver `AREAS_DISCLAIMER`. No hay precios en el
 *    material entregado por el cliente, por eso el inventario no los incluye.
 *    Tampoco hay estado de venta: el plano pinta los lotes en cuatro tonos
 *    pero no trae leyenda.
 */

export type SectorId = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type LotSize = "compacto" | "familiar" | "premium";

export interface Lot {
  id: string;
  sector: SectorId;
  number: number;
  /** Área en m². */
  area: number;
  /** Perímetro en metros lineales. */
  perimeter: number;
  size: LotSize;
}

export const SIZE_BANDS: Record<
  LotSize,
  { label: string; range: string; min: number; max: number; description: string }
> = {
  compacto: {
    label: "Compacto",
    range: "90 – 110 m²",
    min: 0,
    max: 110,
    description: "El formato más eficiente. Ideal como casa de playa de fin de semana.",
  },
  familiar: {
    label: "Familiar",
    range: "110 – 140 m²",
    min: 110,
    max: 140,
    description: "El formato más común del proyecto. Espacio para jardín y estacionamiento propio.",
  },
  premium: {
    label: "Premium",
    range: "más de 140 m²",
    min: 140,
    max: Infinity,
    description: "Esquinas y remates de manzana, con dos o tres frentes libres.",
  },
};

function classify(area: number): LotSize {
  if (area < 110) return "compacto";
  if (area < 140) return "familiar";
  return "premium";
}

export const lots: Lot[] = LOT_ROWS.map(([sector, number, area, perimeter]) => ({
  id: `${sector}-${number}`,
  sector: sector as SectorId,
  number,
  area,
  perimeter,
  size: classify(area),
}));

// ─────────────────────────────────────────────────────────────────────────────
// Sectores
// ─────────────────────────────────────────────────────────────────────────────

export interface Sector {
  id: SectorId;
  name: string;
  /** Dónde está dentro del trazado en "L". */
  position: string;
  description: string;
  count: number;
  min: number;
  max: number;
  avg: number;
  totalArea: number;
}

const SECTOR_META: Record<SectorId, { position: string; description: string }> = {
  A: {
    position: "Barra sur",
    description:
      "Manzana de doble frente sobre la vía principal, con el parque deportivo a un extremo.",
  },
  B: {
    position: "Cuña noroeste",
    description:
      "Sector corto, contiguo al club house. Incluye algunos de los lotes de esquina más grandes.",
  },
  C: {
    position: "Núcleo central",
    description:
      "El sector que rodea la piscina, el club house y la zona de fogatas. El corazón del proyecto.",
  },
  D: {
    position: "Borde noreste",
    description:
      "Frente a la vía principal. El sector más pequeño y el de mayor área promedio.",
  },
  E: {
    position: "Barra sur, frente a A",
    description:
      "El sector más grande del proyecto. Recorre todo el eje este-oeste sobre la Calle 7.",
  },
  F: {
    position: "Barra este",
    description:
      "Eje norte-sur completo, el más homogéneo: casi todos los lotes entre 113 y 165 m².",
  },
  G: {
    position: "Cul-de-sac norte",
    description:
      "Remate del proyecto en retorno circular. El sector más tranquilo y con el lote más grande.",
  },
};

const SECTOR_IDS: SectorId[] = ["A", "B", "C", "D", "E", "F", "G"];

export const sectors: Sector[] = SECTOR_IDS.map((id) => {
  const group = lots.filter((l) => l.sector === id);
  const areas = group.map((l) => l.area);
  const totalArea = areas.reduce((a, b) => a + b, 0);
  return {
    id,
    name: `Sector ${id}`,
    ...SECTOR_META[id],
    count: group.length,
    min: Math.min(...areas),
    max: Math.max(...areas),
    avg: totalArea / group.length,
    totalArea,
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// Totales
// ─────────────────────────────────────────────────────────────────────────────

const allAreas = lots.map((l) => l.area);

export const lotStats = {
  count: lots.length,
  min: Math.min(...allAreas),
  max: Math.max(...allAreas),
  avg: allAreas.reduce((a, b) => a + b, 0) / lots.length,
  totalArea: allAreas.reduce((a, b) => a + b, 0),
  bySize: {
    compacto: lots.filter((l) => l.size === "compacto").length,
    familiar: lots.filter((l) => l.size === "familiar").length,
    premium: lots.filter((l) => l.size === "premium").length,
  },
} as const;

/** Plazas de estacionamiento, todas idénticas (doc 03 §5). */
export const parking = {
  count: 129,
  area: 15,
  perimeter: 17,
  dimensions: "2.50 × 6.00 m",
} as const;

export const AREAS_DISCLAIMER =
  "Áreas y perímetros referenciales tomados del plano comercial. " +
  "Las medidas definitivas son las que consten en el plano de habilitación " +
  "urbana y en la minuta de compraventa.";

// ─────────────────────────────────────────────────────────────────────────────
// Utilidades de formato
// ─────────────────────────────────────────────────────────────────────────────

const nf = new Intl.NumberFormat("es-PE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const nf0 = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });

export const formatArea = (n: number) => `${nf.format(n)} m²`;
export const formatAreaShort = (n: number) => `${nf0.format(n)} m²`;
export const formatPerimeter = (n: number) => `${nf.format(n)} ml`;
