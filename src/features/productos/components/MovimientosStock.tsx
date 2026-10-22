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
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";

const VISTAS = ["emitidas", "items"] as const;

// Descargar stock y Cargar stock tienen la misma estructura; cambian los textos.
const TEXTOS = {
  descarga: {
    titulo: "Descargar stock",
    pestana: "Descargas emitidas",
    columnaNumero: "N.° de descarga",
    accion: "Descargar stock",
    vacio: "No hay descargas emitidas.",
  },
  carga: {
    titulo: "Cargar stock",
    pestana: "Cargas emitidas",
    columnaNumero: "N.° de carga",
    accion: "Cargar stock",
    vacio: "No hay cargas emitidas.",
  },
};

export function MovimientosStock({ tipo }: { tipo: keyof typeof TEXTOS }) {
  const textos = TEXTOS[tipo];
  const [vista, setVista] = usePestanaUrl(VISTAS);
  const [busqueda, setBusqueda] = useState("");

  const columnas: Columna[] = [
    { titulo: textos.columnaNumero },
    { titulo: "Fecha de creación" },
    { titulo: "Tipo de operación" },
    { titulo: "Motivo" },
    { titulo: "Responsable" },
    { titulo: "Registrado por" },
    { titulo: "Opciones", alinear: "centro" },
  ];

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo={textos.titulo} />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "emitidas", label: textos.pestana },
            { valor: "items", label: "Por ítems" },
          ]}
        />

        {vista === "emitidas" ? (
          <>
            <BarraHerramientas derecha={<AccionesDerecha />}>
              <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar número" />
              <BotonMasFiltros />
              <BotonAgrupar />
              <BotonBorrar />
              <BotonActualizar />
              <BotonNuevo label={textos.accion} que={textos.accion} />
            </BarraHerramientas>

            <Tabla columnas={columnas} vacia mensajeVacio={textos.vacio} />
          </>
        ) : (
          // Por ítems: columnas por definir.
          <PorDefinir />
        )}
      </Tarjeta>
    </>
  );
}
