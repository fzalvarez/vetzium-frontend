import { Toaster } from "@/components/ui/sonner";
import { useThemeStore } from "@/shared/store/theme.store";

export function ToasterWithTheme() {
  const { theme } = useThemeStore();

  // Arriba a la derecha, bajo la barra superior (64px): abajo tapaban la paginación
  // de las tablas justo después de guardar.
  return (
    <Toaster
      theme={theme}
      position="top-right"
      offset={{ top: 76, right: 24 }}
      mobileOffset={{ top: 72 }}
      richColors
      duration={3000}
    />
  );
}
