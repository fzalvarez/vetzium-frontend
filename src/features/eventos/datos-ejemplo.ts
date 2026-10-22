import type { Evento } from "./types";

// DATOS DE EJEMPLO: clientes, mascotas y usuarios de los otros datos de ejemplo.
export const EVENTOS_EJEMPLO: Evento[] = [
  { id: 1, fecha: "2026-10-22", hora: "16:00", clienteId: 1, mascotaId: 2, motivo: "Vacuna triple felina", tipo: "vacunacion", estado: "pendiente", usuarioId: 2, enSalaEspera: false },
  { id: 2, fecha: "2026-10-22", hora: "17:30", clienteId: 5, mascotaId: 6, motivo: "Baño y corte", tipo: "peluqueria", estado: "pendiente", usuarioId: 4, enSalaEspera: false },
  { id: 3, fecha: "2026-10-23", hora: "09:00", clienteId: 2, mascotaId: 3, motivo: "Control post hospitalización", tipo: "control", estado: "pendiente", usuarioId: 2, enSalaEspera: false },
  { id: 4, fecha: "2026-10-24", hora: "11:15", clienteId: 4, mascotaId: 5, motivo: "Evaluación de cojera", tipo: "consulta", estado: "pendiente", usuarioId: 2, enSalaEspera: false },
  { id: 5, fecha: "2026-10-27", hora: "10:00", clienteId: 3, mascotaId: 4, motivo: "Desparasitación trimestral", tipo: "desparasitacion", estado: "pendiente", usuarioId: 3, enSalaEspera: false },
  { id: 6, fecha: "2026-10-28", hora: "08:30", clienteId: 1, mascotaId: 1, motivo: "Limpieza dental", tipo: "cirugia", estado: "confirmado", usuarioId: 2, enSalaEspera: false },
  { id: 7, fecha: "2026-10-22", hora: "09:30", clienteId: 3, mascotaId: 4, motivo: "Control de peso", tipo: "control", estado: "atendido", usuarioId: 2, enSalaEspera: true },
  { id: 8, fecha: "2026-10-21", hora: "15:00", clienteId: 5, mascotaId: 7, motivo: "Revisión de plumaje", tipo: "consulta", estado: "no-asistio", usuarioId: 3, enSalaEspera: false },
];
