import type { Metadata, Viewport } from "next";

import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Lotes en Punta de Bombón | ${siteConfig.developer}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.developer }],
  keywords: [
    "lotes Punta de Bombón",
    "terrenos Arequipa",
    "condominio de playa Arequipa",
    "Residencial Aonami",
    "Plenor",
    "Islay",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    // Mientras sean dos propuestas en revisión no tiene sentido indexarlas.
    // Al elegir una, cambiar a `index: true` y eliminar la otra.
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1F2328",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
