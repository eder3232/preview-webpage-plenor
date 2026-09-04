"use server";

import { siteConfig } from "@/config/site";
import { sendMail } from "./email";
import {
  complaintEmail,
  complaintReceiptEmail,
  contactEmail,
} from "./mail-templates";
import {
  complaintSchema,
  contactSchema,
  type FormState,
} from "./schemas";

/**
 * Server Actions de los formularios.
 *
 * Ambas se invocan con `<form action={…}>` + `useActionState`, así que los
 * formularios funcionan aunque el JavaScript no haya cargado. La validación de
 * zod corre siempre en el servidor: la del cliente es solo para dar feedback
 * rápido, nunca es la que decide.
 */

function fail(message: string, fieldErrors?: Record<string, string[]>): FormState {
  return { status: "error", message, fieldErrors };
}

function nowInLima() {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date());
}

/**
 * Código correlativo de la hoja de reclamación.
 *
 * ⚠️ Sin base de datos no hay correlativo real: esto genera un código único
 *    por fecha + aleatorio. Es suficiente para que el consumidor identifique
 *    su hoja, pero el registro legal de reclamos vive en la casilla de correo
 *    `mail.complaintsTo`. Si el cliente necesita un libro con numeración
 *    estrictamente correlativa y consultable, hay que agregar persistencia.
 */
function complaintCode() {
  const d = new Date();
  const ymd =
    d.getUTCFullYear().toString() +
    String(d.getUTCMonth() + 1).padStart(2, "0") +
    String(d.getUTCDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${siteConfig.complaintsBook.codePrefix}-${ymd}-${rand}`;
}

/**
 * FormData devuelve `null` para un campo que no viene en el POST, y `null` no
 * es lo mismo que "opcional" para zod. Un campo que solo se renderiza bajo
 * condición —los datos del apoderado, por ejemplo— simplemente no existe en el
 * envío, así que hay que normalizarlo a `undefined`.
 */
function text(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

function checked(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

/**
 * Trampa para bots. Se comprueba ANTES de validar y responde un éxito falso:
 * si devolviera un error de validación, el bot sabría qué campo lo delató y
 * bastaría con dejarlo vacío en el siguiente intento.
 */
function isBot(formData: FormData): boolean {
  return Boolean(text(formData, "website"));
}

/* ========================================================================== */

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) {
    return { status: "success", message: "Gracias por escribirnos." };
  }

  const parsed = contactSchema.safeParse({
    nombre: text(formData, "nombre"),
    email: text(formData, "email"),
    telefono: text(formData, "telefono"),
    interes: text(formData, "interes") ?? "",
    mensaje: text(formData, "mensaje") ?? "",
    aceptaDatos: checked(formData, "aceptaDatos"),
    website: text(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return fail(
      "Revisa los campos marcados.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const when = nowInLima();
  const mail = contactEmail(parsed.data, when);
  const result = await sendMail({
    to: siteConfig.mail.leadsTo,
    replyTo: parsed.data.email,
    ...mail,
  });

  if (!result.ok) {
    return fail(
      "No pudimos enviar tu consulta. Escríbenos por WhatsApp y la atendemos de inmediato.",
    );
  }

  return {
    status: "success",
    message: `Gracias, ${parsed.data.nombre.split(" ")[0]}. Te escribimos en menos de 24 horas hábiles.`,
  };
}

/* ========================================================================== */

export async function submitComplaint(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) {
    return { status: "success", message: "Registrado." };
  }

  const parsed = complaintSchema.safeParse({
    nombre: text(formData, "nombre"),
    tipoDocumento: text(formData, "tipoDocumento"),
    numeroDocumento: text(formData, "numeroDocumento"),
    email: text(formData, "email"),
    telefono: text(formData, "telefono"),
    domicilio: text(formData, "domicilio"),
    esMenor: checked(formData, "esMenor"),
    apoderadoNombre: text(formData, "apoderadoNombre") ?? "",
    apoderadoDocumento: text(formData, "apoderadoDocumento") ?? "",
    tipoBien: text(formData, "tipoBien"),
    descripcionBien: text(formData, "descripcionBien"),
    montoReclamado: text(formData, "montoReclamado") ?? "",
    tipoReclamo: text(formData, "tipoReclamo"),
    detalle: text(formData, "detalle"),
    pedido: text(formData, "pedido"),
    aceptaDatos: checked(formData, "aceptaDatos"),
    website: text(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return fail(
      "Faltan datos obligatorios. Revisa los campos marcados en rojo.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const code = complaintCode();
  const when = nowInLima();

  // El correo a la empresa es el registro legal: si ese falla, el reclamo no
  // queda presentado y hay que decírselo al consumidor sin rodeos.
  const toCompany = await sendMail({
    to: siteConfig.mail.complaintsTo,
    replyTo: parsed.data.email,
    ...complaintEmail(parsed.data, code, when),
  });

  if (!toCompany.ok) {
    return fail(
      "No pudimos registrar tu reclamo por un problema técnico. " +
        `Por favor escríbenos a ${siteConfig.mail.complaintsTo} o llámanos al ${siteConfig.contact.phoneDisplay}.`,
    );
  }

  // La copia al consumidor es obligatoria, pero si falla el reclamo ya quedó
  // presentado: no se le devuelve un error, se registra para revisión.
  const toConsumer = await sendMail({
    to: parsed.data.email,
    ...complaintReceiptEmail(parsed.data, code, when),
  });
  if (!toConsumer.ok) {
    console.error(
      `[reclamaciones] Hoja ${code} registrada, pero la copia al consumidor ` +
        `(${parsed.data.email}) falló: ${toConsumer.error}`,
    );
  }

  return {
    status: "success",
    code,
    message:
      `Registramos tu ${parsed.data.tipoReclamo.toLowerCase()}. ` +
      `Te enviamos una copia a ${parsed.data.email}.`,
  };
}
