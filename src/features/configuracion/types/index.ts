import type { AccionPermiso, AmbienteEmision, RegimenTributario, TipoMetodoPago } from "../constants";

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rolId: number;
  activo: boolean;
  /** "YYYY-MM-DD HH:mm" en hora de Perú; null si nunca ingresó. */
  ultimoAcceso: string | null;
}

/** Permisos por módulo del menú (clave de `claveDe(item)`). */
export type PermisosRol = Record<string, AccionPermiso[]>;

export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  /** Rol del sistema: no se edita ni se elimina (p. ej. Administrador). */
  fijo: boolean;
  permisos: PermisosRol;
}

export interface MetodoPago {
  id: number;
  nombre: string;
  tipo: TipoMetodoPago;
  /** Si es obligatorio registrar el N.° de operación al usarlo. */
  requiereOperacion: boolean;
  observaciones: string;
  activo: boolean;
}

export interface DatosFiscales {
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  direccionFiscal: string;
  departamento: string;
  provincia: string;
  distrito: string;
  telefono: string;
  correo: string;
  regimen: RegimenTributario;
  ambiente: AmbienteEmision;
  tasaIgv: number;
}
