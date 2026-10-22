import { useState } from "react";
import {
  AccionesDerecha,
  BotonActualizar,
  BotonBorrar,
  BotonMasFiltros,
  BotonNuevo,
} from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { formatearFecha } from "@/shared/utils/fechas";
import { formatearSoles } from "@/shared/utils/formato";
import { coincide } from "@/shared/utils/texto";
import { MovimientoCajaModal } from "../components/MovimientoCajaModal";
import { TipoMovimientoBadge } from "../components/TipoMovimientoBadge";
import { MOVIMIENTOS_CAJA_EJEMPLO } from "../datos-ejemplo";
import type { MovimientoCaja, TipoMovimientoCaja } from "../types/movimiento-caja";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Fecha" },
  { titulo: "Descripción" },
  { titulo: "Etiquetas" },
  { titulo: "Medio de pago" },
  { titulo: "Entrada", alinear: "derecha" },
  { titulo: "Salida", alinear: "derecha" },
  { titulo: "Doc. de referencia" },
  { titulo: "N.° de operación" },
  { titulo: "Tipo de movimiento" },
  { titulo: "Opciones", alinear: "centro" },
];

export default function EntradasSalidasPage() {
  // Sin backend: los movimientos viven en memoria (se pierden al recargar).
  const [movimientos, setMovimientos] = useState<MovimientoCaja[]>(MOVIMIENTOS_CAJA_EJEMPLO);
  const [busqueda, setBusqueda] = useState("");
  const [nuevo, setNuevo] = useState<TipoMovimientoCaja | null>(null);

  const filtrados = movimientos.filter((m) => coincide(busqueda, m.descripcion));
  const { visibles, paginacion } = usePaginacion(filtrados);

  const guardar = (movimiento: Omit<MovimientoCaja, "id">) => {
    const id = Math.max(0, ...movimientos.map((m) => m.id)) + 1;
    setMovimientos((actuales) => [{ id, ...movimiento }, ...actuales]);
    notifySuccess(movimiento.tipo === "entrada" ? "Entrada registrada." : "Salida registrada.");
    setNuevo(null);
  };

  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Entradas / Salidas de caja" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas derecha={<AccionesDerecha />}>
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar por descripción" />
          <BotonMasFiltros />
          <BotonBorrar />
          <BotonActualizar />
          <BotonNuevo label="Entrada" que="Entrada" variante="success" onClick={() => setNuevo("entrada")} />
          <BotonNuevo label="Salida" que="Salida" variante="destructive" onClick={() => setNuevo("salida")} />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio={busqueda ? "Ningún movimiento coincide con la búsqueda." : "No hay movimientos registrados."}
          paginacion={paginacion}
        >
          {visibles.map((m) => (
            <Fila key={m.id}>
              <Celda numerica className="text-gray-500 dark:text-gray-400">{m.id}</Celda>
              <Celda numerica>{formatearFecha(m.fecha)}</Celda>
              <Celda destacada>{m.descripcion}</Celda>
              <Celda>
                {m.etiquetas.length > 0 && (
                  <div className="flex gap-1">
                    {m.etiquetas.map((e) => (
                      <span
                        key={e}
                        className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-300"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                )}
              </Celda>
              <Celda>{m.medioPago}</Celda>
              <Celda alinear="derecha" numerica>{m.tipo === "entrada" ? formatearSoles(m.monto) : null}</Celda>
              <Celda alinear="derecha" numerica>{m.tipo === "salida" ? formatearSoles(m.monto) : null}</Celda>
              <Celda numerica>{m.docReferencia}</Celda>
              <Celda numerica>{m.numeroOperacion}</Celda>
              <Celda>
                <TipoMovimientoBadge tipo={m.tipo} />
              </Celda>
              <CeldaOpciones etiqueta={`movimiento ${m.id}`} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>

      {nuevo && <MovimientoCajaModal tipo={nuevo} onClose={() => setNuevo(null)} onGuardar={guardar} />}
    </>
  );
}
