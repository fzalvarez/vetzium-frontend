import { MoonIcon, SunIcon } from "lucide-react";
import { useThemeStore } from "@/shared/store/theme.store";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Tema claro" : "Tema oscuro"}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eff4ff] text-[#434654] dark:hover:bg-white/5 dark:text-gray-300 transition-colors"
    >
      <SunIcon
        className={`absolute size-5 transition-all duration-200 ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <MoonIcon
        className={`absolute size-5 transition-all duration-200 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
