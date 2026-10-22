import { create } from "zustand";
import type { Turno } from "../types";

const MIN = 60_000;

/** DATOS DE EJEMPLO: turnos de hoy, con horas relativas al momento en que carga la app. */
function turnosEjemplo(): Turno[] {
  const ahora = Date.now();
  const t = (id: number, mascotaId: number, motivo: string, estado: Turno["estado"], llegoHace: number, atendidoHace?: [number, number]): Turno => ({
    id,
    numero: `T-${String(id).padStart(3, "0")}`,
    mascotaId,
    motivo,
    estado,
    llegada: ahora - llegoHace * MIN,
    inicioAtencion: atendidoHace ? ahora - atendidoHace[0] * MIN : null,
    fin: atendidoHace && estado === "atendido" ? ahora - atendidoHace[1] * MIN : null,
  });
  return [
    t(1, 1, "Vacunación anual", "atendido", 190, [175, 160]),
    t(2, 4, "Control de peso", "atendido", 150, [140, 125]),
    t(3, 5, "Cojera en pata trasera", "atendido", 110, [95, 70]),
    t(4, 3, "Control de hospitalización", "atencion", 40, [12, 0]),
    t(5, 6, "Consulta general", "espera", 32),
    t(6, 2, "Vómitos", "espera", 21),
    t(7, 7, "Revisión de plumaje", "espera", 9),
    t(8, 1, "Prurito en orejas", "espera", 3),
  ];
}

// Sin persistir: se reinicia al recargar. Se reemplaza por la API (en tiempo real).
interface SalaEsperaState {
  turnos: Turno[];
  agregar: (mascotaId: number, motivo: string) => string;
  llamar: (id: number) => void;
  finalizar: (id: number) => void;
}

export const useSalaEsperaStore = create<SalaEsperaState>()((set, get) => ({
  turnos: turnosEjemplo(),

  agregar: (mascotaId, motivo) => {
    const id = Math.max(0, ...get().turnos.map((t) => t.id)) + 1;
    const numero = `T-${String(id).padStart(3, "0")}`;
    set((s) => ({
      turnos: [
        ...s.turnos,
        { id, numero, mascotaId, motivo, estado: "espera", llegada: Date.now(), inicioAtencion: null, fin: null },
      ],
    }));
    return numero;
  },

  llamar: (id) =>
    set((s) => ({
      turnos: s.turnos.map((t) => (t.id === id ? { ...t, estado: "atencion", inicioAtencion: Date.now() } : t)),
    })),

  finalizar: (id) =>
    set((s) => ({ turnos: s.turnos.map((t) => (t.id === id ? { ...t, estado: "atendido", fin: Date.now() } : t)) })),
}));
