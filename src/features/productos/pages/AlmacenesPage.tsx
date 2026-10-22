import { useState } from "react";
import {
  AccionesDerecha,
  BotonActualizar,
  BotonBorrar,
  BotonNuevo,
} from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { SelectorFiltro } from "@/shared/components/SelectorFiltro";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Nombre de almacén" },
  { titulo: "Código personalizado" },
  { titulo: "Tipo de almacén" }, // p. ej. "Principal"
  { titulo: "Estado" },
  { titulo: "Usar para ventas" }, // Sí / No
  { titulo: "Opciones", alinear: "centro" },
];

// Los estados de un almacén aún no están definidos: por ahora solo "Todos".
const ESTADOS = [{ valor: "todos", label: "Todos" }];

export default function AlmacenesPage() {
  const [estado, setEstado] = useState("todos");

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Almacenes" />

      <Tarjeta>
        <BarraHerramientas derecha={<AccionesDerecha />}>
          <SelectorFiltro etiqueta="Estados" opciones={ESTADOS} valor={estado} onChange={setEstado} />
          <BotonBorrar />
          <BotonActualizar />
          <BotonNuevo que="Nuevo almacén" />
        </BarraHerramientas>

        <Tabla columnas={COLUMNAS} vacia mensajeVacio="No hay almacenes registrados." />
      </Tarjeta>
    </>
  );
}
