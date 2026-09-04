import { Figtree, Geist_Mono } from "next/font/google";

/**
 * TIPOGRAFÍA DE MARCA
 *
 * La tipografía oficial de Plenor es **Albra Grotesk** (6 pesos: Light,
 * Regular, Medium, Semi, Bold, Black). Los .otf entregados por el cliente son
 * licencia de escritorio y NO cubren el uso web con @font-face.
 *
 * Mientras no exista licencia webfont se usa **Figtree**, la grotesca
 * disponible más cercana en carácter: misma sensación humanista-geométrica,
 * altura de x alta, y rango variable 300–900 que mapea 1:1 con los seis
 * pesos de Albra.
 *
 * ── PARA CAMBIAR A ALBRA GROTESK CUANDO LLEGUE LA LICENCIA ──────────────────
 *   1. Convertir los .otf a .woff2 y ponerlos en src/app/fonts/
 *   2. Reemplazar el bloque `brandSans` de abajo por:
 *
 *        import localFont from "next/font/local";
 *        export const brandSans = localFont({
 *          variable: "--font-brand",
 *          display: "swap",
 *          src: [
 *            { path: "../app/fonts/Albra-Grotesk-Light.woff2",   weight: "300", style: "normal" },
 *            { path: "../app/fonts/Albra-Grotesk-Regular.woff2", weight: "400", style: "normal" },
 *            { path: "../app/fonts/Albra-Grotesk-Medium.woff2",  weight: "500", style: "normal" },
 *            { path: "../app/fonts/Albra-Grotesk-Semi.woff2",    weight: "600", style: "normal" },
 *            { path: "../app/fonts/Albra-Grotesk-Bold.woff2",    weight: "700", style: "normal" },
 *            { path: "../app/fonts/Albra-Grotesk-Black.woff2",   weight: "900", style: "normal" },
 *          ],
 *        });
 *
 *   No hay que tocar ningún otro archivo: todo el sitio consume la variable
 *   CSS `--font-brand` a través de `--font-sans` en globals.css.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const brandSans = Figtree({
  variable: "--font-brand",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "900"],
});

/** Para códigos de lote, áreas y datos tabulares. */
export const brandMono = Geist_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const fontVariables = `${brandSans.variable} ${brandMono.variable}`;
