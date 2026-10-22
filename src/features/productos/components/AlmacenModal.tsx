import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { ESTADOS_ALMACEN, TIPOS_ALMACEN } from "../constants";
import type { Almacen } from "../types";
import { almacenSchema, type AlmacenForm } from "../validation";

/** Alta de un almacén. */
export function AlmacenModal({
  codigoSugerido,
  onClose,
  onGuardar,
}: {
  codigoSugerido: string;
  onClose: () => void;
  onGuardar: (almacen: Omit<Almacen, "id">) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlmacenForm>({
    resolver: zodResolver(almacenSchema),
    defaultValues: { nombre: "", codigo: codigoSugerido, tipo: "secundario", estado: "activo", usarParaVentas: "no" },
  });

  const guardar = handleSubmit((v) =>
    onGuardar({
      nombre: v.nombre.trim(),
      codigo: v.codigo.trim(),
      tipo: v.tipo,
      estado: v.estado,
      usarParaVentas: v.usarParaVentas === "si",
    })
  );

  return (
    <ModalFormulario titulo="Nuevo almacén" etiquetaGuardar="Crear almacén" onClose={onClose} onSubmit={guardar}>
      <Campo etiqueta="Nombre de almacén" htmlFor="al-nombre" error={errors.nombre?.message} className="sm:col-span-2">
        <Input id="al-nombre" placeholder="Ej.: Farmacia" aria-invalid={!!errors.nombre} {...register("nombre")} />
      </Campo>

      <Campo etiqueta="Código personalizado" htmlFor="al-codigo" error={errors.codigo?.message}>
        <Input id="al-codigo" aria-invalid={!!errors.codigo} {...register("codigo")} />
      </Campo>

      <Campo etiqueta="Tipo de almacén" htmlFor="al-tipo" error={errors.tipo?.message}>
        <SelectNativo id="al-tipo" {...register("tipo")}>
          {Object.entries(TIPOS_ALMACEN).map(([valor, label]) => (
            <option key={valor} value={valor}>
              {label}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Estado" htmlFor="al-estado">
        <SelectNativo id="al-estado" {...register("estado")}>
          {Object.entries(ESTADOS_ALMACEN).map(([valor, label]) => (
            <option key={valor} value={valor}>
              {label}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Usar para ventas" htmlFor="al-ventas">
        <SelectNativo id="al-ventas" {...register("usarParaVentas")}>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </SelectNativo>
      </Campo>
    </ModalFormulario>
  );
}
