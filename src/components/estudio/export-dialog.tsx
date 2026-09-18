"use client";

import { useState } from "react";
import { Check, Copy, Download, Link2, Send } from "lucide-react";

import { WhatsappIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { describe, type StudioConfig } from "./config";
import { useStudio } from "./studio-context";

/**
 * EXPORTACIÓN
 *
 * El resultado del juego. Tres salidas para lo mismo:
 *
 *   · WhatsApp — un mensaje con las elecciones en texto y el enlace al final.
 *                wa.me solo transporta texto: no se puede adjuntar un PDF ni
 *                una captura sin un servidor de por medio, y no hace falta,
 *                porque el enlace reproduce la página exacta.
 *   · Copiar   — el mismo texto, para pegarlo donde sea.
 *   · JSON     — la configuración completa, comentarios incluidos, para
 *                arrancar el siguiente preview sin transcribir nada a mano.
 *
 * El número de destino sale de NEXT_PUBLIC_STUDIO_WHATSAPP. Si no está, se
 * abre WhatsApp sin destinatario y el cliente elige el chat: así funciona
 * igual en cualquier despliegue sin configurar nada.
 */

const STUDIO_WHATSAPP = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP ?? "";

export function buildMessage(config: StudioConfig, shareUrl: string) {
  const { sections, tokens } = describe(config);
  const lines: string[] = [];

  lines.push("*Preview Aonami — mi selección*", "");

  lines.push("*ESTILO*");
  tokens.forEach((t) => lines.push("• " + t.label + ": " + t.value));
  lines.push("");

  lines.push("*SECCIONES*");
  sections.forEach((s) => {
    lines.push("• " + s.label + ": " + s.variant);
    if (s.note) lines.push("   ↳ " + s.note);
  });

  const general = config.notes.general?.trim();
  if (general) {
    lines.push("", "*COMENTARIO GENERAL*", general);
  }

  if (shareUrl) {
    lines.push("", "Ver exactamente esto:", shareUrl);
  }

  return lines.join("\n");
}

export function ExportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { config, shareUrl } = useStudio();
  const [copied, setCopied] = useState<"texto" | "enlace" | null>(null);

  const message = buildMessage(config, shareUrl);
  const whatsappHref =
    "https://wa.me/" + STUDIO_WHATSAPP + "?text=" + encodeURIComponent(message);

  const copy = async (what: "texto" | "enlace") => {
    try {
      await navigator.clipboard.writeText(what === "texto" ? message : shareUrl);
      setCopied(what);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Sin permiso de portapapeles (o sin HTTPS): queda el textarea de abajo,
      // que se puede seleccionar a mano.
    }
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify({ ...config, url: shareUrl }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aonami-seleccion.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enviar mi selección</DialogTitle>
          <DialogDescription>
            El enlace reproduce la página tal como la armaste. Los comentarios
            viajan dentro del mensaje.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Button asChild size="lg" className="gap-2">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" />
              Enviar por WhatsApp
              <Send className="size-3.5 opacity-60" />
            </a>
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => copy("enlace")} className="gap-2">
              {copied === "enlace" ? (
                <Check className="size-4" />
              ) : (
                <Link2 className="size-4" />
              )}
              {copied === "enlace" ? "Copiado" : "Copiar enlace"}
            </Button>
            <Button variant="outline" onClick={() => copy("texto")} className="gap-2">
              {copied === "texto" ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied === "texto" ? "Copiado" : "Copiar texto"}
            </Button>
          </div>

          <Button variant="ghost" onClick={downloadJson} className="gap-2">
            <Download className="size-4" />
            Descargar como JSON
          </Button>
        </div>

        <div>
          <p className="eyebrow mb-2 text-muted-foreground">Vista previa</p>
          <pre className="max-h-56 overflow-auto rounded-md border border-border bg-muted p-3 text-xs leading-relaxed whitespace-pre-wrap">
            {message}
          </pre>
        </div>

        {!STUDIO_WHATSAPP && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            No hay número de destino configurado, así que WhatsApp abrirá para
            que elijas el chat. Para fijarlo, define{" "}
            <code className="font-mono">NEXT_PUBLIC_STUDIO_WHATSAPP</code> con el
            número en formato internacional y sin el signo +.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
