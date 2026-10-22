// Estados de una orden de compra (columna "Estado").
export const ESTADOS_ORDEN_COMPRA = {
  recibido: "Recibido",
  aprobado: "Aprobado",
} as const;

export type EstadoOrdenCompra = keyof typeof ESTADOS_ORDEN_COMPRA;
