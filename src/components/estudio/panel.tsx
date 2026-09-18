"use client";

import { useCallback, useState } from "react";
import {
  Eye,
  MessageSquarePlus,
  RotateCcw,
  Send,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  PRESETS,
  sameDesign,
  SECTIONS,
  TOKEN_GROUPS,
  type SectionId,
  type TokenId,
} from "./config";
import { ExportDialog } from "./export-dialog";
import { useStudio } from "./studio-context";

/**
 * EL PANEL
 *
 * Se construye solo a partir de `config.ts`: no conoce ninguna variante por su
 * nombre. Añadir una opción allá la hace aparecer acá.
 *
 * Dos decisiones de uso que importan más de lo que parece:
 *
 *   · El panel NO es modal. Se puede seguir haciendo scroll por la página con
 *     el panel abierto, que es justamente para lo que sirve: cambiar y mirar.
 *   · Existe un modo presentación que esconde todo el andamiaje. Nadie puede
 *     juzgar una portada con una barra de controles encima.
 */

const NOTE_MAX = 400;

/* ── Pastilla flotante ──────────────────────────────────────────────────── */

function Launcher() {
  const { panelOpen, setPanelOpen } = useStudio();

  return (
    <button
      type="button"
      onClick={() => setPanelOpen(!panelOpen)}
      aria-expanded={panelOpen}
      className={cn(
        "s-chrome fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full",
        "bg-grafito py-3 pl-4 pr-5 text-sm font-semibold text-arena-50 shadow-lg shadow-grafito/25",
        "transition-transform duration-200 hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--s-accent)]",
        panelOpen && "pointer-events-none opacity-0",
      )}
    >
      <SlidersHorizontal className="size-4" />
      Personalizar
    </button>
  );
}

/* ── Salida del modo presentación ───────────────────────────────────────── */

function PresentExit() {
  const { present, setPresent } = useStudio();
  if (!present) return null;

  return (
    <button
      type="button"
      onClick={() => setPresent(false)}
      className={cn(
        "fixed bottom-4 left-4 z-50 flex size-9 items-center justify-center rounded-full",
        "bg-grafito/35 text-arena-50/70 backdrop-blur-sm transition-all",
        "hover:bg-grafito hover:text-arena-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-accent)]",
      )}
      aria-label="Salir del modo presentación (Esc)"
      title="Salir del modo presentación (Esc)"
    >
      <X className="size-4" />
    </button>
  );
}

/* ── Controles reutilizables ────────────────────────────────────────────── */

function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={title}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-grafito bg-grafito text-arena-50"
          : "border-border bg-card text-muted-foreground hover:border-grafito-500 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Group({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      {note && (
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

/* ── Panel ──────────────────────────────────────────────────────────────── */

