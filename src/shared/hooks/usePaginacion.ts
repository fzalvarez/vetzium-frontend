import { useState } from "react";

export const TAMANOS_PAGINA = [10, 25, 50] as const;

/** Estado que necesita el componente <Paginacion>. */
export interface EstadoPaginacion {
  pagina: number;
  paginas: number;
  tamano: number;
  total: number;
  irA: (pagina: number) => void;
  setTamano: (tamano: number) => void;
}

/**
 * Paginación en el cliente: devuelve la página visible de `items`. Si la lista se
 * achica (p. ej. al buscar), la página se ajusta a la última que existe.
 */
export function usePaginacion<T>(items: T[], tamanoInicial: number = TAMANOS_PAGINA[0]) {
  const [pagina, setPagina] = useState(1);
  const [tamano, setTamanoEstado] = useState(tamanoInicial);

  const paginas = Math.max(1, Math.ceil(items.length / tamano));
  const actual = Math.min(pagina, paginas);
  const visibles = items.slice((actual - 1) * tamano, actual * tamano);

  const estado: EstadoPaginacion = {
    pagina: actual,
    paginas,
    tamano,
    total: items.length,
    irA: (p) => setPagina(Math.min(Math.max(1, p), paginas)),
    setTamano: (t) => {
      setTamanoEstado(t);
      setPagina(1);
    },
  };

  return { visibles, paginacion: estado };
}
