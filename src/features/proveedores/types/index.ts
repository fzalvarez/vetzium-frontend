import type { EstadoOrdenCompra } from "../constants";

export interface Proveedor {
  id: number;
  nombreLegal: string;
  /** RUC */
  numeroTributario: string;
  telefonoFijo: string | null;
  celular: string | null;
  correo: string | null;
}

export interface OrdenCompra {
  /** "OC-0001" */
  numero: string;
  proveedorId: number;
  /** "YYYY-MM-DD" */
  fechaCreacion: string;
  estado: EstadoOrdenCompra;
  valorNeto: number;
  impuestos: number;
}
