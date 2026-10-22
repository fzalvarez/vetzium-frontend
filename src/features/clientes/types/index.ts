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
  /** N.° de documento de identidad (DNI); opcional en los datos de ejemplo. */
  documento?: string | null;
  /** "YYYY-MM-DD" */
  fechaNacimiento?: string | null;
  /** Referencia para ubicar la dirección. */
  referencia?: string | null;
}

/** Fila de "Nuevos clientes": clientes registrados en un mes. */
export interface NuevosClientesMes {
  /** "YYYY-MM" */
  mes: string;
  registrados: number;
}
