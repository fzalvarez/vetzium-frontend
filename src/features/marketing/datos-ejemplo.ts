import type { Promocion, SaldoPuntos } from "./types";

// DATOS DE EJEMPLO: saldo de puntos de los clientes de ejemplo.
export const SALDOS_PUNTOS_EJEMPLO: SaldoPuntos[] = [
  { clienteId: 1, vigentes: 185, porVencer: 25, vencidos: 40 },
  { clienteId: 2, vigentes: 120, porVencer: 0, vencidos: 15 },
  { clienteId: 3, vigentes: 75, porVencer: 10, vencidos: 0 },
  { clienteId: 4, vigentes: 0, porVencer: 0, vencidos: 60 },
  { clienteId: 5, vigentes: 210, porVencer: 35, vencidos: 25 },
];

// DATOS DE EJEMPLO: productos y servicios de los otros datos de ejemplo.
export const PROMOCIONES_EJEMPLO: Promocion[] = [
  { id: 5, fechaCreacion: "2026-10-10", imagen: null, nombre: "Consulta premiada", producto: "Consulta general", fechaExpiracion: "2027-01-31", puntos: 10, activa: false },
  { id: 4, fechaCreacion: "2026-10-05", imagen: null, nombre: "Baño feliz", producto: "Baño y corte", fechaExpiracion: "2026-11-30", puntos: 10, activa: true },
  { id: 3, fechaCreacion: "2026-10-01", imagen: null, nombre: "Vacunación con puntos", producto: "Vacuna séxtuple canina", fechaExpiracion: "2026-12-31", puntos: 25, activa: true },
  { id: 2, fechaCreacion: "2026-09-20", imagen: null, nombre: "Desparasita y gana", producto: "Desparasitación interna", fechaExpiracion: "2026-10-31", puntos: 15, activa: true },
  { id: 1, fechaCreacion: "2026-09-01", imagen: null, nombre: "Bravecto con beneficio", producto: "Bravecto 20–40 kg", fechaExpiracion: "2026-10-15", puntos: 25, activa: false },
];
