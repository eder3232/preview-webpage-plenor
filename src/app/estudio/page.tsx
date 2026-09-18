"use client";

import { renderSection } from "@/components/estudio/registry";
import {
  Contacto,
  Financiamiento,
  Lugar,
  Manifiesto,
  SeparadorIa,
  VideoBloque,
} from "@/components/estudio/sections/fijas";
import { useStudio } from "@/components/estudio/studio-context";

/**
 * LA PÁGINA
 *
 * Una sola página, como la propuesta A, pero con dentro lo que la propuesta B
 * tenía y a ella le faltaba: el buscador de lotes, el masterplan y una galería
 * de verdad, ahora como secciones del mismo scroll.
 *
 * El orden es el argumento de venta y no se configura, porque es lo único que
 * no se discute: primero el lugar y la sensación, después el proyecto, luego
 * la herramienta (tour y lotes) y recién al final la conversión.
 *
 *   portada → manifiesto → galería → amenidades → video →
 *   el lugar → tour 360 → lotes → financiamiento → contacto
 */
export default function EstudioPage() {
  const { config } = useStudio();

  return (
    <>
      {renderSection("hero", config.sections.hero)}
      <Manifiesto />
      {renderSection("galeria", config.sections.galeria)}
      {renderSection("amenidades", config.sections.amenidades)}
      <VideoBloque />
      <Lugar />
      <SeparadorIa />
      {renderSection("tour", config.sections.tour)}
      {renderSection("lotes", config.sections.lotes)}
      <Financiamiento />
      <Contacto />
    </>
  );
}
