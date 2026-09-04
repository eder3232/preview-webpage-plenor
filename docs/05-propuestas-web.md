# Las dos propuestas de sitio web

> Documento de decisiones. Los cuatro documentos anteriores describen **lo que
> entregó el cliente**; este describe **lo que se construyó con eso** y por qué.

---

## 1. Por qué dos

El encargo fue presentar dos propuestas para que el cliente pueda decir qué le
gusta de cada una y pedir una mezcla. Eso condiciona la arquitectura: las dos
viven en la **misma aplicación Next**, con prefijos de ruta distintos y una
capa de contenido compartida.

```
/                          selector, solo para la presentación
/a  …                      Propuesta A — "Verano"
/b  …                      Propuesta B — "Plano"
/libro-de-reclamaciones    común a las dos
/legal/…                   común a las dos
```

Mezclarlas después es mover componentes de `src/components/a/` a
`src/components/b/` (o al revés): ninguno de los dos lados tiene su propia
copia de los datos, del copy ni de los assets.

---

## 2. En qué se diferencian

| | **A — Verano** | **B — Plano** |
|---|---|---|
| Estructura | Una sola página + `/a/lotes` | Seis rutas con navegación permanente |
| Qué vende | El estilo de vida | La inversión |
| Hero | Video a pantalla completa (vertical en móvil) | Imagen aérea + ficha de cifras encima |
| Header | Transparente sobre el hero, se vuelve sólido al bajar | Sólido siempre, con franja de datos y ruta activa marcada |
| Fondo | Arena sillar, secciones oscuras puntuales | Grafito en cabeceras, tarjetas sobre claro |
| Recurso propio | Galería horizontal atada al scroll (escritorio) | Fichas de dato y tablas |
| Orden | Sensación → amenidades → plano → datos | Cifras → secciones → detalle |
| Densidad | Menos datos, más aire | Más datos, más rutas a cotizar |

Lo que **comparten**: paleta, tipografía, los 203 lotes, las 10 amenidades, el
masterplan interactivo, el buscador de lotes, el formulario de contacto, el
Libro de Reclamaciones, el pie de página y todas las advertencias legales.

---

## 3. Decisiones de contenido

### 3.1 Sin precios

No hay ni un precio real en el material entregado (los `$ 250,00` del manual
son placeholders de una maqueta de Instagram). El sitio **no declara ninguno**:
cada camino termina en “cotiza” o en WhatsApp. Lo único comercial que sí se
afirma es el financiamiento, que sí está documentado en el manual (pp. 47–48).

### 3.2 Sin estado de venta

El plano comercial pinta los lotes en cuatro tonos de la paleta, pero **no
incluye leyenda** (ver [03 §6](./03-aonami-plano-comercial.md)). Interpretarlos
como disponible / separado / vendido sería inventar información comercial, así
que el masterplan interactivo marca **las 10 amenidades**, no los lotes.

Si el cliente entrega el estado de venta actualizado, el mapa clicable se monta
encima de `src/components/shared/masterplan.tsx` sin rehacer nada: las
coordenadas ya están en porcentaje sobre la misma planimetría.

### 3.3 El inventario sí se publica

Los 203 lotes se publican con área y perímetro, **filtrables por sector y por
tamaño**, y cada uno lleva a WhatsApp con el código ya escrito en el mensaje.
Va acompañado siempre de la advertencia de que las áreas son referenciales.

Los datos **no están escritos a mano**: `scripts/generate-lotes.mjs` los parsea
de las tablas de [03](./03-aonami-plano-comercial.md) y valida que salgan 203
lotes, numeración contigua por sector y el total de 23 486,75 m². Si se
corrigen las áreas contra el CAD original, se edita el markdown y se corre
`pnpm gen:lotes`.

### 3.4 Tres formatos de lote

Como no hay tipologías definidas, se agruparon por metraje para que el
buscador sea usable: **Compacto** (90–110 m², 98 lotes), **Familiar**
(110–140 m², 89) y **Premium** (más de 140 m², 16). Es una convención de esta
web, no un dato del cliente; está en `src/content/lotes.ts` y se cambia en un
solo lugar.

---

## 4. Decisiones de marca

### 4.1 Paleta

