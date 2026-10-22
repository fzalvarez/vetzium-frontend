import { useCallback, useEffect, useRef, useState } from "react";
import type { ServiceResponse } from "@/shared/types/service.types";

type Resultado<T> = { clave: string; version: number; res: ServiceResponse<T> };

/**
 * Carga datos de un servicio cada vez que cambia `clave` (null = no cargar).
 * Mientras recarga conserva los datos anteriores de la misma clave.
 */
export function useCarga<T>(clave: string | null, cargar: () => Promise<ServiceResponse<T>>) {
  const [resultado, setResultado] = useState<Resultado<T> | null>(null);
  const [version, setVersion] = useState(0);
  const cargarRef = useRef(cargar);

  useEffect(() => {
    cargarRef.current = cargar;
  });

  useEffect(() => {
    if (clave === null) return;
    let vigente = true;
    cargarRef.current().then((res) => {
      if (vigente) setResultado({ clave, version, res });
    });
    return () => {
      vigente = false;
    };
  }, [clave, version]);

  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  const actual = resultado && resultado.clave === clave ? resultado : null;
  return {
    data: actual?.res.success ? actual.res.data : undefined,
    error: actual && !actual.res.success ? (actual.res.error ?? "Error desconocido.") : null,
    status: actual?.res.status,
    cargando: clave !== null && (actual === null || actual.version !== version),
    recargar,
  };
}
