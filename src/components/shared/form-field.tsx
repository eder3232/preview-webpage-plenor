"use client";

import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/**
 * Campo de formulario con etiqueta, error y las conexiones de accesibilidad
 * ya hechas (aria-invalid + aria-describedby). Los errores vienen del servidor
 * a través de `useActionState`, así que un formulario sigue siendo usable sin
 * JavaScript.
 */

interface BaseProps {
  name: string;
  label: string;
  errors?: string[];
  hint?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
}

function useFieldIds(name: string, errors?: string[], hint?: string) {
  const uid = useId();
  const id = `${name}-${uid}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [errors?.length ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return { id, errorId, hintId, describedBy };
}

function Shell({
  id,
  label,
  required,
  hint,
  hintId,
  errors,
  errorId,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  hintId: string;
  errors?: string[];
  errorId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {hint && (
        <p id={hintId} className="text-[11px] text-muted-foreground">
          {hint}
        </p>
      )}
      {errors?.length ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  ...props
}: BaseProps & {
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const { id, errorId, hintId, describedBy } = useFieldIds(
    props.name,
    props.errors,
    props.hint,
  );
  return (
    <Shell {...props} id={id} errorId={errorId} hintId={hintId}>
      <Input
        id={id}
        name={props.name}
        type={type}
        required={props.required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        defaultValue={props.defaultValue}
        aria-invalid={props.errors?.length ? true : undefined}
        aria-describedby={describedBy}
        className="bg-card"
      />
    </Shell>
  );
}

export function TextAreaField({
  placeholder,
  rows = 4,
  ...props
}: BaseProps & { placeholder?: string; rows?: number }) {
  const { id, errorId, hintId, describedBy } = useFieldIds(
    props.name,
    props.errors,
    props.hint,
  );
  return (
    <Shell {...props} id={id} errorId={errorId} hintId={hintId}>
      <Textarea
        id={id}
        name={props.name}
        rows={rows}
        required={props.required}
        placeholder={placeholder}
        defaultValue={props.defaultValue}
        aria-invalid={props.errors?.length ? true : undefined}
        aria-describedby={describedBy}
        className="resize-y bg-card"
      />
    </Shell>
  );
}

export function SelectField({
  options,
  ...props
}: BaseProps & { options: readonly string[] }) {
  const { id, errorId, hintId, describedBy } = useFieldIds(
    props.name,
    props.errors,
    props.hint,
  );
  return (
    <Shell {...props} id={id} errorId={errorId} hintId={hintId}>
      {/* <select> nativo a propósito: el Select de shadcn no envía valor en un
          POST sin JavaScript, y este formulario tiene que funcionar igual. */}
      <select
        id={id}
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue ?? options[0]}
        aria-invalid={props.errors?.length ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-9 w-full rounded-md border border-input bg-card px-3 text-sm shadow-xs",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
          "aria-invalid:border-destructive",
        )}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  );
}

/** Campo trampa: invisible para personas, tentador para bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website">No llenar</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/**
 * Casilla nativa. Se usa `<input type="checkbox">` en vez del Checkbox de
 * shadcn porque este necesita JavaScript para existir, y estos formularios
 * —el Libro de Reclamaciones sobre todo— tienen que poder enviarse sin él.
 */
export function CheckField({
  name,
  errors,
  children,
  defaultChecked,
  required,
  onChange,
  className,
}: {
  name: string;
  errors?: string[];
  children: React.ReactNode;
  defaultChecked?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}) {
  const uid = useId();
  const id = `${name}-${uid}`;
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          defaultChecked={defaultChecked}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-invalid={errors?.length ? true : undefined}
          aria-describedby={errors?.length ? errorId : undefined}
          className={cn(
            "mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded-[4px]",
            "border border-input bg-card transition-colors",
            "checked:border-grafito checked:bg-grafito",
            "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%23FFB035%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M3 8.5l3.5 3.5L13 4.5%22/></svg>')]",
            "bg-center bg-no-repeat",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "aria-invalid:border-destructive",
          )}
        />
        <Label
          htmlFor={id}
          className="text-xs font-normal leading-relaxed text-muted-foreground"
        >
          {children}
        </Label>
      </div>
      {errors?.length ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}
