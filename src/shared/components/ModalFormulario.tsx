import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

/**
 * Modal de alta: el formulario (campos en grilla de 2 columnas) y el pie con
 * Cancelar y el botón de guardar. `onSubmit` suele ser el `handleSubmit` de RHF.
 */
export function ModalFormulario({
  titulo,
  descripcion,
  etiquetaGuardar,
  onClose,
  onSubmit,
  children,
}: {
  titulo: string;
  descripcion?: string;
  etiquetaGuardar: string;
  onClose: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  children: React.ReactNode;
}) {
  const formId = "modal-formulario";

  return (
    <Modal
      open
      onClose={onClose}
      title={titulo}
      description={descripcion}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form={formId}>
            {etiquetaGuardar}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {children}
      </form>
    </Modal>
  );
}
