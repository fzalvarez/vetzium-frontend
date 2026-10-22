import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { MENU_CONFIGURACION, rutasDelMenu } from "./navegacion";
import {
  AlmacenesPage,
  CargarStockPage,
  CatalogoPage,
  ComprobantesPage,
  ConfiguracionPage,
  CuentasActivasPage,
  DashboardPage,
  DescargarStockPage,
  DirectorioProveedoresPage,
  EnConstruccionPage,
  EntradasSalidasPage,
  GestionClientesPage,
  InicioPage,
  ListadoClientesPage,
  LotesPage,
  OrdenesCompraPage,
  StockAlmacenPage,
} from "./paginas";
import { RutaModulo } from "@/features/configuracion/components/RutaModulo";
import Error404 from "@/features/error-pages/pages/Error404";
import RouteErrorBoundary from "@/features/error-pages/pages/RouteErrorBoundary";

// Pantallas ya construidas, por ruta. Cualquier otra ruta del menú muestra
// "en construcción"; al construir una pantalla se agrega aquí.
const PAGINAS: Record<string, React.ReactNode> = {
  "/": <InicioPage />,
  "/dashboard": <DashboardPage />,
  "/ventas/cuentas-activas": <CuentasActivasPage />,
  "/ventas/comprobantes": <ComprobantesPage />,
  "/ventas/entradas-salidas": <EntradasSalidasPage />,
  "/clientes": <ListadoClientesPage />,
  "/clientes/gestion": <GestionClientesPage />,
  "/productos": <CatalogoPage />,
  "/productos/descargar-stock": <DescargarStockPage />,
  "/productos/cargar-stock": <CargarStockPage />,
  "/productos/stock-almacen": <StockAlmacenPage />,
  "/productos/almacenes": <AlmacenesPage />,
  "/productos/lotes": <LotesPage />,
  "/proveedores": <DirectorioProveedoresPage />,
  "/proveedores/ordenes-compra": <OrdenesCompraPage />,
  "/configuracion": <ConfiguracionPage />,
};

// Cada ruta del menú respeta lo activado/desactivado en Configuración.
const rutasMenu: RouteObject[] = rutasDelMenu().map(({ to, titulo, claves }) =>
  to === "/"
    ? { index: true, element: PAGINAS[to] }
    : {
        path: to.slice(1),
        element: <RutaModulo claves={claves}>{PAGINAS[to] ?? <EnConstruccionPage />}</RutaModulo>,
        handle: { titulo },
      }
);

// Configuración no se puede desactivar: sus rutas no pasan por RutaModulo.
const rutasConfiguracion: RouteObject[] = MENU_CONFIGURACION.items.map((sub) => ({
  path: sub.to.slice(1),
  element: PAGINAS[sub.to] ?? <EnConstruccionPage />,
  handle: { titulo: `${MENU_CONFIGURACION.label} › ${sub.label}` },
}));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [...rutasMenu, ...rutasConfiguracion],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
