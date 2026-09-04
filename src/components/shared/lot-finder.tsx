"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Ruler, Search, X } from "lucide-react";

import { WhatsappIcon } from "@/components/shared/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { whatsappUrl } from "@/config/site";
import {
  AREAS_DISCLAIMER,
  formatArea,
  formatPerimeter,
  lots,
  sectors,
  SIZE_BANDS,
  type Lot,
  type LotSize,
  type SectorId,
} from "@/content/lotes";
import { cn } from "@/lib/utils";

/**
 * BUSCADOR DE LOTES
 *
 * Los 203 lotes con área y perímetro. No muestra precio ni estado de venta
 * porque ninguno de los dos existe en el material entregado: el plano pinta
 * los lotes en cuatro tonos pero no trae leyenda que los explique. La acción
 * de cada lote es consultar por WhatsApp con el código ya escrito.
 *
 * Son 203 filas: no hace falta virtualizar, pero sí que el filtrado sea
 * inmediato, por eso todo vive en memoria.
 */

type Sort = "area-asc" | "area-desc" | "codigo";

const SORTS: { value: Sort; label: string }[] = [
  { value: "codigo", label: "Por código" },
  { value: "area-asc", label: "Menor área" },
  { value: "area-desc", label: "Mayor área" },
];

export function LotFinder({ compact = false }: { compact?: boolean }) {
  const [sectorFilter, setSectorFilter] = useState<SectorId[]>([]);
  const [sizeFilter, setSizeFilter] = useState<LotSize[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("codigo");
  const [visible, setVisible] = useState(compact ? 24 : 60);

  const filtered = useMemo(() => {
    const q = query.trim().toUpperCase();
    const result = lots.filter((lot) => {
      if (sectorFilter.length && !sectorFilter.includes(lot.sector)) return false;
      if (sizeFilter.length && !sizeFilter.includes(lot.size)) return false;
      if (q && !lot.id.includes(q)) return false;
      return true;
    });

    switch (sort) {
      case "area-asc":
        return result.sort((a, b) => a.area - b.area);
      case "area-desc":
        return result.sort((a, b) => b.area - a.area);
      default:
        return result;
    }
  }, [sectorFilter, sizeFilter, query, sort]);

  const hasFilters = sectorFilter.length > 0 || sizeFilter.length > 0 || query !== "";

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setVisible(compact ? 24 : 60);
  };

  const reset = () => {
    setSectorFilter([]);
    setSizeFilter([]);
    setQuery("");
    setVisible(compact ? 24 : 60);
  };

  const shown = filtered.slice(0, visible);
  const totalArea = filtered.reduce((s, l) => s + l.area, 0);

  return (
    <div className="w-full">
      {/* ── Filtros ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(compact ? 24 : 60);
              }}
              placeholder="Buscar lote (ej. C-12)"
              aria-label="Buscar lote por código"
              className="bg-card pl-9"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {SORTS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSort(s.value)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  sort === s.value
                    ? "bg-grafito text-arena-50"
                    : "text-muted-foreground hover:bg-secondary",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sectores */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-muted-foreground">Sector</span>
          {sectors.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(sectorFilter, s.id, setSectorFilter)}
              aria-pressed={sectorFilter.includes(s.id)}
              title={`${s.name} — ${s.count} lotes · ${s.position}`}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                sectorFilter.includes(s.id)
                  ? "border-grafito bg-grafito text-arena-50"
                  : "border-border bg-card hover:border-grafito-500",
              )}
            >
              {s.id}
              <span className="ml-1.5 font-normal text-muted-foreground/80">
                {s.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bandas de tamaño */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-muted-foreground">Tamaño</span>
          {(Object.keys(SIZE_BANDS) as LotSize[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => toggle(sizeFilter, key, setSizeFilter)}
              aria-pressed={sizeFilter.includes(key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                sizeFilter.includes(key)
                  ? "border-grafito bg-grafito text-arena-50"
                  : "border-border bg-card hover:border-grafito-500",
              )}
            >
              {SIZE_BANDS[key].label}
              <span className="ml-1.5 font-normal text-muted-foreground/80">
                {SIZE_BANDS[key].range}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Resumen ─────────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3">
        <p className="text-sm">
          <strong className="font-semibold">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "lote" : "lotes"}
          {filtered.length > 0 && (
            <span className="text-muted-foreground">
              {" · "}
              {formatArea(totalArea)} en total
            </span>
          )}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={reset} className="h-8 gap-1.5">
            <X className="size-3.5" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* ── Resultados ──────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No hay lotes con esos criterios. Prueba ampliando el rango de tamaño.
        </p>
      ) : (
        <>
          {/* Móvil: tarjetas */}
          <ul className="mt-4 grid grid-cols-2 gap-2 md:hidden">
            {shown.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </ul>

          {/* Desktop: tabla */}
          <div className="mt-2 hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th scope="col" className="py-2 font-medium">Lote</th>
                  <th scope="col" className="py-2 font-medium">Sector</th>
                  <th scope="col" className="py-2 text-right font-medium">Área</th>
                  <th scope="col" className="py-2 text-right font-medium">Perímetro</th>
                  <th scope="col" className="py-2 font-medium">Tamaño</th>
                  <th scope="col" className="py-2 text-right font-medium">
                    <span className="sr-only">Consultar</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((lot) => (
                  <tr
                    key={lot.id}
                    className="border-t border-border transition-colors hover:bg-secondary/60"
                  >
                    <td className="py-2.5 font-mono font-medium">{lot.id}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {sectors.find((s) => s.id === lot.sector)?.position}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums">
                      {formatArea(lot.area)}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums text-muted-foreground">
                      {formatPerimeter(lot.perimeter)}
                    </td>
                    <td className="py-2.5">
                      <Badge variant="secondary" className="font-normal">
                        {SIZE_BANDS[lot.size].label}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      <a
                        href={askAboutLot(lot)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-grafito underline-offset-4 hover:underline"
                      >
                        Consultar
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visible < filtered.length && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setVisible((v) => v + 60)}
                className="bg-card"
              >
                Ver {Math.min(60, filtered.length - visible)} lotes más
              </Button>
            </div>
          )}
        </>
      )}

      <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Ruler className="mt-0.5 size-3.5 shrink-0" />
        {AREAS_DISCLAIMER}
      </p>
    </div>
  );
}

function askAboutLot(lot: Lot) {
  return whatsappUrl(
    `Hola, quiero información sobre el lote ${lot.id} de Residencial Aonami ` +
      `(${formatArea(lot.area)}).`,
  );
}

function LotCard({ lot }: { lot: Lot }) {
  return (
    <li className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm font-semibold">{lot.id}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {SIZE_BANDS[lot.size].label}
        </span>
      </div>
      <p className="mt-1 font-mono text-lg tabular-nums">{formatArea(lot.area)}</p>
      <p className="text-xs text-muted-foreground">
        Perímetro {formatPerimeter(lot.perimeter)}
      </p>
      <a
        href={askAboutLot(lot)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 flex items-center justify-center gap-1.5 rounded-md bg-secondary py-1.5 text-xs font-semibold"
      >
        <WhatsappIcon className="size-3.5" />
        Consultar
      </a>
    </li>
  );
}
