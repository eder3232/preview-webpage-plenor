import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { LotFinder } from "@/components/shared/lot-finder";
import { Masterplan } from "@/components/shared/masterplan";
import { Reveal } from "@/components/shared/reveal";
import { formatAreaShort, lotStats, parking, sectors } from "@/content/lotes";

export const metadata: Metadata = {
  title: "Los lotes",
  description:
    "Inventario completo de los 203 lotes de Residencial Aonami: área y perímetro por sector.",
};

export default function LotesA() {
  return (
    <div className="bg-arena-50 pt-16 md:pt-20">
      <div className="container-plenor py-14 md:py-20">
        <Link
          href="/a"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Volver al proyecto
        </Link>

        <Reveal className="mt-8 max-w-3xl">
          <span className="eyebrow text-ocre-600">Inventario</span>
          <h1 className="display mt-4 text-4xl md:text-6xl">
            Los {lotStats.count} lotes,
            <br />
            uno por uno
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Todo el proyecto: {formatAreaShort(lotStats.totalArea)} vendibles
            repartidos en {sectors.length} sectores, desde{" "}
            {formatAreaShort(lotStats.min)} hasta {formatAreaShort(lotStats.max)}.
            Más {parking.count} plazas de estacionamiento de {parking.area} m².
          </p>
        </Reveal>

        {/* Sectores */}
        <Reveal className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">
            Cómo se organiza
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <li
                key={s.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold">{s.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {s.count} lotes
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-ocre-600">
                  {s.position}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <p className="mt-3 border-t border-border pt-2 font-mono text-xs tabular-nums text-muted-foreground">
                  {formatAreaShort(s.min)} – {formatAreaShort(s.max)} · prom.{" "}
                  {formatAreaShort(s.avg)}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Plano */}
        <Reveal className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">
            Dónde está cada cosa
          </h2>
          <Masterplan className="mt-5" />
        </Reveal>

        {/* Buscador */}
        <Reveal className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Busca tu lote</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Filtra por sector o por tamaño. Al encontrar uno que te interese,
            consúltanos por WhatsApp: el mensaje ya va con el código escrito.
          </p>
          <div className="mt-6">
            <LotFinder />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
