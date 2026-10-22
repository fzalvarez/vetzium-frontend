import { useState } from "react";

/** Selección de filas por id (casillas de una tabla). */
export function useSeleccion<K extends string | number>(idsVisibles: K[]) {
  const [seleccion, setSeleccion] = useState<ReadonlySet<K>>(new Set());

  const todosVisibles = idsVisibles.length > 0 && idsVisibles.every((id) => seleccion.has(id));
  const algunoVisible = idsVisibles.some((id) => seleccion.has(id));

  const alternar = (id: K) =>
    setSeleccion((actual) => {
      const nueva = new Set(actual);
      if (nueva.has(id)) nueva.delete(id);
      else nueva.add(id);
      return nueva;
    });

  // "Seleccionar todos" actúa sobre las filas visibles (la página actual).
  const alternarTodos = () =>
    setSeleccion((actual) => {
      const nueva = new Set(actual);
      for (const id of idsVisibles) {
        if (todosVisibles) nueva.delete(id);
        else nueva.add(id);
      }
      return nueva;
    });

  return {
    seleccionados: seleccion,
    estaSeleccionado: (id: K) => seleccion.has(id),
    alternar,
    alternarTodos,
    todosVisibles,
    /** Algunas (no todas) las visibles: la casilla del encabezado va "indeterminada". */
    parcial: algunoVisible && !todosVisibles,
  };
}
