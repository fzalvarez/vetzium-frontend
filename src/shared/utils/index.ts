import { toast } from "sonner";

/** Índice estable [0, len) a partir de un id string (UUID, etc.). */
export function stableIndex(id: string, len: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) | 0;
  return len > 0 ? Math.abs(h) % len : 0;
}

export const notifySuccess = (message: string) => {
  toast.success(message);
};

export const notifyError = (message: string) => {
  toast.error(message);
};

/** Aviso para botones cuya acción todavía no está construida. */
export const proximamente = (accion: string) => {
  toast.info("Próximamente", { description: `${accion} estará disponible pronto.` });
};
