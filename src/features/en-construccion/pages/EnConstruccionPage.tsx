import { useMatches } from "react-router-dom";
import { ConstructionIcon } from "lucide-react";

// Página temporal de las rutas del menú que aún no tienen pantalla.
// El título llega en `handle.titulo` de la ruta (ver router.tsx).
export default function EnConstruccionPage() {
  const matches = useMatches();
  const titulo = (matches.at(-1)?.handle as { titulo?: string } | undefined)?.titulo ?? "";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{titulo}</h1>
      <div className="flex flex-col items-center justify-center gap-3 py-20 rounded-xl border border-dashed border-gray-300 bg-white text-center dark:border-gray-700 dark:bg-gray-900">
        <ConstructionIcon className="size-8 text-gray-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Módulo en construcción.</p>
      </div>
    </div>
  );
}
