import { create } from "zustand";
import { ALMACENES_EJEMPLO } from "@/features/productos/datos-ejemplo";
import type { ItemVendible, LineaVenta } from "../types/venta";

// Solo se vende desde almacenes activos marcados "Usar para ventas".
export const ALMACENES_VENTA = ALMACENES_EJEMPLO.filter((a) => a.estado === "activo" && a.usarParaVentas);

// Venta en curso de la sesión: se conserva al salir de la pantalla (p. ej. para registrar
// una mascota) y volver. Sin persistir: al recargar empieza vacía.
interface VentaState {
  clienteId: number | null;
  almacen: string;
  lineas: LineaVenta[];
  /** Cambiar de cliente limpia la mascota de cada línea (era del cliente anterior). */
  setCliente: (clienteId: number | null) => void;
  setAlmacen: (almacen: string) => void;
  /** Agrega el ítem; si ya está, suma 1. `mascotaId` se usa solo para una línea nueva. */
  agregar: (item: ItemVendible, mascotaId: number | null) => void;
  actualizar: (itemId: string, cambios: Partial<LineaVenta>) => void;
  quitar: (itemId: string) => void;
  /** Empieza una venta nueva (tras emitir el comprobante). */
  limpiar: () => void;
}

export const useVentaStore = create<VentaState>()((set) => ({
  clienteId: null,
  almacen: ALMACENES_VENTA[0]?.nombre ?? "",
  lineas: [],

  setCliente: (clienteId) =>
    set((s) => ({ clienteId, lineas: s.lineas.map((l) => ({ ...l, mascotaId: null })) })),

  setAlmacen: (almacen) => set({ almacen }),

  agregar: (item, mascotaId) =>
    set((s) => {
      const existente = s.lineas.find((l) => l.item.id === item.id);
      if (existente) {
        return { lineas: s.lineas.map((l) => (l === existente ? { ...l, cantidad: l.cantidad + 1 } : l)) };
      }
      return { lineas: [...s.lineas, { item, cantidad: 1, mascotaId }] };
    }),

  actualizar: (itemId, cambios) =>
    set((s) => ({ lineas: s.lineas.map((l) => (l.item.id === itemId ? { ...l, ...cambios } : l)) })),

  quitar: (itemId) => set((s) => ({ lineas: s.lineas.filter((l) => l.item.id !== itemId) })),

  limpiar: () => set({ clienteId: null, lineas: [] }),
}));
