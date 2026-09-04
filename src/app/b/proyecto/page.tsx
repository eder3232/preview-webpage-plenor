import Image from "next/image";
import type { Metadata } from "next";

import { CtaBand, PageHero, StatGrid, projectStats } from "@/components/b/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { siteConfig } from "@/config/site";
import { businessUnits, keyMessage, purpose, values, vision } from "@/content/copy";
import { img } from "@/content/media";

export const metadata: Metadata = {
  title: "El proyecto",
  description:
    "Residencial Aonami en Punta de Bombón: ubicación, cifras del proyecto y quién lo desarrolla.",
};

export default function ProyectoB() {
  const casa = img("casa-tipo-piscina");
  const vias = img("v-vias");

  return (
    <>
      <PageHero
        eyebrow="El proyecto"
        title="Un condominio de playa con planificación urbana detrás"
        description={`${siteConfig.project.totalLots} lotes en ${siteConfig.project.location}, sobre la pista asfaltada ${siteConfig.project.accessRoad}.`}
        image="general-club"
      />

      {/* ── Cifras ───────────────────────────────────────────────────────── */}
      <section className="container-plenor relative z-10 -mt-8 md:-mt-10">
        <StatGrid items={projectStats} />
      </section>

      {/* ── Ubicación ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-plenor grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <span className="eyebrow text-ocre-600">La ubicación</span>
            <h2 className="display mt-3 text-3xl md:text-4xl">
              A dos minutos de todo
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              Punta de Bombón está en la provincia de Islay, en la costa de
              Arequipa. Aonami se ubica sobre la vía{" "}
              {siteConfig.project.accessRoad}, asfaltada de punta a punta: dos
              minutos hasta el pueblo por un extremo, dos minutos hasta la playa
              por el otro. Sin trocha y sin desvíos.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border">
              {siteConfig.project.distances.map((d) => (
                <div key={d.label} className="bg-card p-5">
                  <dt className="text-xs text-muted-foreground">A {d.label}</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={casa.src}
                alt={casa.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={casa.blurDataURL}
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={vias.src}
                alt={vias.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={vias.blurDataURL}
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quién desarrolla ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="container-plenor">
          <Reveal className="max-w-3xl">
            <span className="eyebrow text-ocre-600">Quién lo desarrolla</span>
            <h2 className="display mt-3 text-3xl md:text-5xl">Plenor</h2>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {keyMessage.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
            {businessUnits.map((u) => (
              <RevealItem
                as="li"
                key={u.name}
                className="rounded-xl border border-border p-5"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  Plenor {u.name.toLowerCase()}
                </h3>
                <p className="mt-1 text-xs font-medium text-ocre-600">
                  {u.signature}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {u.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12 grid gap-8 rounded-xl bg-secondary/60 p-6 md:grid-cols-2 md:p-8">
            <div>
              <h3 className="eyebrow text-muted-foreground">Propósito</h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base">{purpose}</p>
            </div>
            <div>
              <h3 className="eyebrow text-muted-foreground">Visión</h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base">{vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Valores ──────────────────────────────────────────────────────── */}
      <section className="on-grafito py-16 md:py-24">
        <div className="container-plenor">
          <Reveal>
            <span className="eyebrow text-ocre">Valores</span>
            <h2 className="display mt-3 max-w-xl text-3xl md:text-4xl">
              Cómo trabajamos
            </h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <RevealItem as="li" key={v.name}>
                <span className="font-mono text-xs text-ocre">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {v.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
