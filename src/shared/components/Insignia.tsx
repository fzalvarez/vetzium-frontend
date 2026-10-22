import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TonoInsignia = "exito" | "error" | "aviso" | "info" | "neutro";

const TONOS: Record<TonoInsignia, string> = {
  exito: "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400",
  error: "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-400",
  aviso: "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400",
  info: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400",
  neutro: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300",
};

/** Etiqueta de estado: siempre con texto (el color nunca va solo), ícono opcional. */
export function Insignia({
  tono,
  icono: Icono,
  children,
}: {
  tono: TonoInsignia;
  icono?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        TONOS[tono]
      )}
    >
      {Icono && <Icono className="size-3.5" />}
      {children}
    </span>
  );
}

/** Aviso de que la pantalla muestra datos de ejemplo (no hay backend). */
export function EtiquetaEjemplo() {
  return <Insignia tono="aviso">Datos de ejemplo</Insignia>;
}
