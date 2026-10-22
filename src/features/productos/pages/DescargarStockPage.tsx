import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";

const VISTAS = ["emitidas", "items"] as const;

export default function DescargarStockPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Productos" titulo="Descargar stock" />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "emitidas", label: "Descargas emitidas" },
            { valor: "items", label: "Por ítems" },
          ]}
        />

        {/* Columnas de ambas pestañas por definir. */}
        <PorDefinir />
      </Tarjeta>
    </>
  );
}
