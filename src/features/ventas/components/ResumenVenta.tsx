import { cn } from "@/lib/utils";
import { formatearSoles } from "@/shared/utils/formato";
import type { calcularTotales } from "../lib/totales";

/** Pie de la venta, abajo a la derecha. */
export function ResumenVenta({ totales }: { totales: ReturnType<typeof calcularTotales> }) {
  const filas: [string, number, boolean?][] = [
    ["Valor de venta bruto (sin descuentos)", totales.valorBruto],
    ["Total descuentos", -totales.descuentos],
    ["Valor de venta incluyendo descuentos", totales.valorConDescuentos],
    ["Impuestos", totales.impuestos],
    ["ICBPER", totales.icbper],
    ["Total", totales.total, true],
  ];

  return (
    <dl className="ml-auto w-full max-w-sm text-sm">
      {filas.map(([etiqueta, valor, esTotal]) => (
        <div
          key={etiqueta}
          className={cn(
            "flex items-center justify-between gap-4 py-1.5",
            esTotal && "mt-1 border-t border-gray-200 pt-3 dark:border-gray-800"
          )}
        >
          <dt className={esTotal ? "text-base font-semibold text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}>
            {etiqueta}
          </dt>
          <dd
            className={cn(
              "tabular-nums",
              esTotal ? "text-xl font-bold text-gray-800 dark:text-gray-100" : "text-gray-700 dark:text-gray-200"
            )}
          >
            {/* Descuentos se muestran en negativo; cero sin signo. */}
            {valor < 0 ? `− ${formatearSoles(-valor)}` : formatearSoles(Math.abs(valor))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
