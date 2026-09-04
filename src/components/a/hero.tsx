"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

import { VideoLoop } from "@/components/shared/video";
import { siteConfig } from "@/config/site";
import { claims } from "@/content/copy";
import { lotStats } from "@/content/lotes";

/**
 * Hero de la Propuesta A.
 *
 * Video a pantalla completa: horizontal en escritorio, vertical en móvil (el
 * cliente entregó las dos versiones de casi todas las escenas). El texto se
 * desvanece con el scroll — sutil, no un parallax de feria.
 */
export function HeroA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  const stats = [
    { value: `${lotStats.count}`, label: "lotes" },
    { value: `${siteConfig.project.minArea}–${siteConfig.project.maxArea} m²`, label: "por lote" },
    { value: `${siteConfig.project.amenitiesCount}`, label: "amenidades" },
    { value: "2 min", label: "de la playa" },
  ];

  return (
    <section ref={ref} className="relative h-[100dvh] min-h-[36rem] w-full">
      <VideoLoop
        id="hero"
        mobileId="hero-vertical"
        priority
        className="absolute inset-0 size-full"
      />

      {/* Velo: el texto va en blanco sobre imagen, necesita contraste garantizado */}
      <div className="absolute inset-0 bg-gradient-to-b from-grafito/70 via-grafito/45 to-grafito/90" />

      <motion.div
        style={{ opacity, y }}
        className="on-image container-plenor absolute inset-x-0 bottom-24 md:bottom-32"
      >
        <span className="eyebrow text-ocre">
          {siteConfig.project.location}
        </span>
        <h1 className="display mt-4 max-w-4xl text-[2.75rem] leading-[0.95] text-arena-50 md:text-8xl">
          {claims.main}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-arena-50/80 md:text-lg">
          {claims.mainSupport}
        </p>

        <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 md:flex md:gap-12">
          {stats.map((s) => (
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

      <a
        href="#proyecto"
        aria-label="Ir al contenido"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-arena-50/70 transition-colors hover:text-ocre"
      >
        <span className="eyebrow">Descubre</span>
        <ChevronDown className="size-4 animate-bounce [animation-duration:2.4s]" />
      </a>
    </section>
  );
}
