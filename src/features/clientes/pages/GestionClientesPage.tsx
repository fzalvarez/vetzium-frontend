import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";

const VISTAS = ["nuevos", "ubicacion", "zona", "informacion", "etiquetas"] as const;

// Un renglón por mes (p. ej. "Octubre 2026") con la cantidad de clientes registrados.
const COLUMNAS_NUEVOS: Columna[] = [
  { titulo: "Mes" },
  { titulo: "Clientes registrados", alinear: "derecha" },
];

export default function GestionClientesPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Clientes" titulo="Gestión" descripcion="Indicadores de gestión de clientes." />

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

        {vista === "nuevos" ? (
          <Tabla columnas={COLUMNAS_NUEVOS} vacia mensajeVacio="No hay clientes registrados." />
        ) : (
          // Ubicación, Zona, Información y Etiquetas: indicadores por definir.
          <PorDefinir />
        )}
      </Tarjeta>
    </>
  );
}
