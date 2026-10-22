import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Celda, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { formatearMes } from "@/shared/utils/fechas";
import { formatearNumero } from "@/shared/utils/formato";
import { NUEVOS_CLIENTES_EJEMPLO } from "../datos-ejemplo";

const VISTAS = ["nuevos", "ubicacion", "zona", "informacion", "etiquetas"] as const;

// Un renglón por mes (p. ej. "Octubre 2026") con la cantidad de clientes registrados.
const COLUMNAS_NUEVOS: Columna[] = [
  { titulo: "Mes" },
  { titulo: "Clientes registrados", alinear: "derecha" },
];

function NuevosClientes() {
  const { visibles, paginacion } = usePaginacion(NUEVOS_CLIENTES_EJEMPLO);
  return (
    <Tabla
      columnas={COLUMNAS_NUEVOS}
      vacia={NUEVOS_CLIENTES_EJEMPLO.length === 0}
      mensajeVacio="No hay clientes registrados."
      paginacion={paginacion}
    >
      {visibles.map((n) => (
        <Fila key={n.mes}>
          <Celda destacada>{formatearMes(n.mes)}</Celda>
          <Celda alinear="derecha" numerica>{formatearNumero(n.registrados)}</Celda>
        </Fila>
      ))}
    </Tabla>
  );
}

export default function GestionClientesPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina
        modulo="Clientes"
        titulo="Gestión"
        descripcion="Indicadores de gestión de clientes."
        acciones={<EtiquetaEjemplo />}
      />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "nuevos", label: "Nuevos clientes" },
            { valor: "ubicacion", label: "Ubicación" },
            { valor: "zona", label: "Zona" },
            { valor: "informacion", label: "Información" },
            { valor: "etiquetas", label: "Etiquetas" },
          ]}
        />

        {/* Ubicación, Zona, Información y Etiquetas: indicadores por definir. */}
        {vista === "nuevos" ? <NuevosClientes /> : <PorDefinir />}
      </Tarjeta>
    </>
  );
}
