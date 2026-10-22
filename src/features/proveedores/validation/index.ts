import { z } from "zod";

// Reglas mínimas de forma; las de negocio se agregan cuando estén definidas.

export const proveedorSchema = z.object({
  nombreLegal: z.string().trim().min(1, "Ingresa el nombre legal.").max(150, "Máximo 150 caracteres."),
  // RUC peruano: 11 dígitos.
  numeroTributario: z.string().trim().regex(/^\d{11}$/, "El RUC tiene 11 dígitos."),
  telefonoFijo: z.string().trim().max(20, "Máximo 20 caracteres."),
  celular: z.string().trim().max(20, "Máximo 20 caracteres."),
  correo: z.union([z.literal(""), z.email("Correo no válido.")]),
});
export type ProveedorForm = z.infer<typeof proveedorSchema>;

export const ordenCompraSchema = z.object({
  proveedorId: z.string().min(1, "Elige el proveedor."),
  fechaCreacion: z.string().min(1, "Ingresa la fecha."),
  estado: z.enum(["aprobado", "recibido"]),
  valorNeto: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Monto en soles, con hasta 2 decimales.")
    .refine((v) => Number(v) > 0, "El valor neto debe ser mayor a 0."),
});
export type OrdenCompraForm = z.infer<typeof ordenCompraSchema>;
