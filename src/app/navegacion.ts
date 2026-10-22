import {
  ArmchairIcon,
  ArrowDownUpIcon,
  ArrowRightLeftIcon,
  BedIcon,
  BookOpenIcon,
  BookUserIcon,
  BoxesIcon,
  Building2Icon,
  CalculatorIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ChartColumnIcon,
  ChartPieIcon,
  CircleCheckIcon,
  ClipboardListIcon,
  CloudIcon,
  FileMinusIcon,
  FileTextIcon,
  FlaskConicalIcon,
  HandCoinsIcon,
  HistoryIcon,
  HomeIcon,
  HotelIcon,
  LayersIcon,
  ListIcon,
  MegaphoneIcon,
  PackageIcon,
  PackageMinusIcon,
  PackagePlusIcon,
  PawPrintIcon,
  ReceiptIcon,
  ScissorsIcon,
  Settings2Icon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StethoscopeIcon,
  TagsIcon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
  WarehouseIcon,
  type LucideIcon,
} from "lucide-react";

// `descripcion` se muestra en Configuración. Solo se llena cuando está claro qué hace
// el módulo; si no, queda vacía.
export type SubItem = { label: string; icon: LucideIcon; to: string; descripcion?: string };

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
      { label: "Ventas", icon: ReceiptIcon, to: "/ventas" },
      { label: "Cuentas activas", icon: WalletIcon, to: "/ventas/cuentas-activas" },
      { label: "Comprobantes", icon: FileTextIcon, to: "/ventas/comprobantes" },
      { label: "Entradas/Salidas", icon: ArrowDownUpIcon, to: "/ventas/entradas-salidas" },
      { label: "Adelantos", icon: HandCoinsIcon, to: "/ventas/adelantos" },
      { label: "Notas de crédito", icon: FileMinusIcon, to: "/ventas/notas-credito" },
      { label: "Cuadrar caja", icon: CalculatorIcon, to: "/ventas/cuadrar-caja" },
      { label: "Presupuestos", icon: ClipboardListIcon, to: "/ventas/presupuestos" },
    ],
  },
  { label: "Sala de espera", icon: ArmchairIcon, to: "/sala-espera" },
  { label: "Hospitalizaciones", icon: BedIcon, to: "/hospitalizaciones" },
  {
    id: "peluqueria",
    label: "Peluquería",
    icon: ScissorsIcon,
    items: [
      { label: "Turnos de hoy", icon: CalendarClockIcon, to: "/peluqueria" },
      { label: "Terminados de hoy", icon: CircleCheckIcon, to: "/peluqueria/terminados-hoy" },
      { label: "Programados", icon: CalendarDaysIcon, to: "/peluqueria/programados" },
      { label: "Historial", icon: HistoryIcon, to: "/peluqueria/historial" },
      { label: "Ítems", icon: TagsIcon, to: "/peluqueria/items" },
    ],
  },
  { label: "Hotel", icon: HotelIcon, to: "/hotel" },
  {
    id: "transporte",
    label: "Transporte",
    icon: TruckIcon,
    items: [
      { label: "Turno de hoy", icon: CalendarClockIcon, to: "/transporte" },
      { label: "Programados", icon: CalendarDaysIcon, to: "/transporte/programados" },
      { label: "Historial", icon: HistoryIcon, to: "/transporte/historial" },
      { label: "Por ítem", icon: TagsIcon, to: "/transporte/por-item" },
    ],
  },
  {
    id: "clientes",
    label: "Clientes",
    icon: UsersIcon,
    items: [
      { label: "Listado", icon: ListIcon, to: "/clientes" },
      {
        label: "Gestión",
        icon: ChartPieIcon,
        to: "/clientes/gestion",
        descripcion: "Indicadores de gestión de clientes.",
      },
    ],
  },
  {
    id: "mascotas",
    label: "Mascotas",
    icon: PawPrintIcon,
    items: [
      { label: "Listado", icon: ListIcon, to: "/mascotas" },
      { label: "Gestión", icon: ChartPieIcon, to: "/mascotas/gestion" },
    ],
  },
  {
    id: "eventos",
    label: "Eventos",
    icon: CalendarIcon,
    items: [
      { label: "Calendario", icon: CalendarDaysIcon, to: "/eventos" },
      { label: "Listado", icon: ListIcon, to: "/eventos/listado" },
    ],
  },
  {
    id: "productos",
    label: "Productos",
    icon: PackageIcon,
    items: [
      { label: "Catálogo", icon: BookOpenIcon, to: "/productos" },
      { label: "Descargar stock", icon: PackageMinusIcon, to: "/productos/descargar-stock" },
      { label: "Cargar stock", icon: PackagePlusIcon, to: "/productos/cargar-stock" },
      { label: "Stock por almacén", icon: BoxesIcon, to: "/productos/stock-almacen" },
      { label: "Transferencias", icon: ArrowRightLeftIcon, to: "/productos/transferencias" },
      { label: "Almacenes", icon: WarehouseIcon, to: "/productos/almacenes" },
      { label: "Lotes", icon: LayersIcon, to: "/productos/lotes" },
    ],
  },
  { label: "Servicios", icon: StethoscopeIcon, to: "/servicios" },
  {
    id: "proveedores",
    label: "Proveedores",
    icon: Building2Icon,
    items: [
      { label: "Directorio", icon: BookUserIcon, to: "/proveedores" },
      { label: "Órdenes de compra", icon: ShoppingBagIcon, to: "/proveedores/ordenes-compra" },
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
