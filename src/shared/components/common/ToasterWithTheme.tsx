import { Toaster } from "@/components/ui/sonner";
import { useThemeStore } from "@/shared/store/theme.store";

export function ToasterWithTheme() {
  const { theme } = useThemeStore();

  // Arriba al centro, bajo la barra superior (64px): cae entre el título de la página
  // (izquierda) y sus botones (derecha). Abajo a la derecha tapaba la paginación, arriba a
  // la derecha los botones del encabezado y abajo al centro el contenido.
  return (
    <Toaster theme={theme} position="top-center" offset={{ top: 76 }} mobileOffset={{ top: 72 }} richColors duration={3000} />
  );
}
