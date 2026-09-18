import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { TOUR_URL } from "@/components/estudio/config";
import { TourFrame } from "@/components/estudio/sections/tour";

export const metadata: Metadata = {
  title: "Tour 360 y disponibilidad",
  description:
    "Recorrido virtual 360 por Residencial Aonami y plano interactivo con la disponibilidad de los lotes.",
};

/**
 * EL TOUR A PANTALLA COMPLETA
 *
 * La app del proveedor ocupa todo lo que queda bajo el header. Es la variante
 * más práctica de embeber: no pelea con el scroll de la página, no hay que
 * decidir qué sección del tour mostrar —su propio menú lleva a disponibilidad,
 * recorrido, video y ubicación— y si algún día se cae, el daño queda aquí y no
 * en la portada.
 *
 * Sí, se ve como una web dentro de otra web: su menú lateral queda debajo de
 * nuestro encabezado. Es el precio de que esto sea una línea de `src` y no un
 * desarrollo. Si el proveedor entrega una URL de embed sin su propia cáscara,
 * se cambia `TOUR_URL` en `config.ts` y nada más.
 */
export default function TourPage() {
  return (
    <div className="flex flex-col">
      {/* Barra propia: el iframe no puede dar ni el volver ni la salida. */}
      <div className="mt-16 border-b border-border bg-arena-50 md:mt-20">
        <div className="container-plenor flex flex-wrap items-center justify-between gap-3 py-3">
          <Link
            href="/estudio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Volver al proyecto
          </Link>
          <a
            href={TOUR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ¿No carga? Ábrelo en una pestaña nueva
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      <div className="h-[calc(100dvh-8rem)] min-h-[30rem] w-full md:h-[calc(100dvh-9.5rem)]">
        <TourFrame />
      </div>
    </div>
  );
}
