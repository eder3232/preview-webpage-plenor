import Image from "next/image";

import { logo } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Los tres logos entregados son PNG con alfa en negro. `variant="light"` los
 * invierte por filtro CSS para usarlos sobre fondos oscuros: no hay versión en
 * negativo entre los archivos del cliente y el .ai no se puede resolver en
 * build. Si el cliente entrega los SVG, esto se reemplaza por un componente
 * inline y se elimina el filtro.
 */
type Variant = "dark" | "light";

interface LogoProps {
  /** `logotipo` = marca completa · `isotipo` = la P · `lockup` = P | Residencial Aonami */
  as?: "logotipo" | "isotipo" | "lockup";
  variant?: Variant;
  className?: string;
  priority?: boolean;
}

export function Logo({
  as = "lockup",
  variant = "dark",
  className,
  priority = false,
}: LogoProps) {
  const l = logo(as);
  return (
    <Image
      src={l.src}
      alt={l.alt}
      width={l.width}
      height={l.height}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain",
        variant === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
