const SOLES = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });
const NUMERO = new Intl.NumberFormat("es-PE");
const COMPACTO = new Intl.NumberFormat("es-PE", { notation: "compact", maximumFractionDigits: 1 });

/** "S/ 1,234.50" */
export function formatearSoles(valor: number): string {
  return SOLES.format(valor);
}

/** "1,234" */
export function formatearNumero(valor: number): string {
  return NUMERO.format(valor);
}

/** "2.5 mil" — para ejes de gráficos. */
export function formatearCompacto(valor: number): string {
  return COMPACTO.format(valor);
}