Los seis colores del manual se mapean a los tokens de shadcn en
`src/app/globals.css`, así que cualquier componente nuevo hereda la marca sin
clases extra:

| Token shadcn | Color Plenor | Por qué |
|---|---|---|
| `--primary` | Ocre de obra `#FFB035` | Es el único color saturado del sistema; el manual lo usa siempre como acción |
| `--primary-foreground` | Grafito `#1F2328` | Ocre con texto grafito da 8.7:1; ocre sobre blanco da 1.8:1 y no se usa nunca para texto |
| `--background` | Arena sillar aclarado `#FAF8F5` | La proporción del manual es 25% arena + 30% grafito |
| `--secondary`, `--accent` | Arena sillar `#E9E3DB` | |
| `--ring` | Ocre | El foco es visible sin romper la paleta |

Se añadió la clase `.on-grafito`: aplicada a un contenedor, redefine los tokens
para fondo oscuro y todo lo que está dentro se adapta solo. Es lo que permite
alternar secciones claras y oscuras sin duplicar variantes de cada componente.

No hay modo oscuro. La marca ya alterna claro y oscuro por composición, y
mantener dos temas por cada una de las dos propuestas era duplicar trabajo sin
que nadie lo pidiera.

### 4.2 Tipografía

Albra Grotesk es de pago y los `.otf` entregados son licencia de escritorio: no
cubren `@font-face`. Se usa **Figtree** como sustituta —grotesca
humanista-geométrica, altura de x alta, y rango variable 300–900 que mapea 1:1
con los seis pesos de Albra—.

El cambio está aislado en `src/lib/fonts.ts`, que además lleva escrito el
bloque exacto que hay que pegar cuando llegue la licencia. Ningún otro archivo
se entera: todo consume la variable CSS `--font-brand`.

### 4.3 Logo

Los tres PNG entregados son arte negro con transparencia. No hay versión en
negativo entre los archivos, así que `Logo variant="light"` la genera por
filtro CSS. Si el cliente entrega los SVG, se reemplaza por un componente
inline y se borra el filtro. El favicon se genera del isotipo con
`scripts/icons.mjs`.

---

## 5. Assets: de 3,7 GB a 37 MB

`scripts/media.mjs` procesa los originales de `tmp/resources/` y escribe a
`public/`. Los originales **no se versionan**; los derivados sí.

| | Entregado | Seleccionado | Peso final |
|---|---|---|---|
| Imágenes | 27 PNG (~717 MB) | 22 | **11 MB** |
| Logos | 3 PNG | 3 | 76 KB |
| Videos | 23 MP4 (~2,9 GB) | 4 | **27 MB** |

**Criterio de selección:** cada amenidad documentada aparece una vez, más las
vistas generales y las planimetrías. El resto queda en el drive, disponible si
alguna sección lo pide.

**Imágenes.** Un “master” WebP por imagen al ancho máximo que necesita su uso
(2560 px los renders, 1440 los verticales, 3840 la planimetría). `next/image`
genera desde ahí el `srcset` y el AVIF por dispositivo, así que no hace falta
versionar cinco tamaños de cada una. El script mide las dimensiones reales del
archivo procesado y genera un LQIP en base64, ambos en
`src/content/media.generated.ts`: los componentes nunca escriben medidas a mano
y no hay saltos de maquetación.

**Videos.** MP4 H.264 con `+faststart` y póster extraído. Los tres loops van
mudos (`-an`): reproducen en autoplay y el audio sería peso muerto.

| Video | Origen | Resultado |
|---|---|---|
| `hero` (6 s, escritorio) | 83 MB | 2,3 MB |
| `hero-vertical` (6 s, móvil) | 135 MB | 0,7 MB |
| `piscina` (6 s) | 131 MB | 2,1 MB |
| `institucional` (98 s) | 179 MB | 16,5 MB |

El institucional va en un modal con `preload="none"`: no se descarga hasta que
alguien lo pide. Los loops se saltan por completo si el usuario tiene
`prefers-reduced-motion`, Data Saver activo o conexión 2G/3G — en ese caso se
queda el póster, que ya estaba cargado.

---

## 6. Formularios y correo

Los dos formularios (contacto y Libro de Reclamaciones) usan **server actions
con `useActionState`**, así que funcionan aunque el JavaScript no haya
cargado. La validación de zod corre siempre en el servidor.

