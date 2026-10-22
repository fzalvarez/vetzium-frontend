import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { MENU_CONFIGURACION, hojasDe, rutasDelMenu } from "./navegacion";
import {
  AlmacenesPage,
  CargarStockPage,
  CatalogoPage,
  ComprobantesPage,
  ConfiguracionPage,
  CuentasActivasPage,
  DashboardPage,
  DatosFiscalesPage,
  DescargarStockPage,
  DirectorioProveedoresPage,
  EnConstruccionPage,
  EntradasSalidasPage,
  GestionClientesPage,
  InicioPage,
  ListadoClientesPage,
  ListadoEventosPage,
  ListadoMascotasPage,
  LotesPage,
  MascotaPage,
  MetodosPagoPage,
  OrdenesCompraPage,
  RolesPage,
  SalaEsperaPage,
  StockAlmacenPage,
  UsuariosPage,
  VentasPage,
} from "./paginas";
import { RutaModulo } from "@/features/configuracion/components/RutaModulo";
import Error404 from "@/features/error-pages/pages/Error404";
import RouteErrorBoundary from "@/features/error-pages/pages/RouteErrorBoundary";

// Pantallas ya construidas, por ruta. Cualquier otra ruta del menú muestra
// "en construcción"; al construir una pantalla se agrega aquí.
const PAGINAS: Record<string, React.ReactNode> = {
  "/": <InicioPage />,
  "/dashboard": <DashboardPage />,
  "/sala-espera": <SalaEsperaPage />,
  "/ventas": <VentasPage />,
  "/ventas/cuentas-activas": <CuentasActivasPage />,
  "/ventas/comprobantes": <ComprobantesPage />,
  "/ventas/entradas-salidas": <EntradasSalidasPage />,
  "/clientes": <ListadoClientesPage />,
  "/clientes/gestion": <GestionClientesPage />,
  "/mascotas": <ListadoMascotasPage />,
  "/eventos/listado": <ListadoEventosPage />,
  "/productos": <CatalogoPage />,
  "/productos/descargar-stock": <DescargarStockPage />,
  "/productos/cargar-stock": <CargarStockPage />,
  "/productos/stock-almacen": <StockAlmacenPage />,
  "/productos/almacenes": <AlmacenesPage />,
  "/productos/lotes": <LotesPage />,
  "/proveedores": <DirectorioProveedoresPage />,
  "/proveedores/ordenes-compra": <OrdenesCompraPage />,
  "/configuracion": <ConfiguracionPage />,
  "/configuracion/usuarios": <UsuariosPage />,
  "/configuracion/roles": <RolesPage />,
  "/configuracion/metodos-pago": <MetodosPagoPage />,
  "/configuracion/datos-fiscales": <DatosFiscalesPage />,
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
const rutasConfiguracion: RouteObject[] = MENU_CONFIGURACION.items.flatMap(hojasDe).map((sub) => ({
  path: sub.to.slice(1),
  element: PAGINAS[sub.to] ?? <EnConstruccionPage />,
  handle: { titulo: `${MENU_CONFIGURACION.label} › ${sub.label}` },
}));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      ...rutasMenu,
      ...rutasConfiguracion,
      // Detalle fuera del menú: respeta el módulo Mascotas › Listado.
      {
        path: "mascotas/:id",
        element: (
          <RutaModulo claves={["mascotas", "/mascotas"]}>
            <MascotaPage />
          </RutaModulo>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
