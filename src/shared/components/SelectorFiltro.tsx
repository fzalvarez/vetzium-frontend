import { ChevronDownIcon } from "lucide-react";

export interface OpcionFiltro {
  valor: string;
  label: string;
}

/** Filtro de la barra de herramientas: etiqueta + select nativo ("Estados: Todos"). */
export function SelectorFiltro({
  etiqueta,
  opciones,
  valor,
  onChange,
}: {
  etiqueta: string;
  opciones: OpcionFiltro[];
  valor: string;
  onChange: (valor: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center h-8 rounded-lg border border-gray-300 bg-white pl-3 text-sm dark:border-gray-700 dark:bg-gray-900 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
      <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{etiqueta}:</span>
      <select
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="h-full appearance-none bg-transparent pl-1.5 pr-8 font-medium text-gray-800 outline-none cursor-pointer dark:text-gray-100"
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2.5 size-4 text-gray-400 pointer-events-none" />
    </label>
  );
}
