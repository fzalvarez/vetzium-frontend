import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { notifySuccess } from "@/shared/utils";
import { AMBIENTES_EMISION, REGIMENES_TRIBUTARIOS } from "../constants";
import { useConfiguracionStore } from "../store/configuracion.store";
import type { DatosFiscales } from "../types";
import { datosFiscalesSchema, type DatosFiscalesForm } from "../validation";

const aFormulario = (d: DatosFiscales): DatosFiscalesForm => ({ ...d, tasaIgv: String(d.tasaIgv) });

function Seccion({ titulo, descripcion, children }: { titulo: string; descripcion: string; children: React.ReactNode }) {
  return (
    <Tarjeta className="grid gap-6 p-6 lg:grid-cols-[260px_1fr]">
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">{titulo}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{descripcion}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
    </Tarjeta>
  );
}

export default function DatosFiscalesPage() {
  const datosFiscales = useConfiguracionStore((s) => s.datosFiscales);
  const setDatosFiscales = useConfiguracionStore((s) => s.setDatosFiscales);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<DatosFiscalesForm>({
    resolver: zodResolver(datosFiscalesSchema),
    defaultValues: aFormulario(datosFiscales),
  });

  const guardar = handleSubmit((v) => {
    const datos: DatosFiscales = { ...v, tasaIgv: Number(v.tasaIgv) };
    setDatosFiscales(datos);
    reset(aFormulario(datos));
    notifySuccess("Datos fiscales guardados.");
  });

  return (
    <form onSubmit={guardar} noValidate>
      <EncabezadoPagina
        modulo="Configuración"
        titulo="Datos fiscales"
        descripcion="Datos de la empresa que aparecen en boletas y facturas electrónicas."
        acciones={
          <>
            <EtiquetaEjemplo />
            <Button type="button" variant="outline" onClick={() => reset()} disabled={!isDirty}>
              Descartar cambios
            </Button>
            <Button type="submit" disabled={!isDirty}>
              Guardar
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-6">
        <Seccion titulo="Empresa" descripcion="Identificación ante SUNAT y datos de contacto.">
          <Campo etiqueta="RUC" htmlFor="df-ruc" error={errors.ruc?.message}>
            <Input id="df-ruc" inputMode="numeric" maxLength={11} aria-invalid={!!errors.ruc} {...register("ruc")} />
          </Campo>
          <Campo
            etiqueta="Razón social"
            htmlFor="df-razon"
            error={errors.razonSocial?.message}
            className="sm:col-span-1 xl:col-span-2"
          >
            <Input id="df-razon" aria-invalid={!!errors.razonSocial} {...register("razonSocial")} />
          </Campo>
          <Campo etiqueta="Nombre comercial" htmlFor="df-comercial" error={errors.nombreComercial?.message}>
            <Input id="df-comercial" placeholder="Opcional" {...register("nombreComercial")} />
          </Campo>
          <Campo etiqueta="Teléfono" htmlFor="df-telefono" error={errors.telefono?.message}>
            <Input id="df-telefono" type="tel" placeholder="Opcional" {...register("telefono")} />
          </Campo>
          <Campo etiqueta="Correo" htmlFor="df-correo" error={errors.correo?.message}>
            <Input id="df-correo" type="email" placeholder="Opcional" aria-invalid={!!errors.correo} {...register("correo")} />
          </Campo>
        </Seccion>

        <Seccion titulo="Domicilio fiscal" descripcion="Dirección registrada en la ficha RUC.">
          <Campo
            etiqueta="Dirección fiscal"
            htmlFor="df-direccion"
            error={errors.direccionFiscal?.message}
            className="sm:col-span-2 xl:col-span-3"
          >
            <Input id="df-direccion" aria-invalid={!!errors.direccionFiscal} {...register("direccionFiscal")} />
          </Campo>
          <Campo etiqueta="Departamento" htmlFor="df-departamento" error={errors.departamento?.message}>
            <Input id="df-departamento" aria-invalid={!!errors.departamento} {...register("departamento")} />
          </Campo>
          <Campo etiqueta="Provincia" htmlFor="df-provincia" error={errors.provincia?.message}>
            <Input id="df-provincia" aria-invalid={!!errors.provincia} {...register("provincia")} />
          </Campo>
          <Campo etiqueta="Distrito" htmlFor="df-distrito" error={errors.distrito?.message}>
            <Input id="df-distrito" aria-invalid={!!errors.distrito} {...register("distrito")} />
          </Campo>
        </Seccion>

        <Seccion titulo="Facturación electrónica" descripcion="Régimen y ambiente de emisión de comprobantes.">
          <Campo etiqueta="Régimen tributario" htmlFor="df-regimen">
            <SelectNativo id="df-regimen" {...register("regimen")}>
              {Object.entries(REGIMENES_TRIBUTARIOS).map(([valor, label]) => (
                <option key={valor} value={valor}>
                  {label}
                </option>
              ))}
            </SelectNativo>
          </Campo>
          <Campo
            etiqueta="Ambiente de emisión"
            htmlFor="df-ambiente"
            ayuda="En Pruebas los comprobantes no tienen validez tributaria."
          >
            <SelectNativo id="df-ambiente" {...register("ambiente")}>
              {Object.entries(AMBIENTES_EMISION).map(([valor, label]) => (
                <option key={valor} value={valor}>
                  {label}
                </option>
              ))}
            </SelectNativo>
          </Campo>
          <Campo etiqueta="Tasa de IGV (%)" htmlFor="df-igv" error={errors.tasaIgv?.message}>
            <Input id="df-igv" inputMode="decimal" aria-invalid={!!errors.tasaIgv} {...register("tasaIgv")} />
          </Campo>
        </Seccion>
      </div>
    </form>
  );
}
