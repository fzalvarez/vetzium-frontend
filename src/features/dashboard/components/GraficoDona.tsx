import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatearNumero } from "@/shared/utils/formato";

// Colores categóricos en orden fijo (tokens --serie-N, validados para claro y oscuro).
const COLORES = [
  { relleno: "fill-serie-1", punto: "bg-serie-1" },
  { relleno: "fill-serie-2", punto: "bg-serie-2" },
  { relleno: "fill-serie-3", punto: "bg-serie-3" },
  { relleno: "fill-serie-4", punto: "bg-serie-4" },
];

const TAMANO = 200;
const R_EXT = 96;
const R_INT = 66;

function punto(r: number, angulo: number): [number, number] {
  const c = TAMANO / 2;
  return [c + r * Math.cos(angulo), c + r * Math.sin(angulo)];
}

function trazoSector(desde: number, hasta: number): string {
  const grande = hasta - desde > Math.PI ? 1 : 0;
  const [x1, y1] = punto(R_EXT, desde);
  const [x2, y2] = punto(R_EXT, hasta);
  const [x3, y3] = punto(R_INT, hasta);
  const [x4, y4] = punto(R_INT, desde);
  return `M${x1},${y1} A${R_EXT},${R_EXT} 0 ${grande} 1 ${x2},${y2} L${x3},${y3} A${R_INT},${R_INT} 0 ${grande} 0 ${x4},${y4} Z`;
}

export interface DatoDona {
  etiqueta: string;
  valor: number;
}

/**
 * Dona con el total al centro y la leyenda (valor y %) a la derecha. Máximo 4
 * categorías: más allá se agrupan en "Otros". Al pasar el mouse, el centro muestra
 * la categoría.
 */
export function GraficoDona({ datos }: { datos: DatoDona[] }) {
  const [activo, setActivo] = useState<number | null>(null);
  const total = datos.reduce((a, d) => a + d.valor, 0);

  // Ángulo acumulado desde las 12 en punto, en sentido horario.
  const anguloHasta = (n: number) => {
    const suma = datos.slice(0, n).reduce((a, d) => a + d.valor, 0);
    return -Math.PI / 2 + (total > 0 ? (suma / total) * 2 * Math.PI : 0);
  };
  const sectores = datos.map((_, i) => ({ desde: anguloHasta(i), hasta: anguloHasta(i + 1) }));

  const centro = activo !== null ? datos[activo] : null;
  const porcentaje = (v: number) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
      <div className="relative shrink-0" style={{ width: TAMANO, height: TAMANO }}>
        <svg width={TAMANO} height={TAMANO} onMouseLeave={() => setActivo(null)}>
          {sectores.map((s, i) => (
            <path
              key={datos[i].etiqueta}
              d={trazoSector(s.desde, s.hasta)}
              // Separación de 2px entre sectores con el color de la tarjeta.
              className={cn(
                COLORES[i].relleno,
                "stroke-white stroke-2 transition-opacity dark:stroke-gray-900",
                activo !== null && activo !== i && "opacity-40"
              )}
              onMouseEnter={() => setActivo(i)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {formatearNumero(centro ? centro.valor : total)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {centro ? `${centro.etiqueta} · ${porcentaje(centro.valor)}%` : "Total"}
          </span>
        </div>
      </div>

      <ul className="flex min-w-48 flex-col gap-3">
        {datos.map((d, i) => (
          <li
            key={d.etiqueta}
            className="flex items-center gap-3 text-sm"
            onMouseEnter={() => setActivo(i)}
            onMouseLeave={() => setActivo(null)}
          >
            <span className={cn("size-3 shrink-0 rounded-sm", COLORES[i].punto)} />
            <span className="flex-1 text-gray-700 dark:text-gray-200">{d.etiqueta}</span>
            <span className="font-semibold text-gray-800 tabular-nums dark:text-gray-100">
              {formatearNumero(d.valor)}
            </span>
            <span className="w-10 text-right text-gray-500 tabular-nums dark:text-gray-400">
              {porcentaje(d.valor)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
