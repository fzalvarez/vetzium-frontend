import { Link } from "react-router-dom";
import { EyeOffIcon } from "lucide-react";
import { useDesactivados } from "../hooks/useDesactivados";

/** Muestra la pantalla solo si su módulo (y submódulo) están activos en Configuración. */
export function RutaModulo({ claves, children }: { claves: string[]; children: React.ReactNode }) {
  const desactivados = useDesactivados();

  if (claves.some((c) => desactivados.has(c))) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <EyeOffIcon className="size-8 text-gray-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Este módulo está desactivado.</p>
        <Link to="/configuracion" className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
          Ir a Configuración
        </Link>
      </div>
    );
  }

  return children;
}
