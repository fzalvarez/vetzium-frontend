import { z } from "zod";

// Reglas mínimas de forma; las de negocio se agregan cuando estén definidas.

export const usuarioSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa el nombre.").max(100, "Máximo 100 caracteres."),
  correo: z.email("Correo no válido."),
  rolId: z.string().min(1, "Elige el rol."),
  activo: z.enum(["si", "no"]),
});
export type UsuarioForm = z.infer<typeof usuarioSchema>;

export const rolSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa el nombre del rol.").max(50, "Máximo 50 caracteres."),
  descripcion: z.string().trim().max(150, "Máximo 150 caracteres."),
});
export type RolForm = z.infer<typeof rolSchema>;

export const metodoPagoSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa el nombre.").max(50, "Máximo 50 caracteres."),
  tipo: z.enum(["efectivo", "billetera", "tarjeta", "transferencia"]),
  requiereOperacion: z.enum(["si", "no"]),
  observaciones: z.string().trim().max(200, "Máximo 200 caracteres."),
});
export type MetodoPagoForm = z.infer<typeof metodoPagoSchema>;

export const datosFiscalesSchema = z.object({
  // RUC peruano: 11 dígitos.
  ruc: z.string().trim().regex(/^\d{11}$/, "El RUC tiene 11 dígitos."),
  razonSocial: z.string().trim().min(1, "Ingresa la razón social.").max(150, "Máximo 150 caracteres."),
  nombreComercial: z.string().trim().max(150, "Máximo 150 caracteres."),
  direccionFiscal: z.string().trim().min(1, "Ingresa la dirección fiscal.").max(200, "Máximo 200 caracteres."),
  departamento: z.string().trim().min(1, "Ingresa el departamento."),
  provincia: z.string().trim().min(1, "Ingresa la provincia."),
  distrito: z.string().trim().min(1, "Ingresa el distrito."),
  telefono: z.string().trim().max(20, "Máximo 20 caracteres."),
  correo: z.union([z.literal(""), z.email("Correo no válido.")]),
  regimen: z.enum(["general", "mype", "especial", "rus"]),
  ambiente: z.enum(["pruebas", "produccion"]),
  tasaIgv: z
    .string()
    .trim()
    .regex(/^\d{1,2}(\.\d{1,2})?$/, "Porcentaje entre 0 y 99.99."),
});
export type DatosFiscalesForm = z.infer<typeof datosFiscalesSchema>;
