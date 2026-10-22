import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { notifySuccess } from "@/shared/utils";
import { separarEtiquetas } from "@/shared/utils/texto";
import { useMascotasStore } from "../store/mascotas.store";
import type { Mascota } from "../types";
import { mascotaSchema, type MascotaForm } from "../validation";
import { CamposMascota } from "./CamposMascota";

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
      etiquetas: separarEtiquetas(v.etiquetas),
    };
    actualizarMascota(mascota.id, cambios);
    reset(aFormulario({ ...mascota, ...cambios }));
    notifySuccess("Datos de la mascota guardados.");
  });

  return (
    <form onSubmit={guardar} noValidate className="flex flex-col gap-5">
      <CamposMascota register={register} errors={errors} />

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
