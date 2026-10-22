import { useState } from "react";
import {
  AccionesDerecha,
  BotonActualizar,
  BotonAgrupar,
  BotonBorrar,
  BotonMasFiltros,
  BotonNuevo,
} from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { notifySuccess } from "@/shared/utils";
import { formatearFecha } from "@/shared/utils/fechas";
import { coincide } from "@/shared/utils/texto";
import { CARGAS_EJEMPLO, DESCARGAS_EJEMPLO } from "../datos-ejemplo";
import type { MovimientoStock } from "../types";
import { MovimientoStockModal } from "./MovimientoStockModal";

const VISTAS = ["emitidas", "items"] as const;

// Descargar stock y Cargar stock tienen la misma estructura; cambian los textos.
const TEXTOS = {
  descarga: {
    titulo: "Descargar stock",
    pestana: "Descargas emitidas",
    columnaNumero: "N.° de descarga",
    prefijo: "DS",
    accion: "Descargar stock",
    vacio: "No hay descargas emitidas.",
    guardada: "Descarga registrada.",
    ejemplo: DESCARGAS_EJEMPLO,
  },
  carga: {
    titulo: "Cargar stock",
    pestana: "Cargas emitidas",
    columnaNumero: "N.° de carga",
    prefijo: "CS",
    accion: "Cargar stock",
    vacio: "No hay cargas emitidas.",
    guardada: "Carga registrada.",
    ejemplo: CARGAS_EJEMPLO,
  },
};

/** Siguiente número correlativo: "DS-0005" → "DS-0006". */
function siguienteNumero(prefijo: string, movimientos: MovimientoStock[]): string {
  const mayor = Math.max(0, ...movimientos.map((m) => Number(m.numero.split("-")[1]) || 0));
  return `${prefijo}-${String(mayor + 1).padStart(4, "0")}`;
}

function Emitidas({ tipo }: { tipo: keyof typeof TEXTOS }) {
  const textos = TEXTOS[tipo];
  // Sin backend: en memoria (se pierde al recargar).
  const [movimientos, setMovimientos] = useState<MovimientoStock[]>(textos.ejemplo);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const filtrados = movimientos.filter((m) => coincide(busqueda, m.numero));
  const { visibles, paginacion } = usePaginacion(filtrados);

  const columnas: Columna[] = [
    { titulo: textos.columnaNumero },
    { titulo: "Fecha de creación" },
    { titulo: "Tipo de operación" },
    { titulo: "Motivo" },
    { titulo: "Responsable" },
    { titulo: "Registrado por" },
    { titulo: "Opciones", alinear: "centro" },
  ];

  const guardar = (movimiento: Omit<MovimientoStock, "numero">) => {
    const numero = siguienteNumero(textos.prefijo, movimientos);
    setMovimientos((actuales) => [{ numero, ...movimiento }, ...actuales]);
    notifySuccess(`${textos.guardada} (${numero})`);
    setModalAbierto(false);
  };

  return (
    <>
      <BarraHerramientas derecha={<AccionesDerecha />}>
        <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar número" />
        <BotonMasFiltros />
        <BotonAgrupar />
        <BotonBorrar />
        <BotonActualizar />
        <BotonNuevo label={textos.accion} que={textos.accion} onClick={() => setModalAbierto(true)} />
      </BarraHerramientas>

      <Tabla
        columnas={columnas}
        vacia={filtrados.length === 0}
        mensajeVacio={busqueda ? "Ningún número coincide con la búsqueda." : textos.vacio}
        paginacion={paginacion}
      >
        {visibles.map((m) => (
          <Fila key={m.numero}>
            <Celda numerica destacada>{m.numero}</Celda>
            <Celda numerica>{formatearFecha(m.fechaCreacion)}</Celda>
            <Celda>{m.tipoOperacion}</Celda>
            <Celda>{m.motivo}</Celda>
            <Celda>{m.responsable}</Celda>
            <Celda>{m.registradoPor}</Celda>
            <CeldaOpciones etiqueta={m.numero} />
          </Fila>
        ))}
      </Tabla>

      {modalAbierto && (
        <MovimientoStockModal tipo={tipo} onClose={() => setModalAbierto(false)} onGuardar={guardar} />
      )}
    </>
  );
}

export function MovimientosStock({ tipo }: { tipo: keyof typeof TEXTOS }) {
  const textos = TEXTOS[tipo];
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo={textos.titulo} acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "emitidas", label: textos.pestana },
            { valor: "items", label: "Por ítems" },
          ]}
        />

        {/* Por ítems: columnas por definir. */}
        {vista === "emitidas" ? <Emitidas tipo={tipo} /> : <PorDefinir />}
      </Tarjeta>
    </>
  );
}
