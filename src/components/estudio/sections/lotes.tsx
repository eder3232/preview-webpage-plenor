"use client";

import Link from "next/link";
import { ArrowUpRight, Ruler } from "lucide-react";

import { LotFinder } from "@/components/shared/lot-finder";
import { Button } from "@/components/ui/button";
import {
  AREAS_DISCLAIMER,
  formatAreaShort,
  lotStats,
  parking,
  sectors,
  SIZE_BANDS,
} from "@/content/lotes";
import { Section, SectionHead, SReveal, SRevealGroup, SRevealItem } from "../ui";

/**
 * LOTES — tres variantes
 *
 * Es la sección donde se decide qué tan comercial quiere ser el sitio. De
 * "aquí hay 203 lotes, escríbenos" a "busca el tuyo ahora mismo".
 *
 * Ninguna de las tres declara precio ni estado de venta: no existen en el
 * material entregado. Si el proveedor del tour comparte su data de
 * disponibilidad, esta es la sección que la mostraría.
 */

const LEAD =
  "Desde " +
  formatAreaShort(lotStats.min) +
  " hasta " +
  formatAreaShort(lotStats.max) +
  ", con un promedio de " +
  formatAreaShort(lotStats.avg) +
  ". Más " +
  parking.count +
  " plazas de estacionamiento de " +
  parking.area +
  " m² cada una.";

const CIFRAS = [
  { value: String(lotStats.count), label: "lotes en total" },
  { value: formatAreaShort(lotStats.min), label: "el más pequeño" },
  { value: formatAreaShort(lotStats.max), label: "el más grande" },
  { value: formatAreaShort(lotStats.avg), label: "promedio" },
];

function Disclaimer() {
  return (
    <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <Ruler className="mt-0.5 size-3.5 shrink-0" />
      {AREAS_DISCLAIMER}
    </p>
  );
}

/* ==========================================================================
   1 · Cifras
   ========================================================================== */

export function LotesCifras() {
  return (
    <Section id="lotes" tone="oscuro">
      <div className="container-plenor">
        <SReveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow s-accent">Los lotes</span>
            <h2 className="s-display mt-4 text-4xl md:text-6xl">
              {lotStats.count} lotes,
              <br />
              siete sectores
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {LEAD}
            </p>
          </div>
          <Button asChild size="lg" className="gap-2 self-start md:self-auto">
            <Link href="/estudio/lotes">
              Ver el inventario completo
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </SReveal>

        <SRevealGroup
          as="ul"
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-4"
        >
          {CIFRAS.map((s) => (
            <SRevealItem as="li" key={s.label} className="bg-grafito p-5 md:p-7">
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </SRevealItem>
          ))}
        </SRevealGroup>
      </div>
    </Section>
  );
}

/* ==========================================================================
   2 · Buscador
   ========================================================================== */

export function LotesBuscador() {
  return (
    <Section id="lotes" tone="claro">
      <div className="container-plenor">
        <SectionHead
          eyebrow="Los lotes"
          title={
            <>
              Encuentra
              <br />
              el tuyo
            </>
          }
          lead={LEAD}
        />
        <SReveal className="mt-12 md:mt-16">
          <LotFinder compact />
        </SReveal>
      </div>
    </Section>
  );
}

/* ==========================================================================
   3 · Sectores
   ========================================================================== */

export function LotesSectores() {
  return (
    <Section id="lotes" tone="arena">
      <div className="container-plenor">
        <SectionHead
          eyebrow="Los lotes"
          title={
            <>
              Siete sectores,
              <br />
              siete caracteres
            </>
          }
          lead="El condominio se traza en forma de L. Cada sector tiene su propia relación con las amenidades, con la vía principal y con el borde del terreno."
        />

        <SRevealGroup
          as="ul"
          className="mt-14 grid gap-3 md:mt-20 md:grid-cols-2 lg:grid-cols-3"
        >
          {sectors.map((s) => (
            <SRevealItem
              as="li"
              key={s.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-baseline justify-between">
                <span className="s-display text-4xl">{s.id}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {s.count} lotes
                </span>
              </div>
              <p className="eyebrow s-accent mt-4">{s.position}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                {[
                  { k: "Desde", v: formatAreaShort(s.min) },
                  { k: "Promedio", v: formatAreaShort(s.avg) },
                  { k: "Hasta", v: formatAreaShort(s.max) },
                ].map((cell) => (
                  <div key={cell.k}>
                    <dt className="text-[11px] text-muted-foreground">{cell.k}</dt>
                    <dd className="mt-0.5 font-mono text-sm tabular-nums">
                      {cell.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </SRevealItem>
          ))}

          {/* Las tres bandas de tamaño, para cerrar la retícula de 7 + 1 */}
          <SRevealItem
            as="li"
            className="s-dark flex flex-col justify-between rounded-xl bg-grafito p-6"
          >
            <div>
              <p className="eyebrow s-accent">Tres formatos</p>
              <ul className="mt-4 flex flex-col gap-3">
                {(Object.keys(SIZE_BANDS) as (keyof typeof SIZE_BANDS)[]).map(
                  (key) => (
                    <li key={key} className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-arena-50">
                        {SIZE_BANDS[key].label}
                      </span>
                      <span className="font-mono text-xs text-arena-50/60">
                        {SIZE_BANDS[key].range}
                      </span>
                      <span className="font-mono text-sm tabular-nums text-arena-50">
                        {lotStats.bySize[key]}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <Button asChild size="sm" className="mt-6 w-full gap-2">
              <Link href="/estudio/lotes">
                Ver el inventario
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </SRevealItem>
        </SRevealGroup>

        <Disclaimer />
      </div>
    </Section>
  );
}
