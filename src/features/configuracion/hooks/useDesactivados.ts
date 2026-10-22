import { useMemo } from "react";
import { useModulosStore } from "../store/modulos.store";

/** Claves desactivadas del menú, como Set. */
export function useDesactivados(): ReadonlySet<string> {
  const desactivados = useModulosStore((s) => s.desactivados);
  return useMemo(() => new Set(desactivados), [desactivados]);
}
