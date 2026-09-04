import { TriangleAlert } from "lucide-react";

/**
 * Maquetación de las páginas legales. Se resuelve con clases explícitas en vez
 * de instalar @tailwindcss/typography: son dos documentos, no un blog.
 */

export function LegalDoc({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="container-plenor py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <span className="eyebrow text-ocre-600">{eyebrow}</span>
        <h1 className="display mt-2 text-3xl md:text-4xl">{title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">{updated}</p>
        <div className="mt-10 flex flex-col gap-8">{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <div
        className={
          "mt-2 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground " +
          "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 " +
          "[&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground " +
          "[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5"
        }
      >
        {children}
      </div>
    </section>
  );
}

export function LegalWarning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border-l-[3px] border-l-terracota bg-terracota/5 p-4">
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-terracota" />
      <p className="text-xs leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </p>
    </div>
  );
}
