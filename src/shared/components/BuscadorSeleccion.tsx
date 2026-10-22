import { useId, useState } from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_RESULTADOS = 8;

/**
 * Campo de búsqueda con lista de resultados para elegir uno (combobox). Flechas
 * ↑/↓ para moverse, Enter para elegir, Esc para cerrar. Al elegir se limpia el texto.
 */
export function BuscadorSeleccion<T>({
  opciones,
  filtrar,
  clave,
  renderOpcion,
  onSeleccionar,
  placeholder,
  disabled = false,
  sinResultados = "Sin resultados.",
  id,
}: {
  opciones: T[];
  filtrar: (opcion: T, busqueda: string) => boolean;
  clave: (opcion: T) => string | number;
  renderOpcion: (opcion: T) => React.ReactNode;
  onSeleccionar: (opcion: T) => void;
  placeholder: string;
  disabled?: boolean;
  sinResultados?: string;
  id?: string;
}) {
  const idLista = useId();
  const [texto, setTexto] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState(0);

  const resultados = opciones.filter((o) => filtrar(o, texto)).slice(0, MAX_RESULTADOS);
  const indice = Math.min(resaltado, Math.max(0, resultados.length - 1));

  const elegir = (opcion: T) => {
    onSeleccionar(opcion);
    setTexto("");
    setAbierto(false);
    setResaltado(0);
  };

  const alTeclear = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAbierto(true);
      setResaltado((i) => Math.min(i + 1, resultados.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setResaltado((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && abierto && resultados[indice]) {
      e.preventDefault();
      elegir(resultados[indice]);
    } else if (e.key === "Escape") {
      setAbierto(false);
    }
  };

  return (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={abierto}
        aria-controls={idLista}
        aria-autocomplete="list"
        autoComplete="off"
        value={texto}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          setTexto(e.target.value);
          setAbierto(true);
          setResaltado(0);
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setAbierto(false)}
        onKeyDown={alTeclear}
        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />

      {abierto && !disabled && (
        <ul
          id={idLista}
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-theme-lg custom-scrollbar dark:border-gray-700 dark:bg-gray-800"
        >
          {resultados.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{sinResultados}</li>
          ) : (
            resultados.map((o, i) => (
              <li
                key={clave(o)}
                role="option"
                aria-selected={i === indice}
                // mousedown (no click): se elige antes de que el blur cierre la lista.
                onMouseDown={(e) => {
                  e.preventDefault();
                  elegir(o);
                }}
                onMouseEnter={() => setResaltado(i)}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm",
                  i === indice ? "bg-brand-50 dark:bg-brand-500/15" : "hover:bg-gray-50 dark:hover:bg-white/5"
                )}
              >
                {renderOpcion(o)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
