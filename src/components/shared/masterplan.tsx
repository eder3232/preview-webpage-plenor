"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Move, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { amenities } from "@/content/amenidades";
import { img } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * MASTERPLAN INTERACTIVO
 *
 * Base: la planimetría cenital con los lotes vacíos (3840 × 1280 px), montada
 * sobre la fotografía aérea real del terreno.
 *
 * Los hotspots marcan las 10 amenidades. Sus coordenadas se midieron sobre la
 * propia imagen, en porcentaje, así que siguen siendo válidas si la
 * planimetría se re-exporta con otra resolución — pero NO si se re-encuadra.
 *
 * Lo que este componente deliberadamente NO hace: pintar el estado de venta de
 * cada lote. El plano usa cuatro tonos de la paleta sin leyenda que los
 * explique (ver docs/03 §6); mientras el cliente no confirme qué significan,
 * inventarlo sería publicar información comercial falsa.
 */

const HOTSPOTS: Record<string, { x: number; y: number }> = {
  "club-house": { x: 63.2, y: 36.5 },
  piscina: { x: 62.5, y: 43 },
  fogatas: { x: 62.2, y: 52 },
  parrillas: { x: 61, y: 60 },
  portico: { x: 43.7, y: 8 },
  juegos: { x: 47.5, y: 71.5 },
  multiusos: { x: 41.5, y: 78.5 },
  fronton: { x: 48.5, y: 80.5 },
  vias: { x: 25, y: 68 },
  cerco: { x: 75, y: 87 },
};

export function Masterplan({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const plan = img("planimetria");

  const selected = amenities.find((a) => a.slug === active) ?? null;

  // En móvil el plano no cabe: se abre centrado en el núcleo de amenidades en
  // vez de en el borde izquierdo, que es campo de cultivo.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    if (overflow > 0) el.scrollLeft = overflow * 0.55;
  }, []);

  return (
    <div className={cn("w-full", className)}>
      {/* ── Plano ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-grafito">
        <div
          ref={scroller}
          className="no-scrollbar overflow-x-auto overscroll-x-contain"
        >
          <div className="relative w-[900px] md:w-full">
            <Image
              src={plan.src}
              alt={plan.alt}
              width={plan.width}
              height={plan.height}
              placeholder="blur"
              blurDataURL={plan.blurDataURL}
              sizes="(max-width: 767px) 900px, 100vw"
              className="w-full"
            />

            {amenities.map((a) => {
              const pos = HOTSPOTS[a.slug];
              if (!pos) return null;
              const isActive = active === a.slug;
              return (
                <button
                  key={a.slug}
                  type="button"
                  onClick={() => setActive(isActive ? null : a.slug)}
                  aria-pressed={isActive}
                  aria-label={`${a.n} — ${a.name}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2",
                    "flex size-7 items-center justify-center rounded-full",
                    "font-mono text-[10px] font-semibold tabular-nums",
                    "ring-2 ring-white/70 transition-all duration-200",
                    "hover:scale-125 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ocre",
                    isActive
                      ? "scale-125 bg-grafito text-ocre ring-ocre"
                      : "bg-ocre text-grafito",
                  )}
                >
                  {a.n}
                  {!isActive && (
                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-ocre/50 [animation-duration:3s]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-grafito/80 px-3 py-1 text-[11px] text-arena-50 md:hidden">
          <Move className="size-3" />
          Desliza el plano
        </p>
      </div>

      {/* ── Panel de la amenidad seleccionada ───────────────────────────── */}
      {selected ? (
        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center md:gap-6 md:p-5">
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg md:aspect-[4/3] md:w-56">
            <Image
              src={img(selected.image).src}
              alt={img(selected.image).alt}
              fill
              sizes="(max-width: 767px) 100vw, 224px"
              placeholder="blur"
              blurDataURL={img(selected.image).blurDataURL}
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow text-ocre-600">Amenidad {selected.n}</span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">
                  {selected.name}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="-mr-1 -mt-1 size-8 shrink-0"
              >
                <X className="size-4" />
              </Button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {selected.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {amenities.map((a) => (
            <button
              key={a.slug}
              type="button"
              onClick={() => setActive(a.slug)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-grafito-500"
            >
              <span className="font-mono text-muted-foreground">{a.n}</span>{" "}
              <span className="font-medium">{a.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
