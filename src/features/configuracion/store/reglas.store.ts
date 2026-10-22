import { create } from "zustand";
import { persist } from "zustand/middleware";

// Reglas de los módulos (Configuración › General). Se guardan en el navegador, como
// los módulos activos; pasarán al backend cuando exista.
interface ReglasState {
  /** Productos › Lotes: un lote se marca "Por vencer" estos días antes del vencimiento. */
  diasAvisoVencimiento: number;
  setDiasAvisoVencimiento: (dias: number) => void;
}

export const DIAS_AVISO_VENCIMIENTO = { porDefecto: 30, minimo: 1, maximo: 365 };

export const useReglasStore = create<ReglasState>()(
  persist(
    (set) => ({
      diasAvisoVencimiento: DIAS_AVISO_VENCIMIENTO.porDefecto,
      setDiasAvisoVencimiento: (dias) => set({ diasAvisoVencimiento: dias }),
    }),
    { name: "vetzium-reglas" }
  )
);
