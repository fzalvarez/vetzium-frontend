import { FileQuestionIcon } from "lucide-react";

/** Cuerpo temporal de una vista cuyo contenido (columnas, indicadores…) aún no se define. */
export function PorDefinir() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <FileQuestionIcon className="size-6 text-gray-300 dark:text-gray-600" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Contenido por definir.</p>
    </div>
  );
}
