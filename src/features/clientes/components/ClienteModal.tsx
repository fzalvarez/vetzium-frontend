import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import type { Cliente } from "../types";
import { clienteSchema, type ClienteForm } from "../validation";
import { BuscarReniecModal } from "./BuscarReniecModal";

/** Registro de cliente. El DNI se puede buscar en RENIEC para completar nombre y nacimiento. */
export function ClienteModal({
  onClose,
  onGuardar,
}: {
  onClose: () => void;
  onGuardar: (cliente: Omit<Cliente, "id" | "fechaRegistro" | "estado">) => void;
}) {
  const [reniecAbierto, setReniecAbierto] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ClienteForm>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      documento: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
      direccion: "",
      referencia: "",
    },
  });

  const guardar = handleSubmit((v) =>
    onGuardar({
      nombres: v.nombres.trim(),
      apellidos: v.apellidos.trim(),
      documento: v.documento.trim(),
      fechaNacimiento: v.fechaNacimiento || null,
      email: v.correo.trim() || null,
      telefonos: [v.telefono.trim()],
      direccion: v.direccion.trim() || null,
      referencia: v.referencia.trim() || null,
    })
  );

  return (
    <>
      <ModalFormulario titulo="Registrar cliente" etiquetaGuardar="Registrar cliente" onClose={onClose} onSubmit={guardar}>
        <Campo etiqueta="Nombre" htmlFor="cl-nombres" error={errors.nombres?.message}>
          <Input id="cl-nombres" aria-invalid={!!errors.nombres} {...register("nombres")} />
        </Campo>
        <Campo etiqueta="Apellido" htmlFor="cl-apellidos" error={errors.apellidos?.message}>
          <Input id="cl-apellidos" aria-invalid={!!errors.apellidos} {...register("apellidos")} />
        </Campo>

        <Campo etiqueta="N.° de documento de identidad" htmlFor="cl-documento" error={errors.documento?.message}>
          <div className="flex gap-2">
            <Input
              id="cl-documento"
              inputMode="numeric"
              maxLength={8}
              placeholder="DNI"
              aria-invalid={!!errors.documento}
              className="tabular-nums"
              {...register("documento")}
            />
            <Button type="button" variant="outline" className="shrink-0" onClick={() => setReniecAbierto(true)}>
              <IdCardIcon className="size-4" />
              RENIEC
            </Button>
          </div>
        </Campo>
        <Campo etiqueta="Fecha de nacimiento" htmlFor="cl-nacimiento">
          <Input id="cl-nacimiento" type="date" {...register("fechaNacimiento")} />
        </Campo>

        <Campo etiqueta="Correo" htmlFor="cl-correo" error={errors.correo?.message}>
          <Input id="cl-correo" type="email" placeholder="Opcional" aria-invalid={!!errors.correo} {...register("correo")} />
        </Campo>
        <Campo etiqueta="Teléfono móvil" htmlFor="cl-telefono" error={errors.telefono?.message}>
          <Input id="cl-telefono" type="tel" inputMode="tel" placeholder="9XX XXX XXX" aria-invalid={!!errors.telefono} {...register("telefono")} />
        </Campo>

        <Campo etiqueta="Dirección" htmlFor="cl-direccion" error={errors.direccion?.message} className="sm:col-span-2">
          <Input id="cl-direccion" placeholder="Opcional" {...register("direccion")} />
        </Campo>
        <Campo etiqueta="Referencia de la dirección" htmlFor="cl-referencia" error={errors.referencia?.message} className="sm:col-span-2">
          <Input id="cl-referencia" placeholder="Ej.: Frente al parque, puerta verde" {...register("referencia")} />
        </Campo>
      </ModalFormulario>

      {reniecAbierto && (
        <BuscarReniecModal
          dniInicial={getValues("documento")}
          onClose={() => setReniecAbierto(false)}
          onUsar={(p) => {
            const opciones = { shouldValidate: true, shouldDirty: true };
            setValue("documento", p.dni, opciones);
            setValue("nombres", p.nombres, opciones);
            setValue("apellidos", p.apellidos, opciones);
            setValue("fechaNacimiento", p.fechaNacimiento, opciones);
            setReniecAbierto(false);
          }}
        />
      )}
    </>
  );
}
