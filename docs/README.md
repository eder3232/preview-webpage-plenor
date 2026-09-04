# Documentación de recursos — Web Plenor / Residencial Aonami

Mapeo a Markdown de todo el material entregado por el cliente en `tmp/resources/`.
Generado a partir de dos descargas de Google Drive (`… -001` y `… -002`) que en realidad son **una sola carpeta partida en dos por peso**.

---

## Qué es este proyecto

| | |
|---|---|
| **Marca matriz** | **Plenor** — desarrollador urbano sostenible, con sede en Arequipa, Perú |
| **Unidades de negocio** | Plenor arquitectura · Plenor inmobiliaria · Plenor construcción |
| **Proyecto a publicitar** | **Residencial Aonami** — lotización/condominio en **Punta de Bombón, Arequipa** |
| **Escala** | **203 lotes** (90–270 m², promedio 116 m²) + 129 estacionamientos + 10 amenidades |
| **Oferta comercial** | Financiamiento directo · **20 % de inicial** · **48 cuotas sin intereses** |
| **Claim de campaña** | *"Donde el verano se convierte en forma de vida."* |
| **Ubicación** | A 2 min del pueblo y a 2 min de la playa, sobre la pista asfaltada Francisco Olazabal |

---

## Los documentos

| Doc | Qué contiene | Fuente original |
|---|---|---|
| **[01 — Manual de Identidad Visual](./01-manual-identidad-plenor.md)** | Propósito, visión, valores, tono verbal, arquetipos, tipografía y jerarquía, sistema de logo, brand architecture, iconografía, dirección fotográfica, línea gráfica, claims publicitarios, papelería y equipo | `Manual Plenor.pdf` (70 pp.) |
| **[02 — Paleta de colores](./02-paleta-colores.md)** | Los 6 colores de marca con HEX/RGB/CMYK/Pantone, proporciones de uso, degradado de marca y tokens CSS listos | `Paleta de Colores` (ZIP) + Manual pp. 22–25 |
| **[03 — Plano comercial Aonami](./03-aonami-plano-comercial.md)** | Las 10 amenidades, estructura urbana del masterplan y el **inventario completo de los 203 lotes** (área + perímetro, sector por sector) | `Aonami AMENIDADES.pdf` (1 pág. A2) |
| **[04 — Inventario de assets](./04-inventario-assets.md)** | Los 59 archivos del drive: logos, fuentes, 15 renders, 23 videos, 10 vistas verticales, 2 planimetrías — con dimensiones, pesos y duraciones exactas, más las notas de optimización para web | todo `tmp/resources/` |
| **[05 — Las dos propuestas web](./05-propuestas-web.md)** | Qué se construyó con todo esto: la arquitectura de las dos propuestas, las decisiones de contenido y marca, el pipeline de assets, los formularios y el Libro de Reclamaciones | este repositorio |

---

## Los 3 PDFs, en una línea cada uno

1. **`Manual Plenor.pdf`** — 70 pp., 43 MB. El manual de identidad completo hecho por *Mengana Estudio* en 2025. Es la fuente canónica de marca: tono de voz, tipografía, colores, uso del logo y toda la línea gráfica. **También trae la oferta comercial de Aonami y los claims publicitarios** — es decir, buena parte del copy de la web ya está escrito ahí.
2. **`Aonami AMENIDADES.pdf`** — 1 página A2, 52 MB. El plano comercial del proyecto (fechado *24-ago-2026*). Texto totalmente vectorizado, hubo que leerlo renderizándolo a 600–900 dpi. Contiene la leyenda de amenidades, el trazado urbano y el **rótulo de área y perímetro de cada uno de los 203 lotes** más los 129 estacionamientos.
3. **`Plenor_Paleta de Colores.pdf`** — 1 página, 60 KB, dentro del ZIP `Paleta de Colores`. Ficha de los colores de marca con equivalencias Pantone. Ojo: **trae 5 colores; el manual trae 6** (le falta *Oliva urbano*).

---

## Resumen visual del material

### Marca
- Logotipo y isotipo en `.ai` + `.png` con transparencia, más el lockup `P | Residencial AONAMI`
- **Albra Grotesk** en 6 pesos `.otf` — ⚠️ *licencia webfont por confirmar*
- Paleta: `#1F2328` grafito · `#31463A` oliva urbano · `#839485` verde calmo · `#E9E3DB` arena sillar · `#FFB035` ocre de obra · `#8C5338` terracota volcánica
- Degradado de marca ocre → terracota → verde → grafito, recurso visual recurrente

### Imágenes (27 PNG, ~717 MB)
- **11 renders horizontales** 5500 × 3093: ingreso, piscina, casa tipo ×2, parrillas, juegos, frontón, fogatas, y 3 aéreas generales
- **10 vistas verticales** 3500 × 4667: las mismas escenas reencuadradas para móvil
- **1 fotomontaje aéreo 8K** (7680 × 4320) del proyecto sobre el terreno real
- **2 planimetrías cenitales**: una con los lotes vacíos, otra con las casas construidas (base del *tour virtual*)
- **2 planimetrías 3D en perspectiva**, una de ellas con canal alfa → base ideal para un masterplan interactivo

### Video (23 MP4, ~2.9 GB)
- **1 institucional de 98 s** en 1080p
- **12 clips horizontales** en 2560 × 1440, de 6 a 20 s
- **10 clips verticales** en 1920 × 2560, de 3 a 6 s
- Correspondencia casi 1:1 entre horizontal y vertical de cada escena

---

## Lo que hay que decidir / confirmar antes de construir

> Estado tras construir las dos propuestas — ver [05](./05-propuestas-web.md) §9.

1. **Licencia webfont de Albra Grotesk.** Los `.otf` entregados son de escritorio.
   *Mientras tanto el sitio usa Figtree; el cambio es una edición de cinco líneas en `src/lib/fonts.ts`.*
2. **Significado del código de color del plano.** Los lotes están pintados en 4 tonos sin leyenda: puede ser estado de venta o tipología. Si se quiere un mapa de disponibilidad interactivo, hay que pedir el dato y mantenerlo actualizado (el plano está fechado ago-2026).
   *El sitio no lo interpreta: el masterplan marca amenidades, no disponibilidad.*
3. **Precios.** No hay ni un precio real en todo el material — solo placeholders (`$ 250,00`) en los mockups de Instagram del manual.
   *El sitio no declara ninguno; todo lleva a cotizar.*
4. **Validar áreas de lotes** contra el `.ai`/CAD original antes de publicarlas como información de venta (ver advertencia al final del doc 03).
   *Publicadas con aviso de "áreas referenciales". Se regeneran con `pnpm gen:lotes` si se corrigen.*
5. **Dónde viven los originales.** `tmp/` no está versionado y son 3.7 GB; conviene moverlos a almacenamiento externo y dejar solo los derivados optimizados en `public/`.
   *Hecho: `public/` pesa 37 MB y `tmp/` está en `.gitignore`.*
6. **Datos de contacto reales** — teléfono, WhatsApp, correos, razón social y RUC. Todos son placeholders en `src/config/site.ts`.
7. **Revisión legal** de la política de privacidad, los términos y el plazo de respuesta del Libro de Reclamaciones.

## Cómo se generó esto

- Texto de PDFs: `pdftotext -enc UTF-8`
- Páginas y recortes vectoriales: `pdftoppm` a 40–900 dpi
- Metadatos de video: `ffprobe`
- Dimensiones de imagen y contact sheets: Python + Pillow

Los renders intermedios quedaron en `tmp/render/` y los ZIP descomprimidos en `tmp/extracted/`.
