import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";

const VISTAS = ["emitidos", "items"] as const;

export default function ComprobantesPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);

  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Comprobantes" />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "emitidos", label: "Comprobantes emitidos" },
            { valor: "items", label: "Por ítems" },
          ]}
        />

        {/* Columnas de ambas pestañas por definir. */}
        <PorDefinir />
      </Tarjeta>
    </>
  );
}
