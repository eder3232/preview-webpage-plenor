"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

import { WhatsappIcon } from "@/components/shared/brand-icons";
import { VideoLoop } from "@/components/shared/video";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappUrl } from "@/config/site";
import { claims } from "@/content/copy";
import { lotStats } from "@/content/lotes";
import { img } from "@/content/media";
import { useMotionLevel } from "../studio-context";
import { SReveal } from "../ui";

/**
 * PORTADA — tres variantes
 *
 * Las tres dicen exactamente lo mismo y muestran los mismos cuatro datos. Lo
 * que cambia es el registro: espectáculo, criterio o eficiencia. Esa es la
 * decisión que tiene que tomar el cliente, y no se puede tomar leyendo una
 * descripción: hay que verla.
 */

const STATS = [
  { value: String(lotStats.count), label: "lotes" },
  {
    value: siteConfig.project.minArea + "–" + siteConfig.project.maxArea + " m²",
    label: "por lote",
  },
  { value: String(siteConfig.project.amenitiesCount), label: "amenidades" },
  { value: "2 min", label: "de la playa" },
];

function ScrollCue() {
  return (
    <a
      href="#proyecto"
      aria-label="Ir al contenido"
      className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-arena-50/70 transition-colors hover:text-[var(--s-accent-dark)]"
    >
      <span className="eyebrow">Descubre</span>
      <ChevronDown className="size-4 animate-bounce [animation-duration:2.4s]" />
    </a>
  );
}

/* ==========================================================================
   1 · Cinemático
   ========================================================================== */

export function HeroCinematico() {
  const ref = useRef<HTMLElement>(null);
  const level = useMotionLevel();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const flat = useTransform(scrollYProgress, [0, 1], [0, 0]);

  const animated = level !== "ninguno";

  return (
    <section
      ref={ref}
      id="portada"
      className="relative h-[100dvh] min-h-[36rem] w-full"
    >
      <VideoLoop
        id="hero"
        mobileId="hero-vertical"
        priority
        className="absolute inset-0 size-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-grafito/70 via-grafito/45 to-grafito/90" />

      <motion.div
        style={{ opacity: animated ? fade : opacity, y: animated ? y : flat }}
        className="on-image container-plenor absolute inset-x-0 bottom-24 md:bottom-32"
      >
        <span className="eyebrow text-[var(--s-accent-dark)]">
          {siteConfig.project.location}
        </span>
        <h1 className="s-display mt-4 max-w-4xl text-[2.75rem] text-arena-50 md:text-8xl">
          {claims.main}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-arena-50/80 md:text-lg">
          {claims.mainSupport}
        </p>

        <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 md:flex md:gap-12">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight text-arena-50 md:text-3xl">
                  {s.value}
                </span>
                <span className="text-xs text-arena-50/60">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

/* ==========================================================================
   2 · Editorial
   ========================================================================== */

export function HeroEditorial() {
  const vertical = img("v-general");

  return (
    <section
      id="portada"
      className="relative grid min-h-[100dvh] grid-cols-1 bg-arena-50 md:grid-cols-[1fr_0.9fr]"
    >
      {/* Texto */}
      <div className="order-2 flex flex-col justify-center px-5 py-16 md:order-1 md:px-14 md:py-24 lg:px-20">
        <SReveal>
          <span className="eyebrow s-accent">{siteConfig.project.location}</span>
          <h1 className="s-display mt-6 text-[2.5rem] md:text-6xl lg:text-7xl">
            {claims.main}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {claims.mainSupport}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#proyecto">Conocer el proyecto</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 bg-card">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                Cotizar
              </a>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </SReveal>
      </div>

      {/* Imagen */}
      <div className="relative order-1 min-h-[52vh] md:order-2 md:min-h-0">
        <Image
          src={vertical.src}
          alt={vertical.alt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 48vw"
          placeholder="blur"
          blurDataURL={vertical.blurDataURL}
          className="object-cover"
        />
      </div>
    </section>
  );
}

/* ==========================================================================
   3 · Portada
   ========================================================================== */

export function HeroPortada() {
  const image = img("general-piscina");

  return (
    <section id="portada" className="relative h-[100dvh] min-h-[36rem] w-full">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-grafito/50" />

      <div className="on-image container-plenor absolute inset-0 flex flex-col items-center justify-center text-center">
        <SReveal>
          <span className="eyebrow text-[var(--s-accent-dark)]">
            {siteConfig.project.location}
          </span>
          <h1 className="s-display mx-auto mt-5 max-w-4xl text-[2.75rem] text-arena-50 md:text-7xl">
            {claims.main}
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-arena-50/85 md:text-lg">
            {claims.mainSupport}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href="#lotes">Ver los lotes</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-arena-50/40 bg-transparent text-arena-50 hover:bg-arena-50 hover:text-grafito"
            >
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                Cotizar por WhatsApp
              </a>
            </Button>
          </div>
        </SReveal>
      </div>

      {/* Barra de datos al pie */}
      <dl className="absolute inset-x-0 bottom-0 border-t border-arena-50/15 bg-grafito/70 backdrop-blur-sm">
        <div className="container-plenor grid grid-cols-2 divide-arena-50/10 py-4 sm:grid-cols-4 sm:divide-x">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 py-2 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-lg font-semibold tracking-tight text-arena-50 md:text-2xl">
                  {s.value}
                </span>
                <span className="text-[11px] text-arena-50/60">{s.label}</span>
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
}
