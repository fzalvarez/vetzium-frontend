import { AlertTriangleIcon, OctagonXIcon } from "lucide-react";
import { Insignia } from "@/shared/components/Insignia";
import { diasHasta } from "@/shared/utils/fechas";

/**
 * "Vencido" o "Por vencer" según la regla de Configuración › General (días de aviso).
 * Un lote vigente fuera del aviso no muestra nada.
 */
export function EstadoVencimiento({ fecha, diasAviso }: { fecha: string; diasAviso: number }) {
  const dias = diasHasta(fecha);

  if (dias < 0) {
    return (
      <Insignia tono="error" icono={OctagonXIcon}>
        Vencido
      </Insignia>
    );
  }
  if (dias <= diasAviso) {
    return (
      <span title={dias === 0 ? "Vence hoy" : `Vence en ${dias} ${dias === 1 ? "día" : "días"}`}>
        <Insignia tono="aviso" icono={AlertTriangleIcon}>
          Por vencer · {dias} {dias === 1 ? "día" : "días"}
        </Insignia>
      </span>
    );
  }
  return null;
}
