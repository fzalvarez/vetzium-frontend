// CONSULTA SIMULADA: no hay conexión con RENIEC. Unos pocos DNI de ejemplo devuelven
// datos; cualquier otro, "no encontrado". Se reemplaza por el servicio real (vía backend).

export interface PersonaReniec {
  dni: string;
  nombres: string;
  apellidos: string;
  /** "YYYY-MM-DD" */
  fechaNacimiento: string;
}

const PERSONAS: PersonaReniec[] = [
  { dni: "45678912", nombres: "Lucía Margarita", apellidos: "Paredes Soto", fechaNacimiento: "1988-04-17" },
  { dni: "70123456", nombres: "Diego Alonso", apellidos: "Castillo Ríos", fechaNacimiento: "1995-09-02" },
  { dni: "41239876", nombres: "Patricia Elena", apellidos: "Huamán Quispe", fechaNacimiento: "1982-12-30" },
];

/** DNI de ejemplo que sí devuelven datos (para mostrarlos como ayuda). */
export const DNI_DE_EJEMPLO = PERSONAS.map((p) => p.dni);

/** Simula la demora de una consulta real. */
export function consultarReniec(dni: string): Promise<PersonaReniec | null> {
  return new Promise((resolver) => setTimeout(() => resolver(PERSONAS.find((p) => p.dni === dni) ?? null), 600));
}
