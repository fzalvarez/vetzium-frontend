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

/** Fecha y hora actual en Perú, "YYYY-MM-DDTHH:mm" (formato de input datetime-local). */
export function ahoraPeru(): string {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: ZONA_PERU,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value])
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

/** Edad desde una fecha "YYYY-MM-DD" hasta hoy en Perú: "3 años 2 meses", "5 meses". */
export function calcularEdad(nacimiento: string): string {
  const [an, mn, dn] = nacimiento.split("-").map(Number);
  const [ah, mh, dh] = hoyPeru().split("-").map(Number);
  let meses = (ah - an) * 12 + (mh - mn) - (dh < dn ? 1 : 0);
  if (meses < 0) meses = 0;
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const txtA = anios > 0 ? `${anios} ${anios === 1 ? "año" : "años"}` : "";
  const txtM = resto > 0 || anios === 0 ? `${resto} ${resto === 1 ? "mes" : "meses"}` : "";
  return [txtA, txtM].filter(Boolean).join(" ");
}

/** "2026-10-22T10:15" → "22/10/2026 10:15". */
export function formatearFechaHora(fechaHora: string): string {
  const [fecha, hora] = fechaHora.split("T");
  return hora ? `${formatearFecha(fecha)} ${hora}` : formatearFecha(fecha);
}

/** "2026-10-22" → "22/10/2026". */
export function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.split("-");
  return anio && mes && dia ? `${dia}/${mes}/${anio}` : iso;
}
