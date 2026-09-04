# Inventario de assets — Drive "PAGINA WEB"

> **Origen:** dos descargas de Google Drive que hay que leer como **una sola carpeta**: la `-001` y la `-002` tienen la misma estructura interna `PAGINA WEB/` y la `-002` solo contiene los archivos pesados que no entraron en la primera.
>
> **Peso total: ~3.7 GB** (2.0 GB en `-001`, 1.8 GB en `-002`) · **59 archivos**: 30 PNG (27 de imagen + 3 de logo), 23 MP4, 2 PDF, 2 `.ai`, 2 ZIP sin extensión.

Rutas abreviadas: `001/` = `tmp/resources/PAGINA WEB -20260903T221658Z-1-001/PAGINA WEB/`, `002/` = idem con `-002`.

---

## 1. Marca — `001/LOGOS/`

| Archivo | Tipo | Tamaño | Notas |
|---|---|---|---|
| `Plenor_Logotipo_SinTM.ai` | Illustrator | 344 KB | Logotipo vectorial, sin ™ |
| `Plenor_Logotipo_SinTM.png` | PNG | 42 KB | **2363 × 591**, fondo transparente |
| `Plenor_Icono_SinTM.ai` | Illustrator | 341 KB | Isotipo "P" vectorial |
| `Plenor_Icono_SinTM.png` | PNG | 20 KB | **709 × 591**, transparente — candidato a favicon |
| `Plenor-Residencial Aonami.png` | PNG | 12 KB | **786 × 252**, lockup de co-branding `P \| Residencial AONAMI` |
| `Manual Plenor.pdf` | PDF | 43.2 MB | 70 pp. → ver [01-manual-identidad-plenor.md](./01-manual-identidad-plenor.md) |
| `Paleta de Colores` | **ZIP sin extensión** | 435 KB | `Plenor_Paleta de Colores.pdf` + `Editable ….ai` → ver [02](./02-paleta-colores.md) |
| `Fuente` | **ZIP sin extensión** | 510 KB | 6 `.otf` de **Albra Grotesk** (ver abajo) |

### Tipografía (dentro del ZIP `Fuente`)

| Archivo | Peso |
|---|---|
| `Albra-Grotesk-Light.otf` | Light |
| `Albra-Grotesk-Regular.otf` | Regular |
| `Albra-Grotesk-Medium.otf` | Medium |
| `Albra-Grotesk-Semi.otf` | Semibold |
| `Albra-Grotesk-Bold.otf` | Bold |
| `Albra-Grotesk-Black.otf` | Black |

> ⚠️ **Albra Grotesk es una fuente comercial de pago.** Los `.otf` de escritorio **no cubren el uso web**: para servirla con `@font-face` hace falta una licencia webfont. Verificar la licencia con el cliente antes de subirla a `public/fonts/`. Alternativa de respaldo si no hay licencia web: una grotesca geométrica similar (p. ej. *Familjen Grotesk*, *General Sans*, *Space Grotesk*).

---

## 2. Renders horizontales — `001/AONAMI - Renders finales/`

Todos PNG a **5500 × 3093 px** (16:9, ~20–35 MB c/u) salvo donde se indique.

| # | Archivo | MB | Qué muestra |
|---|---|---:|---|
| 01 | `01. INGRESO.png` | 27.1 | Pórtico de ingreso al atardecer: marquesina volada blanca, portón de listones de madera, caseta, auto entrando |
| 02 | `02. PISCINA.png` | 26.7 | Piscina desde el nivel de la calle, club house de muro de piedra, palmeras, bañistas |
| 03 | `03. CASA TIPO 01.png` | 25.2 | Piscina desde el borde con casas tipo detrás (3 niveles, blancas), tumbonas, bar |
| 04 | `04.CASA TIPO CON PISCINA.png` | 23.9 | Fila de casas tipo con la piscina en primer plano, estacionamientos |
| 05 | `05. PARRILLAS.png` | 28.9 | Pérgolas de madera con parrillas y mesas de picnic sobre césped |
| 06 | `06. JUEGOS DE NIÑOS.png` | 22.3 | Módulo de juegos infantiles (torre, tobogán, columpios) entre casas |
| 07 | `07. FRONTON.png` | 26.6 | Cancha de frontón con muro terracota, jugadores, malla perimetral |
| 08 | `08. FOGATAS.png` | 22.7 | Fogata circular encendida al atardecer con bancas radiales, piscina al fondo |
| 09 | `09. GENERAL.png` | 33.9 | Aérea general del conjunto con el parque deportivo |
| 10 | `10. GENERAL CLUB.png` | 34.3 | Aérea del club house + piscina + zona de fogatas |
| 11 | `11. GENERAL PISCINA.png` | 31.4 | Aérea cenital de la piscina y el club house |
| — | `Aonamifotomontaje_final (1).png` | 61.3 | **7680 × 4320 (8K)** — fotomontaje aéreo real: el proyecto insertado en la trama agrícola con el mar al fondo |
| — | `Nested Sequence 12.00_00_02_22.Still001 (1).png` | 2.7 | **1920 × 1080** — frame extraído del video aéreo (mismo encuadre que el fotomontaje) |
| — | `Planimetria en alta.png` | 21.7 | **7108 × 7108** — planimetría 3D del conjunto sobre fondo blanco, en perspectiva |
| — | `planimetria sin fondo (1).png` | 2.5 | **1777 × 1777** — misma planimetría 3D **con transparencia**, montada sobre foto aérea. Ideal para un masterplan interactivo |

