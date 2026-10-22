import { cn } from "@/lib/utils";

function Checkbox({
  className,
  indeterminado = false,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  /** Casilla "a medias" (p. ej. seleccionar todos con solo algunas filas marcadas). */
  indeterminado?: boolean;
}) {
  return (
    <input
      type="checkbox"
      // `indeterminate` no existe como atributo HTML: se asigna en el elemento.
      ref={(el) => {
        if (el) el.indeterminate = indeterminado;
      }}
      className={cn(
        "size-4 rounded border-gray-300 accent-brand-500 cursor-pointer align-middle disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };
