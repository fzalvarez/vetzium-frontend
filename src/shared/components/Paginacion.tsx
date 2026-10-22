import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TAMANOS_PAGINA, type EstadoPaginacion } from "@/shared/hooks/usePaginacion";
import { formatearNumero } from "@/shared/utils/formato";

const botonCls =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm tabular-nums transition-colors disabled:pointer-events-none disabled:opacity-40";

/** Números de página a mostrar: hasta 5 alrededor de la actual. */
function ventana(pagina: number, paginas: number): number[] {
  const inicio = Math.max(1, Math.min(pagina - 2, paginas - 4));
  return Array.from({ length: Math.min(5, paginas) }, (_, i) => inicio + i);
}

/** Pie de tabla: rango mostrado, filas por página y navegación entre páginas. */
export function Paginacion({ pagina, paginas, tamano, total, irA, setTamano }: EstadoPaginacion) {
  const desde = total === 0 ? 0 : (pagina - 1) * tamano + 1;
  const hasta = Math.min(pagina * tamano, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-6 py-3 text-sm dark:border-gray-800">
      <p className="text-gray-500 dark:text-gray-400">
        Mostrando{" "}
        <span className="font-medium text-gray-700 tabular-nums dark:text-gray-200">
          {formatearNumero(desde)}–{formatearNumero(hasta)}
        </span>{" "}
        de <span className="font-medium text-gray-700 tabular-nums dark:text-gray-200">{formatearNumero(total)}</span>{" "}
        {total === 1 ? "registro" : "registros"}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          Filas por página
          <select
            value={tamano}
            onChange={(e) => setTamano(Number(e.target.value))}
            className="h-8 cursor-pointer rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            {TAMANOS_PAGINA.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <nav className="flex items-center gap-1" aria-label="Paginación">
          <button
            type="button"
            onClick={() => irA(pagina - 1)}
            disabled={pagina <= 1}
            aria-label="Página anterior"
            className={cn(botonCls, "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5")}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          {ventana(pagina, paginas).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => irA(p)}
              aria-current={p === pagina ? "page" : undefined}
              className={cn(
                botonCls,
                p === pagina
                  ? "bg-brand-500 font-semibold text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
              )}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => irA(pagina + 1)}
            disabled={pagina >= paginas}
            aria-label="Página siguiente"
            className={cn(botonCls, "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5")}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </nav>
      </div>
    </div>
  );
}
