import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Botón redondo de ícono para la barra superior (mismo estilo que el de tema). */
export function BotonHeader({
  icono: Icono,
  etiqueta,
  onClick,
  className,
}: {
  icono: LucideIcon;
  etiqueta: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={etiqueta}
      title={etiqueta}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-brand-50 transition-colors dark:text-gray-300 dark:hover:bg-white/5",
        className
      )}
    >
      <Icono className="size-5" />
    </button>
  );
}
