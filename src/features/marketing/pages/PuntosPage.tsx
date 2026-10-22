import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { formatearNumero } from "@/shared/utils/formato";
import { CLIENTES_EJEMPLO, nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { SALDOS_PUNTOS_EJEMPLO } from "../datos-ejemplo";

const COLUMNAS: Columna[] = [
  { titulo: "Propietario" },
  { titulo: "Email" },
  { titulo: "Puntos vigentes", alinear: "derecha" },
  { titulo: "Puntos por vencer", alinear: "derecha" },
  { titulo: "Puntos vencidos", alinear: "derecha" },
  { titulo: "Opciones", alinear: "centro" },
];

// Ordenados por puntos vigentes, de mayor a menor.
const SALDOS = [...SALDOS_PUNTOS_EJEMPLO].sort((a, b) => b.vigentes - a.vigentes);

export default function PuntosPage() {
  const { visibles, paginacion } = usePaginacion(SALDOS);

  return (
    <>
      <EncabezadoPagina modulo="Marketing" titulo="Puntos" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <Tabla columnas={COLUMNAS} vacia={SALDOS.length === 0} mensajeVacio="Ningún propietario tiene puntos." paginacion={paginacion}>
          {visibles.map((s) => {
            const c = CLIENTES_EJEMPLO.find((x) => x.id === s.clienteId);
            const nombre = c ? nombreCompleto(c) : `Cliente ${s.clienteId}`;
            return (
              <Fila key={s.clienteId}>
                <Celda destacada>{nombre}</Celda>
                <Celda>{c?.email}</Celda>
                <Celda alinear="derecha" numerica destacada>{formatearNumero(s.vigentes)}</Celda>
                <Celda
                  alinear="derecha"
                  numerica
                  className={s.porVencer > 0 ? "font-medium text-warning-700 dark:text-warning-400" : undefined}
                >
                  {formatearNumero(s.porVencer)}
                </Celda>
                <Celda alinear="derecha" numerica className="text-gray-500 dark:text-gray-400">
                  {formatearNumero(s.vencidos)}
                </Celda>
                <CeldaOpciones etiqueta={nombre} />
              </Fila>
            );
          })}
        </Tabla>
      </Tarjeta>
    </>
  );
}
