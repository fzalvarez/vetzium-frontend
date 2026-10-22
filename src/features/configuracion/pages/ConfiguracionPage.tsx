import { RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MENU, RUTAS_FIJAS, claveDe, type NavItem } from "@/app/navegacion";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { useModulosStore } from "../store/modulos.store";
import { useDesactivados } from "../hooks/useDesactivados";

function FilaModulo({ item, desactivados }: { item: NavItem; desactivados: ReadonlySet<string> }) {
  const setActivo = useModulosStore((s) => s.setActivo);
  const clave = claveDe(item);
  const activo = !desactivados.has(clave);
  const fijo = RUTAS_FIJAS.has(clave);
  const Icon = item.icon;

  return (
    <li className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 dark:bg-brand-500/15">
          <Icon className="size-4 text-brand-600 dark:text-brand-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.label}</p>
          {fijo && <p className="text-xs text-gray-500 dark:text-gray-400">Siempre visible</p>}
        </div>
        <Switch
          checked={activo}
          disabled={fijo}
          onCheckedChange={(v) => setActivo(clave, v)}
          aria-label={`${activo ? "Desactivar" : "Activar"} ${item.label}`}
        />
      </div>

      {item.items && (
        <ul
          className={cn(
            "mt-3 ml-4.5 pl-7 border-l border-gray-200 flex flex-col gap-2.5 dark:border-gray-800",
            !activo && "opacity-50"
          )}
        >
          {item.items.map((sub) => {
            const subActivo = !desactivados.has(sub.to);
            return (
              <li key={sub.to} className="flex items-center gap-3">
                <span className="flex-1 text-sm text-gray-600 dark:text-gray-300">{sub.label}</span>
                <Switch
                  checked={subActivo}
                  disabled={!activo}
                  onCheckedChange={(v) => setActivo(sub.to, v)}
                  aria-label={`${subActivo ? "Desactivar" : "Activar"} ${item.label} › ${sub.label}`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default function ConfiguracionPage() {
  const desactivados = useDesactivados();
  const activarTodos = useModulosStore((s) => s.activarTodos);

  return (
    <>
      <EncabezadoPagina
        titulo="Configuración"
        acciones={
          <Button variant="outline" onClick={activarTodos} disabled={desactivados.size === 0}>
            <RotateCcwIcon className="size-4" />
            Activar todos
          </Button>
        }
      />

      <Tarjeta>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Módulos del menú</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Los módulos desactivados no aparecen en el menú ni se pueden abrir. Al desactivar un
            módulo se ocultan todos sus submódulos.
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {MENU.map((item) => (
            <FilaModulo key={claveDe(item)} item={item} desactivados={desactivados} />
          ))}
        </ul>
      </Tarjeta>
    </>
  );
}
