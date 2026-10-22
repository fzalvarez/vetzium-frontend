import { create } from "zustand";
import { persist } from "zustand/middleware";

// Se guardan las claves desactivadas (no las activas): un módulo nuevo del menú
// aparece activo sin migrar nada. Hoy vive en el navegador; pasará al backend
// cuando exista.
interface ModulosState {
  desactivados: string[];
  setActivo: (clave: string, activo: boolean) => void;
  activarTodos: () => void;
}

export const useModulosStore = create<ModulosState>()(
  persist(
    (set) => ({
      desactivados: [],
      setActivo: (clave, activo) =>
        set((state) => ({
          desactivados: activo
            ? state.desactivados.filter((c) => c !== clave)
            : [...new Set([...state.desactivados, clave])],
        })),
      activarTodos: () => set({ desactivados: [] }),
    }),
    { name: "vetzium-modulos" }
  )
);
