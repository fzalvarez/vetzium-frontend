import type { LineaVenta } from "../types/venta";

// PROVISIONAL: ICBPER vigente en Perú (S/ 0.50 por bolsa). Se confirma con el backend.
export const ICBPER_POR_UNIDAD = 0.5;

const redondear = (v: number) => Math.round(v * 100) / 100;

/**
 * Montos de una línea. El precio incluye IGV: el total es precio × cantidad y de ahí
 * se separan el valor (sin IGV) y el impuesto. `tasaIgv` en porcentaje (18).
 */
export function calcularLinea(linea: LineaVenta, tasaIgv: number) {
  const factor = 1 + tasaIgv / 100;
  const total = redondear(linea.item.precio * linea.cantidad);
  const subtotal = redondear(total / factor);
  return {
    valorUnitario: redondear(linea.item.precio / factor),
    subtotal,
    impuestos: redondear(total - subtotal),
    total,
    icbper: linea.item.icbper ? redondear(ICBPER_POR_UNIDAD * linea.cantidad) : 0,
  };
}

/** Resumen de la venta (pie de la tabla). Aún no hay descuentos: quedan en 0. */
export function calcularTotales(lineas: LineaVenta[], tasaIgv: number) {
  const montos = lineas.map((l) => calcularLinea(l, tasaIgv));
  const suma = (f: (m: (typeof montos)[number]) => number) => redondear(montos.reduce((a, m) => a + f(m), 0));

  const valorBruto = suma((m) => m.subtotal);
  const descuentos = 0;
  const valorConDescuentos = redondear(valorBruto - descuentos);
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
