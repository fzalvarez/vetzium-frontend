import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { InicioPage } from "./paginas";
import Error404 from "@/features/error-pages/pages/Error404";
import RouteErrorBoundary from "@/features/error-pages/pages/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [{ index: true, element: <InicioPage /> }],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
