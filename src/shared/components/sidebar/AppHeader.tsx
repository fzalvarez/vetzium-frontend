import {
  CalendarIcon,
  CircleHelpIcon,
  CircleUserIcon,
  MaximizeIcon,
  MenuIcon,
  MinimizeIcon,
  SearchIcon,
} from "lucide-react";
import { useSidebarStore } from "@/shared/store/sidebar.store";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { usePantallaCompleta } from "@/shared/hooks/usePantallaCompleta";
import { proximamente } from "@/shared/utils";
import { BotonHeader } from "./BotonHeader";

export function AppHeader() {
  const toggleMobileSidebar = useSidebarStore((s) => s.toggleMobileSidebar);
  const [pantallaCompleta, alternarPantallaCompleta] = usePantallaCompleta();

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

      {/* Acciones. En pantallas chicas se ocultan las secundarias (calendario, maximizar). */}
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        <BotonHeader icono={SearchIcon} etiqueta="Buscar" onClick={() => proximamente("Buscar")} />
        <BotonHeader
          icono={CalendarIcon}
          etiqueta="Calendario"
          onClick={() => proximamente("Calendario")}
          className="hidden sm:flex"
        />
        <BotonHeader
          icono={pantallaCompleta ? MinimizeIcon : MaximizeIcon}
          etiqueta={pantallaCompleta ? "Restaurar ventana" : "Maximizar ventana"}
          onClick={alternarPantallaCompleta}
          className="hidden sm:flex"
        />
        <BotonHeader icono={CircleHelpIcon} etiqueta="Ayuda" onClick={() => proximamente("Ayuda")} />
        <ThemeToggle />

        <div className="mx-1 h-8 w-px bg-gray-200 dark:bg-gray-800" />

        <BotonHeader icono={CircleUserIcon} etiqueta="Mi cuenta" onClick={() => proximamente("Mi cuenta")} />
      </div>
    </header>
  );
}
