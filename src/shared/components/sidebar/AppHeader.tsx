import { MenuIcon } from "lucide-react";
import { useSidebarStore } from "@/shared/store/sidebar.store";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

export function AppHeader() {
  const toggleMobileSidebar = useSidebarStore((s) => s.toggleMobileSidebar);

  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-4 sm:px-6 h-16 bg-white border-b border-gray-200 gap-3 dark:bg-gray-900 dark:border-gray-800">
      {/* Abrir menú (móvil/tablet) */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand-50 text-gray-600 dark:hover:bg-white/5 dark:text-gray-300 transition-colors"
        aria-label="Abrir menú"
      >
        <MenuIcon className="size-5" />
      </button>

      <div className="flex-1" />

      {/* Acciones */}
      <div className="flex items-center gap-1 sm:gap-3 shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
}
