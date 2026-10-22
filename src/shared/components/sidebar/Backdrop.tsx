import { useSidebarStore } from "@/shared/store/sidebar.store";

export function Backdrop() {
  const isMobileOpen = useSidebarStore((s) => s.isMobileOpen);
  const closeMobileSidebar = useSidebarStore((s) => s.closeMobileSidebar);

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      onClick={closeMobileSidebar}
    />
  );
}
