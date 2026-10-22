import { create } from "zustand";
import { CONSULTAS_EJEMPLO, MASCOTAS_EJEMPLO } from "../datos-ejemplo";
import type { Consulta, Mascota } from "../types";

type DatosMascota = Omit<Mascota, "id" | "clienteId" | "numeroHistoria" | "foto">;

// Mascotas y consultas de ejemplo compartidas en la sesión (sin persistir: al recargar
// vuelven a los datos de ejemplo). Se reemplaza por la API cuando exista.
interface MascotasState {
  mascotas: Mascota[];
  consultas: Consulta[];
  /** Registra la mascota del cliente con el siguiente N.° de historia clínica y la devuelve. */
  agregarMascota: (clienteId: number, datos: DatosMascota) => Mascota;
  actualizarMascota: (id: number, cambios: DatosMascota) => void;
  agregarConsulta: (consulta: Omit<Consulta, "id">) => void;
}

export const useMascotasStore = create<MascotasState>()((set, get) => ({
  mascotas: MASCOTAS_EJEMPLO,
  consultas: CONSULTAS_EJEMPLO,

  agregarMascota: (clienteId, datos) => {
    const id = Math.max(0, ...get().mascotas.map((m) => m.id)) + 1;
    const mascota: Mascota = { id, clienteId, numeroHistoria: `HC-${String(id).padStart(4, "0")}`, foto: null, ...datos };
    set((s) => ({ mascotas: [...s.mascotas, mascota] }));
    return mascota;
  },

  actualizarMascota: (id, cambios) =>
    set((s) => ({ mascotas: s.mascotas.map((m) => (m.id === id ? { ...m, ...cambios } : m)) })),

  agregarConsulta: (consulta) =>
    set((s) => ({
      consultas: [{ id: Math.max(0, ...s.consultas.map((c) => c.id)) + 1, ...consulta }, ...s.consultas],
    })),
}));
