import { ArrowDownLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { Insignia } from "@/shared/components/Insignia";
import { TIPOS_MOVIMIENTO_CAJA } from "../constants";
import type { TipoMovimientoCaja } from "../types/movimiento-caja";

/** Entrada / Salida con ícono y texto (el color nunca va solo). */
export function TipoMovimientoBadge({ tipo }: { tipo: TipoMovimientoCaja }) {
  return tipo === "entrada" ? (
    <Insignia tono="exito" icono={ArrowDownLeftIcon}>
      {TIPOS_MOVIMIENTO_CAJA.entrada}
    </Insignia>
  ) : (
    <Insignia tono="error" icono={ArrowUpRightIcon}>
      {TIPOS_MOVIMIENTO_CAJA.salida}
    </Insignia>
  );
}