function Panel() {
  const {
    config,
    setVariant,
    setToken,
    setNote,
    applyPreset,
    reset,
    panelOpen,
    setPanelOpen,
    setPresent,
  } = useStudio();

  const [openNote, setOpenNote] = useState<SectionId | "general" | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

  /** Al cambiar una variante, llevar la vista a la sección afectada. */
  const goToSection = useCallback((anchor: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(anchor);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 60);
  }, []);

  return (
    <>
      {/* Velo solo en móvil: en escritorio el panel convive con la página. */}
      <div
        onClick={() => setPanelOpen(false)}
        className={cn(
          "s-chrome fixed inset-0 z-40 bg-grafito/40 transition-opacity md:hidden",
          panelOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        aria-label="Configurador de la página"
        aria-hidden={!panelOpen}
        className={cn(
          "s-chrome fixed inset-y-0 right-0 z-50 flex w-[min(92vw,25rem)] flex-col",
          "border-l border-border bg-arena-50 shadow-2xl shadow-grafito/20",
          "transition-transform duration-300 ease-out",
          panelOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Cabecera */}
        <header className="flex items-start justify-between gap-3 border-b border-border p-5">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Arma tu página
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Cambia lo que quieras y mira el resultado al instante. Al final,
              envíanos tu selección.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            aria-label="Cerrar el configurador"
            className="-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        </header>

        {/* Cuerpo */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5">
          <div className="flex flex-col gap-7">
            {/* Presets */}
            <Group label="Empieza por un estilo">
              <ul className="flex flex-col gap-2">
                {PRESETS.map((p) => {
                  const active = sameDesign(config, p.config);
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => {
                          applyPreset(p);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        aria-pressed={active}
                        className={cn(
                          "w-full rounded-lg border p-3 text-left transition-colors",
                          active
                            ? "border-grafito bg-card"
                            : "border-border bg-card/60 hover:border-grafito-500",
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{p.label}</span>
                          {active && (
                            <span className="s-accent-bg rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                              Activo
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {p.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Group>

            <hr className="border-border" />

            {/* Tokens globales */}
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold tracking-tight">Estilo global</p>
              {TOKEN_GROUPS.filter(
                // El tono solo tiene sentido si hay un set de ilustración
                // activo: mostrarlo apagado es ruido en el panel.
                (group) =>
                  !group.hiddenWhen ||
                  config.tokens[group.hiddenWhen.token] !== group.hiddenWhen.is,
              ).map((group) => (
                <Group key={group.id} label={group.label} note={group.note}>
                  <div className="flex flex-wrap gap-1.5">
                    {group.options.map((option) => {
                      const active = config.tokens[group.id] === option.id;
                      return (
                        <Chip
                          key={option.id}
                          active={active}
                          title={option.hint}
                          onClick={() => setToken(group.id as TokenId, option.id)}
                        >
                          <span className="flex items-center gap-1.5">
                            {option.swatch && (
                              <span
                                aria-hidden
                                style={{ backgroundColor: option.swatch }}
                                className="size-3 rounded-full ring-1 ring-black/10"
                              />
                            )}
                            {option.label}
                          </span>
                        </Chip>
                      );
                    })}
                  </div>
                </Group>
              ))}
            </div>

            <hr className="border-border" />

            {/* Secciones */}
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold tracking-tight">
                Sección por sección
              </p>

              {SECTIONS.map((section) => {
                const current = config.sections[section.id];
                const variant = section.variants.find((v) => v.id === current);
                const noteOpen = openNote === section.id;
                const note = config.notes[section.id] ?? "";

                return (
                  <div key={section.id}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="eyebrow text-muted-foreground">
                        {section.label}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenNote(noteOpen ? null : section.id)
                        }
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium transition-colors",
                          note
                            ? "s-accent"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <MessageSquarePlus className="size-3.5" />
                        {note ? "Con nota" : "Comentar"}
                      </button>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {section.variants.map((v) => (
                        <Chip
                          key={v.id}
                          active={v.id === current}
                          onClick={() => {
                            setVariant(section.id, v.id);
                            goToSection(section.anchor);
                          }}
                        >
                          {v.label}
                        </Chip>
                      ))}
                    </div>

                    {variant && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {variant.hint}
                      </p>
                    )}

                    {noteOpen && (
                      <Textarea
                        autoFocus
                        value={note}
                        maxLength={NOTE_MAX}
                        onChange={(e) => setNote(section.id, e.target.value)}
                        placeholder={
                          "¿Qué cambiarías de " +
                          section.label.toLowerCase() +
                          "?"
                        }
                        className="mt-2.5 min-h-20 bg-card text-sm"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <hr className="border-border" />

            {/* Comentario general */}
            <Group label="Comentario general">
              <Textarea
                value={config.notes.general ?? ""}
                maxLength={NOTE_MAX * 2}
                onChange={(e) => setNote("general", e.target.value)}
                placeholder="Lo que no encaje en ninguna sección: colores, textos, lo que falta…"
                className="min-h-24 bg-card text-sm"
              />
            </Group>

            {/* Utilidades */}
            <div className="flex flex-wrap gap-2 pb-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-card"
                onClick={() => {
                  setPresent(true);
                  setPanelOpen(false);
                }}
              >
                <Eye className="size-3.5" />
                Modo presentación
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={reset}
              >
                <RotateCcw className="size-3.5" />
                Reiniciar
              </Button>
            </div>
          </div>
        </div>

        {/* Pie */}
        <footer className="border-t border-border p-4">
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => setExportOpen(true)}
          >
            <Send className="size-4" />
            Enviar mi selección
          </Button>
        </footer>
      </aside>

      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </>
  );
}

/** Todo el andamiaje del configurador, en un solo componente. */
export function StudioControls() {
  return (
    <>
      <Launcher />
      <Panel />
      <PresentExit />
    </>
  );
}
