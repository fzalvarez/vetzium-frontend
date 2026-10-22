import { FileTextIcon } from "lucide-react";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Pestanas } from "@/shared/components/Pestanas";
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
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <FileTextIcon className="size-6 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Contenido por definir.</p>
        </div>
      </Tarjeta>
    </>
  );
}
