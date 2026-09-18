"use client";

import type { ComponentType } from "react";

import { SECTION_BY_ID, type SectionId } from "./config";
import {
  AmenidadesAlternado,
  AmenidadesIndice,
  AmenidadesMosaico,
} from "./sections/amenidades";
import {
  GaleriaHorizontal,
  GaleriaMosaico,
  GaleriaPila,
} from "./sections/galeria";
import { HeroCinematico, HeroEditorial, HeroPortada } from "./sections/hero";
import { LotesBuscador, LotesCifras, LotesSectores } from "./sections/lotes";
import { TourEnlace, TourModal, TourSeccion } from "./sections/tour";

/**
 * REGISTRO DE VARIANTES
 *
 * El único sitio donde un id de `config.ts` se convierte en un componente.
 * Para sumar una variante: crear el componente, añadirlo acá y declararlo en
 * `config.ts`. El panel del configurador se construye solo a partir de eso.
 */

type Renderers = Record<SectionId, Record<string, ComponentType>>;

export const RENDERERS: Renderers = {
  hero: {
    cinematico: HeroCinematico,
    editorial: HeroEditorial,
    portada: HeroPortada,
  },
  galeria: {
    horizontal: GaleriaHorizontal,
    mosaico: GaleriaMosaico,
    pila: GaleriaPila,
  },
  amenidades: {
    alternado: AmenidadesAlternado,
    mosaico: AmenidadesMosaico,
    indice: AmenidadesIndice,
  },
  tour: {
    seccion: TourSeccion,
    modal: TourModal,
    enlace: TourEnlace,
  },
  lotes: {
    cifras: LotesCifras,
    buscador: LotesBuscador,
    sectores: LotesSectores,
  },
};

/** Resuelve la variante elegida, cayendo a la primera si el id no existe. */
export function renderSection(section: SectionId, variant: string) {
  const options = RENDERERS[section];
  const fallback = SECTION_BY_ID[section].variants[0].id;
  const Component = options[variant] ?? options[fallback];
  return <Component />;
}
