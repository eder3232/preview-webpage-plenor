import type { Metadata } from "next";
import { BookOpen, Clock, Mail, Phone } from "lucide-react";

import { ComplaintsForm } from "@/components/shared/complaints-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Libro de Reclamaciones virtual de Plenor conforme al Código de Protección y Defensa del Consumidor.",
  robots: { index: false, follow: false },
};

export default function LibroDeReclamacionesPage() {
  const { complaintsBook, addresses, contact, legalName, ruc } = siteConfig;

  return (
    <div className="container-plenor py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* ── Encabezado ──────────────────────────────────────────────────── */}
        <div className="flex items-start gap-4">
          <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-lg bg-grafito">
            <BookOpen className="size-5 text-ocre" />
          </span>
          <div>
            <span className="eyebrow text-ocre-600">Conforme a Ley 29571</span>
            <h1 className="display mt-1 text-3xl md:text-4xl">
              Libro de Reclamaciones
            </h1>
          </div>
        </div>

        {/* ── Datos del proveedor ─────────────────────────────────────────── */}
        <dl className="mt-8 grid gap-x-8 gap-y-3 rounded-xl border border-border bg-card p-5 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">Razón social</dt>
            <dd className="font-medium">{legalName}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">RUC</dt>
            <dd className="font-mono font-medium">{ruc}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Domicilio fiscal</dt>
            <dd className="font-medium">
              {addresses.office.line}, {addresses.office.region}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Establecimiento</dt>
            <dd className="font-medium">
              {addresses.project.line}, {addresses.project.region}
            </dd>
          </div>
        </dl>

        {/* ── Aviso obligatorio ───────────────────────────────────────────── */}
        <div className="mt-5 rounded-xl border-l-[3px] border-l-ocre bg-secondary/60 p-5">
          <p className="text-sm leading-relaxed">{complaintsBook.notice}</p>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium">
            <Clock className="size-4 shrink-0 text-ocre-600" />
            Plazo de respuesta: {complaintsBook.responseDaysLabel}.
          </p>
        </div>

        {/* ── Formulario ──────────────────────────────────────────────────── */}
        <div className="mt-10 rounded-xl border border-border bg-card p-5 md:p-8">
          <ComplaintsForm />
        </div>

        {/* ── Canales alternativos ────────────────────────────────────────── */}
        <div className="mt-8 rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold">¿Prefieres otro canal?</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            También puedes presentar tu reclamo en el libro físico disponible en
            nuestras oficinas, o comunicarte directamente con nosotros.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm md:flex-row md:gap-6">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 font-medium hover:text-ocre-600"
            >
              <Phone className="size-4 text-muted-foreground" />
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 font-medium hover:text-ocre-600"
            >
              <Mail className="size-4 text-muted-foreground" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
