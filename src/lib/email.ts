import "server-only";

import { siteConfig } from "@/config/site";

/**
 * ENVÍO DE CORREO
 *
 * Soporta dos proveedores y se elige solo según qué variables de entorno
 * existan, sin tocar código:
 *
 *   1. RESEND_API_KEY  → Resend
 *   2. SMTP_HOST …     → SMTP genérico (Google Workspace, Zoho, cPanel…)
 *   3. ninguna         → modo "log": no envía nada, escribe el contenido en la
 *                        consola del servidor. Es lo que ocurre en desarrollo.
 *
 * Se dejaron los dos porque la decisión depende del cliente: Resend necesita
 * verificar el dominio, SMTP funciona con el correo corporativo que ya tengan.
 */

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Para que "Responder" vaya al consumidor y no a la casilla del sistema. */
  replyTo?: string;
}

export type MailResult =
  | { ok: true; provider: "resend" | "smtp" | "log" }
  | { ok: false; provider: string; error: string };

function provider(): "resend" | "smtp" | "log" {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST) return "smtp";
  return "log";
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const from = siteConfig.mail.from;
  const bcc = siteConfig.mail.bcc || undefined;
  const which = provider();

  try {
    if (which === "resend") {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from,
        to: message.to,
        bcc,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
      });
      if (error) return { ok: false, provider: "resend", error: error.message };
      return { ok: true, provider: "resend" };
    }

    if (which === "smtp") {
      const nodemailer = (await import("nodemailer")).default;
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
          : undefined,
      });
      await transport.sendMail({
        from,
        to: message.to,
        bcc,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
      });
      return { ok: true, provider: "smtp" };
    }

    console.warn(
      "\n[correo] No hay proveedor configurado (falta RESEND_API_KEY o SMTP_HOST).\n" +
        "         El mensaje NO se envió. Contenido:\n" +
        `         Para:    ${message.to}\n` +
        `         Asunto:  ${message.subject}\n` +
        `${message.text.replace(/^/gm, "         │ ")}\n`,
    );
    return { ok: true, provider: "log" };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[correo] Falló el envío vía ${which}:`, error);
    return { ok: false, provider: which, error };
  }
}
