import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, LayoutGrid, ScrollText } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";
import { img } from "@/content/media";
import { lotStats } from "@/content/lotes";

export const metadata: Metadata = {
  title: "Dos propuestas — Residencial Aonami",
  description:
    "Selector interno de las dos propuestas de sitio web para Residencial Aonami.",
};

/**
 * SELECTOR DE PROPUESTAS
 *
 * Pantalla de presentación, no parte del sitio final. Existe para que el
 * cliente pueda ver las dos propuestas una al lado de la otra y decir qué le
 * gusta de cada una. Cuando se elija una dirección, esta página se reemplaza
 * por la home de la propuesta ganadora.
 */

const PROPOSALS = [
  {
    slug: "/a",
    key: "A",
    name: "Verano",
    concept: "Landing de una sola página",
    claim: "Donde el verano se convierte en forma de vida",
    image: "fogatas",
    icon: ScrollText,
    pitch:
      "Vende el estilo de vida. Una sola página que se recorre de arriba abajo, con el video a pantalla completa, tipografía grande y mucho aire. El plano y los lotes aparecen al final, cuando la persona ya se enamoró del lugar.",
    traits: [
      "Una sola página + inventario de lotes aparte",
      "Video en el hero, scroll cinematográfico",
      "Fondo claro arena sillar, acentos en ocre",
      "Menos datos, más atmósfera",
    ],
  },
  {
    slug: "/b",
    key: "B",
    name: "Plano",
    concept: "Sitio de varias secciones",
    claim: "203 lotes. 10 amenidades. Una sola decisión.",
    image: "planimetria-casas",
    icon: LayoutGrid,
    pitch:
      "Vende la inversión. Un sitio con navegación clara donde el masterplan y el buscador de lotes son los protagonistas desde el primer momento. Pensado para quien ya está comparando proyectos y quiere datos.",
    traits: [
      "Seis secciones con navegación permanente",
      "Masterplan y buscador de lotes al frente",
      "Fondo grafito, estructura de fichas",
      "Más datos, más rutas a la conversión",
    ],
  },
] as const;

export default function ProposalPicker() {
  return (
    <main className="on-grafito flex min-h-dvh flex-col">
      <header className="container-plenor flex items-center justify-between py-6">
        <Logo as="lockup" variant="light" className="h-7 md:h-8" priority />
        <span className="eyebrow text-muted-foreground">Propuestas de sitio web</span>
      </header>

      <div className="container-plenor flex flex-1 flex-col justify-center py-8 md:py-14">
        <div className="max-w-2xl">
          <h1 className="display text-4xl md:text-6xl">
            Dos caminos para
            <br />
            <span className="text-ocre">Residencial Aonami</span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Mismo contenido, misma marca, mismos {lotStats.count} lotes. Cambia la
            forma de contarlo. Entra a las dos, compáralas y dinos qué te gusta de
            cada una: la versión final puede mezclarlas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
          {PROPOSALS.map((p) => {
            const cover = img(p.image);
            return (
              <Link
                key={p.slug}
                href={p.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-grafito-700/40 transition-colors hover:border-ocre/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={cover.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-grafito via-grafito/20 to-transparent" />
                  <div className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-ocre font-semibold text-grafito">
                    {p.key}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-center gap-2 text-ocre">
                    <p.icon className="size-3.5" />
                    <span className="eyebrow">{p.concept}</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    Propuesta {p.key} · {p.name}
                  </h2>
                  <p className="mt-1 text-sm italic text-arena/70">“{p.claim}”</p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.pitch}
                  </p>

                  <ul className="mt-5 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    {p.traits.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ocre" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-ocre px-4 py-2 text-sm font-semibold text-grafito transition-transform group-hover:translate-x-1">
                    Ver propuesta {p.key}
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="container-plenor border-t border-white/10 py-5 text-xs text-muted-foreground">
        <p>
          Material de presentación interno · {siteConfig.developer} ·{" "}
          <Link href="/libro-de-reclamaciones" className="underline underline-offset-2">
            Libro de Reclamaciones
          </Link>
        </p>
      </footer>
    </main>
  );
}
