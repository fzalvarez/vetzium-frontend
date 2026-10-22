import { AxiosError } from "axios";

type ErrorValidacion = { msg?: string; loc?: unknown[] };

function formatearValidacion(e: ErrorValidacion): string {
  // loc viene como ["body", "registrante", "dni"]; "body" no aporta.
  const campo = Array.isArray(e.loc) ? e.loc.filter((p) => p !== "body").join(".") : "";
  return campo ? `${campo}: ${e.msg}` : (e.msg ?? "");
}

/**
 * Extrae un mensaje legible del error de una llamada a la API.
 * El backend (FastAPI) responde `{ detail: string }` para errores de negocio
 * y `{ detail: [{ msg, loc }] }` para errores de validación (422, sin los valores enviados).
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return `Sin respuesta del backend (${error.message}). ¿Está levantado y permite CORS?`;
    }
    const detail = error.response.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      return detail.map(formatearValidacion).join(" · ");
    }
    if (error.message) return error.message;
  }
  return fallback;
}

/** Resultado fallido de un servicio, con el código HTTP para distinguir 404 de otros errores. */
export function errorDeServicio(error: unknown, fallback: string) {
  return {
    success: false as const,
    error: getApiErrorMessage(error, fallback),
    status: error instanceof AxiosError ? error.response?.status : undefined,
  };
}
