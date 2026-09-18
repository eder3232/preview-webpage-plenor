import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { SReveal } from "@/components/estudio/ui";
import { LotFinder } from "@/components/shared/lot-finder";
import { Masterplan } from "@/components/shared/masterplan";
import { formatAreaShort, lotStats, parking, sectors } from "@/content/lotes";

export const metadata: Metadata = {
  title: "Los lotes",
  description:
    "Inventario completo de los 203 lotes de Residencial Aonami: área y perímetro por sector.",
};

/**
 * Inventario completo. Es la página a la que llevan las variantes "Cifras" y
 * "Sectores"; la variante "Buscador" trae este mismo contenido a la portada.
 */
export default function EstudioLotes() {
  return (
    <div className="bg-arena-50 pt-16 md:pt-20">
      <div className="container-plenor py-14 md:py-20">
        <Link
          href="/estudio"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Volver al proyecto
        </Link>

        <SReveal className="mt-8 max-w-3xl">
          <span className="eyebrow s-accent">Inventario</span>
          <h1 className="s-display mt-4 text-4xl md:text-6xl">
            Los {lotStats.count} lotes,
            <br />
            uno por uno
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Todo el proyecto: {formatAreaShort(lotStats.totalArea)} vendibles
            repartidos en {sectors.length} sectores, desde{" "}
            {formatAreaShort(lotStats.min)} hasta {formatAreaShort(lotStats.max)}.
            Más {parking.count} plazas de estacionamiento de {parking.area} m².
          </p>
        </SReveal>

        <SReveal className="mt-16">
          <h2 className="s-display text-xl md:text-2xl">Dónde está cada cosa</h2>
          <Masterplan className="mt-5" />
        </SReveal>

        <SReveal className="mt-16">
          <h2 className="s-display text-xl md:text-2xl">Busca tu lote</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Filtra por sector o por tamaño. Al encontrar uno que te interese,
            consúltanos por WhatsApp: el mensaje ya va con el código escrito.
          </p>
          <div className="mt-6">
            <LotFinder />
          </div>
        </SReveal>
      </div>
    </div>
  );
}
