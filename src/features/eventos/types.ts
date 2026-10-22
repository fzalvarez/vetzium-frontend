import type { EstadoEvento, TipoEvento } from "./constants";

export interface Evento {
  id: number;
  /** "YYYY-MM-DD" */
  fecha: string;
  /** "HH:mm" */
  hora: string;
  clienteId: number;
  mascotaId: number;
  motivo: string;
  tipo: TipoEvento;
  estado: EstadoEvento;
  /** Usuario responsable (Configuración › Usuarios). */
  usuarioId: number;
  /** Si ya se pasó a la sala de espera. */
  enSalaEspera: boolean;
}
