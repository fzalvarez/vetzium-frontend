import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { rutasDelMenu } from "./navegacion";
import { EnConstruccionPage, InicioPage } from "./paginas";
import Error404 from "@/features/error-pages/pages/Error404";
import RouteErrorBoundary from "@/features/error-pages/pages/RouteErrorBoundary";

// Pantallas ya construidas. Cualquier otra ruta del menú muestra "en construcción";
// al construir una pantalla se agrega aquí y deja de ser temporal.
const paginas: RouteObject[] = [{ index: true, element: <InicioPage /> }];

const rutasConPagina = new Set(["/"]);

const enConstruccion: RouteObject[] = rutasDelMenu()
  .filter(({ to }) => !rutasConPagina.has(to))
  .map(({ to, titulo }) => ({
    path: to.slice(1),
    element: <EnConstruccionPage />,
    handle: { titulo },
  }));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [...paginas, ...enConstruccion],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
