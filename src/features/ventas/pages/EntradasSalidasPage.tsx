import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";

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
  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Entradas/Salidas" />

      <Tarjeta>
        <Tabla columnas={COLUMNAS} vacia mensajeVacio="No hay movimientos registrados." />
      </Tarjeta>
    </>
  );
}
