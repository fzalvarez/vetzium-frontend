import { Link } from "react-router-dom";
import { AlertTriangleIcon, CheckIcon, MegaphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Insignia } from "@/shared/components/Insignia";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import type { Mascota } from "@/features/mascotas/types";
import type { Turno } from "../types";

const HORA = new Intl.DateTimeFormat("es-PE", { timeZone: "America/Lima", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

/** "5 min", "1 h 12 min". */
function duracion(ms: number): string {
  const min = Math.max(0, Math.floor(ms / 60_000));
  return min < 60 ? `${min} min` : `${Math.floor(min / 60)} h ${min % 60} min`;
}

/** Tarjeta de un turno con su acción según el estado (Llamar / Finalizar). */
export function TarjetaTurno({
  turno,
  mascota,
  ahora,
  onLlamar,
  onFinalizar,
}: {
  turno: Turno;
  mascota: Mascota | undefined;
  ahora: number;
  onLlamar: () => void;
  onFinalizar: () => void;
}) {
  const propietario = useClientesStore((s) => s.clientes.find((c) => c.id === mascota?.clienteId));

  const tiempo =
    turno.estado === "espera"
      ? `Espera ${duracion(ahora - turno.llegada)}`
      : turno.estado === "atencion"
        ? `En atención ${duracion(ahora - (turno.inicioAtencion ?? ahora))}`
        : `Atendido a las ${HORA.format(turno.fin ?? ahora)}`;

  // Más de 30 min esperando: el tiempo se resalta (con texto, no solo color).
  const demora = turno.estado === "espera" && ahora - turno.llegada > 30 * 60_000;

  return (
    <li
      className={cn(
        "rounded-lg border bg-white p-3 dark:bg-gray-900",
        turno.estado === "atencion" ? "border-brand-300 dark:border-brand-500/50" : "border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold tabular-nums text-gray-500 dark:text-gray-400">
            {turno.numero} · llegó {HORA.format(turno.llegada)}
          </p>
          {mascota ? (
            <Link to={`/mascotas/${mascota.id}`} className="font-semibold text-gray-800 hover:text-brand-600 dark:text-gray-100 dark:hover:text-brand-400">
              {mascota.nombre} <span className="font-normal text-gray-500 dark:text-gray-400">· {mascota.especie}</span>
            </Link>
          ) : (
            <p className="font-semibold text-gray-800 dark:text-gray-100">Mascota {turno.mascotaId}</p>
          )}
          {propietario && <p className="truncate text-xs text-gray-500 dark:text-gray-400">{nombreCompleto(propietario)}</p>}
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{turno.motivo}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="flex flex-wrap items-center gap-1.5 text-xs tabular-nums text-gray-500 dark:text-gray-400">
          {tiempo}
          {demora && (
            <Insignia tono="aviso" icono={AlertTriangleIcon}>
              Demora
            </Insignia>
          )}
        </span>
        {turno.estado === "espera" && (
          <Button size="sm" variant="warning" onClick={onLlamar}>
            <MegaphoneIcon className="size-4" />
            Llamar
          </Button>
        )}
        {turno.estado === "atencion" && (
          <Button size="sm" variant="success" onClick={onFinalizar}>
            <CheckIcon className="size-4" />
            Finalizar
          </Button>
        )}
      </div>
    </li>
  );
}
