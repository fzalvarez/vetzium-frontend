import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";

const COLUMNAS: Columna[] = [
  { titulo: "Producto" },
  { titulo: "Almacén" },
  { titulo: "Precio de compra", alinear: "derecha" },
  { titulo: "Precio de venta", alinear: "derecha" },
  { titulo: "Stock contable", alinear: "derecha" },
];

export default function StockAlmacenPage() {
  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Stock por almacén" />

      <Tarjeta>
        <Tabla columnas={COLUMNAS} vacia mensajeVacio="No hay stock registrado." />
      </Tarjeta>
    </>
  );
}
