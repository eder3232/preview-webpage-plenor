"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { BadgeCheck, Info } from "lucide-react";

import {
  CheckField,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { submitComplaint } from "@/lib/actions";
import {
  initialFormState,
  TIPOS_BIEN,
  TIPOS_DOCUMENTO,
  TIPOS_RECLAMO,
} from "@/lib/schemas";

/**
 * LIBRO DE RECLAMACIONES VIRTUAL
 *
 * Los campos y su agrupación siguen la hoja de reclamación del
 * D.S. 011-2011-PCM: identificación del consumidor, identificación del bien
 * contratado y detalle de la reclamación. Los textos legales y el plazo de
 * respuesta salen de src/config/site.ts para que el asesor legal del cliente
 * pueda ajustarlos sin tocar código.
 */

function Fieldset({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-border pt-6">
      <legend className="sr-only">{title}</legend>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs text-ocre-600">{step}</span>
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto">
      {pending ? "Registrando…" : "Registrar y enviar"}
    </Button>
  );
}

export function ComplaintsForm() {
  const [state, action] = useActionState(submitComplaint, initialFormState);
  const [esMenor, setEsMenor] = useState(false);
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-ocre">
          <BadgeCheck className="size-6 text-grafito" />
        </span>
        <h2 className="mt-4 text-xl font-semibold tracking-tight">
          Reclamo registrado
        </h2>
        {state.code && (
          <p className="mt-3 inline-block rounded-md bg-secondary px-3 py-1.5 font-mono text-sm font-semibold">
            {state.code}
          </p>
        )}
        <p className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
          {state.message} Guarda este código: lo necesitarás para hacer
          seguimiento. Te responderemos en un plazo no mayor a{" "}
          {siteConfig.complaintsBook.responseDaysLabel}.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="relative flex flex-col gap-8">
      <Honeypot />

      <Fieldset
        step="01"
        title="Identificación del consumidor"
        description="Todos los datos de esta sección son obligatorios por ley."
      >
        <TextField
          name="nombre"
          label="Nombre y apellidos"
          autoComplete="name"
          required
          errors={errors?.nombre}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            name="tipoDocumento"
            label="Tipo de documento"
            options={TIPOS_DOCUMENTO}
            required
            errors={errors?.tipoDocumento}
          />
          <TextField
            name="numeroDocumento"
            label="Número de documento"
            required
            errors={errors?.numeroDocumento}
          />
        </div>
        <TextField
          name="domicilio"
          label="Domicilio"
          autoComplete="street-address"
          required
          errors={errors?.domicilio}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            hint="Aquí te enviaremos la copia de tu hoja de reclamación."
            errors={errors?.email}
          />
          <TextField
            name="telefono"
            label="Teléfono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            errors={errors?.telefono}
          />
        </div>

        <CheckField name="esMenor" onChange={setEsMenor}>
          El consumidor es menor de edad.
        </CheckField>

        {esMenor && (
          <div className="grid gap-4 rounded-lg bg-secondary/60 p-4 md:grid-cols-2">
            <TextField
              name="apoderadoNombre"
              label="Nombre del padre, madre o tutor"
              required
              errors={errors?.apoderadoNombre}
            />
            <TextField
              name="apoderadoDocumento"
              label="Documento del padre, madre o tutor"
              required
              errors={errors?.apoderadoDocumento}
            />
          </div>
        )}
      </Fieldset>

      <Fieldset
        step="02"
        title="Identificación del bien contratado"
        description="Qué producto o servicio de Plenor motiva tu reclamo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            name="tipoBien"
            label="Tipo"
            options={TIPOS_BIEN}
            required
            errors={errors?.tipoBien}
          />
          <TextField
            name="montoReclamado"
            label="Monto reclamado"
            hint="Opcional."
            placeholder="S/ —"
            errors={errors?.montoReclamado}
          />
        </div>
        <TextField
          name="descripcionBien"
          label="Descripción"
          placeholder="Ej. Lote C-12 de Residencial Aonami"
          required
          errors={errors?.descripcionBien}
        />
      </Fieldset>

      <Fieldset step="03" title="Detalle de la reclamación">
        <SelectField
          name="tipoReclamo"
          label="Tipo"
          options={TIPOS_RECLAMO}
          required
          errors={errors?.tipoReclamo}
        />

        <div className="flex gap-2 rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <span>
            <strong className="font-semibold text-foreground">Reclamo:</strong>{" "}
            {siteConfig.complaintsBook.definitions.reclamo}
            <br />
            <strong className="font-semibold text-foreground">Queja:</strong>{" "}
            {siteConfig.complaintsBook.definitions.queja}
          </span>
        </div>

        <TextAreaField
          name="detalle"
          label="Detalle"
          rows={6}
          placeholder="Describe qué ocurrió, cuándo y con quién."
          required
          errors={errors?.detalle}
        />
        <TextAreaField
          name="pedido"
          label="Pedido del consumidor"
          rows={4}
          placeholder="Qué esperas que hagamos para resolverlo."
          required
          errors={errors?.pedido}
        />
      </Fieldset>

      <div className="flex flex-col gap-5 border-t border-border pt-6">
        <CheckField name="aceptaDatos" required errors={errors?.aceptaDatos}>
          {siteConfig.complaintsBook.dataPolicy}
        </CheckField>

        {state.status === "error" && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {state.message}
          </p>
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
