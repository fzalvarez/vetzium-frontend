import { z } from "zod";

// Reglas mínimas de forma; las de negocio se agregan cuando estén definidas.

export const movimientoStockSchema = z.object({
  fecha: z.string().min(1, "Ingresa la fecha."),
  tipoOperacion: z.string().min(1, "Elige el tipo de operación."),
  motivo: z.string().trim().min(1, "Ingresa el motivo.").max(200, "Máximo 200 caracteres."),
  responsable: z.string().trim().min(1, "Ingresa el responsable.").max(100, "Máximo 100 caracteres."),
});
export type MovimientoStockForm = z.infer<typeof movimientoStockSchema>;

export const almacenSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa el nombre del almacén.").max(100, "Máximo 100 caracteres."),
  codigo: z.string().trim().min(1, "Ingresa un código.").max(20, "Máximo 20 caracteres."),
  tipo: z.enum(["principal", "secundario"], { error: "Elige el tipo." }),
  estado: z.enum(["activo", "inactivo"]),
  usarParaVentas: z.enum(["si", "no"]),
});
export type AlmacenForm = z.infer<typeof almacenSchema>;
