# Paleta de Colores — Plenor

> **Fuentes:**
> - `tmp/resources/…/LOGOS/Paleta de Colores` → **es un ZIP sin extensión**. Contiene:
>   - `Plenor_Paleta de Colores.pdf` (1 pág., 1920 × 1080 pt, 60 KB) — título interno `Plenor_Estudio_Colores`
>   - `Editable Plenor_Paleta de Colores.ai` (376 KB, Illustrator 27.9 macOS)
> - `Manual Plenor.pdf`, pp. 22–25 (versión ampliada, con un color extra)
>
> Ya extraído a `tmp/extracted/paleta/` durante el análisis.

---

## Colores de marca

| # | Nombre | HEX | RGB | CMYK | Pantone C | Pantone U | Otro |
|---|---|---|---|---|---|---|---|
| 1 | **Grafito** | `#1F2328` | 31 · 35 · 40 | 82-69-56-73 | 7540 C | 7540 U | — |
| 2 | **Oliva urbano** | `#31463A` | 49 · 70 · 58 | 79-48-67-54 | 560 C | 560 C * | — |
| 3 | **Verde calmo** | `#839485` | 131 · 148 · 133 | 54-28-48-11 | 4192 C | 4192 U | American Color **Calmo 6628** |
| 4 | **Arena sillar** | `#E9E3DB` | 233 · 227 · 219 | 10-11-15-0 | 7527 C | 7527 U | — |
| 5 | **Ocre de obra** | `#FFB035` | 255 · 176 · 53 | 0-40-96-0 | 137 C | 137 U | — |
| 6 | **Terracota volcánica** | `#8C5338` | 140 · 83 · 56 | 29-69-79-28 | 7586 C | 7586 U | — |

\* En el manual el Pantone Uncoated de Oliva urbano aparece como "560 C" — probable errata (debería ser 560 U).

### ⚠️ Discrepancia entre las dos fuentes

El **PDF suelto "Paleta de Colores" solo trae 5 colores**: omite *Oliva urbano* (`#31463A`).
El **manual (p. 24) trae los 6**. Se toma el manual como fuente canónica.

Además, en la lámina de proporciones (p. 25) el segundo swatch está **etiquetado "GRAFITO 15 %" pero pintado con el verde oscuro** — es Oliva urbano; otra errata del manual.

---

## Proporciones de uso (Manual, p. 25)

| Color | Proporción |
|---|---|
| Grafito | 30 % |
| Oliva urbano | 15 % |
| Verde calmo | 15 % |
| Arena sillar | 25 % |
| Ocre de obra | 10 % |
| Terracota volcánica | 5 % |

Lectura práctica para la web: **fondo dominante arena sillar + grafito**, verdes como color de apoyo/estructura, **ocre de obra como color de acento y CTA** (es el único color saturado y de alto contraste), terracota reservado para toques puntuales.

---

## Intención cromática (Manual, p. 22)

> Cada color cuenta parte de nuestra historia. Desde el grafito urbano hasta la calidez del sillar y la tierra volcánica. Tonos que hablan de identidad, confort y autenticidad.

La lámina p. 23 asocia cada color a una fotografía de territorio: cerros áridos, cielo, carretera, arcilla, roca volcánica.

---

## Degradado de marca

Recurso repetido en toda la parte 04 del manual. Secuencia observada, de arriba a abajo / izquierda a derecha:

`Ocre de obra → naranja intermedio → Terracota volcánica → Verde calmo → Grafito`

Punto de partida sugerido en CSS (ajustar paradas contra las páginas 42 / 62 / 64 del PDF):

```css
--plenor-gradient: linear-gradient(
  180deg,
  #FFB035 0%,
  #E8873A 28%,
  #8C5338 52%,
  #839485 78%,
  #1F2328 100%
);
```

---

## Tokens sugeridos

```css
:root {
  --grafito:      #1F2328;
  --oliva:        #31463A;
  --verde-calmo:  #839485;
  --arena-sillar: #E9E3DB;
  --ocre:         #FFB035;
  --terracota:    #8C5338;
}
```

**Nota de accesibilidad:** `--ocre` (#FFB035) sobre blanco da un contraste ≈ 1.8:1 — no usar para texto pequeño sobre fondo claro. Funciona como fondo de botón **con texto grafito** (≈ 8.7:1), que es como aparece en el manual.
