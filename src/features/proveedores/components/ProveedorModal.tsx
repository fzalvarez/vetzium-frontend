import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import type { Proveedor } from "../types";
import { proveedorSchema, type ProveedorForm } from "../validation";

/** Alta de un proveedor en el directorio. */
export function ProveedorModal({
  onClose,
  onGuardar,
}: {
  onClose: () => void;
  onGuardar: (proveedor: Omit<Proveedor, "id">) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProveedorForm>({
    resolver: zodResolver(proveedorSchema),
    defaultValues: { nombreLegal: "", numeroTributario: "", telefonoFijo: "", celular: "", correo: "" },
  });

  const guardar = handleSubmit((v) =>
    onGuardar({
      nombreLegal: v.nombreLegal.trim(),
      numeroTributario: v.numeroTributario.trim(),
      telefonoFijo: v.telefonoFijo.trim() || null,
      celular: v.celular.trim() || null,
      correo: v.correo.trim() || null,
    })
  );

  return (
    <ModalFormulario
      titulo="Crear nuevo proveedor"
      etiquetaGuardar="Crear proveedor"
      onClose={onClose}
      onSubmit={guardar}
    >
      <Campo etiqueta="Nombre legal" htmlFor="pv-nombre" error={errors.nombreLegal?.message} className="sm:col-span-2">
        <Input id="pv-nombre" placeholder="Ej.: Distribuidora VetPerú S.A.C." aria-invalid={!!errors.nombreLegal} {...register("nombreLegal")} />
      </Campo>

      <Campo etiqueta="Número tributario (RUC)" htmlFor="pv-ruc" error={errors.numeroTributario?.message}>
        <Input id="pv-ruc" inputMode="numeric" maxLength={11} placeholder="20XXXXXXXXX" aria-invalid={!!errors.numeroTributario} {...register("numeroTributario")} />
      </Campo>

      <Campo etiqueta="Correo" htmlFor="pv-correo" error={errors.correo?.message}>
        <Input id="pv-correo" type="email" placeholder="Opcional" aria-invalid={!!errors.correo} {...register("correo")} />
      </Campo>

      <Campo etiqueta="Teléfono fijo" htmlFor="pv-fijo" error={errors.telefonoFijo?.message}>
        <Input id="pv-fijo" type="tel" placeholder="Opcional" {...register("telefonoFijo")} />
      </Campo>

      <Campo etiqueta="Celular" htmlFor="pv-celular" error={errors.celular?.message}>
        <Input id="pv-celular" type="tel" placeholder="Opcional" {...register("celular")} />
      </Campo>
    </ModalFormulario>
  );
}
