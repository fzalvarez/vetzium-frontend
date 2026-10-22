import { z } from "zod";

// Valores del formulario tal como los da el input (texto). Reglas mínimas de forma;
// las de negocio (topes, fechas permitidas…) se agregan cuando estén definidas.
const base = z.object({
  fecha: z.string().min(1, "Ingresa la fecha."),
  descripcion: z.string().trim().min(1, "Ingresa una descripción.").max(200, "Máximo 200 caracteres."),
  medioPago: z.string().min(1, "Elige el medio de pago."),
  monto: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Monto en soles, con hasta 2 decimales.")
    .refine((v) => Number(v) > 0, "El monto debe ser mayor a 0."),
  etiquetas: z.string(),
  docReferencia: z.string().trim().max(50, "Máximo 50 caracteres."),
  numeroOperacion: z.string().trim().max(50, "Máximo 50 caracteres."),
});

export type MovimientoCajaForm = z.infer<typeof base>;

/**
 * Esquema según la configuración: los medios de pago de `requierenOperacion`
 * (Configuración › Métodos de pago) exigen el N.° de operación.
 */
export function crearMovimientoCajaSchema(requierenOperacion: string[]) {
  return base.superRefine((v, ctx) => {
    if (requierenOperacion.includes(v.medioPago) && v.numeroOperacion.trim() === "") {
      ctx.addIssue({
        code: "custom",
        path: ["numeroOperacion"],
        message: `${v.medioPago} requiere el N.° de operación.`,
      });
    }
  });
}
