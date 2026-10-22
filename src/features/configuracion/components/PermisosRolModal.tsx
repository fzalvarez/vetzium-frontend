import { useState } from "react";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal } from "@/components/ui/modal";
import { MENU, claveDe } from "@/app/navegacion";
import { ACCIONES, ACCIONES_PERMISO, type AccionPermiso } from "../constants";
import type { PermisosRol, Rol } from "../types";

/**
 * Matriz módulo × acción. Marcar Crear/Editar/Eliminar marca también Ver, y quitar Ver
 * quita las demás: sin ver el módulo no tiene sentido operar en él.
 */
export function PermisosRolModal({
  rol,
  onClose,
  onGuardar,
}: {
  rol: Rol;
  onClose: () => void;
  onGuardar: (permisos: PermisosRol) => void;
}) {
  const [permisos, setPermisos] = useState<PermisosRol>(rol.permisos);
  const soloLectura = rol.fijo;

  const tiene = (modulo: string, accion: AccionPermiso) => permisos[modulo]?.includes(accion) ?? false;

  const alternar = (modulo: string, accion: AccionPermiso) =>
    setPermisos((actual) => {
      const marcadas = new Set(actual[modulo] ?? []);
      if (marcadas.has(accion)) {
        if (accion === "ver") marcadas.clear();
        else marcadas.delete(accion);
      } else {
        marcadas.add(accion);
        marcadas.add("ver");
      }
      return { ...actual, [modulo]: ACCIONES.filter((a) => marcadas.has(a)) };
    });

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={`Permisos · ${rol.nombre}`}
      description="Marca lo que este rol puede hacer en cada módulo."
      footer={
        soloLectura ? (
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={() => onGuardar(permisos)}>Guardar permisos</Button>
          </>
        )
      }
    >
      {soloLectura && (
        <p className="mb-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
          <LockIcon className="size-4 shrink-0" />
          Rol del sistema: tiene todos los permisos y no se puede modificar.
        </p>
      )}

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Módulo
            </th>
            {ACCIONES.map((a) => (
              <th
                key={a}
                className="w-20 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                {ACCIONES_PERMISO[a]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {MENU.map((m) => {
            const clave = claveDe(m);
            const Icono = m.icon;
            return (
              <tr key={clave} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="py-2 pr-4">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Icono className="size-4 shrink-0 text-gray-400" />
                    {m.label}
                  </span>
                </td>
                {ACCIONES.map((a) => (
                  <td key={a} className="py-2 text-center">
                    <Checkbox
                      checked={tiene(clave, a)}
                      onChange={() => alternar(clave, a)}
                      disabled={soloLectura}
                      aria-label={`${ACCIONES_PERMISO[a]} ${m.label}`}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
}
