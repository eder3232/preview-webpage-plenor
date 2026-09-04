"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { galleryIds, galleryVerticalIds, img } from "@/content/media";
import { amenities } from "@/content/amenidades";

/**
 * GALERÍA CINEMATOGRÁFICA
 *
 * En escritorio: el bloque queda pegado a la pantalla y las imágenes se
 * desplazan horizontalmente conforme se hace scroll vertical. Es el recurso
 * que le da a esta propuesta su carácter.
 *
 * En móvil no se emula: el desplazamiento horizontal atado al scroll vertical
 * pelea con el gesto natural del dedo. Ahí se sirve un carrusel con scroll-snap
 * y las versiones verticales de las mismas escenas, que es lo que el usuario
 * espera y además usa los recortes 3:4 que entregó el cliente.
 */

const CAPTIONS: Record<string, string> = {
  ingreso: "Pórtico de ingreso",
  piscina: "Piscina y club house",
  "general-club": "El núcleo de amenidades",
  fogatas: "Zona de fogatas",
  parrillas: "Zona de parrillas",
  juegos: "Juegos para niños",
  fronton: "Canchas de frontón",
  "casa-tipo": "Casa tipo",
};

const V_CAPTIONS: Record<string, string> = {
  "v-ingreso": "Pórtico de ingreso",
  "v-clubhouse": "Club house",
  "v-parrillas": "Parrillas y fogatas",
  "v-parques": "Parque deportivo",
  "v-multiusos": "Cancha multiusos",
  "v-vias": "Vías adoquinadas",
  "v-cerco": "Cerco perimétrico",
  "v-general": "Vista general",
};

export function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });

  // Las 8 láminas ocupan ~4 anchos de pantalla; se recorre lo que sobra.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", reduce ? "2%" : "-72%"]);

  return (
    <>
      {/* ── Escritorio ─────────────────────────────────────────────────── */}
      <div ref={ref} className="relative hidden h-[420vh] md:block">
        <div className="sticky top-0 flex h-dvh items-center overflow-hidden bg-grafito">
          <motion.ul style={{ x }} className="flex gap-6 pl-6 will-change-transform">
            {galleryIds.map((id, i) => {
              const image = img(id);
              return (
                <li key={id} className="relative shrink-0">
                  <div className="relative h-[68vh] w-[78vw] overflow-hidden rounded-xl lg:w-[58vw]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="60vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-ocre">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-arena-50">{CAPTIONS[id]}</span>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>

      {/* ── Móvil ──────────────────────────────────────────────────────── */}
      <div className="bg-grafito py-12 md:hidden">
        <div className="container-plenor">
          <span className="eyebrow text-ocre">La galería</span>
          <h2 className="display mt-2 text-3xl text-arena-50">
            {amenities.length} amenidades,
            <br />
            un solo condominio
          </h2>
        </div>
        <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {galleryVerticalIds.map((id, i) => {
            const image = img(id);
            return (
              <li key={id} className="w-[78vw] shrink-0 snap-center">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="78vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover"
                  />
                </div>
                <div className="mt-2.5 flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-ocre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-arena-50">{V_CAPTIONS[id]}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
