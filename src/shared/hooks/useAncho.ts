import { useLayoutEffect, useRef, useState } from "react";

/** Ancho en px de un elemento, actualizado al cambiar de tamaño (para gráficos SVG). */
export function useAncho<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ancho, setAncho] = useState(0);

  // Layout effect: se mide antes de pintar, así el gráfico no aparece vacío un instante.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => setAncho(el.getBoundingClientRect().width);
    medir();
    const observer = new ResizeObserver(medir);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, ancho] as const;
}
