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

const VISTAS = ["ordenes", "recepciones", "pagos"] as const;

const COLUMNAS_ORDENES: Columna[] = [
  { titulo: "#" },
  { titulo: "Proveedor" },
  { titulo: "Fecha de creación" },
  { titulo: "Estado" }, // ESTADOS_ORDEN_COMPRA
  { titulo: "Valor neto", alinear: "derecha" },
  { titulo: "Impuestos", alinear: "derecha" },
  { titulo: "Monto", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

function Ordenes() {
  const [busqueda, setBusqueda] = useState("");

  return (
    <>
      <BarraHerramientas derecha={<AccionesDerecha />}>
        <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar producto" />
        <BotonMasFiltros />
        <BotonAgrupar />
        <BotonBorrar />
        <BotonActualizar />
        <BotonNuevo que="Nueva orden de compra" />
      </BarraHerramientas>

      <Tabla columnas={COLUMNAS_ORDENES} vacia mensajeVacio="No hay órdenes de compra." />
    </>
  );
}

export default function OrdenesCompraPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Proveedores" titulo="Órdenes de compra" />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "ordenes", label: "Órdenes de compra" },
            { valor: "recepciones", label: "Recepciones" },
            { valor: "pagos", label: "Pagos" },
          ]}
        />

        {/* Recepciones y Pagos: contenido por definir. */}
        {vista === "ordenes" ? <Ordenes /> : <PorDefinir />}
      </Tarjeta>
    </>
  );
}
