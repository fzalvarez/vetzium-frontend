export type SexoMascota = "macho" | "hembra";

export interface Mascota {
  id: number;
  clienteId: number;
  /** N.° de historia clínica. */
  numeroHistoria: string;
  nombre: string;
  especie: string;
  raza: string;
  sexo: SexoMascota;
  esterilizado: boolean;
  /** "YYYY-MM-DD"; null si no se conoce. */
  fechaNacimiento: string | null;
  etiquetas: string[];
  /** URL de la foto; null = sin foto. */
  foto: string | null;
}

/** Constantes fisiológicas de una consulta. Texto tal como se registró; vacío = no medido. */
export interface ConstantesFisiologicas {
  temperatura: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  peso: string;
  hidratacion: string;
  tlc: string;
  presionArterial: string;
}

/** Registro de consulta en la historia clínica. */
export interface Consulta {
  id: number;
  mascotaId: number;
  /** "YYYY-MM-DDTHH:mm" en hora de Perú. */
  fechaHora: string;
  motivo: string;
  anamnesis: string;
  constantes: ConstantesFisiologicas;
}
