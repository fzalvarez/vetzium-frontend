import { useId, useRef, useState } from "react";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OpcionMenu {
  label: string;
  icono?: LucideIcon;
  onClick: () => void;
  /** Rojo para acciones destructivas (anular); amarillo para las de atención (pendiente). */
  tono?: "peligro" | "aviso";
}

/** Botón con lista de acciones que se abre hacia arriba (para pies de página). */
export function MenuDesplegable({
  etiqueta,
  icono: Icono,
  opciones,
  disabled = false,
  title,
}: {
  etiqueta: string;
  icono?: LucideIcon;
  opciones: OpcionMenu[];
  disabled?: boolean;
  title?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const idMenu = useId();
  const contenedor = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={contenedor}
      className="relative"
      // Se cierra al salir el foco del botón y su lista (clic afuera, Tab).
      onBlur={(e) => {
        if (!contenedor.current?.contains(e.relatedTarget as Node | null)) setAbierto(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setAbierto(false)}
    >
      <Button
        variant="outline"
        disabled={disabled}
        title={title}
        aria-haspopup="menu"
        aria-expanded={abierto}
        aria-controls={idMenu}
        onClick={() => setAbierto((a) => !a)}
      >
        {Icono && <Icono className="size-4" />}
        {etiqueta}
        <ChevronDownIcon className={cn("size-4 transition-transform", abierto && "rotate-180")} />
      </Button>
      {abierto && (
        <ul
          id={idMenu}
          role="menu"
          className="absolute bottom-full right-0 z-30 mb-1 min-w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-theme-lg dark:border-gray-700 dark:bg-gray-800"
        >
          {opciones.map(({ label, icono: IconoOpcion, onClick, tono }) => (
            <li key={label} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAbierto(false);
                  onClick();
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5",
                  tono === "peligro"
                    ? "text-error-600 dark:text-error-400"
                    : tono === "aviso"
                      ? "text-warning-700 dark:text-warning-400"
                      : "text-gray-700 dark:text-gray-200"
                )}
              >
                {IconoOpcion && <IconoOpcion className="size-4 shrink-0" />}
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
