import { z } from "zod";

/* ==========================================================================
   Piezas comunes
   ========================================================================== */

const nombre = z
  .string()
  .trim()
  .min(3, "Escribe tu nombre completo.")
  .max(120, "Máximo 120 caracteres.");

const email = z
  .string()
  .trim()
  .min(1, "Necesitamos tu correo para responderte.")
  .max(160, "Máximo 160 caracteres.")
  .pipe(z.email("Revisa el correo: parece incompleto."));

/** Acepta formatos peruanos con o sin código de país, espacios y guiones. */
const telefono = z
  .string()
  .trim()
  .min(6, "Escribe un teléfono de contacto.")
  .max(24, "Máximo 24 caracteres.")
  .regex(/^[+\d][\d\s()-]{5,23}$/, "Solo números, espacios, guiones y +.");

/** Campo trampa para bots: si viene lleno, se descarta la petición. */
const honeypot = z.string().max(0).optional().or(z.literal(""));

/* ==========================================================================
   Formulario de contacto / cotización
   ========================================================================== */

export const contactSchema = z.object({
  nombre,
  email,
  telefono,
  /** Sector o metraje que le interesa. Opcional: no todos llegan decididos. */
  interes: z.string().trim().max(80, "Máximo 80 caracteres.").optional().or(z.literal("")),
  mensaje: z
    .string()
    .trim()
    .max(1500, "Máximo 1500 caracteres.")
    .optional()
    .or(z.literal("")),
  aceptaDatos: z.literal(true, {
    error: "Necesitamos tu autorización para contactarte.",
  }),
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

/* ==========================================================================
   Libro de Reclamaciones — INDECOPI
   Campos exigidos por el D.S. 011-2011-PCM (Reglamento del Libro de
   Reclamaciones) y sus modificatorias:
     · identificación del consumidor (incluye domicilio y documento)
     · identificación del bien contratado
     · detalle de la reclamación y pedido del consumidor
     · datos del apoderado si el consumidor es menor de edad
   ========================================================================== */

export const TIPOS_DOCUMENTO = ["DNI", "Carné de extranjería", "Pasaporte", "RUC"] as const;
export const TIPOS_BIEN = ["Producto", "Servicio"] as const;
export const TIPOS_RECLAMO = ["Reclamo", "Queja"] as const;

export const complaintSchema = z
  .object({
    // ── 1. Identificación del consumidor ───────────────────────────────────
    nombre,
    tipoDocumento: z.enum(TIPOS_DOCUMENTO, { error: "Elige un tipo de documento." }),
    numeroDocumento: z
      .string()
      .trim()
      .min(6, "Mínimo 6 caracteres.")
      .max(20, "Máximo 20 caracteres.")
      .regex(/^[A-Za-z0-9-]+$/, "Solo letras y números."),
    email,
    telefono,
    domicilio: z
      .string()
      .trim()
      .min(6, "El domicilio es obligatorio por ley.")
      .max(200, "Máximo 200 caracteres."),

    // ── 1b. Si el consumidor es menor de edad ──────────────────────────────
    esMenor: z.boolean().default(false),
    apoderadoNombre: z.string().trim().max(120, "Máximo 120 caracteres.").optional().or(z.literal("")),
    apoderadoDocumento: z.string().trim().max(20, "Máximo 20 caracteres.").optional().or(z.literal("")),

    // ── 2. Identificación del bien contratado ──────────────────────────────
    tipoBien: z.enum(TIPOS_BIEN, { error: "Indica si es un producto o un servicio." }),
    descripcionBien: z
      .string()
      .trim()
      .min(3, "Describe brevemente el producto o servicio.")
      .max(200, "Máximo 200 caracteres."),
    /** Opcional: no siempre hay un monto asociado. */
    montoReclamado: z.string().trim().max(30, "Máximo 30 caracteres.").optional().or(z.literal("")),

    // ── 3. Detalle de la reclamación ───────────────────────────────────────
    tipoReclamo: z.enum(TIPOS_RECLAMO, { error: "Elige si es un reclamo o una queja." }),
    detalle: z
      .string()
      .trim()
      .min(20, "Cuéntanos qué pasó con un poco más de detalle (mínimo 20 caracteres).")
      .max(3000, "Máximo 3000 caracteres."),
    pedido: z
      .string()
      .trim()
      .min(10, "Indica qué esperas que hagamos.")
      .max(1500, "Máximo 1500 caracteres."),

    // ── 4. Consentimiento ──────────────────────────────────────────────────
    aceptaDatos: z.literal(true, {
      error: "Debes aceptar el tratamiento de datos para registrar el reclamo.",
    }),
    website: honeypot,
  })
  .refine((d) => !d.esMenor || (d.apoderadoNombre ?? "").trim().length >= 3, {
    path: ["apoderadoNombre"],
    error: "Si el consumidor es menor de edad, indica el nombre del padre, madre o tutor.",
  })
  .refine((d) => !d.esMenor || (d.apoderadoDocumento ?? "").trim().length >= 6, {
    path: ["apoderadoDocumento"],
    error: "Indica el documento del padre, madre o tutor.",
  });

export type ComplaintInput = z.infer<typeof complaintSchema>;

/* ========================================================================== */

export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string; code?: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export const initialFormState: FormState = { status: "idle" };
