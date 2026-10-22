import { useState } from "react";
import { LayersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { notifySuccess } from "@/shared/utils";
import { DIAS_AVISO_VENCIMIENTO, useReglasStore } from "../store/reglas.store";

const { minimo, maximo } = DIAS_AVISO_VENCIMIENTO;

/** Reglas que ajustan el comportamiento de los módulos. Hoy: aviso de vencimiento de lotes. */
export function ReglasModulos() {
  const dias = useReglasStore((s) => s.diasAvisoVencimiento);
  const setDias = useReglasStore((s) => s.setDiasAvisoVencimiento);
  const [texto, setTexto] = useState(String(dias));

  const valor = Number(texto);
  const valido = /^\d+$/.test(texto) && valor >= minimo && valor <= maximo;

  // Se guarda al salir del campo (o Enter), solo si es válido y cambió.
  const guardar = () => {
    if (valido && valor !== dias) {
      setDias(valor);
      notifySuccess(`Los lotes se marcarán "Por vencer" ${valor} días antes.`);
    }
  };

  return (
    <Tarjeta>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Reglas de los módulos</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ajustan cómo se comportan los módulos.</p>
      </div>

      <div className="grid grid-cols-1 items-center gap-x-6 gap-y-2 px-6 py-4 md:grid-cols-[minmax(240px,1fr)_2fr_auto]">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/15">
            <LayersIcon className="size-4 text-brand-600 dark:text-brand-400" />
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Productos › Lotes</p>
        </div>
        <div>
          <label htmlFor="regla-vencimiento" className="text-sm text-gray-700 dark:text-gray-200">
            Aviso de vencimiento
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Los lotes se marcan "Por vencer" cuando falta este número de días o menos.
          </p>
          {!valido && (
            <p className="text-xs text-error-600 dark:text-error-400">
              Entre {minimo} y {maximo} días.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Input
            id="regla-vencimiento"
            inputMode="numeric"
            value={texto}
            onChange={(e) => setTexto(e.target.value.trim())}
            onBlur={guardar}
            onKeyDown={(e) => e.key === "Enter" && guardar()}
            aria-invalid={!valido}
            className="h-9 w-20 text-center tabular-nums"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">días antes</span>
        </div>
      </div>
    </Tarjeta>
  );
}
