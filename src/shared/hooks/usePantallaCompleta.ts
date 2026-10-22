import { useSyncExternalStore } from "react";

function suscribir(avisar: () => void) {
  document.addEventListener("fullscreenchange", avisar);
  return () => document.removeEventListener("fullscreenchange", avisar);
}

/** Pantalla completa del navegador (Fullscreen API): estado y alternar. */
export function usePantallaCompleta() {
  const activa = useSyncExternalStore(suscribir, () => document.fullscreenElement !== null);

  const alternar = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  };

  return [activa, alternar] as const;
}
