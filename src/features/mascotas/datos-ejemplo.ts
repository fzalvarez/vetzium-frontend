import type { Mascota } from "./types";

// DATOS DE EJEMPLO: mascotas de los clientes de ejemplo (mismos nombres que en
// Cuentas activas).
export const MASCOTAS_EJEMPLO: Mascota[] = [
  { id: 1, clienteId: 1, nombre: "Firulais", especie: "Perro" },
  { id: 2, clienteId: 1, nombre: "Nala", especie: "Gato" },
  { id: 3, clienteId: 2, nombre: "Luna", especie: "Perro" },
  { id: 4, clienteId: 3, nombre: "Michi", especie: "Gato" },
  { id: 5, clienteId: 4, nombre: "Toby", especie: "Perro" },
  { id: 6, clienteId: 5, nombre: "Rocky", especie: "Perro" },
  { id: 7, clienteId: 5, nombre: "Coco", especie: "Ave" },
];
