export type TipoMovimientoCaja = "entrada" | "salida";

/** Entrada o salida de caja (una fila de Entradas/Salidas). */
export interface MovimientoCaja {
  id: number;
  /** "YYYY-MM-DD" */
  fecha: string;
  descripcion: string;
  etiquetas: string[];
  medioPago: string;
  tipo: TipoMovimientoCaja;
  /** Monto en soles; va a la columna Entrada o Salida según `tipo`. */
  monto: number;
  docReferencia: string | null;
  numeroOperacion: string | null;
}
