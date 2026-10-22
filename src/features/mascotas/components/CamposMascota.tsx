import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ESPECIES, SEXOS } from "../constants";
import type { MascotaForm } from "../validation";

/** Campos de datos de la mascota: los usan Editar y el registro de una mascota nueva. */
export function CamposMascota({
  register,
  errors,
}: {
  register: UseFormRegister<MascotaForm>;
  errors: FieldErrors<MascotaForm>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Campo etiqueta="Nombre" htmlFor="ms-nombre" error={errors.nombre?.message}>
        <Input id="ms-nombre" aria-invalid={!!errors.nombre} {...register("nombre")} />
      </Campo>
      <Campo etiqueta="Especie" htmlFor="ms-especie" error={errors.especie?.message}>
        <SelectNativo id="ms-especie" aria-invalid={!!errors.especie} {...register("especie")}>
          <option value="">Seleccione...</option>
          {ESPECIES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </SelectNativo>
      </Campo>
      <Campo etiqueta="Raza" htmlFor="ms-raza" error={errors.raza?.message}>
        <Input id="ms-raza" placeholder="Opcional" {...register("raza")} />
      </Campo>
      <Campo etiqueta="Sexo" htmlFor="ms-sexo">
        <SelectNativo id="ms-sexo" {...register("sexo")}>
          {Object.entries(SEXOS).map(([valor, label]) => (
            <option key={valor} value={valor}>
              {label}
            </option>
          ))}
        </SelectNativo>
      </Campo>
      <Campo etiqueta="Esterilizado" htmlFor="ms-esterilizado">
        <SelectNativo id="ms-esterilizado" {...register("esterilizado")}>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </SelectNativo>
      </Campo>
      <Campo etiqueta="Fecha de nacimiento" htmlFor="ms-nacimiento">
        <Input id="ms-nacimiento" type="date" {...register("fechaNacimiento")} />
      </Campo>
      <Campo etiqueta="Etiquetas" htmlFor="ms-etiquetas" ayuda="Separadas por coma." className="sm:col-span-2 xl:col-span-3">
        <Input id="ms-etiquetas" placeholder="Ej.: Alérgico, Senior" {...register("etiquetas")} />
      </Campo>
    </div>
  );
}

