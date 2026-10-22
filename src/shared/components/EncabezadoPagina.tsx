/** Título de la pantalla con el módulo encima y, opcionalmente, descripción y acciones. */
export function EncabezadoPagina({
  modulo,
  titulo,
  descripcion,
  acciones,
}: {
  modulo?: string;
  titulo: string;
  descripcion?: string;
  acciones?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        {modulo && (
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1 dark:text-brand-400">
            {modulo}
          </p>
        )}
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight dark:text-gray-100">{titulo}</h1>
        {descripcion && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{descripcion}</p>}
      </div>
      {acciones && <div className="flex items-center gap-2 shrink-0">{acciones}</div>}
    </div>
  );
}
