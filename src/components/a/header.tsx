"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

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

/**
 * Header de la Propuesta A.
 *
 * En la portada vive encima del hero en video, así que empieza transparente
 * con el logo en negativo y se vuelve sólido al hacer scroll. En cualquier
 * otra ruta arranca sólido: sin hero oscuro detrás, el logo en negativo sería
 * blanco sobre arena, es decir invisible.
 *
 * En móvil la navegación es un panel lateral: son anclas dentro de la misma
 * página, no rutas.
 */

const LINKS = [
  { label: "El proyecto", href: "/a#proyecto" },
  { label: "Amenidades", href: "/a#amenidades" },
  { label: "El lugar", href: "/a#lugar" },
  { label: "Lotes", href: "/a/lotes" },
  { label: "Contacto", href: "/a#contacto" },
];

export function HeaderA() {
  const pathname = usePathname();
  const overHero = pathname === "/a";
  const [scrolled, setScrolled] = useState(false);
  const solid = !overHero || scrolled;

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        solid
          ? "border-b border-border bg-arena-50/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-plenor flex h-16 items-center justify-between md:h-20">
        <Link href="/a" aria-label="Residencial Aonami — inicio">
          <Logo
            as="lockup"
            variant={solid ? "dark" : "light"}
            priority
            className="h-6 transition-opacity md:h-7"
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors",
                solid
                  ? "text-foreground hover:text-ocre-600"
                  : "text-arena-50 hover:text-ocre",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="gap-2">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" />
              Escríbenos
            </a>
          </Button>
        </nav>

        {/* Móvil */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              aria-label="Abrir menú"
              className={cn(
                "flex size-10 items-center justify-center rounded-full transition-colors",
                solid ? "bg-secondary" : "bg-white/15 text-arena-50 backdrop-blur-sm",
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
                    <Link
                      href={l.href}
                      className="border-b border-border py-4 text-2xl font-medium tracking-tight transition-colors hover:text-ocre-600"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Button asChild size="lg" className="w-full gap-2">
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="size-4" />
                    Escríbenos por WhatsApp
                  </a>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-center text-sm text-muted-foreground"
                >
                  o llámanos al {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
