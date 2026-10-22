import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { formatearNumero, formatearSoles } from "@/shared/utils/formato";
import { STOCK_ALMACEN_EJEMPLO } from "../datos-ejemplo";

const COLUMNAS: Columna[] = [
  { titulo: "Producto" },
  { titulo: "Almacén" },
  { titulo: "Precio de compra", alinear: "derecha" },
  { titulo: "Precio de venta", alinear: "derecha" },
  { titulo: "Stock contable", alinear: "derecha" },
];

export default function StockAlmacenPage() {
  const { visibles, paginacion } = usePaginacion(STOCK_ALMACEN_EJEMPLO);

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Stock por almacén" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <Tabla
          columnas={COLUMNAS}
          vacia={STOCK_ALMACEN_EJEMPLO.length === 0}
          mensajeVacio="No hay stock registrado."
          paginacion={paginacion}
        >
          {visibles.map((s) => (
            <Fila key={s.id}>
              <Celda destacada>{s.producto}</Celda>
              <Celda>{s.almacen}</Celda>
              <Celda alinear="derecha" numerica>{formatearSoles(s.precioCompra)}</Celda>
              <Celda alinear="derecha" numerica>{formatearSoles(s.precioVenta)}</Celda>
              <Celda alinear="derecha" numerica>{formatearNumero(s.stockContable)}</Celda>
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>
    </>
  );
}
