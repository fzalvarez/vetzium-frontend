import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { hoyPeru } from "@/shared/utils/fechas";
import { useConfiguracionStore } from "@/features/configuracion/store/configuracion.store";
import { TIPOS_MOVIMIENTO_CAJA } from "../constants";
import type { MovimientoCaja, TipoMovimientoCaja } from "../types/movimiento-caja";
import { crearMovimientoCajaSchema, type MovimientoCajaForm } from "../validation/movimiento-caja.schema";

const valoresIniciales = (): MovimientoCajaForm => ({
  fecha: hoyPeru(),
  descripcion: "",
  medioPago: "",
  monto: "",
  etiquetas: "",
  docReferencia: "",
  numeroOperacion: "",
});

/** Formulario de una nueva entrada o salida de caja. El modal se monta al abrirse. */
export function MovimientoCajaModal({
  tipo,
  onClose,
  onGuardar,
}: {
  tipo: TipoMovimientoCaja;
  onClose: () => void;
  onGuardar: (movimiento: Omit<MovimientoCaja, "id">) => void;
}) {
  // Medios de pago de Configuración › Métodos de pago: solo los activos.
  const metodosPago = useConfiguracionStore((s) => s.metodosPago);
  const activos = metodosPago.filter((m) => m.activo);
  const requierenOperacion = activos.filter((m) => m.requiereOperacion).map((m) => m.nombre);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MovimientoCajaForm>({
    resolver: zodResolver(crearMovimientoCajaSchema(requierenOperacion)),
    defaultValues: valoresIniciales(),
  });
  const medioPago = useWatch({ control, name: "medioPago" });

  const nombre = TIPOS_MOVIMIENTO_CAJA[tipo].toLowerCase();

  const guardar = handleSubmit((v) => {
    onGuardar({
      tipo,
      fecha: v.fecha,
      descripcion: v.descripcion.trim(),
      medioPago: v.medioPago,
      monto: Number(v.monto),
      // "Cirugía, Adelanto" → ["Cirugía", "Adelanto"]
      etiquetas: v.etiquetas
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
      docReferencia: v.docReferencia.trim() || null,
      numeroOperacion: v.numeroOperacion.trim() || null,
    });
  });

  return (
    <ModalFormulario
      titulo={`Nueva ${nombre} de caja`}
      descripcion={tipo === "entrada" ? "Dinero que ingresa a la caja." : "Dinero que sale de la caja."}
      etiquetaGuardar={`Registrar ${nombre}`}
      varianteGuardar={tipo === "entrada" ? "success" : "destructive"}
      onClose={onClose}
      onSubmit={guardar}
    >
      <Campo etiqueta="Fecha" htmlFor="mc-fecha" error={errors.fecha?.message}>
        <Input id="mc-fecha" type="date" aria-invalid={!!errors.fecha} {...register("fecha")} />
      </Campo>

      <Campo etiqueta="Medio de pago" htmlFor="mc-medio" error={errors.medioPago?.message}>
        <SelectNativo id="mc-medio" aria-invalid={!!errors.medioPago} {...register("medioPago")}>
          <option value="">Seleccione...</option>
          {activos.map((m) => (
            <option key={m.id} value={m.nombre}>
              {m.nombre}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo
        etiqueta="Descripción"
        htmlFor="mc-descripcion"
        error={errors.descripcion?.message}
        className="sm:col-span-2"
      >
        <Input
          id="mc-descripcion"
          placeholder={tipo === "entrada" ? "Ej.: Pago de consulta" : "Ej.: Compra de insumos"}
          aria-invalid={!!errors.descripcion}
          {...register("descripcion")}
        />
      </Campo>

      <Campo etiqueta="Monto (S/)" htmlFor="mc-monto" error={errors.monto?.message}>
        <Input
          id="mc-monto"
          inputMode="decimal"
          placeholder="0.00"
          aria-invalid={!!errors.monto}
          {...register("monto")}
        />
      </Campo>

      <Campo etiqueta="Etiquetas" htmlFor="mc-etiquetas" ayuda="Separadas por coma.">
        <Input id="mc-etiquetas" placeholder="Ej.: Consulta, Adelanto" {...register("etiquetas")} />
      </Campo>

      <Campo etiqueta="Doc. de referencia" htmlFor="mc-doc" error={errors.docReferencia?.message}>
        <Input id="mc-doc" placeholder="Ej.: B001-000154" {...register("docReferencia")} />
      </Campo>

      <Campo etiqueta="N.° de operación" htmlFor="mc-operacion" error={errors.numeroOperacion?.message}>
        <Input
          id="mc-operacion"
          placeholder={requierenOperacion.includes(medioPago) ? `Obligatorio con ${medioPago}` : "Opcional"}
          aria-invalid={!!errors.numeroOperacion}
          {...register("numeroOperacion")}
        />
      </Campo>
    </ModalFormulario>
  );
}
