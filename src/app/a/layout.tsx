import type { Metadata } from "next";

import { HeaderA } from "@/components/a/header";
import { ProposalSwitch } from "@/components/shared/proposal-switch";
import { SiteFooter } from "@/components/shared/site-footer";
import { WhatsappFab } from "@/components/shared/whatsapp-fab";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
};

const FOOTER_NAV = [
  { label: "El proyecto", href: "/a#proyecto" },
  { label: "Amenidades", href: "/a#amenidades" },
  { label: "El lugar", href: "/a#lugar" },
  { label: "Los lotes", href: "/a/lotes" },
  { label: "Contacto", href: "/a#contacto" },
];

export default function LayoutA({ children }: LayoutProps<"/a">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <HeaderA />
      <main className="flex-1">{children}</main>
      <SiteFooter tone="dark" homeHref="/a" nav={FOOTER_NAV} />
      <WhatsappFab hideNear="#contacto" />
      <ProposalSwitch />
    </div>
  );
}
