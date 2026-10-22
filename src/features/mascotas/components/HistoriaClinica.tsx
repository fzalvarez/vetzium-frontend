import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { notifySuccess } from "@/shared/utils";
import { ahoraPeru, formatearFechaHora } from "@/shared/utils/fechas";
import { CONSTANTES } from "../constants";
import { useMascotasStore } from "../store/mascotas.store";
import { consultaSchema, type ConsultaForm } from "../validation";

const vacio = (): ConsultaForm => ({
  fechaHora: ahoraPeru(),
  motivo: "",
  anamnesis: "",
  temperatura: "",
  frecuenciaCardiaca: "",
  frecuenciaRespiratoria: "",
  peso: "",
  hidratacion: "",
  tlc: "",
  presionArterial: "",
});

/** Pestaña Historia clínica: registro de consulta y, debajo, las consultas anteriores. */
export function HistoriaClinica({ mascotaId }: { mascotaId: number }) {
  const consultas = useMascotasStore((s) => s.consultas).filter((c) => c.mascotaId === mascotaId);
  const agregarConsulta = useMascotasStore((s) => s.agregarConsulta);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultaForm>({ resolver: zodResolver(consultaSchema), defaultValues: vacio() });

  const guardar = handleSubmit(({ fechaHora, motivo, anamnesis, ...constantes }) => {
    agregarConsulta({ mascotaId, fechaHora, motivo: motivo.trim(), anamnesis: anamnesis.trim(), constantes });
    notifySuccess("Consulta registrada.");
    reset(vacio());
  });

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={guardar} noValidate className="flex flex-col gap-5">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Registro de consulta</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[14rem_1fr]">
          <Campo etiqueta="Fecha y hora de atención" htmlFor="hc-fecha" error={errors.fechaHora?.message}>
            <Input id="hc-fecha" type="datetime-local" aria-invalid={!!errors.fechaHora} {...register("fechaHora")} />
          </Campo>
          <Campo etiqueta="Motivo de atención" htmlFor="hc-motivo" error={errors.motivo?.message}>
            <Input id="hc-motivo" placeholder="Ej.: Vacunación anual" aria-invalid={!!errors.motivo} {...register("motivo")} />
          </Campo>
        </div>

        <Campo etiqueta="Anamnesis y descripción del caso" htmlFor="hc-anamnesis" error={errors.anamnesis?.message}>
          <Textarea id="hc-anamnesis" rows={4} {...register("anamnesis")} />
        </Campo>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Constantes fisiológicas</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
            {CONSTANTES.map(({ campo, etiqueta, corta, unidad, icono: Icono }) => (
              <label key={campo} htmlFor={`hc-${campo}`} className="flex flex-col gap-1.5" title={etiqueta}>
                <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                  <Icono className="size-4 shrink-0 text-brand-500 dark:text-brand-400" aria-hidden />
                  <span aria-hidden>{corta}</span>
                  <span className="sr-only">{etiqueta}</span>
                </span>
                <div className="relative">
                  <Input
                    id={`hc-${campo}`}
                    inputMode={campo === "presionArterial" ? "text" : "decimal"}
                    aria-invalid={!!errors[campo]}
                    className="pr-12 tabular-nums"
                    {...register(campo)}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    {unidad}
                  </span>
                </div>
                {errors[campo] && <span className="text-xs text-error-600 dark:text-error-400">{errors[campo]?.message}</span>}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => reset(vacio())}>
            Limpiar
          </Button>
          <Button type="submit">Registrar consulta</Button>
        </div>
      </form>

      <section className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Consultas anteriores</h3>
        {consultas.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Aún no hay consultas registradas.</p>
        ) : (
          <ol className="flex flex-col gap-3">
            {consultas.map((c) => (
              <li key={c.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-gray-800 dark:text-gray-100">{c.motivo}</p>
                  <p className="text-xs tabular-nums text-gray-500 dark:text-gray-400">{formatearFechaHora(c.fechaHora)}</p>
                </div>
                {c.anamnesis && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{c.anamnesis}</p>}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {CONSTANTES.filter((k) => c.constantes[k.campo]).map(({ campo, etiqueta, unidad, icono: Icono }) => (
                    <span key={campo} className="flex items-center gap-1 text-xs tabular-nums text-gray-600 dark:text-gray-300" title={etiqueta}>
                      <Icono className="size-3.5 text-gray-400" aria-hidden />
                      {c.constantes[campo]} {unidad}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
