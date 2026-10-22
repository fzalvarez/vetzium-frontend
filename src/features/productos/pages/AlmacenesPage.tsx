import { useState } from "react";
import {
  AccionesDerecha,
  BotonActualizar,
  BotonBorrar,
  BotonNuevo,
} from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { SelectorFiltro } from "@/shared/components/SelectorFiltro";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { AlmacenModal } from "../components/AlmacenModal";
import { ESTADOS_ALMACEN, TIPOS_ALMACEN } from "../constants";
import { ALMACENES_EJEMPLO } from "../datos-ejemplo";
import type { Almacen } from "../types";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Nombre de almacén" },
  { titulo: "Código personalizado" },
  { titulo: "Tipo de almacén" },
  { titulo: "Estado" },
  { titulo: "Usar para ventas" },
  { titulo: "Opciones", alinear: "centro" },
];

const ESTADOS = [
  { valor: "todos", label: "Todos" },
  ...Object.entries(ESTADOS_ALMACEN).map(([valor, label]) => ({ valor, label })),
];

export default function AlmacenesPage() {
  // Sin backend: en memoria (se pierde al recargar).
  const [almacenes, setAlmacenes] = useState<Almacen[]>(ALMACENES_EJEMPLO);
  const [estado, setEstado] = useState("todos");
  const [modalAbierto, setModalAbierto] = useState(false);

  const filtrados = almacenes.filter((a) => estado === "todos" || a.estado === estado);
  const { visibles, paginacion } = usePaginacion(filtrados);

  const siguienteId = Math.max(0, ...almacenes.map((a) => a.id)) + 1;

  const guardar = (almacen: Omit<Almacen, "id">) => {
    setAlmacenes((actuales) => [...actuales, { id: siguienteId, ...almacen }]);
    notifySuccess(`Almacén "${almacen.nombre}" creado.`);
    setModalAbierto(false);
  };

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Almacenes" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas derecha={<AccionesDerecha />}>
          <SelectorFiltro etiqueta="Estados" opciones={ESTADOS} valor={estado} onChange={setEstado} />
          <BotonBorrar />
          <BotonActualizar />
          <BotonNuevo que="Nuevo almacén" onClick={() => setModalAbierto(true)} />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio={estado === "todos" ? "No hay almacenes registrados." : "Ningún almacén con ese estado."}
          paginacion={paginacion}
        >
          {visibles.map((a) => (
            <Fila key={a.id}>
              <Celda numerica className="text-gray-500 dark:text-gray-400">{a.id}</Celda>
              <Celda destacada>{a.nombre}</Celda>
              <Celda numerica>{a.codigo}</Celda>
              <Celda>
                {a.tipo === "principal" ? <Insignia tono="info">{TIPOS_ALMACEN.principal}</Insignia> : TIPOS_ALMACEN[a.tipo]}
              </Celda>
              <Celda>
                <Insignia tono={a.estado === "activo" ? "exito" : "neutro"}>{ESTADOS_ALMACEN[a.estado]}</Insignia>
              </Celda>
              <Celda>{a.usarParaVentas ? "Sí" : "No"}</Celda>
              <CeldaOpciones etiqueta={a.nombre} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>

      {modalAbierto && (
        <AlmacenModal
          codigoSugerido={`ALM-${String(siguienteId).padStart(2, "0")}`}
          onClose={() => setModalAbierto(false)}
          onGuardar={guardar}
        />
      )}
    </>
  );
}
