import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin indicador de desarrollo: este proyecto se navega delante del cliente y
  // el indicador tapa el logo en móvil. Los errores siguen apareciendo en el
  // terminal y en el overlay. Para recuperarlo: devIndicators: { position: "bottom-left" }
  devIndicators: false,

  images: {
    // Los renders son fotográficos: AVIF baja bastante más que WebP y el
    // navegador que no lo soporte recibe el WebP.
    formats: ["image/avif", "image/webp"],
    // Un año de caché: los archivos de public/media cambian de nombre solo si
    // se regeneran, y entonces cambia también la URL del optimizador.
    minimumCacheTTL: 31_536_000,
  },
};

export default nextConfig;