---

## 3. Videos horizontales — `AONAMI - Videos finales/`

H.264 · **2560 × 1440** · 30 fps, salvo donde se indique. Sin audio relevante.

| # | Archivo | Ubicación | MB | Duración | Notas |
|---|---|---|---:|---:|---|
| 00 | `00. VIDEO_AONAMI.mp4` | `002/AONAMI - Renders finales/` | 179.4 | **98.0 s** | **1920 × 1080 · 25 fps** — video institucional completo del proyecto |
| 01 | `01. PÓRTICO.mp4` | 002 | 127.9 | 6.13 s | |
| 02 | `02. DETALLE.mp4` | 001 | 103.2 | 6.13 s | |
| 03 | `03. GENERAL.mp4` | 002 | **397.6** | 20.10 s | el archivo más pesado del drive |
| 04 | `04. GENERAL.mp4` | 001 | 83.2 | 6.13 s | |
| 05 | `05. PISCINA.mp4` | 001 | 130.9 | 6.13 s | |
| 06 | `06. PARQUE DEPORTIVO.mp4` | 002 | 145.7 | 6.13 s | |
| 07 | `07. GENERAL.mp4` | 002 | 225.4 | 10.10 s | |
| 08 | `08. FOGATAS.mp4` | 001 | 74.5 | 6.13 s | |
| 09 | `09. PARRILLAS.mp4` | 002 | 118.4 | 6.13 s | |
| 10 | `10. GENERAL CIERRE.mp4` | 002 | 274.0 | 15.10 s | |
| 11 | `11. PISCINA.mp4` | 001 | 32.9 | 10.08 s | **1920 × 1080 · 24 fps** |
| 12 | `12. JUEGOS DE NIÑOS.mp4` | 001 | 31.4 | 10.08 s | **1920 × 1080 · 24 fps** |

---

## 4. Entrega vertical — `001|002/04. ENTREGA (VERTICAL)/`

Misma secuencia de escenas, reencuadrada en **formato vertical 3:4 / 9:12** — pensado para móvil, stories y reels.

### 4.1 Vistas verticales (PNG) — `01. VISTAS VERTICALES/`

Todas **3500 × 4667** (la 01 es 3500 × 4666).

| # | Archivo | MB | Qué muestra |
|---|---|---:|---|
| 01 | `01.GENERAL VERTICAL.png` | 27.6 | Aérea del conjunto con el mar al fondo |
| 02 | `02. INGRESO.png` | 19.6 | Pórtico de ingreso a nivel de calle |
| 03 | `03. CERCO PERIMETRICO.png` | 23.1 | Cerco de listones verticales sobre la vía adoquinada |
| 04 | `04. VIAS ADOQUINADAS.png` | 28.0 | Vía interna en perspectiva, con casas y cruce peatonal |
| 05 | `05. PARQUES.png` | 33.8 | Aérea del parque deportivo (multiusos + frontón + juegos) |
| 06 | `06. CLUBHOUSE.png` | 21.1 | Club house y piscina desde el borde del agua |
| 07 | `07. AREA DE PARRILAS Y FOGATAS.png` | 29.5 | Aérea de piscina + fogatas + pérgolas de parrilla |
| 08 | `08. CANCHA MULTIUSOS.png` | 33.7 | Cancha polideportiva con marca "Plenor" pintada |
| 09 | `09. CANCHA DE FRONTON.png` | 19.3 | Cancha de frontón con muro terracota |
| 10 | `10. JUEGO PARA NIÑOS.png` | 19.6 | Juegos infantiles a nivel de peatón |

