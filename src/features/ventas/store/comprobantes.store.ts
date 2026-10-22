import { create } from "zustand";

// Correlativos por serie (en memoria). Los de ejemplo siguen a los documentos que ya
// aparecen en otras tablas (p. ej. B001-000154 en Entradas/Salidas).
interface ComprobantesState {
  siguientes: Record<string, number>;
  /** Devuelve el número que se usó ("000155") y avanza el correlativo de la serie. */
  emitir: (serie: string) => string;
}

export const formatearNumeroComprobante = (n: number) => String(n).padStart(6, "0");

export const useComprobantesStore = create<ComprobantesState>()((set, get) => ({
  siguientes: { B001: 155, F001: 42, NV01: 12 },
  emitir: (serie) => {
    const n = get().siguientes[serie] ?? 1;
    set((s) => ({ siguientes: { ...s.siguientes, [serie]: n + 1 } }));
    return formatearNumeroComprobante(n);
  },
}));
