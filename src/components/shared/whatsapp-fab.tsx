"use client";

import { useEffect, useState } from "react";

import { WhatsappIcon } from "@/components/shared/brand-icons";
import { siteConfig, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Botón flotante de WhatsApp. En un proyecto inmobiliario peruano es la vía de
 * contacto real, así que está en las dos propuestas.
 *
 * Aparece recién después de 400 px de scroll para no tapar el hero, y se
 * esconde cuando hay un formulario en pantalla (el usuario ya está
 * convirtiendo, no hay que distraerlo).
 */
export function WhatsappFab({ hideNear }: { hideNear?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hideNear) return;
    const target = document.querySelector(hideNear);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && window.scrollY > 400),
      { threshold: 0.25 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [hideNear]);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${siteConfig.contact.phoneDisplay}`}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex size-13 items-center justify-center rounded-full",
        "bg-[#25D366] text-white shadow-lg shadow-grafito/20",
        "transition-all duration-300 hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ocre",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}
