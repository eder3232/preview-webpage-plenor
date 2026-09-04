import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";

/**
 * Envoltura de las páginas legales.
 *
 * Es neutra a propósito: el Libro de Reclamaciones y los textos legales son
 * obligaciones de la empresa, no piezas de campaña, y son los mismos vivan
 * bajo la propuesta A o la B. Cuando se elija una dirección, basta con
 * reemplazar este header/footer por los de esa propuesta.
 */
export default function LegalLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col bg-arena-50">
      <header className="border-b border-border bg-card">
        <div className="container-plenor flex items-center justify-between py-4">
          <Link href="/" aria-label="Volver al inicio">
            <Logo as="lockup" className="h-6 md:h-7" priority />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Volver
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="container-plenor flex flex-col gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            {siteConfig.legalName} · RUC {siteConfig.ruc}
          </p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/libro-de-reclamaciones" className="hover:text-foreground">
              Libro de Reclamaciones
            </Link>
            <Link href="/legal/privacidad" className="hover:text-foreground">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="hover:text-foreground">
              Términos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
