import { ArrowDownLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TIPOS_MOVIMIENTO_CAJA } from "../constants";
import type { TipoMovimientoCaja } from "../types/movimiento-caja";

/** Entrada / Salida con ícono y texto (el color nunca va solo). */
export function TipoMovimientoBadge({ tipo }: { tipo: TipoMovimientoCaja }) {
  const Icono = tipo === "entrada" ? ArrowDownLeftIcon : ArrowUpRightIcon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tipo === "entrada"
          ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400"
          : "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-400"
      )}
    >
      <Icono className="size-3.5" />
      {TIPOS_MOVIMIENTO_CAJA[tipo]}
    </span>
  );
}
