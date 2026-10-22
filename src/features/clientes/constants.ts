import type { EstadoCliente } from "./types";

// PROVISIONAL: estados de ejemplo hasta definir el dominio de clientes.
export const ESTADOS_CLIENTE: Record<EstadoCliente, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
};
