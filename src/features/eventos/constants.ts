import type { TonoInsignia } from "@/shared/components/Insignia";

// PROVISIONAL: tipos y estados de ejemplo hasta definir el dominio de eventos/agenda.

export const TIPOS_EVENTO = {
  consulta: "Consulta",
  vacunacion: "Vacunación",
  desparasitacion: "Desparasitación",
  control: "Control",
  peluqueria: "Peluquería",
  cirugia: "Cirugía",
} as const;
export type TipoEvento = keyof typeof TIPOS_EVENTO;

export const ESTADOS_EVENTO = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  atendido: "Atendido",
  cancelado: "Cancelado",
  "no-asistio": "No asistió",
} as const;
export type EstadoEvento = keyof typeof ESTADOS_EVENTO;

export const TONO_ESTADO_EVENTO: Record<EstadoEvento, TonoInsignia> = {
  pendiente: "aviso",
  confirmado: "info",
  atendido: "exito",
  cancelado: "neutro",
  "no-asistio": "error",
};
