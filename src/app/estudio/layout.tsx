import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";

import { StudioHeader } from "@/components/estudio/header";
import { StudioControls } from "@/components/estudio/panel";
import { StudioProvider } from "@/components/estudio/studio-context";
import { SiteFooter } from "@/components/shared/site-footer";
import { WhatsappFab } from "@/components/shared/whatsapp-fab";
import { siteConfig } from "@/config/site";

import "./studio.css";

/**
 * ESTUDIO — propuesta A mejorada + configurador
 *
 * Ruta nueva y aislada: no toca `/a` ni `/b`, que siguen exactamente como el
 * cliente las vio. De lo existente solo se LEE (`content/`, `components/ui`,
 * `components/shared`); nada se modifica.
 *
 * El root layout ya declara `robots: index: false`, así que esta ruta tampoco
 * se indexa mientras sea un preview.
 */

export const metadata: Metadata = {
  // El `default` lo envuelve la plantilla del layout raíz, así que aquí va
  // solo la parte propia: si no, el nombre del proyecto sale dos veces.
  title: {
    default: "Arma tu página",
    template: "%s — " + siteConfig.name,
  },
  description:
    "Configurador de la propuesta web de Residencial Aonami: elige el estilo de cada sección y envía tu selección.",
};

/**
 * Tipografías alternativas del configurador. Solo se descargan en /estudio, no
 * afectan al resto del sitio. Cuando el cliente elija una, el cambio real se
 * hace en `src/lib/fonts.ts` como el resto de la tipografía de marca.
 */
const studioSerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-studio-serif",
  display: "swap",
});

const studioGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-studio-grotesk",
  display: "swap",
});

const FOOTER_NAV = [
  { label: "El proyecto", href: "/estudio#proyecto" },
  { label: "Amenidades", href: "/estudio#amenidades" },
  { label: "Tour 360", href: "/estudio/tour" },
  { label: "Los lotes", href: "/estudio/lotes" },
  { label: "Contacto", href: "/estudio#contacto" },
];

export default function EstudioLayout({ children }: LayoutProps<"/estudio">) {
  return (
    <div className={studioSerif.variable + " " + studioGrotesk.variable}>
      <StudioProvider>
        <div className="flex min-h-dvh flex-col">
          <StudioHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter tone="dark" homeHref="/estudio" nav={FOOTER_NAV} />
          <WhatsappFab hideNear="#contacto" />
          <StudioControls />
        </div>
      </StudioProvider>
    </div>
  );
}
