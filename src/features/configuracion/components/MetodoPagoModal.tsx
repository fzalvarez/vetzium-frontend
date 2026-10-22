import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { TIPOS_METODO_PAGO } from "../constants";
import type { MetodoPago } from "../types";
import { metodoPagoSchema, type MetodoPagoForm } from "../validation";

/** Alta de un método de pago (queda activo). */
export function MetodoPagoModal({
  onClose,
  onGuardar,
}: {
  onClose: () => void;
  onGuardar: (metodo: Omit<MetodoPago, "id">) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MetodoPagoForm>({
    resolver: zodResolver(metodoPagoSchema),
    defaultValues: { nombre: "", tipo: "billetera", requiereOperacion: "si" },
  });

  const guardar = handleSubmit((v) =>
    onGuardar({ nombre: v.nombre.trim(), tipo: v.tipo, requiereOperacion: v.requiereOperacion === "si", activo: true })
  );

  return (
    <ModalFormulario titulo="Nuevo método de pago" etiquetaGuardar="Crear método" onClose={onClose} onSubmit={guardar}>
      <Campo etiqueta="Nombre" htmlFor="mp-nombre" error={errors.nombre?.message} className="sm:col-span-2">
        <Input id="mp-nombre" placeholder="Ej.: Izipay" aria-invalid={!!errors.nombre} {...register("nombre")} />
      </Campo>

      <Campo etiqueta="Tipo" htmlFor="mp-tipo">
        <SelectNativo id="mp-tipo" {...register("tipo")}>
          {Object.entries(TIPOS_METODO_PAGO).map(([valor, label]) => (
            <option key={valor} value={valor}>
              {label}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo
        etiqueta="Pedir N.° de operación"
        htmlFor="mp-operacion"
        ayuda="Si es Sí, el N.° de operación será obligatorio al cobrar."
      >
        <SelectNativo id="mp-operacion" {...register("requiereOperacion")}>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </SelectNativo>
      </Campo>
    </ModalFormulario>
  );
}
