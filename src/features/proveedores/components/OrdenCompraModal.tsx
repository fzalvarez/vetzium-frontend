import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { hoyPeru } from "@/shared/utils/fechas";
import { formatearSoles } from "@/shared/utils/formato";
import { ESTADOS_ORDEN_COMPRA, TASA_IGV } from "../constants";
import type { OrdenCompra, Proveedor } from "../types";
import { ordenCompraSchema, type OrdenCompraForm } from "../validation";

const redondear = (v: number) => Math.round(v * 100) / 100;

/** Alta de una orden de compra (cabecera; los productos se definirán después). */
export function OrdenCompraModal({
  proveedores,
  onClose,
  onGuardar,
}: {
  proveedores: Proveedor[];
  onClose: () => void;
  onGuardar: (orden: Omit<OrdenCompra, "numero">) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrdenCompraForm>({
    resolver: zodResolver(ordenCompraSchema),
    defaultValues: { proveedorId: "", fechaCreacion: hoyPeru(), estado: "aprobado", valorNeto: "" },
  });

  // Impuestos y monto se calculan mientras se escribe el valor neto.
  const valorNeto = Number(useWatch({ control, name: "valorNeto" })) || 0;
  const impuestos = redondear(valorNeto * TASA_IGV);

  const guardar = handleSubmit((v) => {
    const neto = Number(v.valorNeto);
    onGuardar({
      proveedorId: Number(v.proveedorId),
      fechaCreacion: v.fechaCreacion,
      estado: v.estado,
      valorNeto: neto,
      impuestos: redondear(neto * TASA_IGV),
    });
  });

  return (
    <ModalFormulario titulo="Nueva orden de compra" etiquetaGuardar="Crear orden" onClose={onClose} onSubmit={guardar}>
      <Campo etiqueta="Proveedor" htmlFor="oc-proveedor" error={errors.proveedorId?.message} className="sm:col-span-2">
        <SelectNativo id="oc-proveedor" aria-invalid={!!errors.proveedorId} {...register("proveedorId")}>
          <option value="">Seleccione...</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombreLegal}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Fecha de creación" htmlFor="oc-fecha" error={errors.fechaCreacion?.message}>
        <Input id="oc-fecha" type="date" aria-invalid={!!errors.fechaCreacion} {...register("fechaCreacion")} />
      </Campo>

      <Campo etiqueta="Estado" htmlFor="oc-estado">
        <SelectNativo id="oc-estado" {...register("estado")}>
          {Object.entries(ESTADOS_ORDEN_COMPRA).map(([valor, label]) => (
            <option key={valor} value={valor}>
              {label}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Valor neto (S/)" htmlFor="oc-neto" error={errors.valorNeto?.message}>
        <Input id="oc-neto" inputMode="decimal" placeholder="0.00" aria-invalid={!!errors.valorNeto} {...register("valorNeto")} />
      </Campo>

      {/* Calculado: IGV y total. */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 self-end rounded-lg bg-gray-50 px-4 py-3 text-sm dark:bg-white/5">
        <dt className="whitespace-nowrap text-gray-500 dark:text-gray-400">IGV ({TASA_IGV * 100}%)</dt>
        <dd className="text-right tabular-nums text-gray-700 dark:text-gray-200">{formatearSoles(impuestos)}</dd>
        <dt className="font-medium text-gray-700 dark:text-gray-200">Monto</dt>
        <dd className="text-right font-semibold tabular-nums text-gray-800 dark:text-gray-100">
          {formatearSoles(redondear(valorNeto + impuestos))}
        </dd>
      </dl>
    </ModalFormulario>
  );
}
