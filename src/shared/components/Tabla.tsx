import { EllipsisVerticalIcon, InboxIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { EstadoPaginacion } from "@/shared/hooks/usePaginacion";
import { proximamente } from "@/shared/utils";
import { Paginacion } from "./Paginacion";

type Alineacion = "izquierda" | "derecha" | "centro";

export interface Columna {
  titulo: string;
  /** Reemplaza al título en el encabezado (p. ej. la casilla de "seleccionar todos"). */
  encabezado?: React.ReactNode;
  /** Montos y cantidades a la derecha; acciones al centro. */
  alinear?: Alineacion;
}

const ALINEAR: Record<Alineacion, string> = {
  izquierda: "text-left",
  derecha: "text-right",
  centro: "text-center",
};

/**
 * Tabla con encabezado, estado de carga o vacío y, si se pasa `paginacion`, el pie
 * de paginación. Las filas (`<Fila>`) van como children.
 */
export function Tabla({
  columnas,
  cargando = false,
  vacia,
  mensajeVacio = "No hay datos para mostrar.",
  paginacion,
  children,
}: {
  columnas: Columna[];
  cargando?: boolean;
  vacia: boolean;
  mensajeVacio?: string;
  paginacion?: EstadoPaginacion;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse min-w-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 dark:bg-white/5 dark:border-gray-800">
              {columnas.map((c) => (
                <th
                  key={c.titulo}
                  className={cn(
                    "px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap dark:text-gray-400",
                    ALINEAR[c.alinear ?? "izquierda"]
                  )}
                >
                  {c.encabezado ?? c.titulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {cargando || vacia ? (
              <tr>
                <td colSpan={columnas.length}>
                  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                    {cargando ? (
                      <LoaderIcon className="size-6 animate-spin text-brand-500 dark:text-brand-400" />
                    ) : (
                      <InboxIcon className="size-6 text-gray-300 dark:text-gray-600" />
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cargando ? "Cargando..." : mensajeVacio}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
      {paginacion && <Paginacion {...paginacion} />}
    </>
  );
}

/** Fila de datos con resaltado al pasar el mouse (y al estar seleccionada). */
export function Fila({ seleccionada = false, children }: { seleccionada?: boolean; children: React.ReactNode }) {
  return (
    <tr
      className={cn(
        "transition-colors",
        seleccionada ? "bg-brand-50/60 dark:bg-brand-500/10" : "hover:bg-gray-50 dark:hover:bg-white/5"
      )}
    >
      {children}
    </tr>
  );
}

/** Celda de datos. Sin contenido muestra "—". */
export function Celda({
  alinear = "izquierda",
  numerica = false,
  destacada = false,
  className,
  children,
}: {
  alinear?: Alineacion;
  /** Cifras alineadas (montos, cantidades, códigos). */
  numerica?: boolean;
  /** Texto principal de la fila (nombre, descripción). */
  destacada?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const vacia = children === null || children === undefined || children === "";
  return (
    <td
      className={cn(
        "px-4 py-3 text-sm whitespace-nowrap",
        ALINEAR[alinear],
        numerica && "tabular-nums",
        destacada ? "font-medium text-gray-800 dark:text-gray-100" : "text-gray-700 dark:text-gray-300",
        className
      )}
    >
      {vacia ? <span className="text-gray-400 dark:text-gray-500">—</span> : children}
    </td>
  );
}

/** Celda con la casilla de selección de la fila. */
export function CeldaCasilla({ marcada, onChange, etiqueta }: { marcada: boolean; onChange: () => void; etiqueta: string }) {
  return (
    <td className="px-4 py-3">
      <Checkbox checked={marcada} onChange={onChange} aria-label={etiqueta} />
    </td>
  );
}

/** Celda "Opciones" con el menú ⋮ de la fila (acciones aún por definir). */
export function CeldaOpciones({ etiqueta }: { etiqueta: string }) {
  return (
    <td className="px-4 py-3 text-center">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Opciones de ${etiqueta}`}
        title="Opciones"
        onClick={() => proximamente("Las opciones de la fila")}
      >
        <EllipsisVerticalIcon className="size-4" />
      </Button>
    </td>
  );
}
