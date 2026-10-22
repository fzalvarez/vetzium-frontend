import type { EstadoAlmacen, TipoAlmacen } from "../constants";

export interface Producto {
  id: number;
  codigoBarras: string;
  nombre: string;
  marca: string;
  proveedor: string;
  lineas: string;
  codigoTributario: string;
  empresa: string;
}

/** Carga o descarga de stock emitida. */
export interface MovimientoStock {
  /** "DS-0001" (descarga) o "CS-0001" (carga) */
  numero: string;
  /** "YYYY-MM-DD" */
  fechaCreacion: string;
  tipoOperacion: string;
  motivo: string;
  responsable: string;
  registradoPor: string;
}

export interface StockAlmacen {
  id: number;
  producto: string;
  almacen: string;
  precioCompra: number;
  precioVenta: number;
  stockContable: number;
}

export interface Almacen {
  id: number;
  nombre: string;
  codigo: string;
  tipo: TipoAlmacen;
  estado: EstadoAlmacen;
  usarParaVentas: boolean;
}

export interface Lote {
  id: number;
  /** "YYYY-MM-DD" */
  fechaRegistro: string;
  producto: string;
  numeroLote: string;
  almacen: string;
  /** "YYYY-MM-DD" */
  fechaVencimiento: string;
  cantidadEntrada: number;
  saldo: number;
}
