export type EstadoCliente = "activo" | "inactivo";

export interface Cliente {
  id: number;
  /** "YYYY-MM-DD" */
  fechaRegistro: string;
  nombres: string;
  apellidos: string;
  telefonos: string[];
  email: string | null;
  direccion: string | null;
  estado: EstadoCliente;
}

/** Fila de "Nuevos clientes": clientes registrados en un mes. */
export interface NuevosClientesMes {
  /** "YYYY-MM" */
  mes: string;
  registrados: number;
}
