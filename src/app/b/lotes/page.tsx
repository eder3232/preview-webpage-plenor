import type { Metadata } from "next";

import { CtaBand, PageHero, StatGrid } from "@/components/b/page-shell";
import { LotFinder } from "@/components/shared/lot-finder";
import { Reveal } from "@/components/shared/reveal";
import {
  formatArea,
  formatAreaShort,
  lotStats,
  parking,
  SIZE_BANDS,
} from "@/content/lotes";

export const metadata: Metadata = {
  title: "Los lotes",
  description:
    "Inventario completo de los 203 lotes de Residencial Aonami, con área y perímetro. Filtra por sector y por tamaño.",
};

export default function LotesB() {
  return (
    <>
      <PageHero
        eyebrow="Lotes"
        title={`Los ${lotStats.count} lotes, con área y perímetro`}
        description="Filtra por sector o por tamaño. Al encontrar uno que te interese, consúltanos: el mensaje de WhatsApp ya va con el código escrito."
        image="v-vias"
      />

      <section className="container-plenor relative z-10 -mt-8 md:-mt-10">
        <StatGrid
          items={[
            { value: `${lotStats.count}`, label: "Lotes" },
            { value: formatAreaShort(lotStats.min), label: "El más pequeño" },
            { value: formatAreaShort(lotStats.max), label: "El más grande" },
            {
              value: formatArea(lotStats.totalArea),
              label: "Área vendible total",
            },
          ]}
        />
      </section>

      {/* ── Bandas de tamaño ─────────────────────────────────────────────── */}
      <section className="container-plenor py-14 md:py-20">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Tres formatos
          </h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {(Object.keys(SIZE_BANDS) as (keyof typeof SIZE_BANDS)[]).map((key) => (
              <li
                key={key}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {SIZE_BANDS[key].label}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {lotStats.bySize[key]} lotes
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-ocre-600">
                  {SIZE_BANDS[key].range}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {SIZE_BANDS[key].description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── Buscador ───────────────────────────────────────────────────── */}
        <Reveal className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Inventario completo
          </h2>
          <div className="mt-6">
            <LotFinder />
          </div>
        </Reveal>

        <p className="mt-10 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          Además de los lotes, el proyecto contempla{" "}
          <strong className="font-semibold text-foreground">
            {parking.count} plazas de estacionamiento
          </strong>{" "}
          de {parking.area} m² cada una ({parking.dimensions}), distribuidas a lo
          largo del perímetro interior.
        </p>
      </section>

      <CtaBand
        title="¿Ya tienes uno en mente?"
        body="Escríbenos con el código del lote y te confirmamos si sigue disponible, con el precio y el plan de pagos."
      />
    </>
  );
}
