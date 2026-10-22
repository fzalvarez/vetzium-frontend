import { NavLink } from "react-router-dom";
import { PawPrintIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { INICIO_ITEM, NAV_GROUPS, type NavItem } from "@/app/navegacion";
import { useSidebarStore } from "@/shared/store/sidebar.store";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98]",
    isActive
      ? "text-brand-700 bg-brand-500/10 font-semibold dark:text-brand-400 dark:bg-brand-500/15"
      : "text-gray-600 hover:bg-brand-50 dark:text-gray-400 dark:hover:bg-white/5"
  );

function Enlace({ item, end }: { item: NavItem; end?: boolean }) {
  const closeMobileSidebar = useSidebarStore((s) => s.closeMobileSidebar);
  const { label, icon: Icon, to } = item;

  return (
    <NavLink to={to} end={end} onClick={closeMobileSidebar} className={linkCls}>
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

export function AppSidebar() {
  const isMobileOpen = useSidebarStore((s) => s.isMobileOpen);

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 h-full flex flex-col p-4 gap-2 bg-white border-r border-gray-200 w-64 z-50 overflow-y-auto no-scrollbar transition-transform duration-200 ease-in-out dark:bg-gray-900 dark:border-gray-800",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Marca */}
      <div className="mb-6 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shrink-0 dark:bg-brand-500">
          <PawPrintIcon className="size-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-brand-700 leading-tight tracking-tight dark:text-brand-400">
          Vetzium
        </h1>
      </div>

      {/* Navegación */}
      <div className="flex flex-col gap-1 flex-1">
        <Enlace item={INICIO_ITEM} end />

        {NAV_GROUPS.filter((group) => group.items.length > 0).map((group) => (
          <div key={group.label} className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
            <h2 className="px-3 mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest dark:text-gray-500">
              {group.label}
            </h2>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <Enlace key={item.to} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
