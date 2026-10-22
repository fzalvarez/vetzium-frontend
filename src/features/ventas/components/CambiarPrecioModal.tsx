import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Campo } from "@/shared/components/Campo";
import { redondear } from "../lib/totales";

const MONTO = /^\d+(\.\d{1,2})?$/;

/**
 * Cambiar el precio unitario de una línea solo para esta venta. "Valor venta" (sin IGV)
 * y "Precio venta" (con IGV) se calculan entre sí al escribir uno de los dos.
 */
export function CambiarPrecioModal({
  concepto,
  precioActual,
  tasaIgv,
  onClose,
  onCambiar,
}: {
  concepto: string;
  /** Precio unitario con IGV. */
  precioActual: number;
  tasaIgv: number;
  onClose: () => void;
  onCambiar: (precio: number) => void;
}) {
  const factor = 1 + tasaIgv / 100;
  const [valor, setValor] = useState(redondear(precioActual / factor).toFixed(2));
  const [precio, setPrecio] = useState(precioActual.toFixed(2));
  const [error, setError] = useState<string | null>(null);

  const cambiar = () => {
    if (!MONTO.test(precio) || Number(precio) <= 0) {
      setError("Ingresa un monto mayor a 0, con hasta 2 decimales.");
      return;
    }
    onCambiar(Number(precio));
  };

  return (
    <Modal
      open
      size="sm"
      title="Cambiar precio"
      description={`${concepto} · solo para esta venta`}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={cambiar}>Cambiar precio</Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <Campo etiqueta="Valor venta (sin IGV)" htmlFor="cp-valor">
          <Input
            id="cp-valor"
            inputMode="decimal"
            value={valor}
            onChange={(e) => {
              setValor(e.target.value);
              setError(null);
              if (MONTO.test(e.target.value)) setPrecio(redondear(Number(e.target.value) * factor).toFixed(2));
            }}
            className="tabular-nums"
          />
        </Campo>
        <Campo etiqueta="Precio venta (con IGV)" htmlFor="cp-precio">
          <Input
            id="cp-precio"
            inputMode="decimal"
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value);
              setError(null);
              if (MONTO.test(e.target.value)) setValor(redondear(Number(e.target.value) / factor).toFixed(2));
            }}
            aria-invalid={!!error}
            className="tabular-nums"
          />
        </Campo>
      </div>
      {error && <p className="mt-2 text-xs text-error-600 dark:text-error-400">{error}</p>}
    </Modal>
  );
}
