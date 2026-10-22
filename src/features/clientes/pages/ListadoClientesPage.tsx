import { Checkbox } from "@/components/ui/checkbox";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Celda, CeldaCasilla, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { useSeleccion } from "@/shared/hooks/useSeleccion";
import { formatearFecha } from "@/shared/utils/fechas";
import { ESTADOS_CLIENTE } from "../constants";
import { CLIENTES_EJEMPLO, nombreCompleto } from "../datos-ejemplo";

export default function ListadoClientesPage() {
  const { visibles, paginacion } = usePaginacion(CLIENTES_EJEMPLO);
  const seleccion = useSeleccion(visibles.map((c) => c.id));

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
      <EncabezadoPagina modulo="Clientes" titulo="Listado" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        {seleccion.seleccionados.size > 0 && (
          <p className="border-b border-gray-200 bg-brand-50/60 px-6 py-2 text-sm text-brand-700 dark:border-gray-800 dark:bg-brand-500/10 dark:text-brand-400">
            {seleccion.seleccionados.size === 1
              ? "1 cliente seleccionado"
              : `${seleccion.seleccionados.size} clientes seleccionados`}
          </p>
        )}

        <Tabla
          columnas={columnas}
          vacia={CLIENTES_EJEMPLO.length === 0}
          mensajeVacio="No hay clientes registrados."
          paginacion={paginacion}
        >
          {visibles.map((c) => (
            <Fila key={c.id} seleccionada={seleccion.estaSeleccionado(c.id)}>
              <CeldaCasilla
                marcada={seleccion.estaSeleccionado(c.id)}
                onChange={() => seleccion.alternar(c.id)}
                etiqueta={`Seleccionar a ${nombreCompleto(c)}`}
              />
              <Celda numerica>{formatearFecha(c.fechaRegistro)}</Celda>
              <Celda destacada>{nombreCompleto(c)}</Celda>
              <Celda numerica>{c.telefonos.join(" · ")}</Celda>
              <Celda>{c.email}</Celda>
              <Celda>{c.direccion}</Celda>
              <Celda>
                <Insignia tono={c.estado === "activo" ? "exito" : "neutro"}>{ESTADOS_CLIENTE[c.estado]}</Insignia>
              </Celda>
              <CeldaOpciones etiqueta={nombreCompleto(c)} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>
    </>
  );
}
