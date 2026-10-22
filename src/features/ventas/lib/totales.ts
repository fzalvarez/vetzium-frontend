import type { Descuento, LineaVenta } from "../types/venta";

// PROVISIONAL: ICBPER vigente en Perú (S/ 0.50 por bolsa). Se confirma con el backend.
export const ICBPER_POR_UNIDAD = 0.5;

export const redondear = (v: number) => Math.round(v * 100) / 100;

/** Monto que descuenta `d` sobre `base` (nunca más que la base). */
export function montoDescuento(d: Descuento | null | undefined, base: number): number {
  if (!d || d.valor <= 0) return 0;
  return redondear(Math.min(base, d.tipo === "porcentaje" ? (base * d.valor) / 100 : d.valor));
}

/**
 * Montos de una línea. Los precios incluyen IGV: el total es precio × cantidad menos el
 * descuento (o todo si es regalo), y de ahí se separan el valor (sin IGV) y el impuesto.
 * `tasaIgv` en porcentaje (18).
 */
export function calcularLinea(linea: LineaVenta, tasaIgv: number) {
  const factor = 1 + tasaIgv / 100;
  const precio = linea.precio ?? linea.item.precio;
  const bruto = redondear(precio * linea.cantidad);
  const descuento = linea.regalo ? bruto : montoDescuento(linea.descuento, bruto);
  const total = redondear(bruto - descuento);
  const subtotal = redondear(total / factor);
  return {
    precio,
    valorUnitario: redondear(precio / factor),
    valorBruto: redondear(bruto / factor),
    /** Descuento sin IGV. */
    descuento: redondear(descuento / factor),
    subtotal,
    impuestos: redondear(total - subtotal),
    total,
    icbper: linea.item.icbper ? redondear(ICBPER_POR_UNIDAD * linea.cantidad) : 0,
  };
}

/** Resumen de la venta (pie de la tabla). */
export function calcularTotales(lineas: LineaVenta[], tasaIgv: number) {
  const montos = lineas.map((l) => calcularLinea(l, tasaIgv));
  const suma = (f: (m: (typeof montos)[number]) => number) => redondear(montos.reduce((a, m) => a + f(m), 0));

  const valorBruto = suma((m) => m.valorBruto);
  const descuentos = suma((m) => m.descuento);
  const valorConDescuentos = suma((m) => m.subtotal);
  const impuestos = suma((m) => m.impuestos);
  const icbper = suma((m) => m.icbper);
  return {
    valorBruto,
    descuentos,
    valorConDescuentos,
    impuestos,
    icbper,
    total: redondear(valorConDescuentos + impuestos + icbper),
  };
}

/**
 * Totales del comprobante: los de la venta más un descuento global sobre el valor de
 * venta (sin IGV). El IGV se recalcula sobre el valor neto.
 */
export function calcularComprobante(lineas: LineaVenta[], tasaIgv: number, global: Descuento | null) {
  const venta = calcularTotales(lineas, tasaIgv);
  const subtotal = venta.valorConDescuentos;
  // Un descuento global en monto se ingresa con IGV: se lleva a valor sin IGV.
  const globalSinIgv =
    global?.tipo === "monto"
      ? montoDescuento({ tipo: "monto", valor: global.valor / (1 + tasaIgv / 100) }, subtotal)
      : montoDescuento(global, subtotal);
  const valorNeto = redondear(subtotal - globalSinIgv);
  const impuestos = redondear(valorNeto * (tasaIgv / 100));
  return {
    subtotal,
    descuentoPorcentaje: subtotal > 0 ? redondear((globalSinIgv / subtotal) * 100) : 0,
    descuento: globalSinIgv,
    valorNeto,
    /** Todas las operaciones son gravadas por ahora (sin exoneradas ni inafectas). */
    gravadas: valorNeto,
    impuestos,
    icbper: venta.icbper,
    total: redondear(valorNeto + impuestos + venta.icbper),
  };
}
