"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { IA_IMAGES, type IaImage } from "./media-ia.generated";
import { useStudio } from "./studio-context";

/**
 * ============================================================================
 *  ILUSTRACIONES GENERADAS — acceso desde la página
 * ============================================================================
 *
 *  Dos sets, tres tonos, y la opción de no usar ninguno (que es la de fábrica).
 *
 *  Regla que gobierna todo esto: las ilustraciones **solo ocupan huecos donde
 *  hoy no hay imagen**. Ningún render del cliente se reemplaza — el render es
 *  lo que vende el lote, y mezclar ilustración con fotorrealismo en el mismo
 *  sitio hace que parezcan dos marcas distintas.
 *
 *  Si un set no tiene la lámina pedida, estos componentes devuelven `null` y
 *  la página se ve exactamente como sin ilustraciones. Nunca un hueco roto.
 * ============================================================================
 */

// El `as` es para que esto compile también con el manifiesto vacío: un
// `[] as const` tiene elementos de tipo `never` y rompería el `.map`.
const INDEX = new Map<string, IaImage>(
  (IA_IMAGES as readonly IaImage[]).map((image) => [image.key, image]),
);

/** Devuelve la lámina del set y tono activos, o `null` si no corresponde. */
export function useIa(slot: string): IaImage | null {
  const { config } = useStudio();
  const style = config.tokens.ilustracion;
  if (!style || style === "ninguna") return null;

  const tone = config.tokens.tono;
  return (
    INDEX.get(style + "/" + slot + "--" + tone) ??
    INDEX.get(style + "/" + slot) ??
    null
  );
}

/** ¿Hay set activo? Para decidir entre icono y viñeta sin pedir la lámina. */
export function useIaActive(): boolean {
  const { config } = useStudio();
  const style = config.tokens.ilustracion;
  return Boolean(style && style !== "ninguna");
}

/**
 * Aviso obligado: son imágenes generadas, no fotos del proyecto. Un render
 * fotorrealista de algo que todavía no existe es terreno de publicidad
 * engañosa; una ilustración rotulada, no.
 */
export const IA_DISCLAIMER = "Ilustración referencial.";

/* ==========================================================================
   Componentes
   ========================================================================== */

/** Lámina encuadrada, con proporción propia. Devuelve null si no hay set. */
export function IaFigure({
  slot,
  className,
  sizes = "(max-width: 767px) 100vw, 50vw",
  priority = false,
  caption,
}: {
  slot: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** `true` pinta el aviso de "ilustración referencial" bajo la imagen. */
  caption?: boolean;
}) {
  const image = useIa(slot);
  if (!image) return null;

  return (
    <figure className={cn("w-full", className)}>
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground">
          {IA_DISCLAIMER}
        </figcaption>
      )}
    </figure>
  );
}

/** Banda ancha a sangre, para separar secciones. */
export function IaBand({
  slot,
  className,
}: {
  slot: string;
  className?: string;
}) {
  const image = useIa(slot);
  if (!image) return null;

  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden bg-arena", className)}
    >
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className="h-auto w-full"
      />
    </div>
  );
}

/**
 * La marca de una amenidad: viñeta dibujada si hay set, y si no el icono de
 * la librería, que es lo que se ve hoy. Diez dibujos del mismo pulso valen
 * bastante más que diez iconos que tiene todo el mundo.
 */
export function AmenityMark({
  amenity,
  icon: Icon,
  variant = "badge",
  className,
}: {
  amenity: string;
  icon: LucideIcon;
  /** `badge` = pastilla grande junto al titular · `inline` = junto al texto. */
  variant?: "badge" | "inline";
  className?: string;
}) {
  const image = useIa("am-" + amenity);

  // Sin set activo se ve exactamente lo de siempre: el icono de la librería.
  if (!image) {
    return variant === "badge" ? (
      <span
        className={cn(
          "s-accent-bg flex size-10 shrink-0 items-center justify-center rounded-full",
          className,
        )}
      >
        <Icon className="size-4" />
      </span>
    ) : (
      <Icon className={cn("size-3.5 shrink-0 text-muted-foreground", className)} />
    );
  }

  // La viñeta viene con su fondo de papel: en vez de pelear por recortarlo,
  // se asume como una pastilla impresa. Con la esquina redondeada del tema
  // parece una estampilla, y funciona igual sobre fondo claro que oscuro.
  const box =
    variant === "badge"
      ? "size-16 shrink-0 md:size-20"
      : "size-7 shrink-0";

  return (
    <span
      className={cn(
        "overflow-hidden rounded-[calc(var(--radius)*0.8)] bg-arena",
        box,
        className,
      )}
    >
      <Image
        src={image.src}
        alt=""
        aria-hidden
        width={image.width}
        height={image.height}
        sizes="96px"
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className="size-full object-cover"
      />
    </span>
  );
}
