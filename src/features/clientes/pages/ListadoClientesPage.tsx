import { Checkbox } from "@/components/ui/checkbox";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";

export default function ListadoClientesPage() {
  // Sin datos todavía: la casilla de "seleccionar todos" queda deshabilitada.
  const columnas: Columna[] = [
    { titulo: "Seleccionar", encabezado: <Checkbox aria-label="Seleccionar todos" disabled /> },
    { titulo: "Fecha de registro" },
    { titulo: "Nombres y apellidos" },
    { titulo: "Teléfonos" },
    { titulo: "Email" },
    { titulo: "Dirección" },
    { titulo: "Estado" },
    { titulo: "Opciones", alinear: "centro" },
  ];

  return (
    <>
      <EncabezadoPagina modulo="Clientes" titulo="Listado" />

      <Tarjeta>
        <Tabla columnas={columnas} vacia mensajeVacio="No hay clientes registrados." />
      </Tarjeta>
    </>
  );
}
