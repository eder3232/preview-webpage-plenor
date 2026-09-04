import "server-only";

import { siteConfig } from "@/config/site";
import type { ComplaintInput, ContactInput } from "./schemas";

/**
 * Plantillas de correo en HTML de tabla. Nada de CSS moderno: los clientes de
 * correo (Outlook sobre todo) no lo soportan. Cada correo lleva también su
 * versión en texto plano.
 */

const GRAFITO = "#1f2328";
const ARENA = "#e9e3db";
const OCRE = "#ffb035";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

function shell(title: string, subtitle: string, body: string) {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title></head>
<body style="margin:0;padding:24px 0;background:#faf8f5;font-family:Helvetica,Arial,sans-serif;color:${GRAFITO}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${ARENA}">
  <tr><td style="background:${GRAFITO};padding:20px 24px">
    <div style="color:${OCRE};font-size:11px;letter-spacing:2px;text-transform:uppercase">${esc(siteConfig.developer)}</div>
    <div style="color:#ffffff;font-size:19px;font-weight:bold;padding-top:4px">${esc(title)}</div>
    <div style="color:#a8b0b8;font-size:13px;padding-top:2px">${esc(subtitle)}</div>
  </td></tr>
  <tr><td style="padding:24px">${body}</td></tr>
  <tr><td style="background:#faf8f5;border-top:1px solid ${ARENA};padding:14px 24px;font-size:11px;color:#6b747e">
    Enviado automáticamente desde ${esc(siteConfig.url)}
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function rows(pairs: [string, string][]) {
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;line-height:1.5">` +
    pairs
      .filter(([, v]) => v && v.trim() !== "")
      .map(
        ([k, v]) =>
          `<tr>` +
          `<td style="padding:7px 12px 7px 0;color:#6b747e;white-space:nowrap;vertical-align:top;border-bottom:1px solid ${ARENA};width:38%">${esc(k)}</td>` +
          `<td style="padding:7px 0;vertical-align:top;border-bottom:1px solid ${ARENA}"><strong>${nl2br(v)}</strong></td>` +
          `</tr>`,
      )
      .join("") +
    `</table>`
  );
}

const text = (pairs: [string, string][]) =>
  pairs
    .filter(([, v]) => v && v.trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

/* ==========================================================================
   1. Consulta comercial → equipo de ventas
   ========================================================================== */

export function contactEmail(data: ContactInput, when: string) {
  const pairs: [string, string][] = [
    ["Nombre", data.nombre],
    ["Correo", data.email],
    ["Teléfono", data.telefono],
    ["Le interesa", data.interes || ""],
    ["Mensaje", data.mensaje || ""],
    ["Recibido", when],
  ];
  return {
    subject: `Nueva consulta — ${data.nombre}`,
    html: shell(
      "Nueva consulta de la web",
      siteConfig.name,
      rows(pairs) +
        `<p style="font-size:13px;color:#6b747e;margin:20px 0 0">` +
        `Responde directamente a este correo para escribirle a ${esc(data.nombre)}.</p>`,
    ),
    text: `Nueva consulta de la web — ${siteConfig.name}\n\n${text(pairs)}\n`,
  };
}

/* ==========================================================================
   2. Libro de Reclamaciones → casilla de reclamaciones
   ========================================================================== */

function complaintPairs(d: ComplaintInput, code: string, when: string): [string, string][] {
  return [
    ["Código de hoja", code],
    ["Fecha y hora", when],
    ["Tipo", d.tipoReclamo],
    ["—", ""],
    ["Consumidor", d.nombre],
    ["Documento", `${d.tipoDocumento} ${d.numeroDocumento}`],
    ["Domicilio", d.domicilio],
    ["Correo", d.email],
    ["Teléfono", d.telefono],
    ["Menor de edad", d.esMenor ? "Sí" : ""],
    ["Padre / madre / tutor", d.esMenor ? `${d.apoderadoNombre} — ${d.apoderadoDocumento}` : ""],
    ["—", ""],
    ["Bien contratado", `${d.tipoBien}: ${d.descripcionBien}`],
    ["Monto reclamado", d.montoReclamado || ""],
    ["—", ""],
    ["Detalle", d.detalle],
    ["Pedido del consumidor", d.pedido],
  ];
}

export function complaintEmail(d: ComplaintInput, code: string, when: string) {
  const pairs = complaintPairs(d, code, when).filter(([k]) => k !== "—");
  return {
    subject: `[${d.tipoReclamo.toUpperCase()}] ${code} — ${d.nombre}`,
    html: shell(
      `Libro de Reclamaciones — ${d.tipoReclamo}`,
      `Hoja ${code}`,
      rows(pairs) +
        `<p style="font-size:13px;color:${GRAFITO};background:#fff4e0;border-left:3px solid ${OCRE};padding:12px;margin:20px 0 0">` +
        `<strong>Plazo de respuesta:</strong> ${esc(siteConfig.complaintsBook.responseDaysLabel)} ` +
        `desde la fecha de presentación.</p>`,
    ),
    text: `LIBRO DE RECLAMACIONES — ${d.tipoReclamo}\nHoja ${code}\n\n${text(pairs)}\n\n` +
      `Plazo de respuesta: ${siteConfig.complaintsBook.responseDaysLabel}.\n`,
  };
}

/* ==========================================================================
   3. Copia para el consumidor
   El reglamento obliga a entregarle una copia de la hoja al consumidor; en el
   libro virtual esa copia es este correo.
   ========================================================================== */

export function complaintReceiptEmail(d: ComplaintInput, code: string, when: string) {
  const pairs = complaintPairs(d, code, when).filter(([k]) => k !== "—");
  return {
    subject: `Tu ${d.tipoReclamo.toLowerCase()} ${code} — ${siteConfig.name}`,
    html: shell(
      "Copia de tu hoja de reclamación",
      `Hoja ${code}`,
      `<p style="font-size:14px;line-height:1.6;margin:0 0 18px">Hola ${esc(d.nombre)},</p>` +
        `<p style="font-size:14px;line-height:1.6;margin:0 0 18px">` +
        `Registramos tu ${esc(d.tipoReclamo.toLowerCase())} con el código <strong>${esc(code)}</strong>. ` +
        `Te responderemos en un plazo no mayor a ${esc(siteConfig.complaintsBook.responseDaysLabel)}.</p>` +
        rows(pairs) +
        `<p style="font-size:12px;line-height:1.6;color:#6b747e;margin:20px 0 0">` +
        esc(siteConfig.complaintsBook.notice) +
        `</p>`,
    ),
    text:
      `Hola ${d.nombre},\n\n` +
      `Registramos tu ${d.tipoReclamo.toLowerCase()} con el código ${code}. ` +
      `Te responderemos en un plazo no mayor a ${siteConfig.complaintsBook.responseDaysLabel}.\n\n` +
      `${text(pairs)}\n\n${siteConfig.complaintsBook.notice}\n`,
  };
}
