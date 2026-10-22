import { useEffect, useState } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LoaderIcon, RotateCcwIcon } from "lucide-react";
import Error404 from "./Error404";

// Si el error se repite tras el auto-reintento en la misma pestaña, no
// volvemos a reintentar solos (evita un loop de reloads si el problema es
// persistente, no transitorio).
const RETRY_KEY = "vetzium-route-error-retry";

// errorElement de las rutas protegidas: separa una ruta que genuinamente no
// existe (404 real, vía path="*") de un error de render/carrera de datos, que
// hasta ahora se mostraba como el mismo 404 y se quedaba pegado ahí aunque el
// dato que faltaba llegara un instante después — actualizar (F5) "arreglaba"
// porque forzaba todo desde cero, esto reintenta solo una vez automáticamente
// antes de mostrar un error real.
export default function RouteErrorBoundary() {
  const error = useRouteError();
  const isRealNotFound = isRouteErrorResponse(error) && error.status === 404;
  // Se decide en el render inicial (no en un efecto) si toca auto-reintentar,
  // para no encadenar un setState dentro del efecto solo para reflejar algo
  // que ya sabíamos de entrada.
  const [autoRetrying] = useState(
    () => !isRealNotFound && sessionStorage.getItem(RETRY_KEY) !== "1"
  );

  useEffect(() => {
    if (isRealNotFound) return;
    console.error("[RouteErrorBoundary]", error);

    if (autoRetrying) {
      sessionStorage.setItem(RETRY_KEY, "1");
      const t = setTimeout(() => window.location.reload(), 700);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRealNotFound, autoRetrying]);

  if (isRealNotFound) return <Error404 />;

  if (autoRetrying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-3">
        <LoaderIcon className="size-8 animate-spin text-brand-500" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando...</p>
      </div>
    );
  }

  const retry = () => {
    sessionStorage.removeItem(RETRY_KEY);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Hubo un problema al cargar la página
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
        Puede ser algo momentáneo (conexión lenta, un dato que tardó en llegar). Intenta de nuevo.
      </p>
      <button
        onClick={retry}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
      >
        <RotateCcwIcon className="size-4" />
        Reintentar
      </button>
    </div>
  );
}
