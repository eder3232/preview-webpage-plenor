import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/brand-icons";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";
import { businessUnits } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * Pie de página común a las dos propuestas.
 *
 * El contenido es idéntico a propósito: los enlaces legales, los datos de
 * contacto y las advertencias tienen que ser los mismos vivan donde vivan.
 * Lo único que cambia entre A y B es el tono visual.
 */
export function SiteFooter({
  tone = "dark",
  homeHref,
  nav,
}: {
  tone?: "dark" | "light";
  homeHref: string;
  nav?: { label: string; href: string }[];
}) {
  const dark = tone === "dark";
  const { contact, addresses, social, legalName, ruc } = siteConfig;

  const socials = [
    { href: social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  ];

  return (
    <footer
      className={cn(
        dark ? "on-grafito" : "border-t border-border bg-card text-foreground",
      )}
    >
      <div className="container-plenor py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">
          {/* Marca */}
          <div className="md:max-w-xs">
            <Link href={homeHref} aria-label="Inicio">
              <Logo as="lockup" variant={dark ? "light" : "dark"} className="h-8" />
            </Link>
            <p
              className={cn(
                "mt-4 text-sm leading-relaxed",
                dark ? "text-muted-foreground" : "text-muted-foreground",
              )}
            >
              {siteConfig.description}
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map(({ href, Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full transition-colors",
                      dark
                        ? "bg-white/8 hover:bg-ocre hover:text-grafito"
                        : "bg-secondary hover:bg-ocre",
                    )}
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación + contacto */}
          <div className="grid flex-1 gap-8 sm:grid-cols-2 md:max-w-lg md:grid-cols-2">
            {nav?.length ? (
              <nav>
                <h2 className="eyebrow text-muted-foreground">El proyecto</h2>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-ocre"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <div>
              <h2 className="eyebrow text-muted-foreground">Contacto</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 transition-colors hover:text-ocre"
                  >
                    <Phone className="size-4 shrink-0 text-muted-foreground" />
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 break-all transition-colors hover:text-ocre"
                  >
                    <Mail className="size-4 shrink-0 text-muted-foreground" />
                    {contact.email}
                  </a>
                </li>
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    <strong className="font-medium text-current">
                      {addresses.project.label}
                    </strong>
                    <br />
                    {addresses.project.line}
                    <br />
                    {addresses.project.region}
                  </span>
                </li>
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    <strong className="font-medium text-current">
                      {addresses.office.label}
                    </strong>
                    <br />
                    {addresses.office.line}
                    <br />
                    {addresses.office.region}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Unidades de negocio — firma de la papelería (manual p. 65) */}
        <ul
          className={cn(
            "mt-12 grid gap-4 border-t pt-8 sm:grid-cols-3",
            dark ? "border-white/10" : "border-border",
          )}
        >
          {businessUnits.map((u) => (
            <li key={u.name}>
              <p className="text-sm font-semibold">Plenor {u.name.toLowerCase()}</p>
              <p className="text-xs text-muted-foreground">{u.signature}</p>
            </li>
          ))}
        </ul>

        {/* Legal */}
        <div
          className={cn(
            "mt-8 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between",
            dark ? "border-white/10" : "border-border",
          )}
        >
          <p>
            © {new Date().getFullYear()} {legalName} · RUC {ruc}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/libro-de-reclamaciones"
              className="underline-offset-2 hover:text-ocre hover:underline"
            >
              Libro de Reclamaciones
            </Link>
            <Link
              href="/legal/privacidad"
              className="underline-offset-2 hover:text-ocre hover:underline"
            >
              Política de privacidad
            </Link>
            <Link
              href="/legal/terminos"
              className="underline-offset-2 hover:text-ocre hover:underline"
            >
              Términos y condiciones
            </Link>
          </nav>
        </div>

        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/70">
          Imágenes, videos y planimetrías referenciales con fines ilustrativos.
          Las áreas de los lotes son referenciales; las definitivas son las que
          consten en el plano de habilitación urbana y en la minuta de
          compraventa. Este sitio no constituye oferta contractual.
        </p>
      </div>
    </footer>
  );
}
