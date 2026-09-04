import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/b/page-shell";
import { WhatsappIcon } from "@/components/shared/brand-icons";
import { ContactForm } from "@/components/shared/contact-form";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappUrl } from "@/config/site";
import { faqs } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos para conocer la disponibilidad y los precios vigentes de Residencial Aonami.",
};

export default function ContactoB() {
  const { contact, addresses } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu lote"
        description="Déjanos tus datos y te enviamos la disponibilidad actualizada y los precios vigentes. Sin compromiso."
        image="v-clubhouse"
      />

      <section className="container-plenor py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* ── Datos ──────────────────────────────────────────────────── */}
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight">
              Canales directos
            </h2>

            <Button asChild size="lg" className="mt-5 w-full gap-2">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                Escribir por WhatsApp
              </a>
            </Button>

            <ul className="mt-8 flex flex-col divide-y divide-border border-y border-border text-sm">
              <li className="py-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 font-medium hover:text-ocre-600"
                >
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="py-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 break-all font-medium hover:text-ocre-600"
                >
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 py-4 text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                {contact.schedule}
              </li>
            </ul>

            <h2 className="mt-10 text-xl font-semibold tracking-tight">
              Dónde estamos
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[addresses.project, addresses.office].map((a) => (
                <li key={a.label}>
                  <a
                    href={a.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-grafito"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-ocre-600" />
                    <span className="text-sm">
                      <strong className="font-semibold">{a.label}</strong>
                      <br />
                      <span className="text-muted-foreground">
                        {a.line}
                        <br />
                        {a.region}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              ¿Tienes un reclamo o una queja? Usa nuestro{" "}
              <Link
                href="/libro-de-reclamaciones"
                className="font-medium text-foreground underline underline-offset-2"
              >
                Libro de Reclamaciones
              </Link>
              .
            </p>
          </Reveal>

          {/* ── Formulario ─────────────────────────────────────────────── */}
          <Reveal id="formulario" className="scroll-mt-28">
            <div className="rounded-xl border border-border bg-card p-5 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Escríbenos
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Te respondemos en menos de 24 horas hábiles.
              </p>
              <ContactForm className="mt-6" />
            </div>
          </Reveal>
        </div>

        {/* ── Preguntas frecuentes ─────────────────────────────────────── */}
        <Reveal className="mt-16 md:mt-24">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-4 grid gap-x-12 md:grid-cols-2">
            <Accordion type="single" collapsible>
              {faqs.slice(0, 4).map((f) => (
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
            <Accordion type="single" collapsible>
              {faqs.slice(4).map((f) => (
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
          </div>
        </Reveal>
      </section>
    </>
  );
}
