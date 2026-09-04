import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Wallet } from "lucide-react";

import { HeroA } from "@/components/a/hero";
import { HorizontalGallery } from "@/components/a/horizontal-gallery";
import { ContactForm } from "@/components/shared/contact-form";
import { Masterplan } from "@/components/shared/masterplan";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { PlayBadge, VideoModal } from "@/components/shared/video";
import { WhatsappIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig, whatsappUrl } from "@/config/site";
import { amenities } from "@/content/amenidades";
import { claims, faqs, sellingPoints } from "@/content/copy";
import { formatAreaShort, lotStats, parking } from "@/content/lotes";
import { img, video } from "@/content/media";

/**
 * PROPUESTA A — "Verano"
 *
 * Landing de una sola página. El orden narra: primero el lugar y la sensación,
 * después las amenidades, y recién al final los datos duros y el plano. La
 * conversión no se pide hasta que la persona ya recorrió el proyecto.
 */
export default function PropuestaA() {
  const aereo = img("aereo");
  const institucional = video("institucional");

  return (
    <>
      <HeroA />

      {/* ── Manifiesto ───────────────────────────────────────────────────── */}
      <section id="proyecto" className="scroll-mt-20 bg-arena-50 py-20 md:py-32">
        <div className="container-plenor">
          <Reveal className="max-w-3xl">
            <span className="eyebrow text-ocre-600">El proyecto</span>
            <p className="display mt-5 text-2xl leading-[1.25] md:text-4xl md:leading-[1.2]">
              Residencial Aonami son {lotStats.count} lotes en Punta de Bombón, a
              dos minutos del pueblo y a dos minutos de la playa, sobre pista
              asfaltada. Un condominio cerrado con {siteConfig.project.amenitiesCount}{" "}
              amenidades y un solo ingreso.
            </p>
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-16 grid gap-x-10 gap-y-10 md:mt-24 md:grid-cols-2 lg:grid-cols-4"
          >
            {sellingPoints.map((p, i) => (
              <RevealItem as="li" key={p.title}>
                <span className="font-mono text-xs text-ocre-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Galería cinematográfica ──────────────────────────────────────── */}
      <HorizontalGallery />

      {/* ── Amenidades ───────────────────────────────────────────────────── */}
      <section id="amenidades" className="scroll-mt-20 bg-arena-50 py-20 md:py-32">
        <div className="container-plenor">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-ocre-600">Amenidades</span>
            <h2 className="display mt-4 text-4xl md:text-6xl">
              Todo pasa
              <br />
              en el centro
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              La piscina, el club house y las zonas de fogatas y parrillas están
              agrupadas en el corazón del condominio. El parque deportivo, a media
              longitud. Nada queda a más de cinco minutos caminando.
            </p>
          </Reveal>

          <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-28">
            {amenities.map((a, i) => {
              const image = img(a.image);
              const flip = i % 2 === 1;
              return (
                <Reveal
                  key={a.slug}
                  as="article"
                  className={`flex flex-col gap-6 md:items-center md:gap-14 ${
                    flip ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:w-3/5">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 60vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/5">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-grafito">
                        <a.icon className="size-4 text-ocre" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {a.n} / 10
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                      {a.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {a.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Video institucional ──────────────────────────────────────────── */}
      <section className="relative">
        <VideoModal>
          <div className="relative h-[70vh] min-h-[24rem] w-full overflow-hidden">
            <Image
              src={institucional.poster}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={institucional.posterBlur}
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-grafito/45" />
            <div className="container-plenor absolute inset-0 flex flex-col justify-center">
              <span className="eyebrow text-ocre">Video del proyecto</span>
              <p className="display mt-4 max-w-2xl text-3xl text-arena-50 md:text-5xl">
                {claims.secondary}
              </p>
              <div className="mt-8">
                <PlayBadge
                  label={`Ver el video · ${Math.round(institucional.duration)} s`}
                />
              </div>
            </div>
          </div>
        </VideoModal>
      </section>

      {/* ── El lugar / masterplan ────────────────────────────────────────── */}
      <section id="lugar" className="scroll-mt-20 bg-arena-50 py-20 md:py-32">
        <div className="container-plenor">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-ocre-600">El lugar</span>
            <h2 className="display mt-4 text-4xl md:text-6xl">
              Dónde queda,
              <br />
              exactamente
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Punta de Bombón, provincia de Islay. Se llega por la pista asfaltada{" "}
              {siteConfig.project.accessRoad}: dos minutos hasta el pueblo por un
              lado, dos minutos hasta la playa por el otro.
            </p>
          </Reveal>

          <Reveal className="mt-10 md:mt-14">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={aereo.src}
                alt={aereo.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={aereo.blurDataURL}
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Fotomontaje sobre la fotografía aérea real del terreno. Imagen
              referencial.
            </p>
          </Reveal>

          <Reveal className="mt-16 md:mt-24">
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
              El masterplan, amenidad por amenidad
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Toca cualquiera de los diez puntos para ver de qué se trata.
            </p>
            <Masterplan className="mt-6" />
          </Reveal>
        </div>
      </section>

      {/* ── Lotes ────────────────────────────────────────────────────────── */}
      <section className="on-grafito py-20 md:py-32">
        <div className="container-plenor">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow text-ocre">Los lotes</span>
              <h2 className="display mt-4 text-4xl md:text-6xl">
                {lotStats.count} lotes,
                <br />
                siete sectores
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Desde {formatAreaShort(lotStats.min)} hasta{" "}
                {formatAreaShort(lotStats.max)}, con un promedio de{" "}
                {formatAreaShort(lotStats.avg)}. Más {parking.count} plazas de
                estacionamiento de {parking.area} m² cada una.
              </p>
            </div>
            <Button asChild size="lg" className="gap-2 self-start md:self-auto">
              <Link href="/a/lotes">
                Ver el inventario completo
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <RevealGroup as="ul" className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-4">
            {[
              { value: lotStats.count, label: "lotes en total" },
              { value: formatAreaShort(lotStats.min), label: "el más pequeño" },
              { value: formatAreaShort(lotStats.max), label: "el más grande" },
              { value: formatAreaShort(lotStats.avg), label: "promedio" },
            ].map((s) => (
              <RevealItem as="li" key={s.label} className="bg-grafito p-5 md:p-7">
                <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Financiamiento ───────────────────────────────────────────────── */}
      <section className="bg-arena py-20 md:py-28">
        <div className="container-plenor">
          <Reveal className="flex flex-col gap-10 md:flex-row md:items-center md:gap-20">
            <div className="md:w-1/2">
              <span className="eyebrow text-ocre-600">Financiamiento</span>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                Directo con Plenor
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Sin bancos de por medio. Las condiciones específicas de cada lote
                las revisa contigo el equipo de ventas.
              </p>
              <Button asChild size="lg" className="mt-8 gap-2">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="size-4" />
                  Cotizar por WhatsApp
                </a>
              </Button>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-xl bg-grafito/10 sm:grid-cols-2 md:w-1/2">
              <div className="bg-arena-50 p-7">
                <dt className="text-xs text-muted-foreground">Inicial</dt>
                <dd className="mt-1 text-5xl font-semibold tracking-tight">
                  {siteConfig.project.financing.downPaymentPct}
                  <span className="text-2xl">%</span>
                </dd>
              </div>
              <div className="bg-arena-50 p-7">
                <dt className="text-xs text-muted-foreground">Cuotas</dt>
                <dd className="mt-1 text-5xl font-semibold tracking-tight">
                  {siteConfig.project.financing.installments}
                </dd>
                <p className="mt-1 text-xs font-medium text-ocre-600">
                  sin intereses
                </p>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Contacto + FAQ ───────────────────────────────────────────────── */}
      <section id="contacto" className="scroll-mt-20 bg-arena-50 py-20 md:py-32">
        <div className="container-plenor grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <span className="eyebrow text-ocre-600">Contacto</span>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              Conversemos
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Déjanos tus datos y te escribimos con la disponibilidad y los
              precios vigentes. Si prefieres algo más directo, WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-medium hover:text-ocre-600"
              >
                <WhatsappIcon className="size-4 text-muted-foreground" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <p className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.addresses.project.line},{" "}
                {siteConfig.addresses.project.region}
              </p>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Wallet className="size-4 shrink-0" />
                {siteConfig.contact.schedule}
              </p>
            </div>

            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
