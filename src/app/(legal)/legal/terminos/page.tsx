import type { Metadata } from "next";

import { LegalDoc, LegalSection, LegalWarning } from "@/components/shared/legal-doc";
import { siteConfig } from "@/config/site";
import { AREAS_DISCLAIMER, lotStats } from "@/content/lotes";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  robots: { index: false, follow: false },
};

export default function TerminosPage() {
  const { legalName, contact, project } = siteConfig;

  return (
    <LegalDoc
      eyebrow="Uso del sitio"
      title="Términos y condiciones"
      updated="Borrador — pendiente de revisión legal"
    >
      <LegalWarning>
        Borrador de trabajo. <strong>Debe ser revisado y aprobado por el asesor
        legal de {legalName} antes de publicarse</strong>, en particular las
        secciones sobre información del proyecto y publicidad, que están sujetas
        al Código de Protección y Defensa del Consumidor.
      </LegalWarning>

      <LegalSection title="1. Alcance">
        <p>
          Este sitio es propiedad de {legalName} y presenta información sobre el
          proyecto Residencial Aonami, ubicado en {project.location}. Al navegarlo
          aceptas estos términos.
        </p>
      </LegalSection>

      <LegalSection title="2. La información del proyecto es referencial">
        <p>
          Las imágenes, videos, planimetrías y renders publicados son
          <strong> representaciones artísticas con fines ilustrativos</strong>. El
          acabado final, el mobiliario, la vegetación y el entorno pueden variar
          respecto de lo mostrado.
        </p>
        <p>
          El inventario de {lotStats.count} lotes publicado en este sitio incluye
          áreas y perímetros tomados del plano comercial del proyecto.{" "}
          {AREAS_DISCLAIMER}
        </p>
        <p>
          La disponibilidad de lotes cambia constantemente y no se refleja en
          tiempo real en este sitio. Confírmala siempre con el equipo de ventas.
        </p>
      </LegalSection>

      <LegalSection title="3. Este sitio no es una oferta contractual">
        <p>
          La información publicada tiene carácter informativo y no constituye
          oferta, promesa de venta ni obligación contractual. Toda operación se
          formaliza exclusivamente mediante los documentos que suscriban las
          partes.
        </p>
        <p>
          Este sitio no publica precios. Cualquier cotización se entrega de forma
          individual por el equipo comercial y tiene la vigencia que en ella se
          indique.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual">
        <p>
          La marca Plenor, el nombre Residencial Aonami, los logotipos, textos,
          imágenes, videos y planos de este sitio son propiedad de {legalName} o
          se usan con autorización. No pueden reproducirse ni distribuirse sin
          permiso escrito.
        </p>
      </LegalSection>

      <LegalSection title="5. Enlaces y servicios de terceros">
        <p>
          El sitio enlaza a WhatsApp y a redes sociales operadas por terceros. No
          controlamos esos servicios ni respondemos por sus contenidos o
          políticas.
        </p>
      </LegalSection>

      <LegalSection title="6. Reclamos">
        <p>
          Puedes presentar un reclamo o queja en nuestro{" "}
          <a href="/libro-de-reclamaciones">Libro de Reclamaciones virtual</a> o
          en el libro físico disponible en nuestras oficinas.
        </p>
      </LegalSection>

      <LegalSection title="7. Contacto">
        <p>
          Para consultas sobre estos términos escribe a{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> o llama al{" "}
          {contact.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
