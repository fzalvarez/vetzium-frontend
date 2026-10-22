import { Suspense } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/shared/components/sidebar/AppSidebar";
import { AppHeader } from "@/shared/components/sidebar/AppHeader";
import { Backdrop } from "@/shared/components/sidebar/Backdrop";
import LoadingOverlay from "@/shared/components/LoadingOverlay";

export default function AdminLayout() {
  // Las pantallas con mucha información marcan su ruta con
  // `handle: { anchoCompleto: true }` y usan todo el ancho del cuerpo;
  // el resto queda centrado a 1440px para que fichas y formularios no se estiren.
  const anchoCompleto = useMatches().some(
    (m) => (m.handle as { anchoCompleto?: boolean } | undefined)?.anchoCompleto
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppSidebar />
      <Backdrop />
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <div className={cn(!anchoCompleto && "max-w-360 mx-auto")}>
            {/* Mientras llega el chunk de la pantalla (rutas lazy en paginas.ts). */}
            <Suspense
              fallback={
                <div className="flex justify-center py-24">
                  <LoaderIcon className="size-6 animate-spin text-brand-500 dark:text-brand-400" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      <LoadingOverlay />
    </div>
  );
}
