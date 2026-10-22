import { useState } from "react";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { formatearFecha } from "@/shared/utils/fechas";
import { coincide } from "@/shared/utils/texto";
import { UsuarioModal } from "../components/UsuarioModal";
import { useConfiguracionStore } from "../store/configuracion.store";
import type { Usuario } from "../types";

const COLUMNAS: Columna[] = [
  { titulo: "Usuario" },
  { titulo: "Rol" },
  { titulo: "Estado" },
  { titulo: "Último acceso" },
  { titulo: "Opciones", alinear: "centro" },
];

/** "Dra. Patricia Salas" → "PS" (sin el título). */
const iniciales = (nombre: string) =>
  nombre
    .split(" ")
    .filter((p) => !p.endsWith("."))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function UsuariosPage() {
  const usuarios = useConfiguracionStore((s) => s.usuarios);
  const roles = useConfiguracionStore((s) => s.roles);
  const agregarUsuario = useConfiguracionStore((s) => s.agregarUsuario);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const nombreRol = (id: number) => roles.find((r) => r.id === id)?.nombre ?? "Sin rol";
  const filtrados = usuarios.filter((u) => coincide(busqueda, u.nombre, u.correo, nombreRol(u.rolId)));
  const { visibles, paginacion } = usePaginacion(filtrados);

  const guardar = (usuario: Omit<Usuario, "id" | "ultimoAcceso">) => {
    agregarUsuario(usuario);
    notifySuccess(`Usuario "${usuario.nombre}" creado.`);
    setModalAbierto(false);
  };

  return (
    <>
      <EncabezadoPagina modulo="Configuración" titulo="Usuarios" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas
          derecha={<BotonNuevo label="Nuevo usuario" que="Nuevo usuario" onClick={() => setModalAbierto(true)} />}
        >
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar usuario" />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio={busqueda ? "Ningún usuario coincide con la búsqueda." : "No hay usuarios."}
          paginacion={paginacion}
        >
          {visibles.map((u) => (
            <Fila key={u.id}>
              <Celda>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                    {iniciales(u.nombre)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">{u.nombre}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{u.correo}</p>
                  </div>
                </div>
              </Celda>
              <Celda>
                <Insignia tono="info">{nombreRol(u.rolId)}</Insignia>
              </Celda>
              <Celda>
                <Insignia tono={u.activo ? "exito" : "neutro"}>{u.activo ? "Activo" : "Inactivo"}</Insignia>
              </Celda>
              <Celda numerica>
                {u.ultimoAcceso ? (
                  `${formatearFecha(u.ultimoAcceso.slice(0, 10))} ${u.ultimoAcceso.slice(11)}`
                ) : (
                  <span className="italic text-gray-400 dark:text-gray-500">Nunca</span>
                )}
              </Celda>
              <CeldaOpciones etiqueta={u.nombre} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>

      {modalAbierto && <UsuarioModal roles={roles} onClose={() => setModalAbierto(false)} onGuardar={guardar} />}
    </>
  );
}
