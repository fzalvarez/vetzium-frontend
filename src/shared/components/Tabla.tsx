import { InboxIcon, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Columna {
  titulo: string;
  /** Reemplaza al título en el encabezado (p. ej. la casilla de "seleccionar todos"). */
  encabezado?: React.ReactNode;
  /** Montos y cantidades a la derecha; acciones al centro. */
  alinear?: "izquierda" | "derecha" | "centro";
}

const ALINEAR: Record<NonNullable<Columna["alinear"]>, string> = {
  izquierda: "text-left",
  derecha: "text-right",
  centro: "text-center",
};

function alinearCelda(columna: Columna): string {
  return ALINEAR[columna.alinear ?? "izquierda"];
}

/** Tabla con encabezado y estado de carga o vacío. Las filas (`<tr>`) van como children. */
export function Tabla({
  columnas,
  cargando = false,
  vacia,
  mensajeVacio = "No hay datos para mostrar.",
  children,
}: {
  columnas: Columna[];
  cargando?: boolean;
  vacia: boolean;
  mensajeVacio?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full border-collapse min-w-200">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 dark:bg-white/5 dark:border-gray-800">
            {columnas.map((c) => (
              <th
                key={c.titulo}
                className={cn(
                  "px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap dark:text-gray-400",
                  alinearCelda(c)
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
  );
}
