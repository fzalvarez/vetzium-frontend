/** Filtro "Fechas": desde – hasta ("YYYY-MM-DD"; vacío = sin límite). */
export function RangoFechas({
  desde,
  hasta,
  onChange,
}: {
  desde: string;
  hasta: string;
  onChange: (rango: { desde: string; hasta: string }) => void;
}) {
  const campoCls =
    "h-8 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
      <span>Fechas:</span>
      <input
        type="date"
        aria-label="Desde"
        value={desde}
        max={hasta || undefined}
        onChange={(e) => onChange({ desde: e.target.value, hasta })}
        className={campoCls}
      />
      <span aria-hidden>–</span>
      <input
        type="date"
        aria-label="Hasta"
        value={hasta}
        min={desde || undefined}
        onChange={(e) => onChange({ desde, hasta: e.target.value })}
        className={campoCls}
      />
    </div>
  );
}
