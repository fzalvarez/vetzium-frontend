import { SearchIcon, XIcon } from "lucide-react";

/** Campo de búsqueda con ícono y botón para limpiar. */
export function Buscador({
  valor,
  onChange,
  placeholder = "Buscar...",
}: {
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full sm:w-72">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
      <input
        type="search"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full h-8 pl-9 pr-8 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 [&::-webkit-search-cancel-button]:hidden dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />
      {valor && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </div>
  );
}
