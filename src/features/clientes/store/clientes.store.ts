import { create } from "zustand";
import { hoyPeru } from "@/shared/utils/fechas";
import { CLIENTES_EJEMPLO } from "../datos-ejemplo";
import type { Cliente } from "../types";

// Clientes de ejemplo compartidos en la sesión (sin persistir: al recargar vuelven a los
// datos de ejemplo). Se reemplaza por la API cuando exista.
interface ClientesState {
  clientes: Cliente[];
  /** Registra el cliente y lo devuelve con su id. */
  agregarCliente: (cliente: Omit<Cliente, "id" | "fechaRegistro" | "estado">) => Cliente;
}

export const useClientesStore = create<ClientesState>()((set, get) => ({
  clientes: CLIENTES_EJEMPLO,

  agregarCliente: (datos) => {
    const cliente: Cliente = {
      id: Math.max(0, ...get().clientes.map((c) => c.id)) + 1,
      fechaRegistro: hoyPeru(),
      estado: "activo",
      ...datos,
    };
    set((s) => ({ clientes: [cliente, ...s.clientes] }));
    return cliente;
  },
}));
