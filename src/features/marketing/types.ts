/** Saldo de puntos de un propietario (cliente). */
export interface SaldoPuntos {
  clienteId: number;
  vigentes: number;
  porVencer: number;
  vencidos: number;
}

/** Promoción que otorga puntos al comprar un producto o servicio. */
export interface Promocion {
  id: number;
  /** "YYYY-MM-DD" */
  fechaCreacion: string;
  /** URL de la imagen (o vista previa local); null = sin imagen. */
  imagen: string | null;
  nombre: string;
  /** Producto o servicio al que aplica. */
  producto: string;
  /** "YYYY-MM-DD" */
  fechaExpiracion: string;
  /** Puntos que otorga. */
  puntos: number;
  activa: boolean;
}
