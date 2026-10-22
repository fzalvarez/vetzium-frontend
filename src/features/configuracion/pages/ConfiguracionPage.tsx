import { RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MENU, RUTAS_FIJAS, claveDe, type NavItem } from "@/app/navegacion";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { useModulosStore } from "../store/modulos.store";
import { useDesactivados } from "../hooks/useDesactivados";

// Tres columnas desde md (Módulo · Descripción · Activo); en móvil la descripción
// baja debajo del nombre.
const filaCls = "grid grid-cols-[1fr_auto] md:grid-cols-[minmax(240px,1fr)_2fr_auto] items-center gap-x-6 gap-y-0.5 px-6";

function Descripcion({ texto, submodulo = false }: { texto?: string; submodulo?: boolean }) {
  return (
    <p
      className={cn(
        // En móvil, alineada con el nombre: tras el ícono del módulo (44px) o tras la
        // sangría + ícono del submódulo (66px).
        "col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:ml-0 text-sm",
        submodulo ? "ml-16.5" : "ml-11",
        texto ? "text-gray-600 dark:text-gray-300" : "italic text-gray-400 dark:text-gray-500"
      )}
    >
      {texto || "Sin descripción"}
    </p>
  );
}

function FilaModulo({ item, desactivados }: { item: NavItem; desactivados: ReadonlySet<string> }) {
  const setActivo = useModulosStore((s) => s.setActivo);
  const clave = claveDe(item);
  const activo = !desactivados.has(clave);
  const fijo = RUTAS_FIJAS.has(clave);
  const Icon = item.icon;

  return (
    <li>
      <div className={cn(filaCls, "py-3")}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 dark:bg-brand-500/15">
            <Icon className="size-4 text-brand-600 dark:text-brand-400" />
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {item.label}
            {fijo && <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">· Siempre visible</span>}
          </p>
        </div>
        <Descripcion texto={item.descripcion} />
        <Switch
          className="row-span-2 md:row-span-1"
          checked={activo}
          disabled={fijo}
          onCheckedChange={(v) => setActivo(clave, v)}
          aria-label={`${activo ? "Desactivar" : "Activar"} ${item.label}`}
        />
      </div>

      {item.items && (
        <ul className={cn("pb-2", !activo && "opacity-50")}>
          {item.items.map((sub) => {
            const subActivo = !desactivados.has(sub.to);
            return (
              <li key={sub.to} className={cn(filaCls, "py-2")}>
                {/* Sangría alineada con el texto del módulo, con guía vertical. */}
                <p className="ml-4 pl-7 border-l border-gray-200 py-0.5 flex items-center gap-2 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-200">
                  <sub.icon className="size-3.5 shrink-0 text-gray-400" />
                  {sub.label}
                </p>
                <Descripcion texto={sub.descripcion} submodulo />
                <Switch
                  className="row-span-2 md:row-span-1"
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

        {/* Encabezado de columnas (solo desde md, donde hay columnas). */}
        <div
          className={cn(
            filaCls,
            "hidden md:grid py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:bg-white/5 dark:border-gray-800 dark:text-gray-400"
          )}
        >
          <span>Módulo</span>
          <span>Descripción</span>
          <span>Activo</span>
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
