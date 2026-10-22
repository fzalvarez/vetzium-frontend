import { useState } from "react";
import { LockIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MENU, claveDe } from "@/app/navegacion";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { formatearNumero } from "@/shared/utils/formato";
import { PermisosRolModal } from "../components/PermisosRolModal";
import { RolModal } from "../components/RolModal";
import { useConfiguracionStore } from "../store/configuracion.store";
import type { PermisosRol, Rol } from "../types";

const COLUMNAS: Columna[] = [
  { titulo: "Rol" },
  { titulo: "Descripción" },
  { titulo: "Usuarios", alinear: "derecha" },
  { titulo: "Módulos con acceso", alinear: "derecha" },
  { titulo: "Permisos", alinear: "centro" },
  { titulo: "Opciones", alinear: "centro" },
];

/** Módulos del menú en los que el rol puede al menos ver. */
const modulosConAcceso = (permisos: PermisosRol) =>
  MENU.filter((m) => permisos[claveDe(m)]?.includes("ver")).length;

export default function RolesPage() {
  const roles = useConfiguracionStore((s) => s.roles);
  const usuarios = useConfiguracionStore((s) => s.usuarios);
  const agregarRol = useConfiguracionStore((s) => s.agregarRol);
  const setPermisosRol = useConfiguracionStore((s) => s.setPermisosRol);
  const [nuevoAbierto, setNuevoAbierto] = useState(false);
  const [rolPermisos, setRolPermisos] = useState<Rol | null>(null);

  const { visibles, paginacion } = usePaginacion(roles);

  return (
    <>
      <EncabezadoPagina
        modulo="Configuración"
        titulo="Roles"
        descripcion="Qué puede ver y hacer cada rol en los módulos del menú."
        acciones={<EtiquetaEjemplo />}
      />

      <Tarjeta>
        <BarraHerramientas
          derecha={<BotonNuevo label="Nuevo rol" que="Nuevo rol" onClick={() => setNuevoAbierto(true)} />}
        />

        <Tabla columnas={COLUMNAS} vacia={roles.length === 0} mensajeVacio="No hay roles." paginacion={paginacion}>
          {visibles.map((r) => (
            <Fila key={r.id}>
              <Celda destacada>
                <span className="flex items-center gap-2">
                  {r.nombre}
                  {r.fijo && <LockIcon className="size-3.5 text-gray-400" aria-label="Rol del sistema" />}
                </span>
              </Celda>
              <Celda>{r.descripcion}</Celda>
              <Celda alinear="derecha" numerica>
                {formatearNumero(usuarios.filter((u) => u.rolId === r.id).length)}
              </Celda>
              <Celda alinear="derecha" numerica>
                {`${modulosConAcceso(r.permisos)} de ${MENU.length}`}
              </Celda>
              <Celda alinear="centro">
                <Button variant="outline" size="sm" onClick={() => setRolPermisos(r)}>
                  <ShieldCheckIcon className="size-4" />
                  Permisos
                </Button>
              </Celda>
              <CeldaOpciones etiqueta={r.nombre} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>

      {nuevoAbierto && (
        <RolModal
          onClose={() => setNuevoAbierto(false)}
          onGuardar={(rol) => {
            agregarRol(rol);
            notifySuccess(`Rol "${rol.nombre}" creado. Asígnale permisos.`);
            setNuevoAbierto(false);
          }}
        />
      )}

      {rolPermisos && (
        <PermisosRolModal
          rol={rolPermisos}
          onClose={() => setRolPermisos(null)}
          onGuardar={(permisos) => {
            setPermisosRol(rolPermisos.id, permisos);
            notifySuccess(`Permisos de "${rolPermisos.nombre}" guardados.`);
            setRolPermisos(null);
          }}
        />
      )}
    </>
  );
}
