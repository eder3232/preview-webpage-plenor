"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, SlidersHorizontal } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { useStudio } from "./studio-context";

/**
 * Header del estudio.
 *
 * Empieza transparente sobre la portada y se vuelve sólido al bajar — salvo
 * cuando la portada elegida es la editorial, que tiene fondo claro: ahí el
 * logo en negativo sería blanco sobre arena, o sea invisible. El header lee la
 * variante activa del configurador para saberlo.
 */

const LINKS = [
  { label: "El proyecto", href: "#proyecto" },
  { label: "Galería", href: "#galeria" },
  { label: "Amenidades", href: "#amenidades" },
  { label: "Tour 360", href: "#tour" },
  { label: "Lotes", href: "#lotes" },
  { label: "Contacto", href: "#contacto" },
];

export function StudioHeader() {
  const pathname = usePathname();
  const { config, setPanelOpen } = useStudio();

  const isHome = pathname === "/estudio";
  const lightHero = config.sections.hero === "editorial";
  const overHero = isHome && !lightHero;

  const [scrolled, setScrolled] = useState(false);
  const solid = !overHero || scrolled;

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const href = (anchor: string) => (isHome ? anchor : "/estudio" + anchor);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        solid
          ? "border-b border-border bg-arena-50/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-plenor flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/estudio" aria-label="Residencial Aonami — inicio">
          <Logo
            as="lockup"
            variant={solid ? "dark" : "light"}
            priority
            className="h-6 transition-opacity md:h-7"
          />
        </Link>

        {/* Escritorio */}
        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={href(l.href)}
              className={cn(
                "text-sm font-medium transition-colors",
                solid
                  ? "text-foreground hover:text-[var(--s-accent-light)]"
                  : "text-arena-50 hover:text-[var(--s-accent-dark)]",
              )}
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="gap-2">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" />
              Escríbenos
            </a>
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {/* Atajo al configurador, para no tener que buscar la pastilla */}
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            aria-label="Abrir el configurador"
            className={cn(
              "s-chrome flex size-10 items-center justify-center rounded-full transition-colors",
              solid ? "bg-secondary" : "bg-white/15 text-arena-50 backdrop-blur-sm",
            )}
          >
            <SlidersHorizontal className="size-4" />
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className={cn(
                  "flex size-10 items-center justify-center rounded-full transition-colors",
                  solid
                    ? "bg-secondary"
                    : "bg-white/15 text-arena-50 backdrop-blur-sm",
                )}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-arena-50 p-0">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="flex h-full flex-col p-6">
                <Logo as="lockup" className="h-7 self-start" />
                <nav className="mt-10 flex flex-col gap-1">
                  {LINKS.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <a
                        href={href(l.href)}
                        className="s-display border-b border-border py-4 text-2xl transition-colors hover:text-[var(--s-accent-light)]"
                      >
                        {l.label}
                      </a>
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
                      Escríbenos por WhatsApp
                    </a>
                  </Button>
                  <a
                    href={"tel:" + siteConfig.contact.phone}
                    className="text-center text-sm text-muted-foreground"
                  >
                    o llámanos al {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
