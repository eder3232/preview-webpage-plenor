/**
 * ============================================================================
 *  CONFIGURACIÓN CENTRAL DEL SITIO — Plenor / Residencial Aonami
 * ============================================================================
 *
 *  ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR PARA CAMBIAR:
 *    · teléfonos y WhatsApp
 *    · correos (ventas y libro de reclamaciones)
 *    · direcciones y redes sociales
 *    · textos legales del Libro de Reclamaciones
 *
 *  Los valores marcados con  ⚠️ PENDIENTE  son placeholders: hay que
 *  reemplazarlos por los datos reales del cliente antes de publicar.
 *
 *  Cualquier valor puede sobreescribirse por variable de entorno sin tocar
 *  este archivo (útil para tener distintos datos en staging y producción).
 *  Ver `.env.example`.
 * ============================================================================
 */

const env = process.env;

export const siteConfig = {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. IDENTIDAD
  // ──────────────────────────────────────────────────────────────────────────
  name: "Residencial Aonami",
  developer: "Plenor",
  legalName: env.NEXT_PUBLIC_LEGAL_NAME ?? "Plenor S.A.C.", // ⚠️ PENDIENTE razón social exacta
  ruc: env.NEXT_PUBLIC_RUC ?? "20000000000", // ⚠️ PENDIENTE RUC real
  tagline: "Donde el verano se convierte en forma de vida",
  description:
    "Residencial Aonami en Punta de Bombón: 203 lotes desde 90 m², 10 amenidades, " +
    "a 2 minutos del pueblo y a 2 minutos de la playa. Un proyecto Plenor.",
  url: env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es-PE",

  // ──────────────────────────────────────────────────────────────────────────
  // 2. CONTACTO
  // ──────────────────────────────────────────────────────────────────────────
  contact: {
    /** Teléfono principal de ventas. Formato internacional, sin espacios. */
    phone: env.NEXT_PUBLIC_PHONE ?? "+51999999999", // ⚠️ PENDIENTE
    /** Cómo se muestra el teléfono en pantalla. */
    phoneDisplay: env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+51 999 999 999", // ⚠️ PENDIENTE

    /** WhatsApp de ventas. Solo dígitos, con código de país, sin "+". */
    whatsapp: env.NEXT_PUBLIC_WHATSAPP ?? "51999999999", // ⚠️ PENDIENTE
    /** Mensaje precargado al abrir el chat de WhatsApp. */
    whatsappMessage:
      "Hola, quiero más información sobre los lotes de Residencial Aonami.",

    /** Correo público de ventas / consultas generales. */
    email: env.NEXT_PUBLIC_EMAIL ?? "ventas@plenor.pe", // ⚠️ PENDIENTE

    /** Horario de atención mostrado junto a los datos de contacto. */
    schedule: "Lun a Vie 9:00–18:00 · Sáb 9:00–13:00", // ⚠️ PENDIENTE confirmar
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. CORREOS INTERNOS (destinatarios de los formularios)
  //    No se exponen al cliente: solo se usan en el servidor.
  // ──────────────────────────────────────────────────────────────────────────
  mail: {
    /** A dónde llegan los formularios de contacto / cotización. */
    leadsTo: env.MAIL_LEADS_TO ?? "ventas@plenor.pe", // ⚠️ PENDIENTE

    /**
     * A dónde llegan las hojas del LIBRO DE RECLAMACIONES.
     * Por ley debe ser una casilla monitoreada: el plazo de respuesta corre
     * desde la presentación del reclamo.
     */
    complaintsTo: env.MAIL_COMPLAINTS_TO ?? "reclamaciones@plenor.pe", // ⚠️ PENDIENTE

    /** Remitente. El dominio debe estar verificado en el proveedor de correo. */
    from: env.MAIL_FROM ?? "Residencial Aonami <no-reply@plenor.pe>", // ⚠️ PENDIENTE

    /** Copia oculta opcional de todo lo que se envía (auditoría). */
    bcc: env.MAIL_BCC ?? "",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. DIRECCIONES
  // ──────────────────────────────────────────────────────────────────────────
  addresses: {
    project: {
      label: "Proyecto",
      line: "Av. Olazaval D-11, Punta de Bombón",
      region: "Islay, Arequipa",
      mapsUrl: "https://maps.google.com/?q=Punta+de+Bombon+Arequipa",
    },
    office: {
      label: "Oficina",
      line: "Calle Señorial I-4, Cayma",
      region: "Arequipa",
      mapsUrl: "https://maps.google.com/?q=Calle+Se%C3%B1orial+I-4+Cayma+Arequipa",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. REDES SOCIALES
  // ──────────────────────────────────────────────────────────────────────────
  social: {
    instagram: env.NEXT_PUBLIC_INSTAGRAM ?? "https://instagram.com/plenor.pe",
    facebook: env.NEXT_PUBLIC_FACEBOOK ?? "https://facebook.com/plenor.pe",
    linkedin: env.NEXT_PUBLIC_LINKEDIN ?? "https://linkedin.com/company/plenor",
    handle: "/plenor.pe",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. LIBRO DE RECLAMACIONES (INDECOPI)
  //    Base legal: Ley 29571 (Código de Protección y Defensa del Consumidor)
  //    y D.S. 011-2011-PCM (Reglamento del Libro de Reclamaciones) y sus
  //    modificatorias.
  //
  //    ⚠️ Los plazos y textos de abajo deben ser validados por el asesor legal
  //       del cliente antes de publicar. Están aquí para que se cambien sin
  //       tocar código.
  // ──────────────────────────────────────────────────────────────────────────
  complaintsBook: {
    /** Prefijo del código correlativo de cada hoja. */
    codePrefix: "AONAMI",

    /** Plazo de respuesta que se le comunica al consumidor. */
    responseDays: 15,
    responseDaysLabel: "quince (15) días hábiles",

    /** Aviso obligatorio que acompaña al formulario. */
    notice:
      "Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, " +
      "este establecimiento cuenta con un Libro de Reclamaciones a tu disposición. " +
      "La formulación del reclamo no impide acudir a otras vías de solución de " +
      "controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.",

    definitions: {
      reclamo:
        "Disconformidad relacionada a los productos o servicios contratados.",
      queja:
        "Malestar o descontento respecto a la atención al público, no relacionado a los productos o servicios.",
    },

    /** Se muestra al pie del formulario. */
    dataPolicy:
      "Los datos personales proporcionados serán tratados únicamente para atender " +
      "y dar respuesta a este reclamo o queja, conforme a la Ley 29733 de Protección " +
      "de Datos Personales.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. DATOS DEL PROYECTO (los que sí están documentados)
  //    Fuente: docs/01, docs/02, docs/03. NO hay precios en el material
  //    entregado por el cliente, por eso no se declara ninguno.
  // ──────────────────────────────────────────────────────────────────────────
  project: {
    location: "Punta de Bombón, Islay — Arequipa",
    totalLots: 203,
    parkingSpots: 129,
    amenitiesCount: 10,
    minArea: 90,
    maxArea: 270,
    avgArea: 116,
    sellableArea: 23_486.75,
    /** Oferta comercial documentada en el manual de marca (pp. 47–48). */
    financing: {
      downPaymentPct: 20,
      installments: 48,
      label: "Financiamiento directo · 20% de inicial · 48 cuotas sin intereses",
    },
    distances: [
      { label: "del pueblo", value: "2 min" },
      { label: "de la playa", value: "2 min" },
    ],
    accessRoad: "Pista asfaltada Francisco Olazabal",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Enlace de WhatsApp listo para usar, con el mensaje precargado. */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappMessage);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
}
