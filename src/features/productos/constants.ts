// PROVISIONAL: valores de ejemplo hasta definir el dominio de inventario.

export const TIPOS_ALMACEN = {
  principal: "Principal",
  secundario: "Secundario",
} as const;
export type TipoAlmacen = keyof typeof TIPOS_ALMACEN;

export const ESTADOS_ALMACEN = {
  activo: "Activo",
  inactivo: "Inactivo",
} as const;
export type EstadoAlmacen = keyof typeof ESTADOS_ALMACEN;

export const TIPOS_OPERACION_DESCARGA = ["Consumo interno", "Merma", "Vencimiento", "Ajuste de inventario"];
export const TIPOS_OPERACION_CARGA = ["Compra", "Devolución", "Ajuste de inventario"];

/** Sin sesión todavía: quién figura en "Registrado por" al crear desde el modal. */
export const USUARIO_ACTUAL = "Usuario actual";
