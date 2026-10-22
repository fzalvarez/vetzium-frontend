import { create } from "zustand";
import { CONSULTAS_EJEMPLO, MASCOTAS_EJEMPLO } from "../datos-ejemplo";
import type { Consulta, Mascota } from "../types";

// Mascotas y consultas de ejemplo compartidas en la sesión (sin persistir: al recargar
// vuelven a los datos de ejemplo). Se reemplaza por la API cuando exista.
interface MascotasState {
  mascotas: Mascota[];
  consultas: Consulta[];
  actualizarMascota: (id: number, cambios: Omit<Mascota, "id" | "clienteId" | "numeroHistoria" | "foto">) => void;
  agregarConsulta: (consulta: Omit<Consulta, "id">) => void;
}

export const useMascotasStore = create<MascotasState>()((set) => ({
  mascotas: MASCOTAS_EJEMPLO,
  consultas: CONSULTAS_EJEMPLO,

  actualizarMascota: (id, cambios) =>
    set((s) => ({ mascotas: s.mascotas.map((m) => (m.id === id ? { ...m, ...cambios } : m)) })),

  agregarConsulta: (consulta) =>
    set((s) => ({
      consultas: [{ id: Math.max(0, ...s.consultas.map((c) => c.id)) + 1, ...consulta }, ...s.consultas],
    })),
}));
