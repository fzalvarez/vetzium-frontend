import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { AppSidebar } from "@/shared/components/sidebar/AppSidebar";
import { AppHeader } from "@/shared/components/sidebar/AppHeader";
import { Backdrop } from "@/shared/components/sidebar/Backdrop";
import LoadingOverlay from "@/shared/components/LoadingOverlay";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppSidebar />
      <Backdrop />
      <div className="lg:ml-64 flex flex-col min-h-screen min-w-0">
        <AppHeader />
        {/* Las pantallas usan todo el ancho disponible. */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
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
        </main>
      </div>
      <LoadingOverlay />
    </div>
  );
}
