// PROVISIONAL: catálogos de ejemplo del comprobante (Perú / SUNAT) hasta definirlos con
// el backend y la facturación electrónica real.

export const TIPOS_COMPROBANTE = {
  boleta: { label: "Boleta de venta", series: ["B001"] },
  factura: { label: "Factura", series: ["F001"] },
  nota: { label: "Nota de venta", series: ["NV01"] },
} as const;
export type TipoComprobante = keyof typeof TIPOS_COMPROBANTE;

export const TIPOS_OPERACION = [
  { valor: "0101", label: "0101 · Venta interna" },
  { valor: "0102", label: "0102 · Venta interna – anticipos" },
];

/** Documentos de identidad del cliente y su formato. */
export const DOCUMENTOS_IDENTIDAD = {
  dni: { label: "DNI", patron: /^\d{8}$/, error: "El DNI tiene 8 dígitos." },
  ruc: { label: "RUC", patron: /^\d{11}$/, error: "El RUC tiene 11 dígitos." },
  ce: { label: "Carné de extranjería", patron: /^[A-Za-z0-9]{6,12}$/, error: "Entre 6 y 12 letras o números." },
  ninguno: { label: "Sin documento", patron: /^$/, error: "" },
} as const;
export type DocumentoIdentidad = keyof typeof DOCUMENTOS_IDENTIDAD;

/** Una forma de pago del comprobante (los montos como texto del input). */
export interface Pago {
  id: number;
  metodoId: number;
  /** Texto del input (se valida al emitir). */
  monto: string;
  motivo: string;
  /** N.° de operación, si el método lo pide. */
  operacion: string;
}

export const montoPago = (p: Pago) => (/^\d+(\.\d{1,2})?$/.test(p.monto.trim()) ? Number(p.monto) : 0);
