import { useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { notifySuccess, proximamente } from "@/shared/utils";
import { formatearFecha } from "@/shared/utils/fechas";
import { formatearSoles } from "@/shared/utils/formato";
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

const celda = "px-4 py-3 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300";
const vacio = <span className="text-gray-400 dark:text-gray-500">—</span>;

/** Para buscar sin importar mayúsculas ni tildes ("cirugia" encuentra "Cirugía"). */
const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function EntradasSalidasPage() {
  // Sin backend: los movimientos viven en memoria (se pierden al recargar).
  const [movimientos, setMovimientos] = useState<MovimientoCaja[]>(MOVIMIENTOS_CAJA_EJEMPLO);
  const [busqueda, setBusqueda] = useState("");
  const [nuevo, setNuevo] = useState<TipoMovimientoCaja | null>(null);

  const filtrados = movimientos.filter((m) => normalizar(m.descripcion).includes(normalizar(busqueda.trim())));

  const guardar = (movimiento: Omit<MovimientoCaja, "id">) => {
    const id = Math.max(0, ...movimientos.map((m) => m.id)) + 1;
    setMovimientos((actuales) => [{ id, ...movimiento }, ...actuales]);
    notifySuccess(movimiento.tipo === "entrada" ? "Entrada registrada." : "Salida registrada.");
    setNuevo(null);
  };

  return (
    <>
      <EncabezadoPagina
        modulo="Ventas"
        titulo="Entradas / Salidas de caja"
        acciones={
          <span className="rounded-full bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 dark:bg-warning-500/15 dark:text-warning-400">
            Datos de ejemplo
          </span>
        }
      />

      <Tarjeta>
        <BarraHerramientas derecha={<AccionesDerecha />}>
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar por descripción" />
          <BotonMasFiltros />
          <BotonBorrar />
          <BotonActualizar />
          <BotonNuevo label="Entrada" que="Entrada" onClick={() => setNuevo("entrada")} />
          <BotonNuevo label="Salida" que="Salida" onClick={() => setNuevo("salida")} />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio={busqueda ? "Ningún movimiento coincide con la búsqueda." : "No hay movimientos registrados."}
        >
          {filtrados.map((m) => (
            <tr key={m.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
              <td className={`${celda} tabular-nums text-gray-500 dark:text-gray-400`}>{m.id}</td>
              <td className={`${celda} tabular-nums`}>{formatearFecha(m.fecha)}</td>
              <td className={`${celda} font-medium text-gray-800 dark:text-gray-100`}>{m.descripcion}</td>
              <td className={celda}>
                {m.etiquetas.length > 0 ? (
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
                ) : (
                  vacio
                )}
              </td>
              <td className={celda}>{m.medioPago}</td>
              <td className={`${celda} text-right tabular-nums`}>
                {m.tipo === "entrada" ? formatearSoles(m.monto) : vacio}
              </td>
              <td className={`${celda} text-right tabular-nums`}>
                {m.tipo === "salida" ? formatearSoles(m.monto) : vacio}
              </td>
              <td className={`${celda} tabular-nums`}>{m.docReferencia ?? vacio}</td>
              <td className={`${celda} tabular-nums`}>{m.numeroOperacion ?? vacio}</td>
              <td className={celda}>
                <TipoMovimientoBadge tipo={m.tipo} />
              </td>
              <td className={`${celda} text-center`}>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Opciones del movimiento ${m.id}`}
                  title="Opciones"
                  onClick={() => proximamente("Opciones del movimiento")}
                >
                  <EllipsisVerticalIcon className="size-4" />
                </Button>
              </td>
            </tr>
          ))}
        </Tabla>
      </Tarjeta>

      {nuevo && <MovimientoCajaModal tipo={nuevo} onClose={() => setNuevo(null)} onGuardar={guardar} />}
    </>
  );
}
