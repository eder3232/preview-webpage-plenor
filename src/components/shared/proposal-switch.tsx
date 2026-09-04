"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";

/**
 * Pastilla flotante para saltar entre las dos propuestas mientras el cliente
 * las revisa. Es andamio de la presentación: cuando se elija una dirección,
 * este componente se borra junto con la carpeta de la propuesta descartada.
 */
export function ProposalSwitch() {
  const pathname = usePathname();
  const isA = pathname.startsWith("/a");
  const other = isA ? "/b" : "/a";

  return (
    // Abajo a la izquierda: la derecha es del botón de WhatsApp y el indicador
    // de `next dev` se movió arriba (ver next.config.ts).
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-1 rounded-full border border-white/15 bg-grafito/90 p-1 pl-3 text-arena-50 shadow-lg backdrop-blur-sm">
      <span className="whitespace-nowrap text-[11px] font-medium tracking-wide">
        Propuesta {isA ? "A" : "B"}
      </span>
      <Link
        href={other}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ocre px-2.5 py-1.5 text-[11px] font-semibold text-grafito transition-transform hover:scale-105"
      >
        <ArrowLeftRight className="size-3 shrink-0" />
        Ver {isA ? "B" : "A"}
      </Link>
      <Link
        href="/"
        className="whitespace-nowrap px-2 text-[11px] text-arena-50/60 transition-colors hover:text-arena-50"
      >
        Índice
      </Link>
    </div>
  );
}
