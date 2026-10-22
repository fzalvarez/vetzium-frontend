import type { LucideIcon } from "lucide-react";

/** Indicador principal: etiqueta, valor grande e ícono. */
export function TarjetaKpi({ etiqueta, valor, icono: Icono }: { etiqueta: string; valor: string; icono: LucideIcon }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/15">
        <Icono className="size-5 text-brand-600 dark:text-brand-400" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">{etiqueta}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{valor}</p>
      </div>
    </div>
  );
}
