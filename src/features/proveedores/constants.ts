// Estados de una orden de compra (columna "Estado").
export const ESTADOS_ORDEN_COMPRA = {
  aprobado: "Aprobado",
  recibido: "Recibido",
} as const;

export type EstadoOrdenCompra = keyof typeof ESTADOS_ORDEN_COMPRA;

// PROVISIONAL: IGV general de Perú, para calcular "Impuestos" en los datos de ejemplo
// y en el modal. La regla real (exonerados, inafectos…) se define con el backend.
export const TASA_IGV = 0.18;
