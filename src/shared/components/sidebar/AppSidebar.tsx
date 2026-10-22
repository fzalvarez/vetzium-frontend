import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon, PawPrintIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MENU, MENU_CONFIGURACION, filtrarMenu, type NavItem, type SubItem } from "@/app/navegacion";
import { useDesactivados } from "@/features/configuracion/hooks/useDesactivados";
import { useSidebarStore } from "@/shared/store/sidebar.store";

const itemCls = "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all";
const itemActivoCls = "text-brand-700 bg-brand-500/10 font-semibold dark:text-brand-400 dark:bg-brand-500/15";
const itemInactivoCls = "text-gray-600 hover:bg-brand-50 dark:text-gray-400 dark:hover:bg-white/5";

/** ¿La ruta es la del submódulo o una pantalla dentro de él (p. ej. /mascotas/3)? */
const enSubmodulo = (pathname: string, to: string) => pathname === to || pathname.startsWith(`${to}/`);

/** Módulo con submódulos que contiene la ruta actual, si hay. */
function moduloDeRuta(pathname: string): string | null {
  return (
    [...MENU, MENU_CONFIGURACION].find((item) => item.items?.some((sub) => enSubmodulo(pathname, sub.to)))?.label ??
    null
  );
}

function Enlace({ to, label, icon: Icon }: { to: string; label: string; icon: NavItem["icon"] }) {
  const closeMobileSidebar = useSidebarStore((s) => s.closeMobileSidebar);

  return (
    <NavLink
      to={to}
      end
      onClick={closeMobileSidebar}
      className={({ isActive }) => cn(itemCls, "active:scale-[0.98]", isActive ? itemActivoCls : itemInactivoCls)}
    >
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

function Grupo({
  item,
  items,
  abierto,
  activo,
  onToggle,
}: {
  item: NavItem;
  items: SubItem[];
  abierto: boolean;
  activo: boolean;
  onToggle: () => void;
}) {
  const closeMobileSidebar = useSidebarStore((s) => s.closeMobileSidebar);
  const Icon = item.icon;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierto}
        className={cn(itemCls, activo ? "text-brand-700 font-semibold dark:text-brand-400" : itemInactivoCls)}
      >
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDownIcon className={cn("size-4 shrink-0 transition-transform duration-200", abierto && "rotate-180")} />
      </button>

      {/* Altura animada con grid-rows (0fr → 1fr). */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-5 mt-0.5 mb-1 pl-3 flex flex-col gap-0.5 border-l border-gray-200 dark:border-gray-800">
            {items.map((sub) => (
              <NavLink
                key={sub.to}
                to={sub.to}
                end
                tabIndex={abierto ? undefined : -1}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors",
                    isActive ? itemActivoCls : "text-gray-500 hover:bg-brand-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
                  )
                }
              >
                <sub.icon className="size-3.5 shrink-0" />
                <span>{sub.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const { pathname } = useLocation();
  const isMobileOpen = useSidebarStore((s) => s.isMobileOpen);
  const desactivados = useDesactivados();

  // Un solo módulo desplegado a la vez; al navegar se despliega el de la ruta actual.
  const [abierto, setAbierto] = useState<string | null>(() => moduloDeRuta(pathname));
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    const modulo = moduloDeRuta(pathname);
    if (modulo) setAbierto(modulo);
  }

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 h-full flex flex-col p-4 gap-2 bg-white border-r border-gray-200 w-64 z-50 overflow-y-auto custom-scrollbar transition-transform duration-200 ease-in-out dark:bg-gray-900 dark:border-gray-800",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Marca */}
      <div className="mb-4 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shrink-0 dark:bg-brand-500">
          <PawPrintIcon className="size-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-brand-700 leading-tight tracking-tight dark:text-brand-400">
          Vetzium
        </h1>
      </div>

      {/* Navegación */}
      <div className="flex flex-col gap-0.5 flex-1">
        {filtrarMenu(desactivados).map((item) =>
          item.items ? (
            <Grupo
              key={item.label}
              item={item}
              items={item.items}
              abierto={abierto === item.label}
              activo={item.items.some((sub) => enSubmodulo(pathname, sub.to))}
              onToggle={() => setAbierto((actual) => (actual === item.label ? null : item.label))}
            />
          ) : (
            <Enlace key={item.to} to={item.to} label={item.label} icon={item.icon} />
          )
        )}
      </div>

      {/* Fuera del menú configurable: siempre visible. */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
        <Grupo
          item={MENU_CONFIGURACION}
          items={MENU_CONFIGURACION.items}
          abierto={abierto === MENU_CONFIGURACION.label}
          activo={MENU_CONFIGURACION.items.some((sub) => enSubmodulo(pathname, sub.to))}
          onToggle={() =>
            setAbierto((actual) => (actual === MENU_CONFIGURACION.label ? null : MENU_CONFIGURACION.label))
          }
        />
      </div>
    </nav>
  );
}
