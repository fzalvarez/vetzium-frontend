import { useState } from "react";
import {
  AccionesDerecha,
  BotonActualizar,
  BotonAgrupar,
  BotonBorrar,
  BotonMasFiltros,
} from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { formatearFecha } from "@/shared/utils/fechas";
import { formatearNumero } from "@/shared/utils/formato";
import { coincide } from "@/shared/utils/texto";
import { useReglasStore } from "@/features/configuracion/store/reglas.store";
import { EstadoVencimiento } from "../components/EstadoVencimiento";
import { LOTES_EJEMPLO } from "../datos-ejemplo";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Fecha de registro" },
  { titulo: "Producto" },
  { titulo: "# Lote" },
  { titulo: "Almacén" },
  { titulo: "Fecha de vencimiento" },
  { titulo: "Cantidad entrada", alinear: "derecha" },
  { titulo: "Saldo", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

export default function LotesPage() {
  const diasAviso = useReglasStore((s) => s.diasAvisoVencimiento);
  const [busqueda, setBusqueda] = useState("");
  const filtrados = LOTES_EJEMPLO.filter((l) => coincide(busqueda, l.producto));
  const { visibles, paginacion } = usePaginacion(filtrados);

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Lotes" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas derecha={<AccionesDerecha />}>
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar producto" />
          <BotonMasFiltros />
          <BotonAgrupar />
          <BotonBorrar />
          <BotonActualizar />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio={busqueda ? "Ningún lote coincide con la búsqueda." : "No hay lotes registrados."}
          paginacion={paginacion}
        >
          {visibles.map((l) => (
            <Fila key={l.id}>
              <Celda numerica className="text-gray-500 dark:text-gray-400">{l.id}</Celda>
              <Celda numerica>{formatearFecha(l.fechaRegistro)}</Celda>
              <Celda destacada>{l.producto}</Celda>
              <Celda numerica>{l.numeroLote}</Celda>
              <Celda>{l.almacen}</Celda>
              <Celda numerica>
                <span className="flex items-center gap-2">
                  {formatearFecha(l.fechaVencimiento)}
                  <EstadoVencimiento fecha={l.fechaVencimiento} diasAviso={diasAviso} />
                </span>
              </Celda>
              <Celda alinear="derecha" numerica>{formatearNumero(l.cantidadEntrada)}</Celda>
              <Celda alinear="derecha" numerica>{formatearNumero(l.saldo)}</Celda>
              <CeldaOpciones etiqueta={`lote ${l.numeroLote}`} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>
    </>
  );
}
