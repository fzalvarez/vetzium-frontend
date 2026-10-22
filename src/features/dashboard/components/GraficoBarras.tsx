import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAncho } from "@/shared/hooks/useAncho";

export interface DatoBarra {
  etiqueta: string;
  /** null = sin dato (p. ej. días que aún no llegan): se deja el espacio vacío. */
  valor: number | null;
}

const MARGEN = { arriba: 12, derecha: 4, izquierda: 52 };
const DIVISIONES = 4;
// Ancho de columna bajo el cual las etiquetas del eje X no caben en horizontal.
const RANURA_MIN_HORIZONTAL = 15;

/** Máximo "redondo" del eje: paso de 1, 2, 2.5 o 5 × 10ⁿ por división. */
function maximoEje(valor: number): number {
  if (valor <= 0) return DIVISIONES;
  const crudo = valor / DIVISIONES;
  const potencia = 10 ** Math.floor(Math.log10(crudo));
  const paso = [1, 2, 2.5, 5, 10].map((m) => m * potencia).find((p) => p >= crudo) ?? 10 * potencia;
  return paso * DIVISIONES;
}

/** Barra con el extremo de datos redondeado (4px) y la base recta sobre el eje. */
function trazoBarra(x: number, y: number, ancho: number, alto: number): string {
  const r = Math.min(4, ancho / 2, alto);
  return `M${x},${y + alto} V${y + r} Q${x},${y} ${x + r},${y} H${x + ancho - r} Q${x + ancho},${y} ${x + ancho},${y + r} V${y + alto} Z`;
}

/** Barras verticales de una sola serie, con eje Y, grilla tenue y tooltip al pasar el mouse. */
export function GraficoBarras({
  datos,
  formatear,
  formatearEje,
  alto: ALTO = 240,
}: {
  datos: DatoBarra[];
  /** Alto total del gráfico en px (incluye ejes). */
  alto?: number;
  formatear: (valor: number) => string;
  formatearEje: (valor: number) => string;
}) {
  const [ref, ancho] = useAncho<HTMLDivElement>();
  const [activo, setActivo] = useState<number | null>(null);

  const maximo = maximoEje(Math.max(0, ...datos.map((d) => d.valor ?? 0)));
  const anchoPlot = Math.max(0, ancho - MARGEN.izquierda - MARGEN.derecha);
  const ranura = datos.length > 0 ? anchoPlot / datos.length : 0;
  // Todas las etiquetas se escriben; si no caben en horizontal, van verticales.
  const etiquetasVerticales = ranura < RANURA_MIN_HORIZONTAL;
  const margenAbajo = etiquetasVerticales ? 34 : 28;
  const altoPlot = ALTO - MARGEN.arriba - margenAbajo;
  const anchoBarra = Math.max(2, Math.min(ranura * 0.7, 28));
  const y = (v: number) => MARGEN.arriba + altoPlot * (1 - v / maximo);
  const xCentro = (i: number) => MARGEN.izquierda + ranura * i + ranura / 2;

  const datoActivo = activo !== null ? datos[activo] : null;

  return (
    // Alto reservado desde el inicio: la tarjeta no salta mientras se mide el ancho.
    <div ref={ref} className="relative" style={{ height: ALTO }} onMouseLeave={() => setActivo(null)}>
      {ancho > 0 && (
        <svg width={ancho} height={ALTO} className="block overflow-visible">
          {/* Grilla y eje Y */}
          {Array.from({ length: DIVISIONES + 1 }, (_, i) => {
            const valor = (maximo / DIVISIONES) * i;
            return (
              <g key={i}>
                <line
                  x1={MARGEN.izquierda}
                  x2={ancho - MARGEN.derecha}
                  y1={y(valor)}
                  y2={y(valor)}
                  className={i === 0 ? "stroke-gray-300 dark:stroke-gray-700" : "stroke-gray-100 dark:stroke-gray-800"}
                />
                <text
                  x={MARGEN.izquierda - 8}
                  y={y(valor)}
                  dy="0.32em"
                  textAnchor="end"
                  className="fill-gray-500 text-[11px] tabular-nums dark:fill-gray-400"
                >
                  {formatearEje(valor)}
                </text>
              </g>
            );
          })}

          {datos.map((d, i) => (
            <g key={i}>
              {d.valor !== null && d.valor > 0 && (
                <path
                  d={trazoBarra(xCentro(i) - anchoBarra / 2, y(d.valor), anchoBarra, y(0) - y(d.valor))}
                  className={
                    activo === i
                      ? "fill-brand-700 dark:fill-brand-300"
                      : "fill-brand-500 dark:fill-brand-400"
                  }
                />
              )}
              {etiquetasVerticales ? (
                <text
                  transform={`translate(${xCentro(i)}, ${y(0) + 6}) rotate(-90)`}
                  dy="0.32em"
                  textAnchor="end"
                  className="fill-gray-500 text-[10px] tabular-nums dark:fill-gray-400"
                >
                  {d.etiqueta}
                </text>
              ) : (
                <text
                  x={xCentro(i)}
                  y={ALTO - 8}
                  textAnchor="middle"
                  className={cn(
                    "fill-gray-500 tabular-nums dark:fill-gray-400",
                    ranura < 18 ? "text-[10px]" : "text-[11px]"
                  )}
                >
                  {d.etiqueta}
                </text>
              )}
              {/* Zona de hover: toda la columna, más grande que la barra. */}
              <rect
                x={MARGEN.izquierda + ranura * i}
                y={MARGEN.arriba}
                width={ranura}
                height={altoPlot}
                fill="transparent"
                onMouseEnter={() => setActivo(i)}
              />
            </g>
          ))}
        </svg>
      )}

      {datoActivo && activo !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-theme-md dark:border-gray-700 dark:bg-gray-800"
          style={{ left: xCentro(activo), top: y(datoActivo.valor ?? 0) - 8 }}
        >
          <p className="text-gray-500 dark:text-gray-400">{datoActivo.etiqueta}</p>
          <p className="font-semibold text-gray-800 tabular-nums dark:text-gray-100">
            {datoActivo.valor === null ? "Sin datos" : formatear(datoActivo.valor)}
          </p>
        </div>
      )}
    </div>
  );
}
