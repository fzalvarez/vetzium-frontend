/** Para buscar sin importar mayúsculas ni tildes ("cirugia" encuentra "Cirugía"). */
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

/** ¿Alguno de los textos contiene la búsqueda? (búsqueda vacía = sí). */
export function coincide(busqueda: string, ...textos: (string | null | undefined)[]): boolean {
  const b = normalizar(busqueda.trim());
  return b === "" || textos.some((t) => t != null && normalizar(t).includes(b));
}

/** "Alérgico, Senior" → ["Alérgico", "Senior"] (etiquetas escritas separadas por coma). */
export function separarEtiquetas(texto: string): string[] {
  return texto
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}
