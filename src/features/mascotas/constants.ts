import {
  DropletIcon,
  GaugeIcon,
  HeartPulseIcon,
  ThermometerIcon,
  TimerIcon,
  WeightIcon,
  WindIcon,
  type LucideIcon,
} from "lucide-react";
import type { ConstantesFisiologicas, SexoMascota } from "./types";

export const SEXOS: Record<SexoMascota, string> = {
  macho: "Macho",
  hembra: "Hembra",
};

// PROVISIONAL: especies de ejemplo hasta definir el catálogo.
export const ESPECIES = ["Perro", "Gato", "Ave", "Conejo", "Otro"];

/** Las 7 constantes fisiológicas del registro de consulta, en el orden en que se muestran. */
export const CONSTANTES: { campo: keyof ConstantesFisiologicas; etiqueta: string; corta: string; unidad: string; icono: LucideIcon }[] = [
  { campo: "temperatura", etiqueta: "Temperatura", corta: "Temperatura", unidad: "°C", icono: ThermometerIcon },
  { campo: "frecuenciaCardiaca", etiqueta: "Frecuencia cardiaca", corta: "FC", unidad: "lpm", icono: HeartPulseIcon },
  { campo: "frecuenciaRespiratoria", etiqueta: "Frecuencia respiratoria", corta: "FR", unidad: "rpm", icono: WindIcon },
  { campo: "peso", etiqueta: "Peso", corta: "Peso", unidad: "kg", icono: WeightIcon },
  { campo: "hidratacion", etiqueta: "Deshidratación", corta: "Deshidratación", unidad: "%", icono: DropletIcon },
  { campo: "tlc", etiqueta: "Tiempo de llenado capilar", corta: "TLC", unidad: "s", icono: TimerIcon },
  { campo: "presionArterial", etiqueta: "Presión arterial", corta: "PA", unidad: "mmHg", icono: GaugeIcon },
];
