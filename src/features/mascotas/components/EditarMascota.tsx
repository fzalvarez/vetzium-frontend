import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { notifySuccess } from "@/shared/utils";
import { ESPECIES, SEXOS } from "../constants";
import { useMascotasStore } from "../store/mascotas.store";
import type { Mascota } from "../types";
import { mascotaSchema, type MascotaForm } from "../validation";

const aFormulario = (m: Mascota): MascotaForm => ({
  nombre: m.nombre,
  especie: m.especie,
  raza: m.raza,
  sexo: m.sexo,
  esterilizado: m.esterilizado ? "si" : "no",
  fechaNacimiento: m.fechaNacimiento ?? "",
  etiquetas: m.etiquetas.join(", "),
});

/** Pestaña Editar: datos de la mascota (los mismos de la columna izquierda). */
export function EditarMascota({ mascota }: { mascota: Mascota }) {
  const actualizarMascota = useMascotasStore((s) => s.actualizarMascota);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<MascotaForm>({ resolver: zodResolver(mascotaSchema), defaultValues: aFormulario(mascota) });

  const guardar = handleSubmit((v) => {
    const cambios = {
      nombre: v.nombre.trim(),
      especie: v.especie,
      raza: v.raza.trim(),
      sexo: v.sexo,
      esterilizado: v.esterilizado === "si",
      fechaNacimiento: v.fechaNacimiento || null,
      etiquetas: v.etiquetas
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
    };
    actualizarMascota(mascota.id, cambios);
    reset(aFormulario({ ...mascota, ...cambios }));
    notifySuccess("Datos de la mascota guardados.");
  });

  return (
    <form onSubmit={guardar} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Campo etiqueta="Nombre" htmlFor="ed-nombre" error={errors.nombre?.message}>
          <Input id="ed-nombre" aria-invalid={!!errors.nombre} {...register("nombre")} />
        </Campo>
        <Campo etiqueta="Especie" htmlFor="ed-especie" error={errors.especie?.message}>
          <SelectNativo id="ed-especie" {...register("especie")}>
            {ESPECIES.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </SelectNativo>
        </Campo>
        <Campo etiqueta="Raza" htmlFor="ed-raza" error={errors.raza?.message}>
          <Input id="ed-raza" placeholder="Opcional" {...register("raza")} />
        </Campo>
        <Campo etiqueta="Sexo" htmlFor="ed-sexo">
          <SelectNativo id="ed-sexo" {...register("sexo")}>
            {Object.entries(SEXOS).map(([valor, label]) => (
              <option key={valor} value={valor}>
                {label}
              </option>
            ))}
          </SelectNativo>
        </Campo>
        <Campo etiqueta="Esterilizado" htmlFor="ed-esterilizado">
          <SelectNativo id="ed-esterilizado" {...register("esterilizado")}>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </SelectNativo>
        </Campo>
        <Campo etiqueta="Fecha de nacimiento" htmlFor="ed-nacimiento">
          <Input id="ed-nacimiento" type="date" {...register("fechaNacimiento")} />
        </Campo>
        <Campo etiqueta="Etiquetas" htmlFor="ed-etiquetas" ayuda="Separadas por coma." className="sm:col-span-2 xl:col-span-3">
          <Input id="ed-etiquetas" placeholder="Ej.: Alérgico, Senior" {...register("etiquetas")} />
        </Campo>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => reset()} disabled={!isDirty}>
          Descartar cambios
        </Button>
        <Button type="submit" disabled={!isDirty}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
