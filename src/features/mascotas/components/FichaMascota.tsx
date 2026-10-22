import { BirdIcon, CameraIcon, CatIcon, DogIcon, PawPrintIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proximamente } from "@/shared/utils";
import { calcularEdad, formatearFecha } from "@/shared/utils/fechas";
import type { Cliente } from "@/features/clientes/types";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { SEXOS } from "../constants";
import type { Mascota } from "../types";

const ICONO_ESPECIE: Record<string, typeof PawPrintIcon> = { Perro: DogIcon, Gato: CatIcon, Ave: BirdIcon };

function Dato({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 text-sm">
      <dt className="text-gray-500 dark:text-gray-400">{etiqueta}</dt>
      <dd className="text-right font-medium text-gray-800 dark:text-gray-100">{children}</dd>
    </div>
  );
}

/** Columna izquierda de la mascota: foto y datos principales. */
export function FichaMascota({ mascota, propietario }: { mascota: Mascota; propietario: Cliente | undefined }) {
  const Icono = ICONO_ESPECIE[mascota.especie] ?? PawPrintIcon;

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="relative">
        {mascota.foto ? (
          <img src={mascota.foto} alt={mascota.nombre} className="aspect-square w-full rounded-xl object-cover" />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
            <Icono className="size-20 text-brand-300 dark:text-brand-500/60" aria-hidden />
          </div>
        )}
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-900/90"
          aria-label="Cambiar foto"
          title="Cambiar foto"
          onClick={() => proximamente("Cambiar foto")}
        >
          <CameraIcon className="size-4" />
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{mascota.nombre}</h2>
        <p className="text-sm tabular-nums text-gray-500 dark:text-gray-400">N.° historia clínica {mascota.numeroHistoria}</p>
      </div>

      <dl className="divide-y divide-gray-100 dark:divide-gray-800">
        <Dato etiqueta="Especie">{mascota.especie}</Dato>
        <Dato etiqueta="Raza">{mascota.raza || "—"}</Dato>
        <Dato etiqueta="Sexo">{SEXOS[mascota.sexo]}</Dato>
        <Dato etiqueta="Esterilizado">{mascota.esterilizado ? "Sí" : "No"}</Dato>
        <Dato etiqueta="Fecha de nacimiento">
          {mascota.fechaNacimiento ? formatearFecha(mascota.fechaNacimiento) : "—"}
        </Dato>
        <Dato etiqueta="Edad">{mascota.fechaNacimiento ? calcularEdad(mascota.fechaNacimiento) : "—"}</Dato>
        <Dato etiqueta="Etiquetas">
          {mascota.etiquetas.length > 0 ? (
            <span className="flex flex-wrap justify-end gap-1">
              {mascota.etiquetas.map((e) => (
                <span key={e} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-700 dark:bg-white/10 dark:text-gray-300">
                  {e}
                </span>
              ))}
            </span>
          ) : (
            "—"
          )}
        </Dato>
        <Dato etiqueta="Propietario">{propietario ? nombreCompleto(propietario) : "—"}</Dato>
      </dl>
    </div>
  );
}
