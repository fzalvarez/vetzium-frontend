import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { rutasDelMenu } from "./navegacion";
import {
  ComprobantesPage,
  CuentasActivasPage,
  EnConstruccionPage,
  EntradasSalidasPage,
  InicioPage,
} from "./paginas";
import Error404 from "@/features/error-pages/pages/Error404";
import RouteErrorBoundary from "@/features/error-pages/pages/RouteErrorBoundary";

// Pantallas ya construidas, por ruta del menú. Cualquier otra ruta del menú muestra
// "en construcción"; al construir una pantalla se agrega aquí.
const PAGINAS: Record<string, React.ReactNode> = {
  "/": <InicioPage />,
  "/ventas/cuentas-activas": <CuentasActivasPage />,
  "/ventas/comprobantes": <ComprobantesPage />,
  "/ventas/entradas-salidas": <EntradasSalidasPage />,
};

const rutas: RouteObject[] = rutasDelMenu().map(({ to, titulo }) =>
  to === "/"
    ? { index: true, element: PAGINAS[to] }
    : {
        path: to.slice(1),
        element: PAGINAS[to] ?? <EnConstruccionPage />,
        handle: { titulo },
      }
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: rutas,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
