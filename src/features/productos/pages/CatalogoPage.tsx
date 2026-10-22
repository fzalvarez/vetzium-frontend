import { Checkbox } from "@/components/ui/checkbox";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, CeldaCasilla, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { useSeleccion } from "@/shared/hooks/useSeleccion";
import { PRODUCTOS_EJEMPLO } from "../datos-ejemplo";

export default function CatalogoPage() {
  const { visibles, paginacion } = usePaginacion(PRODUCTOS_EJEMPLO);
  const seleccion = useSeleccion(visibles.map((p) => p.id));

  const columnas: Columna[] = [
    {
      titulo: "Seleccionar",
      encabezado: (
        <Checkbox
          aria-label="Seleccionar todos"
          checked={seleccion.todosVisibles}
          indeterminado={seleccion.parcial}
          onChange={seleccion.alternarTodos}
          disabled={visibles.length === 0}
        />
      ),
    },
    { titulo: "Cód. de barras" },
    { titulo: "Nombre" },
    { titulo: "Marca" },
    { titulo: "Proveedor" },
    { titulo: "Líneas" },
    { titulo: "Código tributario" },
    { titulo: "Empresa" },
  ];

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Catálogo" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        {seleccion.seleccionados.size > 0 && (
          <p className="border-b border-gray-200 bg-brand-50/60 px-6 py-2 text-sm text-brand-700 dark:border-gray-800 dark:bg-brand-500/10 dark:text-brand-400">
            {seleccion.seleccionados.size === 1
              ? "1 producto seleccionado"
              : `${seleccion.seleccionados.size} productos seleccionados`}
          </p>
        )}

        <Tabla
          columnas={columnas}
          vacia={PRODUCTOS_EJEMPLO.length === 0}
          mensajeVacio="No hay productos registrados."
          paginacion={paginacion}
        >
          {visibles.map((p) => (
            <Fila key={p.id} seleccionada={seleccion.estaSeleccionado(p.id)}>
              <CeldaCasilla
                marcada={seleccion.estaSeleccionado(p.id)}
                onChange={() => seleccion.alternar(p.id)}
                etiqueta={`Seleccionar ${p.nombre}`}
              />
              <Celda numerica>{p.codigoBarras}</Celda>
              <Celda destacada>{p.nombre}</Celda>
              <Celda>{p.marca}</Celda>
              <Celda>{p.proveedor}</Celda>
              <Celda>{p.lineas}</Celda>
              <Celda>{p.codigoTributario}</Celda>
              <Celda>{p.empresa}</Celda>
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>
    </>
  );
}
