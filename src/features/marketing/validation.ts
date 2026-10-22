import { z } from "zod";

// Reglas mínimas de forma; las de negocio (topes de puntos, etc.) se definen después.
export const promocionSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa el nombre de la promoción.").max(80, "Máximo 80 caracteres."),
  producto: z.string().min(1, "Elige el producto o servicio."),
  puntos: z
    .string()
    .trim()
    .regex(/^\d{1,4}$/, "Puntos enteros (hasta 9999).")
    .refine((v) => Number(v) > 0, "Debe ser mayor a 0."),
  fechaExpiracion: z.string().min(1, "Ingresa la fecha de expiración."),
});
export type PromocionForm = z.infer<typeof promocionSchema>;
