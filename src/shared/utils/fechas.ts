// Fechas en hora de Perú (UTC-5), como en hcvet.
const ZONA_PERU = "America/Lima";

/** Fecha de hoy en Perú, "YYYY-MM-DD" (formato de los inputs date). */
export function hoyPeru(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ZONA_PERU }).format(new Date());
}

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/** "2026-10" → "Octubre 2026". */
export function formatearMes(anioMes: string): string {
  const [anio, mes] = anioMes.split("-");
  const nombre = MESES[Number(mes) - 1];
  return nombre && anio ? `${nombre} ${anio}` : anioMes;
}

/** "2026-10-22" → "22/10/2026". */
export function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.split("-");
  return anio && mes && dia ? `${dia}/${mes}/${anio}` : iso;
}
