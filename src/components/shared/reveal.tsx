"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Entrada al hacer scroll. Se anima una sola vez y respeta
 * `prefers-reduced-motion`: si el usuario lo pidió, el contenido aparece sin
 * desplazamiento (nunca oculto, que es el error clásico de este patrón).
 */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Para poder anclar la sección con #id sin envolverla en otro div. */
  id?: string;
  /** Retardo en segundos. Para escalonar elementos de una misma fila. */
  delay?: number;
  /** Distancia del desplazamiento inicial, en píxeles. */
  distance?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
}

export function Reveal({
  children,
  className,
  id,
  delay = 0,
  distance = 24,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag
      id={id}
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

/** Contenedor que escalona a sus hijos `<RevealItem>`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  distance = 20,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : distance },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Tag>
  );
}
