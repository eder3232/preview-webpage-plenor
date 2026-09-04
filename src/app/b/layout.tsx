import type { Metadata } from "next";

import { HeaderB } from "@/components/b/header";
import { NAV_B } from "@/components/b/nav";
import { ProposalSwitch } from "@/components/shared/proposal-switch";
import { SiteFooter } from "@/components/shared/site-footer";
import { WhatsappFab } from "@/components/shared/whatsapp-fab";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.project.totalLots} lotes en Punta de Bombón`,
    template: `%s — ${siteConfig.name}`,
  },
};

export default function LayoutB({ children }: LayoutProps<"/b">) {
  return (
    <div className="flex min-h-dvh flex-col bg-arena-50">
      <HeaderB />
      <main className="flex-1">{children}</main>
      <SiteFooter tone="light" homeHref="/b" nav={[...NAV_B]} />
      <WhatsappFab hideNear="#formulario" />
      <ProposalSwitch />
    </div>
  );
}
