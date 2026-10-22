import { lazy } from "react";

// Cada pantalla es un chunk aparte que se descarga al visitarla. Las páginas de
// error quedan en el chunk inicial (se importan directo en router.tsx). Va en su
// propio archivo: router.tsx exporta `router`, y un archivo que mezcla componentes
// con otras exportaciones rompe el fast refresh de Vite.
export const InicioPage = lazy(() => import("@/features/inicio/pages/InicioPage"));
export const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
export const EnConstruccionPage =lazy(() => import("@/features/en-construccion/pages/EnConstruccionPage"));
export const CuentasActivasPage = lazy(() => import("@/features/ventas/pages/CuentasActivasPage"));
export const ComprobantesPage = lazy(() => import("@/features/ventas/pages/ComprobantesPage"));
export const EntradasSalidasPage = lazy(() => import("@/features/ventas/pages/EntradasSalidasPage"));
export const ConfiguracionPage = lazy(() => import("@/features/configuracion/pages/ConfiguracionPage"));
export const UsuariosPage = lazy(() => import("@/features/configuracion/pages/UsuariosPage"));
export const RolesPage = lazy(() => import("@/features/configuracion/pages/RolesPage"));
export const MetodosPagoPage = lazy(() => import("@/features/configuracion/pages/MetodosPagoPage"));
export const DatosFiscalesPage = lazy(() => import("@/features/configuracion/pages/DatosFiscalesPage"));
export const ListadoClientesPage = lazy(() => import("@/features/clientes/pages/ListadoClientesPage"));
export const GestionClientesPage = lazy(() => import("@/features/clientes/pages/GestionClientesPage"));
export const CatalogoPage = lazy(() => import("@/features/productos/pages/CatalogoPage"));
export const DescargarStockPage = lazy(() => import("@/features/productos/pages/DescargarStockPage"));
export const CargarStockPage = lazy(() => import("@/features/productos/pages/CargarStockPage"));
export const StockAlmacenPage = lazy(() => import("@/features/productos/pages/StockAlmacenPage"));
export const AlmacenesPage =lazy(() => import("@/features/productos/pages/AlmacenesPage"));
export const LotesPage = lazy(() => import("@/features/productos/pages/LotesPage"));
export const DirectorioProveedoresPage = lazy(() => import("@/features/proveedores/pages/DirectorioProveedoresPage"));
export const OrdenesCompraPage = lazy(() => import("@/features/proveedores/pages/OrdenesCompraPage"));
