import Image from "next/image";
import type { Metadata } from "next";

import { GalleryB } from "@/components/b/gallery";
import { CtaBand, PageHero } from "@/components/b/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { PlayBadge, VideoModal } from "@/components/shared/video";
import { artDirection } from "@/content/copy";
import { video } from "@/content/media";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Renders, vistas verticales y el video del recorrido aéreo de Residencial Aonami.",
};

export default function GaleriaB() {
  const institucional = video("institucional");

  return (
    <>
      <PageHero
        eyebrow="Galería"
        title="Cómo se va a ver"
        description="Renders del proyecto y el recorrido aéreo completo."
        image="fogatas"
      />

      {/* ── Video ────────────────────────────────────────────────────────── */}
      <section className="container-plenor py-12 md:py-16">
        <Reveal>
          <VideoModal>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
              <Image
                src={institucional.poster}
                alt=""
                fill
                priority
                sizes="100vw"
                placeholder="blur"
                blurDataURL={institucional.posterBlur}
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-grafito/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <PlayBadge
                  label={`Recorrido aéreo · ${Math.round(institucional.duration)} s`}
                />
              </div>
            </div>
          </VideoModal>
        </Reveal>

        {/* ── Galería ────────────────────────────────────────────────────── */}
        <Reveal className="mt-14">
          <GalleryB />
        </Reveal>

        {/* ── Nota de dirección de arte ──────────────────────────────────── */}
        <Reveal className="mt-14 rounded-xl border border-border bg-card p-5 md:p-7">
          <h2 className="text-sm font-semibold">Criterios de las imágenes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {artDirection.map((c) => (
              <li
                key={c}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Todas las imágenes son referenciales, con fines ilustrativos. El
            acabado final, el mobiliario, la vegetación y el entorno pueden variar
            respecto de lo mostrado.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
