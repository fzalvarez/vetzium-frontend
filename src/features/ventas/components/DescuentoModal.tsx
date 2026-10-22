import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { formatearSoles } from "@/shared/utils/formato";
import { montoDescuento } from "../lib/totales";
import type { Descuento } from "../types/venta";

/**
 * Aplicar un descuento en monto (S/) o en porcentaje sobre `base`. Sirve para una línea
 * de la venta y para el descuento global del comprobante.
 */
export function DescuentoModal({
  titulo,
  descripcion,
  base,
  actual,
  onClose,
  onAplicar,
}: {
  titulo: string;
  descripcion?: string;
  /** Monto sobre el que se descuenta (para la vista previa y el tope). */
  base: number;
  actual: Descuento | null | undefined;
  onClose: () => void;
  /** null = quitar el descuento. */
  onAplicar: (descuento: Descuento | null) => void;
}) {
  const [tipo, setTipo] = useState<Descuento["tipo"]>(actual?.tipo ?? "porcentaje");
  const [texto, setTexto] = useState(actual ? String(actual.valor) : "");

  const valor = Number(texto);
  const formatoOk = /^\d+(\.\d{1,2})?$/.test(texto);
  const error = !formatoOk
    ? texto === ""
      ? null
      : "Solo números, con hasta 2 decimales."
    : tipo === "porcentaje" && valor > 100
      ? "Máximo 100 %."
      : tipo === "monto" && valor > base
        ? `Máximo ${formatearSoles(base)}.`
        : null;
  const valido = formatoOk && !error && valor > 0;
  const descuento = valido ? montoDescuento({ tipo, valor }, base) : 0;

  return (
    <Modal
      open
      size="sm"
      title={titulo}
      description={descripcion}
      onClose={onClose}
      footer={
        <>
          {actual && (
            <Button variant="ghost" className="mr-auto" onClick={() => onAplicar(null)}>
              Quitar descuento
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => valido && onAplicar({ tipo, valor })} disabled={!valido}>
            Aplicar descuento
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="inline-flex rounded-lg border border-gray-300 p-1 dark:border-gray-700" role="radiogroup" aria-label="Tipo de descuento">
          {(["porcentaje", "monto"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={tipo === t}
              onClick={() => setTipo(t)}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tipo === t ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
              )}
            >
              {t === "porcentaje" ? "Porcentaje (%)" : "Monto (S/)"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="desc-valor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {tipo === "porcentaje" ? "Porcentaje" : "Monto"}
          </label>
          <Input
            id="desc-valor"
            inputMode="decimal"
            value={texto}
            onChange={(e) => setTexto(e.target.value.trim())}
            placeholder={tipo === "porcentaje" ? "Ej.: 10" : "Ej.: 5.00"}
            aria-invalid={!!error}
            className="tabular-nums"
            autoFocus
          />
          {error && <p className="text-xs text-error-600 dark:text-error-400">{error}</p>}
        </div>

        <dl className="grid grid-cols-2 gap-y-1 rounded-lg bg-gray-50 px-4 py-3 text-sm dark:bg-white/5">
          <dt className="text-gray-500 dark:text-gray-400">Monto actual</dt>
          <dd className="text-right tabular-nums text-gray-700 dark:text-gray-200">{formatearSoles(base)}</dd>
          <dt className="text-gray-500 dark:text-gray-400">Descuento</dt>
          <dd className="text-right tabular-nums text-gray-700 dark:text-gray-200">− {formatearSoles(descuento)}</dd>
          <dt className="font-medium text-gray-700 dark:text-gray-200">Queda en</dt>
          <dd className="text-right font-semibold tabular-nums text-gray-800 dark:text-gray-100">{formatearSoles(base - descuento)}</dd>
        </dl>
      </div>
    </Modal>
  );
}