*(nota: el nombre del archivo 07 dice "PARRILAS", con una sola R — errata en el original)*

### 4.2 Videos verticales — `02. VIDEOS VERTICALES/`

Todos **1920 × 2560 · 30 fps**.

| # | Archivo | Ubicación | MB | Duración |
|---|---|---|---:|---:|
| 01 | `01. GENERAL VERTICAL.mp4` | 001 | 134.5 | 6.13 s |
| 02 | `02. INGRESO.mp4` | 002 | 113.5 | 6.13 s |
| 03 | `03. CERCO PERIMETRICO.mp4` | 002 | 127.2 | 6.13 s |
| 04 | `04. VIAS ADOQUINADAS.mp4` | 001 | 129.7 | 6.13 s |
| 05 | `05. PARQUES.mp4` | 001 | 148.1 | 6.13 s |
| 06 | `06. CLUBHOUSE.mp4` | 001 | 85.8 | 6.13 s |
| 07 | `07. AREA DE PARRILLAS Y FOGATAS.mp4` | 002 | 90.1 | 3.13 s |
| 08 | `08. CANCHA MULTIUSO.mp4` | 001 | 76.6 | 3.13 s |
| 09 | `09. CANCHA DE FRONTON.mp4` | 001 | 62.4 | 3.13 s |
| 10 | `10. JUEGO PARA NIÑOS.mp4` | 001 | 48.8 | 3.13 s |

> **Hay correspondencia 1:1 entre la versión horizontal y la vertical de casi todas las escenas** — base directa para un hero responsive que sirva 9:16 en móvil y 16:9 en desktop.

### 4.3 Planimetrías — `001/04. ENTREGA (VERTICAL)/`

| Archivo | Px | MB | Qué muestra |
|---|---|---:|---|
| `01. Planimetria 15.04.png` | **7500 × 2500** | 39.5 | Vista cenital del masterplan **con los lotes vacíos** (solo terreno, vías y amenidades) — la versión "venta de terrenos" |
| `02. PLANIMETRIA TOUR VIRTUAL_15.04.png` | **6000 × 3374** | 30.7 | Vista cenital del masterplan **con todas las casas construidas** — pensada como base de un **tour virtual** |

Ambas están montadas sobre la fotografía aérea real del entorno agrícola, con la carretera y los cultivos alrededor.

---

## 5. Documentos

| Archivo | Ubicación | Págs. | MB | Doc derivado |
|---|---|---:|---:|---|
| `Aonami AMENIDADES.pdf` | `001/` | 1 (A2) | 51.8 | [03-aonami-plano-comercial.md](./03-aonami-plano-comercial.md) |
| `Manual Plenor.pdf` | `001/LOGOS/` | 70 | 43.2 | [01-manual-identidad-plenor.md](./01-manual-identidad-plenor.md) |
| `Plenor_Paleta de Colores.pdf` | ZIP `Paleta de Colores` | 1 | 0.06 | [02-paleta-colores.md](./02-paleta-colores.md) |

---

## 6. Notas para la implementación

**Nada de esto es usable tal cual en la web.**

1. **Imágenes.** PNGs de 20–61 MB a 5500–7680 px. Hay que generar derivados AVIF/WebP con `next/image` o un paso de build:
   - hero desktop 2560 px, tablet 1600 px, móvil 1080 px
   - los renders son fotográficos → AVIF q≈50 baja de ~30 MB a ~150–400 KB
   - `planimetria sin fondo (1).png` conserva alfa → mantener PNG/WebP con transparencia, no AVIF lossy agresivo
2. **Videos.** De 31 a 398 MB, H.264 a 1440p/2560p. Recomprimir a:
   - MP4 (H.264, CRF ~24) + WebM (VP9/AV1) a 1080p para desktop, 720p vertical para móvil
   - generar `poster` de cada uno (frame 0) para evitar el flash en carga
   - los clips de 3–6 s funcionan bien como loops `autoplay muted playsinline`; el institucional de 98 s va en un modal/lightbox, nunca en autoplay
3. **Tipografía.** Confirmar licencia webfont de Albra Grotesk antes de usarla (ver §1).
4. **Los dos ZIP sin extensión** (`Fuente`, `Paleta de Colores`) hay que descomprimirlos — ya están extraídos en `tmp/extracted/` durante este análisis.
5. **`tmp/` no está versionado** (aparece como untracked en git). Decidir si los originales se mueven a un almacenamiento externo antes de que crezca el repo.
