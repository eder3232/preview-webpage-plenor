"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { img, type MediaImage } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Galería con visor. Dos colecciones: los renders horizontales y las vistas
 * verticales que el cliente entregó reencuadradas para móvil. Ambas se navegan
 * con flechas y con teclado.
 */

const HORIZONTAL: [string, string][] = [
  ["ingreso", "Pórtico de ingreso"],
  ["piscina", "Piscina y club house"],
  ["casa-tipo", "Casa tipo"],
  ["casa-tipo-piscina", "Casas tipo y piscina"],
  ["parrillas", "Zona de parrillas"],
  ["juegos", "Juegos para niños"],
  ["fronton", "Canchas de frontón"],
  ["fogatas", "Zona de fogatas"],
  ["general-club", "Aérea del club house"],
  ["general-piscina", "Aérea de la piscina"],
  ["aereo", "Fotomontaje aéreo"],
];

const VERTICAL: [string, string][] = [
  ["v-general", "Vista general"],
  ["v-ingreso", "Pórtico de ingreso"],
  ["v-cerco", "Cerco perimétrico"],
  ["v-vias", "Vías adoquinadas"],
  ["v-parques", "Parque deportivo"],
  ["v-clubhouse", "Club house"],
  ["v-parrillas", "Parrillas y fogatas"],
  ["v-multiusos", "Cancha multiusos"],
];

type Item = { image: MediaImage; caption: string };

const toItems = (rows: [string, string][]): Item[] =>
  rows.map(([id, caption]) => ({ image: img(id), caption }));

export function GalleryB() {
  const horizontal = toItems(HORIZONTAL);
  const vertical = toItems(VERTICAL);

  const [collection, setCollection] = useState<Item[]>(horizontal);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((items: Item[], i: number) => {
    setCollection(items);
    setIndex(i);
  }, []);

  const move = useCallback(
    (delta: number) =>
      setIndex((i) =>
        i === null ? null : (i + delta + collection.length) % collection.length,
      ),
    [collection.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, move]);

  const current = index === null ? null : collection[index];

  return (
    <>
      <Tabs defaultValue="horizontal">
        <TabsList>
          <TabsTrigger value="horizontal">
            Renders
            <span className="ml-1.5 text-muted-foreground">{horizontal.length}</span>
          </TabsTrigger>
          <TabsTrigger value="vertical">
            Vistas verticales
            <span className="ml-1.5 text-muted-foreground">{vertical.length}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="horizontal" className="mt-6">
          <Grid items={horizontal} ratio="aspect-[16/9]" onOpen={open} />
        </TabsContent>
        <TabsContent value="vertical" className="mt-6">
          <Grid items={vertical} ratio="aspect-[3/4]" onOpen={open} cols={4} />
        </TabsContent>
      </Tabs>

      {/* ── Visor ────────────────────────────────────────────────────────── */}
      <Dialog open={index !== null} onOpenChange={(v) => !v && setIndex(null)}>
        <DialogContent
          showCloseButton
          className="max-w-[calc(100vw-1.5rem)] gap-0 border-0 bg-grafito p-0 sm:max-w-5xl"
        >
          <DialogTitle className="sr-only">
            {current?.caption ?? "Imagen"}
          </DialogTitle>
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
                <NavButton side="left" onClick={() => move(-1)} />
                <NavButton side="right" onClick={() => move(1)} />
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-arena-50">
                <p className="text-sm font-medium">{current.caption}</p>
                <p className="font-mono text-xs text-arena-50/50">
                  {(index ?? 0) + 1} / {collection.length}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Grid({
  items,
  ratio,
  cols = 3,
  onOpen,
}: {
  items: Item[];
  ratio: string;
  cols?: number;
  onOpen: (items: Item[], i: number) => void;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        cols === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <li key={item.image.id}>
          <button
            type="button"
            onClick={() => onOpen(items, i)}
            className="group block w-full text-left"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-xl border border-border",
                ratio,
              )}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes={cols === 4 ? "(max-width: 767px) 50vw, 25vw" : "(max-width: 767px) 100vw, 33vw"}
                placeholder="blur"
                blurDataURL={item.image.blurDataURL}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-grafito/70 text-arena-50 opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="size-3.5" />
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground">
              {item.caption}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Anterior" : "Siguiente"}
      className={cn(
        "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full",
        "bg-grafito/70 text-arena-50 transition-colors hover:bg-ocre hover:text-grafito",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
