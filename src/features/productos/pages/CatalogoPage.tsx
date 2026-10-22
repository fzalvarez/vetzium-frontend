import { Checkbox } from "@/components/ui/checkbox";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";

// Sin datos todavía: la casilla de "seleccionar todos" queda deshabilitada.
const COLUMNAS: Columna[] = [
  { titulo: "Seleccionar", encabezado: <Checkbox aria-label="Seleccionar todos" disabled /> },
  { titulo: "Cód. de barras" },
  { titulo: "Nombre" },
  { titulo: "Marca" },
  { titulo: "Proveedor" },
  { titulo: "Líneas" },
  { titulo: "Código tributario" },
  { titulo: "Empresa" },
];

export default function CatalogoPage() {
  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Catálogo" />

      <Tarjeta>
        <Tabla columnas={COLUMNAS} vacia mensajeVacio="No hay productos registrados." />
      </Tarjeta>
    </>
  );
}
