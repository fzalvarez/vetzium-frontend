import { useEffect, useRef, useState } from "react";

/** Ancho en px de un elemento, actualizado al cambiar de tamaño (para gráficos SVG). */
export function useAncho<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ancho, setAncho] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entrada]) => setAncho(entrada.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, ancho] as const;
}
