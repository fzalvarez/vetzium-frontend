import { createBrowserRouter } from "react-router-dom";
import Error404 from "@/features/error-pages/pages/Error404";
import RouteErrorBoundary from "@/features/error-pages/pages/RouteErrorBoundary";

// Rutas pendientes: se definen junto con las features.
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouteErrorBoundary />,
    children: [],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
