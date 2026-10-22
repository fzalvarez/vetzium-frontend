import { formatearNumero } from "@/shared/utils/formato";

export interface DatoHorizontal {
  etiqueta: string;
  valor: number;
}

/** Barras horizontales de una serie, con el valor escrito al final (sin tooltip). */
export function BarrasHorizontales({ datos }: { datos: DatoHorizontal[] }) {
  const maximo = Math.max(1, ...datos.map((d) => d.valor));
  const total = datos.reduce((a, d) => a + d.valor, 0);

  return (
    <ul className="flex flex-col gap-4">
      {datos.map((d) => (
        <li key={d.etiqueta} className="grid grid-cols-[5rem_1fr_auto] items-center gap-3 text-sm">
          <span className="text-gray-700 dark:text-gray-200">{d.etiqueta}</span>
          <div className="h-6 rounded-r bg-gray-50 dark:bg-white/5">
            <div
              className="h-full rounded-r bg-brand-500 dark:bg-brand-400"
              style={{ width: `${(d.valor / maximo) * 100}%` }}
            />
          </div>
          <span className="w-24 text-right tabular-nums">
            <span className="font-semibold text-gray-800 dark:text-gray-100">{formatearNumero(d.valor)}</span>
            <span className="ml-1.5 text-gray-500 dark:text-gray-400">
              {total > 0 ? Math.round((d.valor / total) * 100) : 0}%
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
