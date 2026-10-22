import {
  ArmchairIcon,
  BedIcon,
  Building2Icon,
  CalendarIcon,
  ChartColumnIcon,
  CloudIcon,
  FileTextIcon,
  FlaskConicalIcon,
  HomeIcon,
  HotelIcon,
  MegaphoneIcon,
  PackageIcon,
  PawPrintIcon,
  ScissorsIcon,
  Settings2Icon,
  ShoppingCartIcon,
  StethoscopeIcon,
  TruckIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

// `descripcion` se muestra en Configuración. Solo se llena cuando está claro qué hace
// el módulo; si no, queda vacía.
export type SubItem = { label: string; to: string; descripcion?: string };

// Un módulo tiene ruta propia (`to`) o submódulos (`items` + `id`), no ambos.
export type NavItem =
  | { label: string; icon: LucideIcon; to: string; descripcion?: string; items?: never; id?: never }
  | { id: string; label: string; icon: LucideIcon; descripcion?: string; items: SubItem[]; to?: never };

/** Clave con la que se activa/desactiva un módulo: su `id` si tiene submódulos, si no su ruta. */
export function claveDe(item: NavItem): string {
  return item.items ? item.id : item.to;
}

/** Módulos que no se pueden desactivar (siempre visibles). */
export const RUTAS_FIJAS = new Set(["/"]);

// Menú lateral, en el orden en que se muestra. El primer submódulo de cada módulo
// usa la ruta base del módulo (p. ej. Ventas → /ventas).
export const MENU: NavItem[] = [
  { label: "Inicio", icon: HomeIcon, to: "/" },
  {
    id: "ventas",
    label: "Ventas",
    icon: ShoppingCartIcon,
    items: [
      { label: "Ventas", to: "/ventas" },
      { label: "Cuentas activas", to: "/ventas/cuentas-activas" },
      { label: "Comprobantes", to: "/ventas/comprobantes" },
      { label: "Entradas/Salidas", to: "/ventas/entradas-salidas" },
      { label: "Adelantos", to: "/ventas/adelantos" },
      { label: "Notas de crédito", to: "/ventas/notas-credito" },
      { label: "Cuadrar caja", to: "/ventas/cuadrar-caja" },
      { label: "Presupuestos", to: "/ventas/presupuestos" },
    ],
  },
  { label: "Sala de espera", icon: ArmchairIcon, to: "/sala-espera" },
  { label: "Hospitalizaciones", icon: BedIcon, to: "/hospitalizaciones" },
  {
    id: "peluqueria",
    label: "Peluquería",
    icon: ScissorsIcon,
    items: [
      { label: "Turnos de hoy", to: "/peluqueria" },
      { label: "Terminados de hoy", to: "/peluqueria/terminados-hoy" },
      { label: "Programados", to: "/peluqueria/programados" },
      { label: "Historial", to: "/peluqueria/historial" },
      { label: "Ítems", to: "/peluqueria/items" },
    ],
  },
  { label: "Hotel", icon: HotelIcon, to: "/hotel" },
  {
    id: "transporte",
    label: "Transporte",
    icon: TruckIcon,
    items: [
      { label: "Turno de hoy", to: "/transporte" },
      { label: "Programados", to: "/transporte/programados" },
      { label: "Historial", to: "/transporte/historial" },
      { label: "Por ítem", to: "/transporte/por-item" },
    ],
  },
  {
    id: "clientes",
    label: "Clientes",
    icon: UsersIcon,
    items: [
      { label: "Listado", to: "/clientes" },
      { label: "Gestión", to: "/clientes/gestion", descripcion: "Indicadores de gestión de clientes." },
    ],
  },
  {
    id: "mascotas",
    label: "Mascotas",
    icon: PawPrintIcon,
    items: [
      { label: "Listado", to: "/mascotas" },
      { label: "Gestión", to: "/mascotas/gestion" },
    ],
  },
  {
    id: "eventos",
    label: "Eventos",
    icon: CalendarIcon,
    items: [
      { label: "Calendario", to: "/eventos" },
      { label: "Listado", to: "/eventos/listado" },
    ],
  },
  {
    id: "productos",
    label: "Productos",
    icon: PackageIcon,
    items: [
      { label: "Catálogo", to: "/productos" },
      { label: "Descargar stock", to: "/productos/descargar-stock" },
      { label: "Cargar stock", to: "/productos/cargar-stock" },
      { label: "Stock por almacén", to: "/productos/stock-almacen" },
      { label: "Transferencias", to: "/productos/transferencias" },
      { label: "Almacenes", to: "/productos/almacenes" },
      { label: "Lotes", to: "/productos/lotes" },
    ],
  },
  { label: "Servicios", icon: StethoscopeIcon, to: "/servicios" },
  {
    id: "proveedores",
    label: "Proveedores",
    icon: Building2Icon,
    items: [
      { label: "Directorio", to: "/proveedores" },
      { label: "Órdenes de compra", to: "/proveedores/ordenes-compra" },
    ],
  },
  { label: "Guías de remisión", icon: FileTextIcon, to: "/guias-remision" },
  { label: "Laboratorio", icon: FlaskConicalIcon, to: "/laboratorio" },
  { label: "Reportes", icon: ChartColumnIcon, to: "/reportes" },
  { label: "Gestión", icon: Settings2Icon, to: "/gestion" },
  { label: "Marketing", icon: MegaphoneIcon, to: "/marketing" },
  { label: "Cloud", icon: CloudIcon, to: "/cloud" },
];

/**
 * Todas las rutas del menú con su título ("Ventas › Comprobantes") y las claves que
 * deben estar activas para abrirla (módulo y, si aplica, submódulo).
 */
export function rutasDelMenu(): { to: string; titulo: string; claves: string[] }[] {
  return MENU.flatMap((item) =>
    item.items
      ? item.items.map((sub) => ({ to: sub.to, titulo: `${item.label} › ${sub.label}`, claves: [item.id, sub.to] }))
      : [{ to: item.to, titulo: item.label, claves: [item.to] }]
  );
}

/** Menú sin lo desactivado; un módulo cuyos submódulos están todos desactivados no se muestra. */
export function filtrarMenu(desactivados: ReadonlySet<string>): NavItem[] {
  return MENU.flatMap((item): NavItem[] => {
    if (desactivados.has(claveDe(item))) return [];
    if (!item.items) return [item];
    const items = item.items.filter((sub) => !desactivados.has(sub.to));
    return items.length > 0 ? [{ ...item, items }] : [];
  });
}
