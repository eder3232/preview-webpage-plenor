import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Info } from "lucide-react";

import { CtaBand, PageHero } from "@/components/b/page-shell";
import { Masterplan } from "@/components/shared/masterplan";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import {
  formatArea,
  formatAreaShort,
  lotStats,
  parking,
  sectors,
} from "@/content/lotes";
import { img } from "@/content/media";

export const metadata: Metadata = {
  title: "Masterplan",
  description:
    "El trazado de Residencial Aonami: siete sectores, 203 lotes, 129 estacionamientos y las 10 amenidades ubicadas en el plano.",
};

export default function MasterplanB() {
  const casas = img("planimetria-casas");

  return (
    <>
      <PageHero
        eyebrow="Masterplan"
        title="El proyecto completo, en planta"
        description="Toca cualquiera de los diez puntos del plano para ubicar las amenidades."
        image="general-piscina"
      />

      <section className="container-plenor py-12 md:py-16">
        <Reveal>
          <Masterplan />
        </Reveal>

        {/* ── Tabla de sectores ────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Los siete sectores
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            El proyecto tiene forma de “L”: una barra larga de este a oeste
            (sectores A y E) con el parque deportivo insertado a media longitud,
            una cuña alrededor del club house (B, C y D) y una barra norte-sur
            que remata en un retorno circular (F y G).
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-medium">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Ubicación</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Lotes</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Mínimo</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Máximo</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Promedio</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Área total</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold">{s.name}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {s.position}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">
                      {s.count}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {formatAreaShort(s.min)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {formatAreaShort(s.max)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">
                      {formatAreaShort(s.avg)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {formatArea(s.totalArea)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-secondary/60 font-semibold">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {lotStats.count}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {formatAreaShort(lotStats.min)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {formatAreaShort(lotStats.max)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {formatAreaShort(lotStats.avg)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {formatArea(lotStats.totalArea)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/b/lotes">
                Ver los {lotStats.count} lotes uno por uno
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* ── Estacionamientos ─────────────────────────────────────────── */}
        <Reveal className="mt-14 rounded-xl border border-border bg-card p-5 md:p-7">
          <h2 className="text-lg font-semibold tracking-tight">
            {parking.count} estacionamientos
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Una franja continua de plazas a lo largo de todo el perímetro
            interior, entre la vía adoquinada y el cerco. Todas idénticas:{" "}
            {parking.area} m² y {parking.perimeter} ml, es decir{" "}
            {parking.dimensions}.
          </p>
        </Reveal>

        {/* ── Tour virtual ─────────────────────────────────────────────── */}
        <Reveal className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Cómo se verá construido
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            La misma planta con todas las viviendas levantadas.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            <Image
              src={casas.src}
              alt={casas.alt}
              width={casas.width}
              height={casas.height}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={casas.blurDataURL}
              className="w-full"
            />
          </div>
        </Reveal>

        {/* ── Nota honesta sobre el código de color ────────────────────── */}
        <div className="mt-8 flex gap-3 rounded-xl border border-border p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            El plano comercial pinta los lotes en varios tonos, pero no incluye
            una leyenda que explique qué significan, así que este sitio no los
            interpreta como estado de venta. Para conocer la disponibilidad
            actualizada, consúltala con el equipo de ventas.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
