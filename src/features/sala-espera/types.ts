export type EstadoTurno = "espera" | "atencion" | "atendido";

/** Turno de un paciente en la sala de espera de hoy. Horas en milisegundos (epoch). */
export interface Turno {
  id: number;
  /** "T-001" */
  numero: string;
  mascotaId: number;
  motivo: string;
  estado: EstadoTurno;
  llegada: number;
  inicioAtencion: number | null;
  fin: number | null;
}
