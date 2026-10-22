import { PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, SelectNativo } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatearSoles } from "@/shared/utils/formato";
import type { MetodoPago } from "@/features/configuracion/types";
import { montoPago, type Pago } from "../comprobante";
import { redondear } from "../lib/totales";

/**
 * Formas de pago de la venta: una o varias (p. ej. parte en efectivo y parte con Yape).
 * Si el método pide N.° de operación (Configuración › Métodos de pago), aparece el campo.
 */
export function FormasPago({
  pagos,
  metodos,
  total,
  errores,
  deshabilitado,
  onChange,
}: {
  pagos: Pago[];
  /** Métodos activos. */
  metodos: MetodoPago[];
  total: number;
  /** Errores por id de pago. */
  errores: Record<number, string>;
  deshabilitado: boolean;
  onChange: (pagos: Pago[]) => void;
}) {
  const pagado = redondear(pagos.reduce((a, p) => a + montoPago(p), 0));
  const diferencia = redondear(total - pagado);

  const actualizar = (id: number, cambios: Partial<Pago>) => onChange(pagos.map((p) => (p.id === id ? { ...p, ...cambios } : p)));

  const agregar = () =>
    onChange([
      ...pagos,
      {
        id: Math.max(0, ...pagos.map((p) => p.id)) + 1,
        metodoId: metodos[0]?.id ?? 0,
        // Propone lo que falta por pagar.
        monto: diferencia > 0 ? diferencia.toFixed(2) : "",
        motivo: "",
        operacion: "",
      },
    ]);

  return (
    <div className="flex flex-col gap-3">
      <div className="hidden grid-cols-[minmax(10rem,14rem)_9rem_1fr_auto] gap-3 text-xs font-semibold uppercase tracking-wider text-gray-500 md:grid dark:text-gray-400">
        <span>Forma de pago</span>
        <span>Monto</span>
        <span>Motivo</span>
        <span className="w-8" />
      </div>

      {pagos.map((p) => {
        const metodo = metodos.find((m) => m.id === p.metodoId);
        return (
          <div key={p.id} className="flex flex-col gap-1">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(10rem,14rem)_9rem_1fr_auto]">
              <SelectNativo
                aria-label="Forma de pago"
                value={p.metodoId}
                disabled={deshabilitado}
                onChange={(e) => actualizar(p.id, { metodoId: Number(e.target.value) })}
              >
                {metodos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </SelectNativo>
              <Input
                aria-label="Monto"
                inputMode="decimal"
                value={p.monto}
                disabled={deshabilitado}
                onChange={(e) => actualizar(p.id, { monto: e.target.value })}
                className="text-right tabular-nums"
              />
              <div className="flex gap-3">
                <Input
                  aria-label="Motivo"
                  placeholder="Opcional"
                  value={p.motivo}
                  disabled={deshabilitado}
                  onChange={(e) => actualizar(p.id, { motivo: e.target.value })}
                />
                {metodo?.requiereOperacion && (
                  <Input
                    aria-label={`N.° de operación (${metodo.nombre})`}
                    placeholder="N.° de operación"
                    value={p.operacion}
                    disabled={deshabilitado}
                    onChange={(e) => actualizar(p.id, { operacion: e.target.value })}
                    className="max-w-44"
                  />
                )}
              </div>
              <Button
                variant="destructive-ghost"
                size="icon"
                aria-label="Quitar forma de pago"
                title="Quitar"
                disabled={deshabilitado || pagos.length === 1}
                onClick={() => onChange(pagos.filter((x) => x.id !== p.id))}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
            {errores[p.id] && <p className="text-xs text-error-600 dark:text-error-400">{errores[p.id]}</p>}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={agregar} disabled={deshabilitado}>
          <PlusIcon className="size-4" />
          Agregar
        </Button>
        <p className="text-sm tabular-nums">
          <span className="text-gray-500 dark:text-gray-400">Pagado {formatearSoles(pagado)} · </span>
          <span
            className={cn(
              "font-semibold",
              diferencia > 0
                ? "text-warning-700 dark:text-warning-400"
                : diferencia === 0
                  ? "text-success-700 dark:text-success-400"
                  : "text-gray-800 dark:text-gray-100"
            )}
          >
            {diferencia > 0 ? `Falta ${formatearSoles(diferencia)}` : diferencia < 0 ? `Vuelto ${formatearSoles(-diferencia)}` : "Completo"}
          </span>
        </p>
      </div>
    </div>
  );
}
