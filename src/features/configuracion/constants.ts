// PROVISIONAL: valores de ejemplo hasta definir el dominio con el backend.

export const ACCIONES_PERMISO = {
  ver: "Ver",
  crear: "Crear",
  editar: "Editar",
  eliminar: "Eliminar",
} as const;
export type AccionPermiso = keyof typeof ACCIONES_PERMISO;
export const ACCIONES = Object.keys(ACCIONES_PERMISO) as AccionPermiso[];

export const TIPOS_METODO_PAGO = {
  efectivo: "Efectivo",
  billetera: "Billetera digital",
  tarjeta: "Tarjeta de crédito/débito",
  transferencia: "Transferencia bancaria",
} as const;
export type TipoMetodoPago = keyof typeof TIPOS_METODO_PAGO;

// Regímenes tributarios de Perú (SUNAT).
export const REGIMENES_TRIBUTARIOS = {
  general: "Régimen General",
  mype: "Régimen MYPE Tributario",
  especial: "Régimen Especial (RER)",
  rus: "Nuevo RUS",
} as const;
export type RegimenTributario = keyof typeof REGIMENES_TRIBUTARIOS;

export const AMBIENTES_EMISION = {
  pruebas: "Pruebas (beta)",
  produccion: "Producción",
} as const;
export type AmbienteEmision = keyof typeof AMBIENTES_EMISION;
