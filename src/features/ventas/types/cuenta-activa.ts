/** Ítem pendiente de cobro en la cuenta activa de un cliente. */
export interface ItemCuenta {
  id: number;
  /** "YYYY-MM-DD" */
  fechaRegistro: string;
  clienteId: number;
  mascota: string;
  descripcion: string;
  precioUnitario: number;
  cantidad: number;
}

/** Cuenta activa agrupada por cliente (se calcula a partir de los ítems). */
export interface CuentaPorCliente {
  clienteId: number;
  cliente: string;
  telefono: string | null;
  ultimoMovimiento: string;
  items: number;
  monto: number;
}
