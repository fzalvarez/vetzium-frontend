import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Pestanas } from "@/shared/components/Pestanas";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";

const VISTAS = ["cliente", "items"] as const;

const COLUMNAS_POR_CLIENTE: Columna[] = [
  { titulo: "Cliente" },
  { titulo: "Teléfono" },
  { titulo: "Último movimiento" },
  { titulo: "Ítems en la lista", alinear: "derecha" },
  { titulo: "Monto", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

const COLUMNAS_POR_ITEM: Columna[] = [
  { titulo: "Fecha de registro" },
  { titulo: "Cliente" },
  { titulo: "Mascota" },
  { titulo: "Descripción" },
  { titulo: "P. U.", alinear: "derecha" },
  { titulo: "Cantidad", alinear: "derecha" },
  { titulo: "Total", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

export default function CuentasActivasPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Cuentas activas" />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "cliente", label: "Por cliente" },
            { valor: "items", label: "Por ítems" },
          ]}
        />

        {vista === "cliente" ? (
          <Tabla columnas={COLUMNAS_POR_CLIENTE} vacia mensajeVacio="No hay cuentas activas." />
        ) : (
          <Tabla columnas={COLUMNAS_POR_ITEM} vacia mensajeVacio="No hay ítems en cuentas activas." />
        )}
      </Tarjeta>
    </>
  );
}
