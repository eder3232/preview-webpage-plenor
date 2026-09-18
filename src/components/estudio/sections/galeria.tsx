"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { img, type MediaImage } from "@/content/media";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "../studio-context";
import { Section, SectionHead, SReveal } from "../ui";

/**
 * GALERÍA — tres variantes
 *
 * Las tres muestran el mismo recorrido de ocho escenas. La pregunta que
 * responde esta sección es cuánto protagonismo tiene la imagen: si se recorre
 * como una película, se hojea como una revista o se cae encima del que mira.
 */

const ESCENAS: [string, string][] = [
  ["ingreso", "Pórtico de ingreso"],
  ["piscina", "Piscina y club house"],
  ["general-club", "El núcleo de amenidades"],
  ["fogatas", "Zona de fogatas"],
  ["parrillas", "Zona de parrillas"],
  ["juegos", "Juegos para niños"],
  ["fronton", "Canchas de frontón"],
  ["casa-tipo", "Casa tipo"],
];

const VERTICALES: [string, string][] = [
  ["v-ingreso", "Pórtico de ingreso"],
  ["v-clubhouse", "Club house"],
  ["v-parrillas", "Parrillas y fogatas"],
  ["v-parques", "Parque deportivo"],
  ["v-multiusos", "Cancha multiusos"],
  ["v-vias", "Vías adoquinadas"],
  ["v-cerco", "Cerco perimétrico"],
  ["v-general", "Vista general"],
];

interface Item {
  image: MediaImage;
  caption: string;
}

const toItems = (rows: [string, string][]): Item[] =>
  rows.map(([id, caption]) => ({ image: img(id), caption }));

/* ==========================================================================
   Visor compartido
   ========================================================================== */

function Lightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onMove: (delta: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onMove]);

  const current = index === null ? null : items[index];

  return (
    <Dialog open={index !== null} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton
        className="max-w-[calc(100vw-1.5rem)] gap-0 border-0 bg-grafito p-0 sm:max-w-5xl"
      >
        <DialogTitle className="sr-only">{current?.caption ?? "Imagen"}</DialogTitle>
        {current && (
          <>
            <div className="relative">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="90vw"
                placeholder="blur"
                blurDataURL={current.image.blurDataURL}
                className="max-h-[76dvh] w-full object-contain"
              />
              {[-1, 1].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() => onMove(delta)}
                  aria-label={delta < 0 ? "Anterior" : "Siguiente"}
                  className={cn(
                    "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full",
                    "bg-grafito/70 text-arena-50 transition-colors hover:bg-[var(--s-accent)] hover:text-[var(--s-accent-ink)]",
                    delta < 0 ? "left-3" : "right-3",
                  )}
                >
                  {delta < 0 ? (
                    <ChevronLeft className="size-5" />
                  ) : (
                    <ChevronRight className="size-5" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3 text-arena-50">
              <p className="text-sm font-medium">{current.caption}</p>
              <p className="font-mono text-xs text-arena-50/50">
                {(index ?? 0) + 1} / {items.length}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function useLightbox(items: Item[]) {
  const [index, setIndex] = useState<number | null>(null);
  const move = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? null : (i + delta + items.length) % items.length)),
    [items.length],
  );
  return { index, setIndex, move, close: () => setIndex(null) };
}

/* ==========================================================================
   1 · Cine horizontal
   ========================================================================== */

export function GaleriaHorizontal() {
  const ref = useRef<HTMLDivElement>(null);
  const level = useMotionLevel();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const still = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  const items = toItems(ESCENAS);
  const verticales = toItems(VERTICALES);
  const animated = level !== "ninguno";

  return (
    <Section id="galeria" tone="ninguno" padded={false}>
      {/* Escritorio: el bloque se queda pegado y las láminas pasan de lado.
          Sin animación el truco no tiene sentido, así que cae a una retícula. */}
      {animated ? (
        <div ref={ref} className="relative hidden h-[420vh] md:block">
          <div className="sticky top-0 flex h-dvh items-center overflow-hidden bg-grafito">
            <motion.ul
              style={{ x: animated ? x : still }}
              className="flex gap-6 pl-6 will-change-transform"
            >
              {items.map((item, i) => (
                <li key={item.image.id} className="relative shrink-0">
                  <div className="relative h-[68vh] w-[78vw] overflow-hidden rounded-xl lg:w-[58vw]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="60vw"
                      placeholder="blur"
                      blurDataURL={item.image.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[var(--s-accent-dark)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-arena-50">{item.caption}</span>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      ) : (
        <div className="s-dark hidden bg-grafito s-section md:block">
          <div className="container-plenor grid grid-cols-2 gap-4">
            {items.map((item, i) => (
              <figure key={item.image.id}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="50vw"
                    placeholder="blur"
                    blurDataURL={item.image.blurDataURL}
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[var(--s-accent-dark)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-arena-50">{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Móvil: carrusel con las versiones verticales. Arrastrar de lado con el
          dedo mientras la página baja es pelear contra el usuario. */}
      <div className="s-dark bg-grafito py-12 md:hidden">
        <div className="container-plenor">
          <span className="eyebrow s-accent">La galería</span>
          <h2 className="s-display mt-2 text-3xl text-arena-50">
            Diez amenidades,
            <br />
            un solo condominio
          </h2>
        </div>
        <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {verticales.map((item, i) => (
            <li key={item.image.id} className="w-[78vw] shrink-0 snap-center">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="78vw"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] text-[var(--s-accent-dark)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-arena-50">{item.caption}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ==========================================================================
   2 · Mosaico
   ========================================================================== */

/** Patrón de la retícula: las escenas 1 y 4 mandan, el resto acompaña. */
const SPANS = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
];

export function GaleriaMosaico() {
  const items = toItems(ESCENAS);
  const { index, setIndex, move, close } = useLightbox(items);

  return (
    <Section id="galeria" tone="claro">
      <div className="container-plenor">
        <SectionHead
          eyebrow="La galería"
          title={
            <>
              El proyecto,
              <br />
              escena por escena
            </>
          }
          lead="Ocho vistas del condominio terminado. Toca cualquiera para verla en grande."
        />

        <ul className="mt-14 grid auto-rows-[10rem] grid-cols-1 gap-3 md:mt-20 md:auto-rows-[11rem] md:grid-cols-6">
          {items.map((item, i) => (
            <SReveal
              as="li"
              key={item.image.id}
              delay={(i % 3) * 0.05}
              className={cn("min-h-40", SPANS[i] ?? "md:col-span-2")}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block size-full overflow-hidden rounded-xl text-left"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-grafito/75 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-baseline gap-2.5 p-4">
                  <span className="font-mono text-[11px] text-[var(--s-accent-dark)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-arena-50">
                    {item.caption}
                  </span>
                </span>
                <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-grafito/70 text-arena-50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 className="size-3.5" />
                </span>
              </button>
            </SReveal>
          ))}
        </ul>
      </div>

      <Lightbox items={items} index={index} onClose={close} onMove={move} />
    </Section>
  );
}

/* ==========================================================================
   3 · Pila a sangre
   ========================================================================== */

export function GaleriaPila() {
  const items = toItems(ESCENAS).slice(0, 5);

  return (
    <Section id="galeria" tone="ninguno" padded={false} className="bg-grafito">
      {items.map((item, i) => (
        <figure
          key={item.image.id}
          className="relative h-[70vh] min-h-[22rem] w-full md:h-[88vh]"
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={item.image.blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grafito/80 via-grafito/10 to-grafito/30" />
          <figcaption className="on-image container-plenor absolute inset-x-0 bottom-0 pb-10 md:pb-16">
            <span className="font-mono text-xs text-[var(--s-accent-dark)]">
              {String(i + 1).padStart(2, "0")} / {items.length}
            </span>
            <p className="s-display mt-2 text-3xl text-arena-50 md:text-5xl">
              {item.caption}
            </p>
          </figcaption>
        </figure>
      ))}
    </Section>
  );
}
