import { cn } from "@/lib/utils";

/** Contenedor blanco con borde para el cuerpo de una pantalla (pestañas, filtros, tabla). */
export function Tarjeta({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-xl shadow-theme-xs overflow-hidden dark:bg-gray-900 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}
