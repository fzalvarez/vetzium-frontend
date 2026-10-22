import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

/** Comentario de una línea de la venta (vacío = quitarlo). */
export function ComentarioModal({
  concepto,
  actual,
  onClose,
  onGuardar,
}: {
  concepto: string;
  actual: string | undefined;
  onClose: () => void;
  onGuardar: (comentario: string) => void;
}) {
  const [texto, setTexto] = useState(actual ?? "");

  return (
    <Modal
      open
      size="sm"
      title="Comentario"
      description={concepto}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onGuardar(texto.trim())}>Guardar</Button>
        </>
      }
    >
      <Textarea
        aria-label="Comentario"
        rows={4}
        maxLength={300}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Ej.: Aplicar en la pata izquierda"
        autoFocus
      />
    </Modal>
  );
}
