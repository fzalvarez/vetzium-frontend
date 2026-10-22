import { HomeIcon, type LucideIcon } from "lucide-react";

export type NavItem = { label: string; icon: LucideIcon; to: string };
export type NavGroup = { label: string; items: NavItem[] };

export const INICIO_ITEM: NavItem = { label: "Inicio", icon: HomeIcon, to: "/" };

// Grupos del menú lateral. Se agregan a medida que se definen las features;
// un grupo sin items no se muestra.
export const NAV_GROUPS: NavGroup[] = [];
