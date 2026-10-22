import { cn } from "@/lib/utils";

export interface Pestana {
  valor: string;
  label: string;
}

/** Pestañas en la parte superior de una tarjeta; cambian la vista del cuerpo. */
export function Pestanas({
  opciones,
  valor,
  onChange,
}: {
  opciones: Pestana[];
  valor: string;
  onChange: (valor: string) => void;
}) {
  return (
    <nav
      role="tablist"
      className="flex gap-6 px-6 border-b border-gray-200 dark:border-gray-800 overflow-x-auto overflow-y-hidden no-scrollbar"
    >
      {opciones.map((o) => {
        const activa = o.valor === valor;
        return (
          <button
            key={o.valor}
            type="button"
            role="tab"
            aria-selected={activa}
            onClick={() => onChange(o.valor)}
            className={cn(
              "py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
              activa
                ? "border-brand-500 text-brand-600 dark:border-brand-400 dark:text-brand-400"
                : "border-transparent text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </nav>
  );
}
