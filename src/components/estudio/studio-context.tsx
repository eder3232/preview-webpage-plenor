"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  clone,
  decodeConfig,
  DEFAULT_CONFIG,
  encodeConfig,
  type Preset,
  type SectionId,
  type StudioConfig,
  type TokenId,
} from "./config";

/**
 * ESTADO DEL ESTUDIO
 *
 * La configuración vive en un store fuera de React, no en `useState`. La razón
 * es que su origen es externo —la URL y localStorage— y leerlo dentro de un
 * efecto obliga a un render en cascada y a un parpadeo del diseño por defecto
 * antes de aplicar el del enlace. Con `useSyncExternalStore` el navegador
 * entrega su valor en el primer render del cliente y el servidor entrega el
 * suyo, sin desajuste de hidratación.
 *
 * Tres lugares de donde sale la elección, por orden de prioridad:
 *
 *   1. La URL       — la que manda. Un enlace compartido abre siempre igual,
 *                     sin importar qué tenga guardado ese navegador.
 *   2. localStorage — para no perder lo que el cliente estaba viendo.
 *   3. El preset por defecto.
 *
 * Los comentarios por sección solo viven en localStorage y en la exportación:
 * meterlos en la URL la volvería ilegible. El enlace transporta el diseño; el
 * mensaje de WhatsApp transporta lo que el cliente opina de él.
 */

const STORAGE_KEY = "plenor-estudio-v1";

interface Snapshot {
  config: StudioConfig;
  /** false hasta que se resolvió el origen real (es decir, en el servidor). */
  ready: boolean;
}

/* ==========================================================================
   Store
   ========================================================================== */

const SERVER_SNAPSHOT: Snapshot = { config: DEFAULT_CONFIG, ready: false };

let snapshot: Snapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function readNotes(): StudioConfig["notes"] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    return (JSON.parse(saved) as Partial<StudioConfig>).notes ?? {};
  } catch {
    return {};
  }
}

function readInitial(): StudioConfig {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = decodeConfig(params.get("c"), params.get("k"));

  if (fromUrl) {
    // Vino por enlace. El diseño manda, pero los comentarios no viajan en la
    // URL, así que se recuperan los que hubiera guardados en este navegador.
    fromUrl.notes = readNotes();
    return fromUrl;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<StudioConfig>;
      return {
        sections: { ...DEFAULT_CONFIG.sections, ...parsed.sections },
        tokens: { ...DEFAULT_CONFIG.tokens, ...parsed.tokens },
        notes: parsed.notes ?? {},
      };
    }
  } catch {
    // localStorage bloqueado o JSON corrupto: se arranca por defecto.
  }

  return clone(DEFAULT_CONFIG);
}

function getSnapshot(): Snapshot {
  if (!snapshot.ready) snapshot = { config: readInitial(), ready: true };
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Guarda y refleja en la URL. Es la cara "escribir en el sistema externo". */
function persist(config: StudioConfig) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Incógnito o almacenamiento bloqueado: el estudio funciona igual, solo no
    // recuerda entre visitas.
  }

  // replaceState y no router.replace: cambiar la URL no debe re-montar la
  // página ni llenar el historial con cada clic del panel.
  window.history.replaceState(
    null,
    "",
    window.location.pathname + "?" + encodeConfig(config),
  );
}

function update(recipe: (previous: StudioConfig) => StudioConfig) {
  const next = recipe(getSnapshot().config);
  snapshot = { config: next, ready: true };
  persist(next);
  listeners.forEach((listener) => listener());
}

/* ==========================================================================
   Contexto
   ========================================================================== */

interface StudioValue {
  config: StudioConfig;
  ready: boolean;

  setVariant: (section: SectionId, variant: string) => void;
  setToken: (token: TokenId, value: string) => void;
  setNote: (key: SectionId | "general", value: string) => void;
  applyPreset: (preset: Preset) => void;
  reset: () => void;

  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;

  present: boolean;
  setPresent: (present: boolean) => void;

  /** URL absoluta que reproduce exactamente esta configuración. */
  shareUrl: string;
}

const StudioContext = createContext<StudioValue | null>(null);

export function useStudio() {
  const value = useContext(StudioContext);
  if (!value) throw new Error("useStudio fuera de <StudioProvider>");
  return value;
}

/** Atajo: el nivel de movimiento elegido, que consumen las animaciones. */
export function useMotionLevel() {
  return useStudio().config.tokens.motion;
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const { config, ready } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [panelOpen, setPanelOpen] = useState(false);
  const [present, setPresent] = useState(false);

  const setVariant = useCallback((section: SectionId, variant: string) => {
    update((previous) => {
      const next = clone(previous);
      next.sections[section] = variant;
      return next;
    });
  }, []);

  const setToken = useCallback((token: TokenId, value: string) => {
    update((previous) => {
      const next = clone(previous);
      next.tokens[token] = value;
      return next;
    });
  }, []);

  const setNote = useCallback((key: SectionId | "general", value: string) => {
    update((previous) => {
      const next = clone(previous);
      if (value.trim()) next.notes[key] = value;
      else delete next.notes[key];
      return next;
    });
  }, []);

  const applyPreset = useCallback((preset: Preset) => {
    update((previous) => ({
      sections: { ...preset.config.sections },
      tokens: { ...preset.config.tokens },
      // Cambiar de preset no debe borrar lo que el cliente ya escribió.
      notes: { ...previous.notes },
    }));
  }, []);

  const reset = useCallback(() => {
    update(() => clone(DEFAULT_CONFIG));
  }, []);

  /**
   * Anclas en enlaces compartidos.
   *
   * El contenido se monta recién cuando `ready` es true, así que para cuando
   * existe la sección el navegador ya intentó —y falló— saltar al `#ancla`.
   * Hay que repetir el salto una vez montado.
   */
  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [ready]);

  // Salir del modo presentación con Escape.
  useEffect(() => {
    if (!present) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPresent(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [present]);

  const shareUrl = ready
    ? window.location.origin +
      window.location.pathname +
      "?" +
      encodeConfig(config)
    : "";

  const value: StudioValue = {
    config,
    ready,
    setVariant,
    setToken,
    setNote,
    applyPreset,
    reset,
    panelOpen,
    setPanelOpen,
    present,
    setPresent,
    shareUrl,
  };

  return (
    <StudioContext.Provider value={value}>
      <div
        className="studio"
        data-accent={config.tokens.accent}
        data-type={config.tokens.type}
        data-density={config.tokens.density}
        data-radius={config.tokens.radius}
        data-motion={config.tokens.motion}
        data-present={present ? "true" : "false"}
      >
        {ready ? (
          children
        ) : (
          <div
            aria-busy
            className="flex min-h-dvh items-center justify-center bg-arena-50"
          >
            <span className="eyebrow text-muted-foreground">Cargando</span>
          </div>
        )}
      </div>
    </StudioContext.Provider>
  );
}
