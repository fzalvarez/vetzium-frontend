import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import type { Rol, Usuario } from "../types";
import { usuarioSchema, type UsuarioForm } from "../validation";

/** Alta de un usuario del sistema. */
export function UsuarioModal({
  roles,
  onClose,
  onGuardar,
}: {
  roles: Rol[];
  onClose: () => void;
  onGuardar: (usuario: Omit<Usuario, "id" | "ultimoAcceso">) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioForm>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: { nombre: "", correo: "", rolId: "", activo: "si" },
  });

  const guardar = handleSubmit((v) =>
    onGuardar({ nombre: v.nombre.trim(), correo: v.correo.trim(), rolId: Number(v.rolId), activo: v.activo === "si" })
  );

  return (
    <ModalFormulario
      titulo="Nuevo usuario"
      descripcion="Recibirá un correo para crear su contraseña."
      etiquetaGuardar="Crear usuario"
      onClose={onClose}
      onSubmit={guardar}
    >
      <Campo etiqueta="Nombres y apellidos" htmlFor="us-nombre" error={errors.nombre?.message} className="sm:col-span-2">
        <Input id="us-nombre" placeholder="Ej.: Dra. Patricia Salas" aria-invalid={!!errors.nombre} {...register("nombre")} />
      </Campo>

      <Campo etiqueta="Correo" htmlFor="us-correo" error={errors.correo?.message} className="sm:col-span-2">
        <Input id="us-correo" type="email" placeholder="nombre@clinica.pe" aria-invalid={!!errors.correo} {...register("correo")} />
      </Campo>

      <Campo etiqueta="Rol" htmlFor="us-rol" error={errors.rolId?.message}>
        <SelectNativo id="us-rol" aria-invalid={!!errors.rolId} {...register("rolId")}>
          <option value="">Seleccione...</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Estado" htmlFor="us-activo">
        <SelectNativo id="us-activo" {...register("activo")}>
          <option value="si">Activo</option>
          <option value="no">Inactivo</option>
        </SelectNativo>
      </Campo>
    </ModalFormulario>
  );
}
