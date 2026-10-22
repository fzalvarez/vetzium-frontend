import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { rolSchema, type RolForm } from "../validation";

/** Alta de un rol (los permisos se asignan después, desde "Permisos"). */
export function RolModal({ onClose, onGuardar }: { onClose: () => void; onGuardar: (rol: RolForm) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RolForm>({ resolver: zodResolver(rolSchema), defaultValues: { nombre: "", descripcion: "" } });

  const guardar = handleSubmit((v) => onGuardar({ nombre: v.nombre.trim(), descripcion: v.descripcion.trim() }));

  return (
    <ModalFormulario
      titulo="Nuevo rol"
      descripcion="Después asigna sus permisos desde la columna Permisos."
      etiquetaGuardar="Crear rol"
      onClose={onClose}
      onSubmit={guardar}
    >
      <Campo etiqueta="Nombre del rol" htmlFor="rol-nombre" error={errors.nombre?.message} className="sm:col-span-2">
        <Input id="rol-nombre" placeholder="Ej.: Asistente veterinario" aria-invalid={!!errors.nombre} {...register("nombre")} />
      </Campo>
      <Campo etiqueta="Descripción" htmlFor="rol-descripcion" error={errors.descripcion?.message} className="sm:col-span-2">
        <Input id="rol-descripcion" placeholder="Opcional" {...register("descripcion")} />
      </Campo>
    </ModalFormulario>
  );
}
