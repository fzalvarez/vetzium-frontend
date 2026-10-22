import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Pestanas } from "@/shared/components/Pestanas";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { formatearFecha } from "@/shared/utils/fechas";
import { formatearNumero, formatearSoles } from "@/shared/utils/formato";
import { CLIENTES_EJEMPLO, nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { ITEMS_CUENTA_EJEMPLO, cuentasPorCliente } from "../datos-ejemplo";

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

const CUENTAS = cuentasPorCliente(ITEMS_CUENTA_EJEMPLO);

function PorCliente() {
  const { visibles, paginacion } = usePaginacion(CUENTAS);
  return (
    <Tabla columnas={COLUMNAS_POR_CLIENTE} vacia={CUENTAS.length === 0} mensajeVacio="No hay cuentas activas." paginacion={paginacion}>
      {visibles.map((c) => (
        <Fila key={c.clienteId}>
          <Celda destacada>{c.cliente}</Celda>
          <Celda numerica>{c.telefono}</Celda>
          <Celda numerica>{formatearFecha(c.ultimoMovimiento)}</Celda>
          <Celda alinear="derecha" numerica>{formatearNumero(c.items)}</Celda>
          <Celda alinear="derecha" numerica>{formatearSoles(c.monto)}</Celda>
          <CeldaOpciones etiqueta={c.cliente} />
        </Fila>
      ))}
    </Tabla>
  );
}

function PorItems() {
  const { visibles, paginacion } = usePaginacion(ITEMS_CUENTA_EJEMPLO);
  return (
    <Tabla
      columnas={COLUMNAS_POR_ITEM}
      vacia={ITEMS_CUENTA_EJEMPLO.length === 0}
      mensajeVacio="No hay ítems en cuentas activas."
      paginacion={paginacion}
    >
      {visibles.map((i) => {
        const cliente = CLIENTES_EJEMPLO.find((c) => c.id === i.clienteId);
        return (
          <Fila key={i.id}>
            <Celda numerica>{formatearFecha(i.fechaRegistro)}</Celda>
            <Celda>{cliente ? nombreCompleto(cliente) : null}</Celda>
            <Celda>{i.mascota}</Celda>
            <Celda destacada>{i.descripcion}</Celda>
            <Celda alinear="derecha" numerica>{formatearSoles(i.precioUnitario)}</Celda>
            <Celda alinear="derecha" numerica>{formatearNumero(i.cantidad)}</Celda>
            <Celda alinear="derecha" numerica>{formatearSoles(i.precioUnitario * i.cantidad)}</Celda>
            <CeldaOpciones etiqueta={i.descripcion} />
          </Fila>
        );
      })}
    </Tabla>
  );
}

export default function CuentasActivasPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Cuentas activas" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "cliente", label: "Por cliente" },
            { valor: "items", label: "Por ítems" },
          ]}
        />

        {vista === "cliente" ? <PorCliente /> : <PorItems />}
      </Tarjeta>
    </>
  );
}
