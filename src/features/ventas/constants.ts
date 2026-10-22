import type { TipoMovimientoCaja } from "./types/movimiento-caja";

export const TIPOS_MOVIMIENTO_CAJA: Record<TipoMovimientoCaja, string> = {
  entrada: "Entrada",
  salida: "Salida",
};
