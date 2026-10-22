import {
  CarIcon,
  ConciergeBellIcon,
  MessageSquarePlusIcon,
  PencilIcon,
  PlusIcon,
  ShowerHeadIcon,
  StethoscopeIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BuscadorSeleccion } from "@/shared/components/BuscadorSeleccion";
import { proximamente } from "@/shared/utils";
import { coincide } from "@/shared/utils/texto";
import { CLIENTES_EJEMPLO, nombreCompleto } from "@/features/clientes/datos-ejemplo";
import type { Cliente } from "@/features/clientes/types";
import type { Mascota } from "@/features/mascotas/types";

// Accesos rápidos junto al cliente. Qué abre cada uno está por definir.
const ACCESOS: { icono: LucideIcon; etiqueta: string }[] = [
  { icono: ShowerHeadIcon, etiqueta: "Baño / peluquería" },
  { icono: ConciergeBellIcon, etiqueta: "Hotel" },
  { icono: CarIcon, etiqueta: "Movilidad" },
  { icono: StethoscopeIcon, etiqueta: "Consulta" },
];

function BotonIcono({
  icono: Icono,
  etiqueta,
  disabled,
  destacado,
}: {
  icono: LucideIcon;
  etiqueta: string;
  disabled?: boolean;
  destacado?: boolean;
}) {
  return (
    <Button
      variant={destacado ? "default" : "outline"}
      size="icon"
      title={etiqueta}
      aria-label={etiqueta}
      disabled={disabled}
      onClick={() => proximamente(etiqueta)}
      className={cn(destacado && "bg-warning-500 hover:bg-warning-600")}
    >
      <Icono className="size-4" />
    </Button>
  );
}

/** Búsqueda y selección del cliente de la venta, con sus accesos rápidos. */
export function BarraCliente({
  cliente,
  mascotas,
  onSeleccionar,
  onQuitar,
}: {
  cliente: Cliente | null;
  mascotas: Mascota[];
  onSeleccionar: (cliente: Cliente) => void;
  onQuitar: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-64 flex-1 flex-col gap-1.5">
          <label htmlFor="venta-cliente" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Buscar y seleccionar cliente
          </label>
          <BuscadorSeleccion
            id="venta-cliente"
            opciones={CLIENTES_EJEMPLO}
            filtrar={(c, q) => coincide(q, nombreCompleto(c), c.email, ...c.telefonos)}
            clave={(c) => c.id}
            onSeleccionar={onSeleccionar}
            placeholder="Buscar cliente"
            sinResultados="Ningún cliente coincide."
            renderOpcion={(c) => (
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{nombreCompleto(c)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {[c.telefonos[0], c.email].filter(Boolean).join(" · ")}
                </p>
              </div>
            )}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <BotonIcono icono={PencilIcon} etiqueta="Editar cliente" disabled={!cliente} />
          <BotonIcono icono={PlusIcon} etiqueta="Nuevo cliente" />
          {ACCESOS.map((a) => (
            <BotonIcono key={a.etiqueta} icono={a.icono} etiqueta={a.etiqueta} />
          ))}
          <BotonIcono icono={MessageSquarePlusIcon} etiqueta="Agregar nota" destacado />
        </div>
      </div>

      {cliente && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg bg-brand-50/60 px-4 py-3 text-sm dark:bg-brand-500/10">
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{nombreCompleto(cliente)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {[cliente.telefonos.join(" · "), cliente.email].filter(Boolean).join(" · ")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Mascotas:</span>
            {mascotas.length > 0 ? (
              mascotas.map((m) => (
                <span
                  key={m.id}
                  className="rounded-md bg-white px-2 py-0.5 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-200"
                >
                  {m.nombre} · {m.especie}
                </span>
              ))
            ) : (
              <span className="text-xs italic text-gray-400">Sin mascotas</span>
            )}
          </div>
          <Button variant="ghost" size="icon-sm" className="ml-auto" aria-label="Quitar cliente" title="Quitar cliente" onClick={onQuitar}>
            <XIcon className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
