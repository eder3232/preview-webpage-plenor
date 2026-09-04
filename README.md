# Web Plenor — Residencial Aonami

Sitio del proyecto **Residencial Aonami** (Punta de Bombón, Arequipa), del
desarrollador urbano **Plenor**.

Contiene **dos propuestas de diseño completas** sobre la misma base de
contenido, para que el cliente elija una o pida una mezcla de ambas.

| Ruta | Qué es |
|---|---|
| `/` | Selector: presenta las dos propuestas lado a lado |
| `/a` | **Propuesta A — “Verano”.** Landing de una sola página, scroll cinematográfico. Vende el estilo de vida |
| `/b` | **Propuesta B — “Plano”.** Sitio de seis secciones, datos y masterplan al frente. Vende la inversión |
| `/libro-de-reclamaciones` | Libro de Reclamaciones virtual (INDECOPI). Común a las dos |
| `/legal/privacidad`, `/legal/terminos` | Textos legales. Comunes a las dos |

---

## Arrancar

```bash
pnpm install
cp .env.example .env.local     # opcional: sin esto los formularios validan
                               # pero no envían correo (lo escriben en consola)
pnpm dev
```

Los assets ya procesados están versionados en `public/`. Solo hace falta
regenerarlos si se cambia la selección (ver abajo).

---

## Lo primero que hay que editar

**`src/config/site.ts`** es el único archivo que hay que tocar para poner los
datos reales del cliente: teléfono, WhatsApp, correos, direcciones, redes,
razón social, RUC y los textos legales del Libro de Reclamaciones. Todo lo
marcado con `⚠️ PENDIENTE` es un placeholder.

Cualquiera de esos valores se puede sobreescribir por variable de entorno sin
tocar el archivo — ver `.env.example`.

---

## Scripts

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Compilación de producción |
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript |
| `pnpm media` | Procesa los originales de `tmp/resources/` → `public/`. Añadir `--force` para rehacer todo |
| `pnpm gen:lotes` | Regenera el inventario de lotes desde `docs/03-aonami-plano-comercial.md` |
| `pnpm shots -- <ruta> <ancho> <alto> <nombre>` | Captura una página con Chrome headless |
| `pnpm shots -- --audit` | Revisa desbordes horizontales en todas las rutas, en móvil y escritorio |

---

## Cómo está organizado

```
src/
  config/site.ts        ← datos del cliente (el archivo a editar)
  content/              ← fuente única de contenido, compartida por A y B
    lotes.ts              los 203 lotes + estadísticas por sector
    lotes.data.ts         ⚙️ generado desde docs/03
    amenidades.ts         las 10 amenidades
    copy.ts               claims y textos sacados del manual de marca
    media.ts              catálogo de imágenes y videos
    media.generated.ts    ⚙️ generado por `pnpm media`
  components/
    ui/                 ← shadcn/ui
    shared/             ← se usa en las dos propuestas
    a/  ·  b/           ← exclusivo de cada propuesta
  lib/
    actions.ts          ← server actions de los formularios
    email.ts            ← envío (Resend o SMTP, elegido por variables de entorno)
    schemas.ts          ← validación con zod
scripts/                ← generadores y utilidades de verificación
docs/                   ← mapeo del material entregado por el cliente
```

La clave del montaje: **el contenido está separado del diseño**. Las dos
propuestas leen el mismo `src/content/`, así que si el cliente pide “el hero
de A con la sección de lotes de B”, se mueven componentes, no se reescribe
nada.

Cuando se elija una dirección, se borra la carpeta de la propuesta descartada
junto con `src/components/shared/proposal-switch.tsx` y el selector de `/`.

---

## Detalles que conviene conocer

- **Tipografía.** La oficial es Albra Grotesk, pero los `.otf` entregados son
  licencia de escritorio y no cubren el uso web. Mientras tanto se usa
  **Figtree**, que tiene el mismo rango de seis pesos. El cambio está aislado
  en `src/lib/fonts.ts` y son cinco líneas.
- **Sin precios.** No hay ni uno en el material entregado, así que el sitio no
  declara ninguno: todo lleva a cotizar.
- **Sin estado de venta.** El plano pinta los lotes en cuatro tonos pero no
  trae leyenda. El masterplan marca amenidades, no disponibilidad.
- **Áreas referenciales.** El inventario se transcribió del plano comercial;
  hay que validarlo contra el CAD original antes de publicarlo como
  información de venta.
- **`robots: index: false`** en el layout raíz mientras sean dos propuestas en
  revisión.

Más contexto en [`docs/README.md`](./docs/README.md).
