"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { amenities, type Amenity } from "@/content/amenidades";
import { img } from "@/content/media";
import { cn } from "@/lib/utils";
import { AmenityMark } from "../ia";
import { useMotionLevel } from "../studio-context";
import { Section, SectionHead, SReveal, SRevealGroup, SRevealItem } from "../ui";

/**
 * AMENIDADES — tres variantes
 *
 * Son diez y todas tienen render propio. La decisión aquí es de longitud: si
 * la sección se recorre entera (alternado), se escanea de un vistazo
 * (tarjetas) o se consulta a demanda (índice).
 */

const HEAD = {
  eyebrow: "Amenidades",
  title: (
    <>
      Todo pasa
      <br />
      en el centro
    </>
  ),
  lead: "La piscina, el club house y las zonas de fogatas y parrillas están agrupadas en el corazón del condominio. El parque deportivo, a media longitud. Nada queda a más de cinco minutos caminando.",
};

/* ==========================================================================
   1 · Alternado
   ========================================================================== */

export function AmenidadesAlternado() {
  return (
    <Section id="amenidades" tone="claro">
      <div className="container-plenor">
        <SectionHead {...HEAD} />

        <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-28">
          {amenities.map((a, i) => {
            const image = img(a.image);
            const flip = i % 2 === 1;
            return (
              <SReveal
                key={a.slug}
                as="article"
                className={cn(
                  "flex flex-col gap-6 md:items-center md:gap-14",
                  flip ? "md:flex-row-reverse" : "md:flex-row",
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:w-3/5">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 60vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/5">
                  <div className="flex items-center gap-3">
                    <AmenityMark amenity={a.slug} icon={a.icon} />
                    <span className="font-mono text-xs text-muted-foreground">
                      {a.n} / 10
                    </span>
                  </div>
                  <h3 className="s-display mt-4 text-2xl md:text-3xl">{a.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {a.description}
                  </p>
                </div>
              </SReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ==========================================================================
   2 · Tarjetas
   ========================================================================== */

export function AmenidadesMosaico() {
  const [active, setActive] = useState<Amenity | null>(null);

  return (
    <Section id="amenidades" tone="claro">
      <div className="container-plenor">
        <SectionHead {...HEAD} />

        <SRevealGroup
          as="ul"
          className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-3 lg:grid-cols-5"
        >
          {amenities.map((a) => {
            const image = img(a.image);
            return (
              <SRevealItem as="li" key={a.slug}>
                <button
                  type="button"
                  onClick={() => setActive(a)}
                  className="group block w-full overflow-hidden rounded-xl border border-border bg-card text-left transition-colors hover:border-[var(--s-accent)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 50vw, 20vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="s-accent-bg absolute left-2 top-2 flex size-7 items-center justify-center rounded-full font-mono text-[10px] font-semibold">
                      {a.n}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                      <AmenityMark amenity={a.slug} icon={a.icon} variant="inline" />
                      {a.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {a.short}
                    </p>
                  </div>
                </button>
              </SRevealItem>
            );
          })}
        </SRevealGroup>
      </div>

      <Dialog open={active !== null} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent
          showCloseButton
          className="max-w-[calc(100vw-2rem)] overflow-hidden p-0 sm:max-w-2xl"
        >
          {active && (
            <>
              <div className="relative aspect-[16/9]">
                <Image
                  src={img(active.image).src}
                  alt={img(active.image).alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 672px"
                  placeholder="blur"
                  blurDataURL={img(active.image).blurDataURL}
                  className="object-cover"
                />
              </div>
              <div className="p-6 pt-2">
                <span className="eyebrow s-accent">Amenidad {active.n}</span>
                <DialogTitle className="s-display mt-2 text-2xl">
                  {active.name}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed">
                  {active.description}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ==========================================================================
   3 · Índice
   ========================================================================== */

export function AmenidadesIndice() {
  const [active, setActive] = useState(0);
  const level = useMotionLevel();
  const current = amenities[active];
  const image = img(current.image);

  return (
    <Section id="amenidades" tone="oscuro">
      <div className="container-plenor">
        <SectionHead {...HEAD} />

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          {/* Índice */}
          <ul className="order-2 md:order-1">
            {amenities.map((a, i) => {
              const isActive = i === active;
              return (
                <li key={a.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-baseline gap-4 border-b border-border py-3.5 text-left transition-colors md:py-4",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors",
                        isActive ? "s-accent" : "text-muted-foreground",
                      )}
                    >
                      {a.n}
                    </span>
                    <span className="s-display flex-1 text-xl md:text-2xl">
                      {a.name}
                    </span>
                    <AmenityMark
                      amenity={a.slug}
                      icon={a.icon}
                      variant="inline"
                      className={cn(
                        "self-center transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Imagen */}
          <div className="order-1 md:order-2 md:sticky md:top-24 md:self-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: level === "ninguno" ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: level === "ninguno" ? 1 : 0 }}
                  transition={{ duration: level === "ninguno" ? 0 : 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 55vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
