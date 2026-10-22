import { z } from "zod";

// Reglas mínimas de forma; las de negocio (tipos de documento, extranjeros…) se definen después.
export const clienteSchema = z.object({
  nombres: z.string().trim().min(1, "Ingresa el nombre.").max(80, "Máximo 80 caracteres."),
  apellidos: z.string().trim().min(1, "Ingresa el apellido.").max(80, "Máximo 80 caracteres."),
  // DNI peruano: 8 dígitos.
  documento: z.string().trim().regex(/^\d{8}$/, "El DNI tiene 8 dígitos."),
  fechaNacimiento: z.string(),
  correo: z.union([z.literal(""), z.email("Correo no válido.")]),
  // Celular peruano: 9 dígitos que empiezan con 9 (se aceptan espacios).
  telefono: z
    .string()
    .trim()
    .refine((v) => /^9\d{8}$/.test(v.replace(/\s/g, "")), "Celular de 9 dígitos que empieza con 9."),
  direccion: z.string().trim().max(150, "Máximo 150 caracteres."),
  referencia: z.string().trim().max(150, "Máximo 150 caracteres."),
});
export type ClienteForm = z.infer<typeof clienteSchema>;

export const dniSchema = z.string().trim().regex(/^\d{8}$/, "El DNI tiene 8 dígitos.");
