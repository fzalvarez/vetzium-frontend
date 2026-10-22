import { RotateCcwIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MENU, RUTAS_FIJAS, claveDe, claveSub, type NavItem } from "@/app/navegacion";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { ReglasModulos } from "../components/ReglasModulos";
import { useModulosStore } from "../store/modulos.store";
import { useDesactivados } from "../hooks/useDesactivados";

// Tres columnas desde md (Módulo · Descripción · Activo); en móvil la descripción
// baja debajo del nombre.
const filaCls = "grid grid-cols-[1fr_auto] md:grid-cols-[minmax(240px,1fr)_2fr_auto] items-center gap-x-6 gap-y-0.5 px-6";

function Descripcion({ texto, nivel = 1 }: { texto?: string; nivel?: 1 | 2 | 3 }) {
  return (
    <p
      className={cn(
        // En móvil, alineada con el nombre: tras el ícono del módulo (44px), tras la
        // sangría + ícono del submódulo (66px) o del 3.er nivel (94px).
        "col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:ml-0 text-sm",
        nivel === 3 ? "ml-23.5" : nivel === 2 ? "ml-16.5" : "ml-11",
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
            const subActivo = !desactivados.has(claveSub(sub));
            return (
              <li key={claveSub(sub)}>
                <FilaSub
                  entrada={sub}
                  nivel={2}
                  ruta={`${item.label} › ${sub.label}`}
                  activo={subActivo}
                  habilitado={activo}
                  onCambiar={(v) => setActivo(claveSub(sub), v)}
                />
                {/* 3.er nivel (p. ej. Gestión › Rankings › Clientes). */}
                {sub.items && (
                  <ul className={cn(!subActivo && "opacity-50")}>
                    {sub.items.map((h) => (
                      <li key={h.to}>
                        <FilaSub
                          entrada={h}
                          nivel={3}
                          ruta={`${item.label} › ${sub.label} › ${h.label}`}
                          activo={!desactivados.has(h.to)}
                          habilitado={activo && subActivo}
                          onCambiar={(v) => setActivo(h.to, v)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/** Fila de submódulo (nivel 2) o de su pantalla hija (nivel 3), con sangría y guía. */
function FilaSub({
  entrada,
  nivel,
  ruta,
  activo,
  habilitado,
  onCambiar,
}: {
  entrada: { label: string; icon: LucideIcon; descripcion?: string };
  nivel: 2 | 3;
  ruta: string;
  activo: boolean;
  habilitado: boolean;
  onCambiar: (activo: boolean) => void;
}) {
  const Icono = entrada.icon;
  return (
    <div className={cn(filaCls, "py-2")}>
      <p
        className={cn(
          "pl-7 border-l border-gray-200 py-0.5 flex items-center gap-2 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-200",
          nivel === 2 ? "ml-4" : "ml-11"
        )}
      >
        <Icono className="size-3.5 shrink-0 text-gray-400" />
        {entrada.label}
      </p>
      <Descripcion texto={entrada.descripcion} nivel={nivel} />
      <Switch
        className="row-span-2 md:row-span-1"
        checked={activo}
        disabled={!habilitado}
        onCheckedChange={onCambiar}
        aria-label={`${activo ? "Desactivar" : "Activar"} ${ruta}`}
      />
    </div>
  );
}

export default function ConfiguracionPage() {
  const desactivados = useDesactivados();
  const activarTodos = useModulosStore((s) => s.activarTodos);

  return (
    <>
      <EncabezadoPagina
        modulo="Configuración"
        titulo="General"
        acciones={
          <Button variant="outline" onClick={activarTodos} disabled={desactivados.size === 0}>
            <RotateCcwIcon className="size-4" />
            Activar todos
          </Button>
        }
      />

      {/* Reglas arriba: es corta; la lista de módulos es larga. */}
      <div className="mb-6">
        <ReglasModulos />
      </div>

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
