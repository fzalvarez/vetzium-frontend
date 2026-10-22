import { z } from "zod";

// Reglas mínimas de forma; los rangos clínicos se definen con el equipo veterinario.

const numero = (max: number) =>
  z
    .string()
    .trim()
    .regex(/^(\d{1,4}(\.\d{1,2})?)?$/, "Solo números (hasta 2 decimales).")
    .refine((v) => v === "" || Number(v) <= max, `Máximo ${max}.`);

export const consultaSchema = z.object({
  fechaHora: z.string().min(1, "Ingresa la fecha y hora."),
  motivo: z.string().trim().min(1, "Ingresa el motivo de atención.").max(150, "Máximo 150 caracteres."),
  anamnesis: z.string().trim().max(4000, "Máximo 4000 caracteres."),
  temperatura: numero(45),
  frecuenciaCardiaca: numero(400),
  frecuenciaRespiratoria: numero(200),
  peso: numero(200),
  hidratacion: numero(100),
  tlc: numero(10),
  presionArterial: z.string().trim().max(10, "Máximo 10 caracteres."),
});
export type ConsultaForm = z.infer<typeof consultaSchema>;

export const mascotaSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa el nombre.").max(50, "Máximo 50 caracteres."),
  especie: z.string().min(1, "Elige la especie."),
  raza: z.string().trim().max(50, "Máximo 50 caracteres."),
  sexo: z.enum(["macho", "hembra"]),
  esterilizado: z.enum(["si", "no"]),
  fechaNacimiento: z.string(),
  etiquetas: z.string(),
});
export type MascotaForm = z.infer<typeof mascotaSchema>;
