"use client";

import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

import { WhatsappIcon } from "@/components/shared/brand-icons";
import { ContactForm } from "@/components/shared/contact-form";
import { Masterplan } from "@/components/shared/masterplan";
import { VideoLoop } from "@/components/shared/video";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig, whatsappUrl } from "@/config/site";
import { claims, faqs, sellingPoints } from "@/content/copy";
import { lotStats } from "@/content/lotes";
import { img } from "@/content/media";
import { IaBand, IaFigure } from "../ia";
import { Section, SectionHead, SReveal, SRevealGroup, SRevealItem } from "../ui";

/**
 * SECCIONES SIN VARIANTE
 *
 * Aquí no hay una decisión de diseño que el cliente deba tomar: el manifiesto,
 * el masterplan, el financiamiento y el contacto tienen una sola forma
 * razonable. Poner variantes por poner solo alarga el panel y cansa a quien
 * decide.
 */

/* ── Manifiesto ─────────────────────────────────────────────────────────── */

export function Manifiesto() {
  return (
    <Section id="proyecto" tone="claro">
      <div className="container-plenor">
        <SReveal className="max-w-3xl">
          <span className="eyebrow s-accent">El proyecto</span>
          <p className="s-display mt-5 text-2xl leading-[1.25] md:text-4xl md:leading-[1.2]">
            Residencial Aonami son {lotStats.count} lotes en Punta de Bombón, a dos
            minutos del pueblo y a dos minutos de la playa, sobre pista asfaltada.
            Un condominio cerrado con {siteConfig.project.amenitiesCount} amenidades
            y un solo ingreso.
          </p>
        </SReveal>

        <SReveal className="mt-12 md:mt-16">
          <IaFigure slot="manifiesto" sizes="100vw" caption />
        </SReveal>

        <SRevealGroup
          as="ul"
          className="mt-16 grid gap-x-10 gap-y-10 md:mt-24 md:grid-cols-2 lg:grid-cols-4"
        >
          {sellingPoints.map((p, i) => (
            <SRevealItem as="li" key={p.title}>
              <span className="s-accent font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </SRevealItem>
          ))}
        </SRevealGroup>
      </div>
    </Section>
  );
}

/* ── Video ──────────────────────────────────────────────────────────────── */

/**
 * Banda de video a sangre.
 *
 * Usa el loop de la piscina, que es uno de los tres MP4 versionados. El
 * institucional de 98 s está declarado en el manifiesto de medios pero su
 * archivo no está en el repositorio, así que no se enlaza desde aquí: un botón
 * de play que no reproduce nada es peor que no tener botón.
 */
export function VideoBloque() {
  return (
    <Section tone="ninguno" padded={false} className="relative">
      <div className="relative h-[60vh] min-h-[22rem] w-full md:h-[72vh]">
        <VideoLoop id="piscina" className="absolute inset-0 size-full" />
        <div className="absolute inset-0 bg-grafito/45" />
        <div className="on-image container-plenor absolute inset-0 flex flex-col justify-center">
          <span className="eyebrow text-[var(--s-accent-dark)]">
            Tu espacio, el verano
          </span>
          <p className="s-display mt-4 max-w-2xl text-3xl text-arena-50 md:text-5xl">
            {claims.secondary}
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-arena-50/80">
            {claims.mainSupport}
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ── El lugar + masterplan ──────────────────────────────────────────────── */

export function Lugar() {
  const aereo = img("aereo");

  return (
    <Section id="lugar" tone="claro">
      <div className="container-plenor">
        <SectionHead
          eyebrow="El lugar"
          title={
            <>
              Dónde queda,
              <br />
              exactamente
            </>
          }
          lead={
            <>
              Punta de Bombón, provincia de Islay. Se llega por la{" "}
              {siteConfig.project.accessRoad.toLowerCase()}: dos minutos hasta el
              pueblo por un lado, dos minutos hasta la playa por el otro.
            </>
          }
        />

        <SReveal className="mt-10 md:mt-14">
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
        </SReveal>

        <SReveal className="mt-12 md:mt-16">
          <IaFigure slot="mapa" sizes="100vw" />
        </SReveal>

        <SReveal className="mt-16 md:mt-24">
          <h3 className="s-display text-xl md:text-2xl">
            El masterplan, amenidad por amenidad
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Toca cualquiera de los diez puntos para ver de qué se trata.
          </p>
          <Masterplan className="mt-6" />
        </SReveal>
      </div>
    </Section>
  );
}

/* ── Financiamiento ─────────────────────────────────────────────────────── */

export function Financiamiento() {
  return (
    <Section tone="arena">
      <div className="container-plenor">
        <SReveal className="flex flex-col gap-10 md:flex-row md:items-center md:gap-20">
          <div className="md:w-1/2">
            <span className="eyebrow s-accent">Financiamiento</span>
            <h2 className="s-display mt-4 text-4xl md:text-5xl">
              Directo con Plenor
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Sin bancos de por medio. Las condiciones específicas de cada lote las
              revisa contigo el equipo de ventas.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                Cotizar por WhatsApp
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-4 md:w-1/2">
          <IaFigure slot="financiamiento" sizes="(max-width: 767px) 100vw, 45vw" />
          <dl className="grid gap-px overflow-hidden rounded-xl bg-grafito/10 sm:grid-cols-2">
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
              <p className="s-accent mt-1 text-xs font-medium">sin intereses</p>
            </div>
          </dl>
          </div>
        </SReveal>
      </div>
    </Section>
  );
}

/* ── Contacto + preguntas ───────────────────────────────────────────────── */

export function Contacto() {
  return (
    <Section id="contacto" tone="claro">
      <div className="container-plenor grid gap-14 md:grid-cols-2 md:gap-20">
        <SReveal>
          <span className="eyebrow s-accent">Contacto</span>
          <h2 className="s-display mt-4 text-4xl md:text-5xl">Conversemos</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Déjanos tus datos y te escribimos con la disponibilidad y los precios
            vigentes. Si prefieres algo más directo, WhatsApp.
          </p>

          <IaFigure
            slot="contacto"
            className="mt-8"
            sizes="(max-width: 767px) 100vw, 45vw"
          />

          <div className="mt-8 flex flex-col gap-3 text-sm">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium transition-colors hover:text-[var(--s-accent-light)]"
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
              <Clock className="size-4 shrink-0" />
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
        </SReveal>

        <SReveal>
          <ContactForm />
        </SReveal>
      </div>
    </Section>
  );
}

/* ── Separador ──────────────────────────────────────────────────────────── */

/**
 * Banda decorativa entre secciones. Solo existe si hay un set de ilustración
 * activo; sin él no deja hueco ni margen, simplemente no se renderiza.
 */
export function SeparadorIa() {
  return <IaBand slot="separador" />;
}
