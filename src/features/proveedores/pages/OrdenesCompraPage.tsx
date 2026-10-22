import { useState } from "react";
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  GroupIcon,
  ListFilterIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { proximamente } from "@/shared/utils";

const VISTAS = ["ordenes", "recepciones", "pagos"] as const;

const COLUMNAS_ORDENES: Columna[] = [
  { titulo: "#" },
  { titulo: "Proveedor" },
  { titulo: "Fecha de creación" },
  { titulo: "Estado" }, // ESTADOS_ORDEN_COMPRA
  { titulo: "Valor neto", alinear: "derecha" },
  { titulo: "Impuestos", alinear: "derecha" },
  { titulo: "Monto", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

function Ordenes() {
  const [busqueda, setBusqueda] = useState("");

  return (
    <>
      <BarraHerramientas
        derecha={
          <>
            <Button variant="outline" size="sm" onClick={() => proximamente("Exportar")}>
              <DownloadIcon className="size-4" />
              Exportar
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="Opciones" title="Opciones" onClick={() => proximamente("Opciones")}>
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </>
        }
      >
        <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar producto" />
        <Button variant="outline" size="sm" onClick={() => proximamente("Más filtros")}>
          <ListFilterIcon className="size-4" />
          Más filtros
        </Button>
        <Button variant="outline" size="sm" onClick={() => proximamente("Agrupar")}>
          <GroupIcon className="size-4" />
          Agrupar
        </Button>
        <Button variant="outline" size="sm" onClick={() => proximamente("Borrar")}>
          <Trash2Icon className="size-4" />
          Borrar
        </Button>
        <Button variant="outline" size="sm" onClick={() => proximamente("Actualizar")}>
          <RefreshCwIcon className="size-4" />
          Actualizar
        </Button>
        <Button size="sm" onClick={() => proximamente("Nueva orden de compra")}>
          <PlusIcon className="size-4" />
          Nuevo
        </Button>
      </BarraHerramientas>

      <Tabla columnas={COLUMNAS_ORDENES} vacia mensajeVacio="No hay órdenes de compra." />
    </>
  );
}

export default function OrdenesCompraPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Proveedores" titulo="Órdenes de compra" />

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
