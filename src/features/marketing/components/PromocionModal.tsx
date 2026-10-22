import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlusIcon } from "lucide-react";
import { Input, SelectNativo } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { ModalFormulario } from "@/shared/components/ModalFormulario";
import { hoyPeru } from "@/shared/utils/fechas";
import type { Promocion } from "../types";
import { promocionSchema, type PromocionForm } from "../validation";
import { ImagenPromocion } from "./ImagenPromocion";

/** Crear promoción: nombre, producto o servicio, puntos, expiración e imagen opcional. */
export function PromocionModal({
  productos,
  onClose,
  onGuardar,
}: {
  productos: string[];
  onClose: () => void;
  onGuardar: (promocion: Omit<Promocion, "id">) => void;
}) {
  // Vista previa local de la imagen elegida (aún no se sube a ningún servidor).
  const [imagen, setImagen] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromocionForm>({
    resolver: zodResolver(promocionSchema),
    defaultValues: { nombre: "", producto: "", puntos: "", fechaExpiracion: "" },
  });

  const guardar = handleSubmit((v) =>
    onGuardar({
      fechaCreacion: hoyPeru(),
      imagen,
      nombre: v.nombre.trim(),
      producto: v.producto,
      fechaExpiracion: v.fechaExpiracion,
      puntos: Number(v.puntos),
      activa: true,
    })
  );

  return (
    <ModalFormulario titulo="Crear promoción" etiquetaGuardar="Crear promoción" onClose={onClose} onSubmit={guardar}>
      <div className="flex items-center gap-4 sm:col-span-2">
        <ImagenPromocion src={imagen} alt="Vista previa" className="size-20 shrink-0" />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:text-gray-200">
          <ImagePlusIcon className="size-4" />
          {imagen ? "Cambiar imagen" : "Subir imagen"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const archivo = e.target.files?.[0];
              if (archivo) setImagen(URL.createObjectURL(archivo));
            }}
          />
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400">Opcional</span>
      </div>

      <Campo etiqueta="Nombre de la promoción" htmlFor="pr-nombre" error={errors.nombre?.message} className="sm:col-span-2">
        <Input id="pr-nombre" placeholder="Ej.: Baño feliz" aria-invalid={!!errors.nombre} {...register("nombre")} />
      </Campo>

      <Campo etiqueta="Producto o servicio" htmlFor="pr-producto" error={errors.producto?.message} className="sm:col-span-2">
        <SelectNativo id="pr-producto" aria-invalid={!!errors.producto} {...register("producto")}>
          <option value="">Seleccione...</option>
          {productos.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </SelectNativo>
      </Campo>

      <Campo etiqueta="Puntos que otorga" htmlFor="pr-puntos" error={errors.puntos?.message}>
        <Input id="pr-puntos" inputMode="numeric" placeholder="Ej.: 10" aria-invalid={!!errors.puntos} {...register("puntos")} />
      </Campo>

      <Campo etiqueta="Fecha de expiración" htmlFor="pr-expira" error={errors.fechaExpiracion?.message}>
        <Input id="pr-expira" type="date" min={hoyPeru()} aria-invalid={!!errors.fechaExpiracion} {...register("fechaExpiracion")} />
      </Campo>
    </ModalFormulario>
  );
}
