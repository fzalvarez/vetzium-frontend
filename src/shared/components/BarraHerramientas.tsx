/** Barra sobre la tabla: búsqueda y acciones a la izquierda, `derecha` alineado a la derecha. */
export function BarraHerramientas({
  children,
  derecha,
}: {
  children?: React.ReactNode;
  derecha?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-white/2">
      <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">{children}</div>
      {derecha && <div className="flex flex-wrap items-center gap-2 ml-auto">{derecha}</div>}
    </div>
  );
}
