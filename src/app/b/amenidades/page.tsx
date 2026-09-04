import Image from "next/image";
import type { Metadata } from "next";

import { CtaBand, PageHero } from "@/components/b/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { amenities } from "@/content/amenidades";
import { img } from "@/content/media";

export const metadata: Metadata = {
  title: "Amenidades",
  description:
    "Las 10 amenidades de Residencial Aonami: piscina, club house, fogatas, parrillas, pórtico, frontón, juegos, cancha multiusos, vías adoquinadas y cerco perimétrico.",
};

export default function AmenidadesB() {
  return (
    <>
      <PageHero
        eyebrow="Amenidades"
        title="Diez amenidades, todas dentro del cerco"
        description="La leyenda completa del plano comercial, una por una."
        image="piscina"
      />

      {/* Índice ancla */}
      <nav
        aria-label="Amenidades"
        className="sticky top-16 z-30 border-b border-border bg-arena-50/90 backdrop-blur-md"
      >
        <ul className="no-scrollbar container-plenor flex gap-1 overflow-x-auto py-2.5">
          {amenities.map((a) => (
            <li key={a.slug}>
              <a
                href={`#${a.slug}`}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-grafito"
              >
                <span className="font-mono text-muted-foreground">{a.n}</span>
                <span className="font-medium">{a.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-plenor py-12 md:py-16">
        <ul className="flex flex-col gap-4">
          {amenities.map((a, i) => {
            const image = img(a.image);
            const wide = i % 3 === 0;
            return (
              <li key={a.slug} id={a.slug} className="scroll-mt-32">
                <Reveal
                  as="article"
                  className={`grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2 ${
                    i % 2 === 1 ? "md:[&>figure]:order-last" : ""
                  }`}
                >
                  <figure
                    className={`relative ${wide ? "aspect-[16/10]" : "aspect-[4/3]"} md:aspect-auto md:min-h-72`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover"
                    />
                  </figure>
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-grafito">
                        <a.icon className="size-4 text-ocre" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        Amenidad {a.n} de 10
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                      {a.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {a.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs text-muted-foreground">
          Imágenes referenciales. El acabado final, el mobiliario y la vegetación
          pueden variar respecto de lo mostrado.
        </p>
      </div>

      <CtaBand
        title="¿Quieres ver las amenidades en obra?"
        body="Coordinamos una visita al proyecto en Punta de Bombón."
      />
    </>
  );
}
