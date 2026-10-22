import type { TipoMovimientoCaja } from "./types/movimiento-caja";

export const TIPOS_MOVIMIENTO_CAJA: Record<TipoMovimientoCaja, string> = {
  entrada: "Entrada",
  salida: "Salida",
};

// PROVISIONAL: los medios de pago se definirán en Configuración › Métodos de pago.
export const MEDIOS_PAGO = ["Efectivo", "Yape", "Plin", "Tarjeta", "Transferencia"];