Por eso los campos usan `<select>` y `<input type="checkbox">` nativos en vez
de los componentes de shadcn: estos necesitan JavaScript para existir y no
envían valor en un POST sin él.

**Envío.** `src/lib/email.ts` elige proveedor según qué variables de entorno
existan, sin tocar código:

1. `RESEND_API_KEY` → Resend
2. `SMTP_HOST…` → SMTP genérico (Google Workspace, Zoho, cPanel)
3. ninguna → modo consola: valida y responde bien, pero escribe el correo en el
   log del servidor en vez de enviarlo. Es lo que pasa en desarrollo.

Se dejaron los dos porque la decisión es del cliente: Resend exige verificar el
dominio, SMTP funciona con el correo corporativo que ya tengan.

**Anti-spam:** campo trampa (`honeypot`) revisado *antes* de validar, con
respuesta de éxito falso — si devolviera un error de validación, el bot sabría
qué campo lo delató.

---

## 7. Libro de Reclamaciones

Ruta `/libro-de-reclamaciones`, común a las dos propuestas y enlazada desde
todos los pies de página.

Campos según el D.S. 011-2011-PCM: identificación del consumidor (con domicilio
y documento, y datos del apoderado si es menor de edad), identificación del
bien contratado y detalle de la reclamación con el pedido del consumidor. Se
distingue **reclamo** de **queja** con las definiciones legales a la vista.

Al enviarse genera un código de hoja y manda **dos correos**: uno a la casilla
de la empresa (`mail.complaintsTo`) y una copia al consumidor, que es la
entrega de copia que exige el reglamento. Si el correo a la empresa falla, al
consumidor se le dice claramente que el reclamo **no** quedó presentado y se le
dan canales alternativos.

### Dos cosas pendientes

1. **El plazo de respuesta y los textos legales** están en
   `src/config/site.ts` como valores editables, con el defecto puesto en quince
   (15) días hábiles. **Deben ser confirmados por el asesor legal del cliente.**
2. **No hay base de datos.** El código de hoja es único pero no estrictamente
   correlativo, y el registro de reclamos vive en la casilla de correo. Si el
   cliente necesita un libro con numeración correlativa y consultable, hay que
   añadir persistencia — está anotado en `src/lib/actions.ts`.

Las páginas de privacidad y términos son **borradores** marcados como tales en
la propia página, para revisión legal.

---

## 8. Responsive

Un solo punto de corte, `md:` (768 px), como se pidió: móvil y escritorio, sin
tablet. Las tablets reciben el diseño de escritorio.

Donde la diferencia importa, no se escala: se cambia de patrón.

- **Hero:** video horizontal en escritorio, vertical en móvil. El cliente
  entregó las dos versiones de casi todas las escenas.
- **Galería de A:** desplazamiento horizontal atado al scroll en escritorio;
  en móvil, carrusel con `scroll-snap` y los recortes verticales. Atar el
  desplazamiento horizontal al scroll vertical pelea con el gesto del dedo.
- **Buscador de lotes:** tabla en escritorio, tarjetas en móvil.
- **Masterplan:** la planimetría es 3:1; en móvil se sirve en un contenedor con
  desplazamiento propio, abierto ya centrado en el núcleo de amenidades.

Verificado con `pnpm shots -- --audit`, que mide el ancho real del documento y
detecta desbordes horizontales en las 13 rutas, a 390 px y a 1440 px.

---

## 9. Lo que falta para publicar

1. **Completar `src/config/site.ts`** — teléfono, WhatsApp, correos, razón
   social y RUC reales. Todo lo pendiente está marcado con `⚠️ PENDIENTE`.
2. **Configurar el envío de correo** — `RESEND_API_KEY` o las variables `SMTP_*`.
3. **Revisión legal** de la política de privacidad, los términos y el plazo del
   Libro de Reclamaciones.
4. **Licencia webfont de Albra Grotesk**, o confirmar Figtree como definitiva.
5. **Validar las áreas de los lotes** contra el `.ai`/CAD original.
6. **Elegir propuesta**, borrar la descartada junto con el selector de `/` y la
   pastilla `ProposalSwitch`, y quitar el `robots: index: false` del layout raíz.
