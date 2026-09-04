import type { Metadata } from "next";

import { LegalDoc, LegalSection, LegalWarning } from "@/components/shared/legal-doc";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: false },
};

export default function PrivacidadPage() {
  const { legalName, contact, mail, addresses } = siteConfig;

  return (
    <LegalDoc
      eyebrow="Ley 29733 · Protección de Datos Personales"
      title="Política de privacidad"
      updated="Borrador — pendiente de revisión legal"
    >
      <LegalWarning>
        Este texto es un borrador de trabajo redactado a partir de la estructura
        habitual de una política de privacidad peruana. <strong>Debe ser
        revisado y aprobado por el asesor legal de {legalName} antes de
        publicarse</strong>, y completado con el número de inscripción del banco
        de datos personales ante la Autoridad Nacional de Protección de Datos
        Personales.
      </LegalWarning>

      <LegalSection title="1. Quién trata tus datos">
        <p>
          El responsable del tratamiento es {legalName}, con domicilio en{" "}
          {addresses.office.line}, {addresses.office.region}. Puedes escribirnos
          a <a href={`mailto:${contact.email}`}>{contact.email}</a> o llamarnos
          al {contact.phoneDisplay}.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos recogemos">
        <p>Solo los que tú nos entregas al llenar un formulario de este sitio:</p>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> nombre, correo, teléfono y
            el mensaje que escribas.
          </li>
          <li>
            <strong>Libro de Reclamaciones:</strong> además de lo anterior, tipo
            y número de documento, domicilio y el detalle de tu reclamo o queja.
            Estos datos son obligatorios por el D.S. 011-2011-PCM.
          </li>
        </ul>
        <p>
          No usamos cookies de analítica ni de publicidad, no hacemos perfilado y
          no compramos bases de datos de terceros.
        </p>
      </LegalSection>

      <LegalSection title="3. Para qué los usamos">
        <ul>
          <li>Responder tu consulta y enviarte información del proyecto.</li>
          <li>
            Atender y dar respuesta a tu reclamo o queja dentro del plazo legal.
          </li>
          <li>Cumplir obligaciones legales y contables.</li>
        </ul>
        <p>
          No usamos tus datos para nada distinto sin pedirte autorización
          expresa, y no los vendemos ni los cedemos con fines comerciales.
        </p>
      </LegalSection>

      <LegalSection title="4. Con quién los compartimos">
        <p>
          Los formularios de este sitio se envían por correo electrónico a{" "}
          {mail.leadsTo} y {mail.complaintsTo}, casillas administradas por{" "}
          {legalName}. El envío se hace a través de nuestro proveedor de correo,
          que actúa como encargado de tratamiento y no puede usar los datos para
          fines propios. También podemos entregarlos a autoridades cuando la ley
          lo exija —por ejemplo, a INDECOPI en un procedimiento de consumo.
        </p>
      </LegalSection>

      <LegalSection title="5. Cuánto tiempo los guardamos">
        <p>
          Las consultas comerciales se conservan mientras dure la relación y
          hasta dos años después del último contacto. Las hojas de reclamación se
          conservan por el plazo que exige la normativa de protección al
          consumidor.
        </p>
      </LegalSection>

      <LegalSection title="6. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, cancelación y
          oposición (derechos ARCO) escribiendo a{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> con copia de tu
          documento de identidad. Responderemos dentro de los plazos de la Ley
          29733 y su reglamento. Si consideras que no atendimos tu solicitud,
          puedes acudir a la Autoridad Nacional de Protección de Datos
          Personales.
        </p>
      </LegalSection>

      <LegalSection title="7. Seguridad">
        <p>
          Este sitio se sirve cifrado (HTTPS) y el acceso a las casillas de
          correo donde llegan los formularios está restringido al personal que
          necesita atenderlos.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
