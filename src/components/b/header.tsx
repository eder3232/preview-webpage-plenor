"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { NAV_B } from "@/components/b/nav";
import { WhatsappIcon } from "@/components/shared/brand-icons";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig, whatsappUrl } from "@/config/site";
import { lotStats } from "@/content/lotes";
import { cn } from "@/lib/utils";

/**
 * Header de la Propuesta B.
 *
 * Opuesto al de A: siempre sólido, siempre visible, con la ruta activa
 * marcada. Encima lleva una franja de datos —el recurso que define el tono de
 * esta propuesta: la información por delante de la atmósfera.
 */
export function HeaderB() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/b" ? pathname === "/b" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      {/* Franja de datos */}
      <div className="hidden bg-grafito-900 text-arena-50/70 md:block">
        <div className="container-plenor flex h-9 items-center justify-between text-[11px]">
          <p className="flex items-center gap-5">
            <span>{siteConfig.project.location}</span>
            <span className="text-arena-50/25">·</span>
            <span>{lotStats.count} lotes desde {siteConfig.project.minArea} m²</span>
            <span className="text-arena-50/25">·</span>
            <span className="text-ocre">
              {siteConfig.project.financing.label}
            </span>
          </p>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-1.5 transition-colors hover:text-ocre"
          >
            <Phone className="size-3" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="on-grafito border-b border-white/10">
        <div className="container-plenor flex h-16 items-center justify-between gap-6">
          <Link href="/b" aria-label="Residencial Aonami — inicio">
            <Logo as="lockup" variant="light" priority className="h-6 md:h-7" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_B.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  isActive(l.href)
                    ? "text-ocre"
                    : "text-arena-50/80 hover:text-arena-50",
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute -bottom-[13px] inset-x-0 h-0.5 bg-ocre" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden gap-2 md:inline-flex">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                Cotizar
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <button
                  type="button"
                  aria-label="Abrir menú"
                  className="flex size-10 items-center justify-center rounded-md bg-white/10 text-arena-50"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="on-grafito w-[85vw] max-w-sm border-l-white/10 p-0"
              >
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <div className="flex h-full flex-col p-6">
                  <Logo as="lockup" variant="light" className="h-7 self-start" />
                  <nav className="mt-10 flex flex-col">
                    {NAV_B.map((l) => (
                      <SheetClose asChild key={l.href}>
                        <Link
                          href={l.href}
                          className={cn(
                            "border-b border-white/10 py-3.5 text-xl font-medium tracking-tight transition-colors",
                            isActive(l.href) ? "text-ocre" : "hover:text-ocre",
                          )}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col gap-3">
                    <Button asChild size="lg" className="w-full gap-2">
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsappIcon className="size-4" />
                        Cotizar por WhatsApp
                      </a>
                    </Button>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-center text-sm text-muted-foreground"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
