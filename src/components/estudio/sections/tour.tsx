"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, Maximize2, Play } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { img } from "@/content/media";
import { cn } from "@/lib/utils";
import { TOUR_URL } from "../config";
import { Section, SectionHead, SReveal } from "../ui";

/**
 * TOUR 360 Y DISPONIBILIDAD — el "lienzo"
 *
 * Lo que se embebe es la app del proveedor (Lienzo360) completa: trae su
 * propio menú con disponibilidad de lotes en vivo, recorrido 360, video,
 * ubicación y contacto. Ni ella ni el reproductor 360 que vive dentro
 * (3DVista, en lienzo3d.com) mandan `X-Frame-Options` ni `frame-ancestors`,
 * así que se pueden embeber. El permiso, en cambio, es del cliente.
 *
 * Tres decisiones distintas sobre lo mismo:
 *   · seccion → convive con el scroll de la página
 *   · modal   → aparece por encima, sin abandonar la página
 *   · enlace  → una página propia a pantalla completa
 *
 * En las tres el iframe se monta SOLO cuando el usuario lo pide. Es una app
 * con WebGL, tiles de mapa y base de datos en vivo: montarla en el scroll
 * inicial hunde la carga de la portada.
 */

const COPY = {
  eyebrow: "Tour virtual",
  title: (
    <>
      Recorre el proyecto
      <br />
      antes de que exista
    </>
  ),
  lead: "Recorrido 360 por el condominio terminado y plano interactivo con la disponibilidad de cada lote, actualizada por el equipo de ventas.",
};

/** Un iframe no avisa cuando lo bloquean: la salida siempre visible es el plan B. */
function FrameFallback({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground",
        className,
      )}
    >
      ¿No carga el recorrido?
      <a
        href={TOUR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-medium underline underline-offset-4"
      >
        Ábrelo en una pestaña nueva
        <ExternalLink className="size-3" />
      </a>
    </p>
  );
}

export function TourFrame({
  className,
  title = "Tour virtual y disponibilidad de Residencial Aonami",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <iframe
      src={TOUR_URL}
      title={title}
      loading="lazy"
      // Giroscopio y acelerómetro son lo que hace que el 360 se mueva con el
      // teléfono; sin `fullscreen` su propio botón de expandir no responde.
      allow="accelerometer; autoplay; gyroscope; fullscreen; xr-spatial-tracking; clipboard-write; encrypted-media; picture-in-picture"
      allowFullScreen
      className={cn("size-full border-0 bg-grafito", className)}
    />
  );
}

/** Poster de invitación, común a las tres variantes. */
function Poster({
  onActivate,
  href,
  label,
  className,
}: {
  onActivate?: () => void;
  href?: string;
  label: string;
  className?: string;
}) {
  // `aereo`, no `planimetria-3d`: esa última tiene canal alfa y como fondo a
  // sangre se ve simplemente negra.
  const plano = img("aereo");

  const content = (
    <>
      <Image
        src={plano.src}
        alt={plano.alt}
        fill
        sizes="(max-width: 767px) 100vw, 80vw"
        placeholder="blur"
        blurDataURL={plano.blurDataURL}
        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-grafito/45" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
        <span className="s-accent-bg flex size-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
          <Play className="size-6 translate-x-0.5 fill-current" />
        </span>
        <span className="on-image text-base font-semibold text-arena-50 md:text-lg">
          {label}
        </span>
      </span>
    </>
  );

  const shell =
    "group relative block w-full overflow-hidden rounded-xl bg-grafito text-left";

  if (href) {
    return (
      <Link href={href} className={cn(shell, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onActivate} className={cn(shell, className)}>
      {content}
    </button>
  );
}

/* ==========================================================================
   1 · Embebido en la página
   ========================================================================== */

export function TourSeccion() {
  const [live, setLive] = useState(false);

  return (
    <Section id="tour" tone="claro">
      <div className="container-plenor">
        <SectionHead {...COPY} />

        <SReveal className="mt-10 md:mt-14">
          <div className="relative h-[68vh] min-h-[26rem] w-full overflow-hidden rounded-xl border border-border md:h-[80vh]">
            {live ? (
              <TourFrame />
            ) : (
              <Poster
                onActivate={() => setLive(true)}
                label="Entrar al recorrido"
                className="size-full"
              />
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <FrameFallback />
            <a
              href={TOUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <Maximize2 className="size-3.5" />
              Ver a pantalla completa
            </a>
          </div>
        </SReveal>
      </div>
    </Section>
  );
}

/* ==========================================================================
   2 · En ventana
   ========================================================================== */

export function TourModal() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="tour" tone="oscuro">
      <div className="container-plenor">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <SReveal>
            <span className="eyebrow s-accent">{COPY.eyebrow}</span>
            <h2 className="s-display mt-4 text-4xl md:text-6xl">{COPY.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {COPY.lead}
            </p>
            <Button size="lg" className="mt-8 gap-2" onClick={() => setOpen(true)}>
              <Play className="size-4 fill-current" />
              Abrir el recorrido
            </Button>
            <FrameFallback className="mt-4" />
          </SReveal>

          <SReveal>
            <Poster
              onActivate={() => setOpen(true)}
              label="Tour 360 y disponibilidad"
              className="aspect-[4/3]"
            />
          </SReveal>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="h-[92dvh] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden border-0 bg-grafito p-0 sm:max-w-[min(1400px,95vw)]"
        >
          <DialogTitle className="sr-only">
            Tour virtual y disponibilidad
          </DialogTitle>
          {open && <TourFrame />}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ==========================================================================
   3 · Página aparte
   ========================================================================== */

export function TourEnlace() {
  return (
    <Section id="tour" tone="arena">
      <div className="container-plenor">
        <SectionHead {...COPY} />

        <SReveal className="mt-10 md:mt-14">
          <Poster
            href="/estudio/tour"
            label="Entrar al recorrido"
            className="aspect-[16/10] md:aspect-[21/9]"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-md text-sm text-muted-foreground">
              Se abre a pantalla completa, dentro del sitio y sin perder el
              encabezado.
            </p>
            <Button asChild variant="outline" className="gap-2 bg-card">
              <Link href="/estudio/tour">
                Abrir el tour
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </SReveal>
      </div>
    </Section>
  );
}
