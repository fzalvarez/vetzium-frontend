import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// El color del ícono dice qué tipo de dato es: dinero que entra (verde), algo que pide
// atención (amarillo) o informativo (azul).
const TONOS = {
  marca: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  exito: "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400",
  aviso: "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400",
};

/** Indicador principal: etiqueta, valor grande e ícono. */
export function TarjetaKpi({
  etiqueta,
  valor,
  icono: Icono,
  tono = "marca",
}: {
  etiqueta: string;
  valor: string;
  icono: LucideIcon;
  tono?: keyof typeof TONOS;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
      <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", TONOS[tono])}>
        <Icono className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">{etiqueta}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{valor}</p>
      </div>
    </div>
  );
}
