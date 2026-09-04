"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Send } from "lucide-react";

import {
  CheckField,
  Honeypot,
  TextAreaField,
  TextField,
} from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/lib/actions";
import { initialFormState } from "@/lib/schemas";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full gap-2">
      {pending ? "Enviando…" : "Enviar consulta"}
      {!pending && <Send className="size-4" />}
    </Button>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [state, action] = useActionState(submitContact, initialFormState);
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-6 py-12 text-center",
          className,
        )}
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-ocre">
          <Check className="size-5 text-grafito" />
        </span>
        <p className="max-w-sm text-balance text-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className={cn("relative flex flex-col gap-4", className)}>
      <Honeypot />

      <TextField
        name="nombre"
        label="Nombre y apellidos"
        autoComplete="name"
        required
        errors={errors?.nombre}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          name="email"
          label="Correo"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          errors={errors?.email}
        />
        <TextField
          name="telefono"
          label="Teléfono / WhatsApp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          errors={errors?.telefono}
        />
      </div>

      <TextField
        name="interes"
        label="¿Qué te interesa?"
        placeholder="Ej. un lote de 120 m² en el sector C"
        errors={errors?.interes}
      />

      <TextAreaField
        name="mensaje"
        label="Mensaje"
        rows={4}
        placeholder="Cuéntanos qué necesitas saber."
        errors={errors?.mensaje}
      />

      <CheckField name="aceptaDatos" required errors={errors?.aceptaDatos}>
        Autorizo el uso de mis datos para que Plenor me contacte con información
        sobre Residencial Aonami.
      </CheckField>

      {state.status === "error" && !errors && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
