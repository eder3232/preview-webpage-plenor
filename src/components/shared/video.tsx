"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { video, type MediaVideo } from "@/content/media";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Loop decorativo de fondo
   ========================================================================== */

/**
 * Decide si vale la pena descargar el video:
 *   · `prefers-reduced-motion` → nunca (el movimiento es el problema)
 *   · Data Saver o conexión 2G/3G → nunca (pesa 0.7–2.3 MB)
 * En ambos casos se queda el poster, que ya está cargado.
 */
function useShouldPlayVideo() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      if (motionQuery.matches) return setOk(false);
      const conn = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;
      if (conn?.saveData) return setOk(false);
      if (conn?.effectiveType && /^(slow-)?2g$|^3g$/.test(conn.effectiveType)) {
        return setOk(false);
      }
      setOk(true);
    };

    decide();
    motionQuery.addEventListener("change", decide);
    return () => motionQuery.removeEventListener("change", decide);
  }, []);

  return ok;
}

interface VideoLoopProps {
  /** Id del manifiesto. En móvil se puede servir otro (vertical). */
  id: string;
  mobileId?: string;
  className?: string;
  /** El poster del hero debe cargarse con prioridad; el resto no. */
  priority?: boolean;
}

export function VideoLoop({ id, mobileId, className, priority }: VideoLoopProps) {
  const shouldPlay = useShouldPlayVideo();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  // Antes de saber el tamaño de pantalla se usa la variante de escritorio,
  // salvo que exista una móvil: así el poster correcto entra en el HTML
  // inicial y no hay parpadeo.
  const active: MediaVideo = video(isMobile && mobileId ? mobileId : id);

  return (
    <div className={cn("relative overflow-hidden bg-grafito", className)}>
      <Image
        src={active.poster}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={active.posterBlur}
        className="object-cover"
      />
      {shouldPlay && isMobile !== null && (
        <video
          key={active.src}
          src={active.src}
          poster={active.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  );
}

/* ==========================================================================
   Video institucional en modal
   ========================================================================== */

export function VideoModal({
  id = "institucional",
  children,
  title = "Video del proyecto",
}: {
  id?: string;
  children: React.ReactNode;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const v = video(id);

  // Al cerrar, detener: si no, el audio sigue sonando bajo el overlay.
  useEffect(() => {
    if (!open && ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, [open]);

  return (
    <>
      {/* `block w-full`: si el botón queda inline-block, el `w-full` de su
          contenido no tiene ancho contra el que resolverse y el overlay se
          descoloca respecto del póster. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full cursor-pointer text-left"
      >
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="max-w-[calc(100vw-2rem)] border-0 bg-grafito p-0 sm:max-w-4xl"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <video
            ref={ref}
            src={v.src}
            poster={v.poster}
            controls
            autoPlay
            playsInline
            preload="none"
            className="aspect-video w-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Botón circular de play, reutilizado por las dos propuestas. */
export function PlayBadge({
  className,
  label = "Ver el video",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 rounded-full bg-ocre py-2 pl-2 pr-5 text-grafito",
        "transition-transform duration-300 group-hover:scale-105",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-grafito">
        <Play className="size-4 translate-x-px fill-ocre text-ocre" />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </span>
  );
}
