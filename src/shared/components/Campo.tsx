import { cn } from "@/lib/utils";

/** Campo de formulario: etiqueta, control y mensaje de error. */
export function Campo({
  etiqueta,
  htmlFor,
  error,
  ayuda,
  className,
  children,
}: {
  etiqueta: string;
  htmlFor: string;
  error?: string;
  /** Texto de ayuda bajo el control (se oculta si hay error). */
  ayuda?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {etiqueta}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-error-600 dark:text-error-400">{error}</p>
      ) : (
        ayuda && <p className="text-xs text-gray-500 dark:text-gray-400">{ayuda}</p>
      )}
    </div>
  );
}
