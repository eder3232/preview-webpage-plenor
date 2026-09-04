import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { CtaBand, StatGrid, projectStats } from "@/components/b/page-shell";
import { WhatsappIcon } from "@/components/shared/brand-icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { PlayBadge, VideoModal } from "@/components/shared/video";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappUrl } from "@/config/site";
import { amenities } from "@/content/amenidades";
import { claims, sellingPoints } from "@/content/copy";
import { formatAreaShort, lotStats, sectors } from "@/content/lotes";
import { img, video } from "@/content/media";

/**
 * PROPUESTA B — "Plano"
 *
 * Home que funciona como índice: cada bloque resume una sección y lleva a
 * ella. El objetivo es que en la primera pantalla ya se vean las cifras del
 * proyecto, y que desde cualquier punto haya un camino corto a cotizar.
 */
export default function HomeB() {
  const hero = img("aereo");
  const plan = img("planimetria-3d");
  const institucional = video("institucional");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[20rem] w-full md:h-[62vh]">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={hero.blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grafito via-grafito/55 to-grafito/20" />
          <div className="on-image container-plenor absolute inset-x-0 bottom-0 pb-8 md:pb-14">
            <span className="eyebrow text-ocre">
              {siteConfig.project.location}
            </span>
            <h1 className="display mt-3 max-w-3xl text-4xl text-arena-50 md:text-7xl">
              {lotStats.count} lotes. {siteConfig.project.amenitiesCount}{" "}
              amenidades. Una sola decisión.
            </h1>
          </div>
        </div>

        {/* Ficha de datos, montada sobre el borde de la imagen */}
        <div className="container-plenor relative -mt-8 md:-mt-12">
          <StatGrid items={projectStats} />
        </div>
      </section>

      {/* ── Propuesta de valor ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-plenor grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <Reveal>
            <span className="eyebrow text-ocre-600">Por qué Aonami</span>
            <h2 className="display mt-4 text-3xl md:text-4xl">
              {claims.mainSupport}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              Un condominio cerrado en Punta de Bombón, sobre la pista asfaltada{" "}
              {siteConfig.project.accessRoad}: a dos minutos del pueblo y a dos
              minutos de la playa. Desarrollado por Plenor, que integra
              arquitectura, inmobiliaria y construcción en un mismo equipo.
            </p>
            <Button asChild variant="outline" className="mt-7 gap-2 bg-card">
              <Link href="/b/proyecto">
                Conoce el proyecto
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <RevealGroup as="ul" className="flex flex-col divide-y divide-border">
            {sellingPoints.map((p) => (
              <RevealItem as="li" key={p.title} className="flex gap-4 py-5 first:pt-0">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ocre">
                  <Check className="size-3.5 text-grafito" />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Amenidades ───────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="container-plenor">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow text-ocre-600">Amenidades</span>
              <h2 className="display mt-3 text-3xl md:text-5xl">
                Las diez, sin letra chica
              </h2>
            </div>
            <Button asChild variant="ghost" className="gap-1.5 self-start md:self-auto">
              <Link href="/b/amenidades">
                Ver el detalle
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5"
            stagger={0.05}
          >
            {amenities.map((a) => (
              <RevealItem as="li" key={a.slug}>
                <Link
                  href={`/b/amenidades#${a.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border p-4 transition-colors hover:border-grafito hover:bg-secondary/50"
                >
                  <div className="flex items-center justify-between">
                    <a.icon className="size-5 text-ocre-600" />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {a.n}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold leading-tight">
                    {a.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {a.short}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Masterplan + lotes ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-plenor grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <div className="relative aspect-square w-full">
              <Image
                src={plan.src}
                alt={plan.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={plan.blurDataURL}
                className="object-contain"
              />
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow text-ocre-600">El trazado</span>
            <h2 className="display mt-3 text-3xl md:text-5xl">
              Siete sectores en forma de L
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              Una barra larga de este a oeste con el parque deportivo insertado a
              media longitud, una cuña alrededor del club house y la piscina, y
              una barra norte-sur que remata en un retorno circular.
            </p>

            <ul className="mt-8 divide-y divide-border border-y border-border">
              {sectors.map((s) => (
                <li
                  key={s.id}
                  className="flex items-baseline justify-between gap-4 py-2.5 text-sm"
                >
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.position}
                  </span>
                  <span className="ml-auto font-mono text-xs tabular-nums">
                    {s.count} lotes
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Button asChild className="gap-2">
                <Link href="/b/masterplan">
                  Explorar el masterplan
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-card">
                <Link href="/b/lotes">Ver los {lotStats.count} lotes</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────── */}
      <section className="border-y border-border">
        <VideoModal>
          <div className="relative h-64 w-full overflow-hidden md:h-96">
            <Image
              src={institucional.poster}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={institucional.posterBlur}
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-grafito/50" />
            <div className="container-plenor absolute inset-0 flex flex-col justify-center">
              <span className="eyebrow text-ocre">Recorrido aéreo</span>
              <p className="mt-2 max-w-lg text-xl font-semibold text-arena-50 md:text-3xl">
                Todo el proyecto en {Math.round(institucional.duration)} segundos
              </p>
              <div className="mt-6">
                <PlayBadge label="Reproducir" />
              </div>
            </div>
          </div>
        </VideoModal>
      </section>

      {/* ── Financiamiento ───────────────────────────────────────────────── */}
      <section className="on-grafito py-16 md:py-24">
        <div className="container-plenor grid gap-10 md:grid-cols-2 md:items-center md:gap-20">
          <Reveal>
            <span className="eyebrow text-ocre">Financiamiento</span>
            <h2 className="display mt-3 text-3xl md:text-5xl">
              Directo con Plenor, sin bancos
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {siteConfig.project.financing.downPaymentPct}% de inicial y{" "}
              {siteConfig.project.financing.installments} cuotas sin intereses.
              Las condiciones de cada lote se revisan caso por caso con el equipo
              de ventas.
            </p>
            <Button asChild size="lg" className="mt-7 gap-2">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                Pedir una cotización
              </a>
            </Button>
          </Reveal>

          <Reveal>
            <StatGrid
              tone="dark"
              items={[
                {
                  value: `${siteConfig.project.financing.downPaymentPct}%`,
                  label: "Inicial",
                },
                {
                  value: `${siteConfig.project.financing.installments}`,
                  label: "Cuotas",
                  note: "sin intereses",
                },
                {
                  value: formatAreaShort(lotStats.min),
                  label: "Lote más pequeño",
                },
                {
                  value: formatAreaShort(lotStats.avg),
                  label: "Área promedio",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
