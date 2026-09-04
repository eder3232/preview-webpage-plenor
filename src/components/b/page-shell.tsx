import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { WhatsappIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappUrl } from "@/config/site";
import { img } from "@/content/media";

/**
 * Cabecera de página interior de la Propuesta B: miga de pan, título y una
 * franja de imagen baja. Repetirla en las seis páginas es lo que le da al
 * sitio su sensación de sistema, frente al scroll continuo de la propuesta A.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}) {
  const cover = image ? img(image) : null;

  return (
    <section className="on-grafito relative overflow-hidden">
      {cover && (
        <>
          <Image
            src={cover.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={cover.blurDataURL}
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-grafito via-grafito/85 to-grafito/40" />
        </>
      )}
      <div className="on-image container-plenor relative py-12 md:py-20">
        <nav aria-label="Ruta" className="flex items-center gap-1.5 text-xs">
          <Link href="/b" className="text-arena-50/60 hover:text-ocre">
            Inicio
          </Link>
          <ChevronRight className="size-3 text-arena-50/30" />
          <span className="text-arena-50/90">{eyebrow}</span>
        </nav>
        <h1 className="display mt-4 max-w-3xl text-4xl md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

/** Banda de conversión que cierra cada página interior. */
export function CtaBand({
  title = "¿Te interesa un lote?",
  body = "Escríbenos y te enviamos la disponibilidad y los precios vigentes. Sin compromiso.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-y border-border bg-arena">
      <div className="container-plenor flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-lg">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-arena-50">
            <Link href="/b/contacto">Dejar mis datos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Fichas de dato, el ladrillo visual de esta propuesta. */
export function StatGrid({
  items,
  tone = "light",
}: {
  items: { value: string; label: string; note?: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <dl
      className={
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl md:grid-cols-4 " +
        (dark ? "bg-white/10" : "bg-border")
      }
    >
      {items.map((s) => (
        <div key={s.label} className={dark ? "bg-grafito p-5" : "bg-card p-5"}>
          <dt className="text-xs text-muted-foreground">{s.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            {s.value}
          </dd>
          {s.note && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.note}</p>
          )}
        </div>
      ))}
    </dl>
  );
}

export const projectStats = [
  { value: `${siteConfig.project.totalLots}`, label: "Lotes" },
  {
    value: `${siteConfig.project.minArea}–${siteConfig.project.maxArea} m²`,
    label: "Rango de área",
    note: `promedio ${siteConfig.project.avgArea} m²`,
  },
  { value: `${siteConfig.project.amenitiesCount}`, label: "Amenidades" },
  { value: `${siteConfig.project.parkingSpots}`, label: "Estacionamientos" },
];
