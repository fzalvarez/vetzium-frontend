import { useSearchParams } from "react-router-dom";

/**
 * Pestaña activa guardada en `?vista=` (se puede enlazar y sobrevive a recargar).
 * La primera opción es la de por defecto y no se escribe en la URL.
 */
export function usePestanaUrl<T extends string>(valores: readonly T[]) {
  const [params, setParams] = useSearchParams();
  const actual = params.get("vista");
  const valor = valores.find((v) => v === actual) ?? valores[0];

  const cambiar = (nuevo: string) => {
    setParams(
      (prev) => {
        const siguiente = new URLSearchParams(prev);
        if (nuevo === valores[0]) siguiente.delete("vista");
        else siguiente.set("vista", nuevo);
        return siguiente;
      },
      { replace: true }
    );
  };

  return [valor, cambiar] as const;
}
