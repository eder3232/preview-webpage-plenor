"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import { useMotionLevel } from "./studio-context";

/**
 * Piezas comunes a todas las variantes del estudio.
 *
 * `SReveal` es el equivalente de `components/shared/reveal.tsx` pero atado al
 * token de movimiento del configurador: el cliente puede ver la misma página
 * con animación completa, sutil o sin nada. `prefers-reduced-motion` sigue
 * teniendo la última palabra, como debe ser.
 */

type Level = { distance: number; duration: number; stagger: number };

const LEVELS: Record<string, Level> = {
  completo: { distance: 26, duration: 0.6, stagger: 0.08 },
  sutil: { distance: 10, duration: 0.4, stagger: 0.05 },
  ninguno: { distance: 0, duration: 0, stagger: 0 },
};

function useLevel(): Level {
  const level = useMotionLevel();
  const reduce = useReducedMotion();
  if (reduce) return LEVELS.ninguno;
  return LEVELS[level] ?? LEVELS.completo;
}

type Tag = "div" | "section" | "li" | "article" | "figure" | "ul" | "header";

export function SReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const { distance, duration } = useLevel();
  const Tag = motion[as];

  const variants: Variants = {
    hidden: { opacity: duration === 0 ? 1 : 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay: duration === 0 ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}

export function SRevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const { stagger } = useLevel();
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function SRevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const { distance, duration } = useLevel();
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      variants={{
        hidden: { opacity: duration === 0 ? 1 : 0, y: distance },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/* ==========================================================================
   Envoltura de sección
   ========================================================================== */

export type Tone = "claro" | "arena" | "oscuro" | "ninguno";

const TONES: Record<Tone, string> = {
  claro: "bg-arena-50",
  arena: "bg-arena",
  oscuro: "on-grafito",
  ninguno: "",
};

/**
 * Toda sección del estudio pasa por acá. Es lo que hace que cualquier
 * combinación de variantes se sostenga: cada una trae su propio fondo y su
 * propio ritmo vertical, así que no hay combinación que rompa a la siguiente.
 */
export function Section({
  id,
  tone = "claro",
  padded = true,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  /** `false` para las secciones a sangre que manejan su propia altura. */
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "s-anchor",
        TONES[tone],
        padded && "s-section",
        tone === "oscuro" && "s-dark",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Encabezado de sección: versalitas + titular + bajada. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
  align = "start",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <SReveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="eyebrow s-accent">{eyebrow}</span>
      <h2 className="s-display mt-4 text-4xl md:text-6xl">{title}</h2>
      {lead && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}
    </SReveal>
  );
}
