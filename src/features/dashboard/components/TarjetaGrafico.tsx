import { cn } from "@/lib/utils";

/**
 * Tarjeta de un gráfico: título, descripción y el gráfico. `tabla` es la vista en
 * tabla de los mismos datos, solo para lectores de pantalla.
 */
export function TarjetaGrafico({
  titulo,
  descripcion,
  tabla,
  children,
  className,
}: {
  titulo: string;
  descripcion?: string;
  tabla: { columnas: string[]; filas: (string | number)[][] };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900",
        className
      )}
    >
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">{titulo}</h2>
      {descripcion && <p className="text-sm text-gray-500 dark:text-gray-400">{descripcion}</p>}
      <div className="mt-4" aria-hidden="true">
        {children}
      </div>

      <table className="sr-only">
        <caption>{titulo}</caption>
        <thead>
          <tr>
            {tabla.columnas.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabla.filas.map((fila, i) => (
            <tr key={i}>
              {fila.map((celda, j) => (
                <td key={j}>{celda}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
