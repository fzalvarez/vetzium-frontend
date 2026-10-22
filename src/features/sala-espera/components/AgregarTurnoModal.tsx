import { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BuscadorSeleccion } from "@/shared/components/BuscadorSeleccion";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { coincide } from "@/shared/utils/texto";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import type { Cliente } from "@/features/clientes/types";
import type { Mascota } from "@/features/mascotas/types";

const propietario = (clientes: Cliente[], m: Mascota) => {
  const c = clientes.find((x) => x.id === m.clienteId);
  return c ? nombreCompleto(c) : "";
};

/** Agregar un paciente a la sala de espera: solo mascota y motivo. */
export function AgregarTurnoModal({
  mascotas,
  onClose,
  onGuardar,
}: {
  mascotas: Mascota[];
  onClose: () => void;
  onGuardar: (mascotaId: number, motivo: string) => void;
}) {
  const clientes = useClientesStore((s) => s.clientes);
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [motivo, setMotivo] = useState("");
  const [intentado, setIntentado] = useState(false);

  const errorMascota = intentado && !mascota ? "Elige la mascota." : undefined;
  const errorMotivo = intentado && !motivo.trim() ? "Ingresa el motivo." : undefined;

  const guardar = (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    setIntentado(true);
    if (mascota && motivo.trim()) onGuardar(mascota.id, motivo.trim());
  };

  return (
    <ModalFormulario titulo="Agregar a la sala de espera" etiquetaGuardar="Agregar" onClose={onClose} onSubmit={guardar}>
      <Campo etiqueta="Mascota" htmlFor="se-mascota" error={errorMascota} className="sm:col-span-2">
        {mascota ? (
          <div className="flex h-10 items-center justify-between rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700">
            <span className="text-gray-800 dark:text-gray-100">
              {mascota.nombre} · {mascota.especie}
              <span className="text-gray-500 dark:text-gray-400"> — {propietario(clientes, mascota)}</span>
            </span>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Cambiar mascota" onClick={() => setMascota(null)}>
              <XIcon className="size-4" />
            </Button>
          </div>
        ) : (
          <BuscadorSeleccion
            id="se-mascota"
            enLinea
            opciones={mascotas}
            filtrar={(m, q) => coincide(q, m.nombre, m.numeroHistoria, propietario(clientes, m))}
            clave={(m) => m.id}
            onSeleccionar={setMascota}
            placeholder="Buscar mascota o propietario"
            sinResultados="Ninguna mascota coincide."
            renderOpcion={(m) => (
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {m.nombre} · {m.especie}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{propietario(clientes, m)}</p>
              </div>
            )}
          />
        )}
      </Campo>

      <Campo etiqueta="Motivo" htmlFor="se-motivo" error={errorMotivo} className="sm:col-span-2">
        <Input
          id="se-motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Ej.: Consulta general"
          aria-invalid={!!errorMotivo}
        />
      </Campo>
    </ModalFormulario>
  );
}
