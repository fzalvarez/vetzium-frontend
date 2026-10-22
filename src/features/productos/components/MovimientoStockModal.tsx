import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { hoyPeru } from "@/shared/utils/fechas";
import { TIPOS_OPERACION_CARGA, TIPOS_OPERACION_DESCARGA, USUARIO_ACTUAL } from "../constants";
import type { MovimientoStock } from "../types";
import { movimientoStockSchema, type MovimientoStockForm } from "../validation";

/** Nueva carga o descarga de stock (cabecera; los ítems se definirán con "Por ítems"). */
export function MovimientoStockModal({
  tipo,
  onClose,
  onGuardar,
}: {
  tipo: "carga" | "descarga";
  onClose: () => void;
  onGuardar: (movimiento: Omit<MovimientoStock, "numero">) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovimientoStockForm>({
    resolver: zodResolver(movimientoStockSchema),
    defaultValues: { fecha: hoyPeru(), tipoOperacion: "", motivo: "", responsable: "" },
  });

  const tipos = tipo === "carga" ? TIPOS_OPERACION_CARGA : TIPOS_OPERACION_DESCARGA;

  const guardar = handleSubmit((v) =>
    onGuardar({
      fechaCreacion: v.fecha,
      tipoOperacion: v.tipoOperacion,
      motivo: v.motivo.trim(),
      responsable: v.responsable.trim(),
      registradoPor: USUARIO_ACTUAL,
    })
  );

  return (
    <ModalFormulario
      titulo={tipo === "carga" ? "Nueva carga de stock" : "Nueva descarga de stock"}
      descripcion={tipo === "carga" ? "Ingreso de productos al inventario." : "Salida de productos del inventario."}
      etiquetaGuardar={tipo === "carga" ? "Registrar carga" : "Registrar descarga"}
      onClose={onClose}
      onSubmit={guardar}
    >
      <Campo etiqueta="Fecha" htmlFor="ms-fecha" error={errors.fecha?.message}>
        <Input id="ms-fecha" type="date" aria-invalid={!!errors.fecha} {...register("fecha")} />
      </Campo>

      <Campo etiqueta="Tipo de operación" htmlFor="ms-tipo" error={errors.tipoOperacion?.message}>
        <SelectNativo id="ms-tipo" aria-invalid={!!errors.tipoOperacion} {...register("tipoOperacion")}>
          <option value="">Seleccione...</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Motivo" htmlFor="ms-motivo" error={errors.motivo?.message} className="sm:col-span-2">
        <Input
          id="ms-motivo"
          placeholder={tipo === "carga" ? "Ej.: Recepción OC-0006" : "Ej.: Uso en consultas del día"}
          aria-invalid={!!errors.motivo}
          {...register("motivo")}
        />
      </Campo>

      <Campo etiqueta="Responsable" htmlFor="ms-responsable" error={errors.responsable?.message} className="sm:col-span-2">
        <Input id="ms-responsable" placeholder="Nombre de quien entrega o recibe" aria-invalid={!!errors.responsable} {...register("responsable")} />
      </Campo>
    </ModalFormulario>
  );
}
