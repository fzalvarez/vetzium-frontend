import { useEffect, useState } from "react";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { notifySuccess } from "@/shared/utils";
import { useMascotasStore } from "@/features/mascotas/store/mascotas.store";
import { AgregarTurnoModal } from "../components/AgregarTurnoModal";
import { TarjetaTurno } from "../components/TarjetaTurno";
import { useSalaEsperaStore } from "../store/sala-espera.store";
import type { EstadoTurno, Turno } from "../types";

const COLUMNAS: { estado: EstadoTurno; titulo: string; vacio: string }[] = [
  { estado: "espera", titulo: "En espera", vacio: "Nadie esperando." },
  { estado: "atencion", titulo: "En atención", vacio: "Nadie en atención." },
  { estado: "atendido", titulo: "Atendidos hoy", vacio: "Aún no hay atendidos." },
];

// En espera: por orden de llegada. En atención y atendidos: el más reciente arriba.
const ordenar = (estado: EstadoTurno) => (a: Turno, b: Turno) =>
  estado === "espera" ? a.llegada - b.llegada : (b.fin ?? b.inicioAtencion ?? 0) - (a.fin ?? a.inicioAtencion ?? 0);

/** Sala de espera de hoy: tablero En espera → En atención → Atendidos. */
export default function SalaEsperaPage() {
  const turnos = useSalaEsperaStore((s) => s.turnos);
  const { agregar, llamar, finalizar } = useSalaEsperaStore();
  const mascotas = useMascotasStore((s) => s.mascotas);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Los tiempos de espera avanzan solos: se refresca cada 30 s.
  const [ahora, setAhora] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const mascota = (id: number) => mascotas.find((m) => m.id === id);

  return (
    <>
      <EncabezadoPagina
        titulo="Sala de espera"
        descripcion="Turnos de hoy, en tiempo real."
        acciones={
          <>
            <EtiquetaEjemplo />
            <BotonNuevo label="Agregar a la sala" que="Agregar a la sala" onClick={() => setModalAbierto(true)} />
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {COLUMNAS.map((col) => {
          const lista = turnos.filter((t) => t.estado === col.estado).sort(ordenar(col.estado));
          return (
            <Tarjeta key={col.estado} className="bg-gray-50/80 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{col.titulo}</h2>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-bold tabular-nums text-gray-700 dark:bg-white/10 dark:text-gray-300">
                  {lista.length}
                </span>
              </div>
              {lista.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">{col.vacio}</p>
              ) : (
                <ul className="flex flex-col gap-3 p-3">
                  {lista.map((t) => (
                    <TarjetaTurno
                      key={t.id}
                      turno={t}
                      mascota={mascota(t.mascotaId)}
                      ahora={ahora}
                      onLlamar={() => {
                        llamar(t.id);
                        setAhora(Date.now());
                        notifySuccess(`${t.numero} · ${mascota(t.mascotaId)?.nombre ?? ""} pasa a atención.`);
                      }}
                      onFinalizar={() => {
                        finalizar(t.id);
                        setAhora(Date.now());
                        notifySuccess(`${t.numero} atendido.`);
                      }}
                    />
                  ))}
                </ul>
              )}
            </Tarjeta>
          );
        })}
      </div>

      {modalAbierto && (
        <AgregarTurnoModal
          // Una mascota que ya está en espera o en atención no se agrega otra vez.
          mascotas={mascotas.filter((m) => !turnos.some((t) => t.mascotaId === m.id && t.estado !== "atendido"))}
          onClose={() => setModalAbierto(false)}
          onGuardar={(mascotaId, motivo) => {
            const numero = agregar(mascotaId, motivo);
            setAhora(Date.now());
            notifySuccess(`Turno ${numero} agregado.`);
            setModalAbierto(false);
          }}
        />
      )}
    </>
  );
}
