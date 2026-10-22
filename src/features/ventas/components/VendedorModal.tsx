import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import type { Usuario } from "@/features/configuracion/types";

/** Elegir el vendedor que comisiona por la línea (usuarios activos). */
export function VendedorModal({
  concepto,
  vendedores,
  actual,
  onClose,
  onAsignar,
}: {
  concepto: string;
  vendedores: Usuario[];
  actual: number | null | undefined;
  onClose: () => void;
  /** null = sin vendedor. */
  onAsignar: (vendedorId: number | null) => void;
}) {
  const [elegido, setElegido] = useState<number | null>(actual ?? null);

  return (
    <Modal
      open
      size="sm"
      title="Asignar vendedor"
      description={`${concepto} · comisiona quien se asigne`}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onAsignar(elegido)}>Asignar</Button>
        </>
      }
    >
      <ul role="radiogroup" aria-label="Vendedores" className="flex flex-col gap-1">
        {[{ id: null, nombre: "Sin vendedor", correo: "" }, ...vendedores].map((v) => {
          const marcado = elegido === v.id;
          return (
            <li key={v.id ?? "ninguno"}>
              <button
                type="button"
                role="radio"
                aria-checked={marcado}
                onClick={() => setElegido(v.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  marcado ? "bg-brand-50 dark:bg-brand-500/15" : "hover:bg-gray-50 dark:hover:bg-white/5"
                )}
              >
                <span className="flex-1">
                  <span className={cn("block", v.id === null ? "italic text-gray-500" : "font-medium text-gray-800 dark:text-gray-100")}>
                    {v.nombre}
                  </span>
                  {v.correo && <span className="block text-xs text-gray-500 dark:text-gray-400">{v.correo}</span>}
                </span>
                {marcado && <CheckIcon className="size-4 text-brand-600 dark:text-brand-400" />}
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
