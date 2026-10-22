import { useState } from "react";
import { CircleCheckIcon, PackageCheckIcon } from "lucide-react";
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
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { notifySuccess } from "@/shared/utils";
import { formatearFecha } from "@/shared/utils/fechas";
import { formatearSoles } from "@/shared/utils/formato";
import { coincide } from "@/shared/utils/texto";
import { OrdenCompraModal } from "../components/OrdenCompraModal";
import { ESTADOS_ORDEN_COMPRA } from "../constants";
import { ORDENES_COMPRA_EJEMPLO, PROVEEDORES_EJEMPLO, nombreProveedor } from "../datos-ejemplo";
import type { OrdenCompra } from "../types";

const VISTAS = ["ordenes", "recepciones", "pagos"] as const;

const COLUMNAS_ORDENES: Columna[] = [
  { titulo: "#" },
  { titulo: "Proveedor" },
  { titulo: "Fecha de creación" },
  { titulo: "Estado" },
  { titulo: "Valor neto", alinear: "derecha" },
  { titulo: "Impuestos", alinear: "derecha" },
  { titulo: "Monto", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

function Ordenes() {
  // Sin backend: en memoria (se pierde al recargar).
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>(ORDENES_COMPRA_EJEMPLO);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  // Las órdenes aún no tienen productos: mientras tanto se busca por número y proveedor.
  const filtrados = ordenes.filter((o) => coincide(busqueda, o.numero, nombreProveedor(o.proveedorId)));
  const { visibles, paginacion } = usePaginacion(filtrados);

  const guardar = (orden: Omit<OrdenCompra, "numero">) => {
    const mayor = Math.max(0, ...ordenes.map((o) => Number(o.numero.split("-")[1]) || 0));
    const numero = `OC-${String(mayor + 1).padStart(4, "0")}`;
    setOrdenes((actuales) => [{ numero, ...orden }, ...actuales]);
    notifySuccess(`Orden ${numero} creada.`);
    setModalAbierto(false);
  };

  return (
    <>
      <BarraHerramientas derecha={<AccionesDerecha />}>
        <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar producto" />
        <BotonMasFiltros />
        <BotonAgrupar />
        <BotonBorrar />
        <BotonActualizar />
        <BotonNuevo que="Nueva orden de compra" onClick={() => setModalAbierto(true)} />
      </BarraHerramientas>

      <Tabla
        columnas={COLUMNAS_ORDENES}
        vacia={filtrados.length === 0}
        mensajeVacio={busqueda ? "Ninguna orden coincide con la búsqueda." : "No hay órdenes de compra."}
        paginacion={paginacion}
      >
        {visibles.map((o) => (
          <Fila key={o.numero}>
            <Celda numerica destacada>{o.numero}</Celda>
            <Celda>{nombreProveedor(o.proveedorId)}</Celda>
            <Celda numerica>{formatearFecha(o.fechaCreacion)}</Celda>
            <Celda>
              {o.estado === "recibido" ? (
                <Insignia tono="exito" icono={PackageCheckIcon}>{ESTADOS_ORDEN_COMPRA.recibido}</Insignia>
              ) : (
                <Insignia tono="info" icono={CircleCheckIcon}>{ESTADOS_ORDEN_COMPRA.aprobado}</Insignia>
              )}
            </Celda>
            <Celda alinear="derecha" numerica>{formatearSoles(o.valorNeto)}</Celda>
            <Celda alinear="derecha" numerica>{formatearSoles(o.impuestos)}</Celda>
            <Celda alinear="derecha" numerica destacada>{formatearSoles(o.valorNeto + o.impuestos)}</Celda>
            <CeldaOpciones etiqueta={o.numero} />
          </Fila>
        ))}
      </Tabla>

      {modalAbierto && (
        <OrdenCompraModal proveedores={PROVEEDORES_EJEMPLO} onClose={() => setModalAbierto(false)} onGuardar={guardar} />
      )}
    </>
  );
}

export default function OrdenesCompraPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Proveedores" titulo="Órdenes de compra" acciones={<EtiquetaEjemplo />} />

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
