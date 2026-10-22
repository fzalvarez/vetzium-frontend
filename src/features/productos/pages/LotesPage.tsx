import { useState } from "react";
import {
  AccionesDerecha,
  BotonActualizar,
  BotonAgrupar,
  BotonBorrar,
  BotonMasFiltros,
} from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Fecha de registro" },
  { titulo: "Producto" },
  { titulo: "# Lote" },
  { titulo: "Almacén" },
  { titulo: "Fecha de vencimiento" },
  { titulo: "Cantidad entrada", alinear: "derecha" },
  { titulo: "Saldo", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

export default function LotesPage() {
  const [busqueda, setBusqueda] = useState("");

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Lotes" />

      <Tarjeta>
        <BarraHerramientas derecha={<AccionesDerecha />}>
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar producto" />
          <BotonMasFiltros />
          <BotonAgrupar />
          <BotonBorrar />
          <BotonActualizar />
        </BarraHerramientas>

        <Tabla columnas={COLUMNAS} vacia mensajeVacio="No hay lotes registrados." />
      </Tarjeta>
    </>
  );
}
