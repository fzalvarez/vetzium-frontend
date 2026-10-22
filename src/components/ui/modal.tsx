import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ANCHO = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Botones del pie (Cancelar / Guardar…), alineados a la derecha. */
  footer?: ReactNode;
  size?: keyof typeof ANCHO;
  /** Mientras se guarda: no se cierra con Esc, clic afuera ni la X. */
  busy?: boolean;
  children?: ReactNode;
}

/** Modal centrado estándar (patrón de tms): Esc y clic afuera lo cierran, el foco
 * queda adentro y el cuerpo scrollea si el contenido no entra en pantalla. */
export function Modal({ open, onClose, title, description, footer, size = "md", busy = false, children }: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(abierto) => {
        if (!abierto && !busy) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-150" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-h-[calc(100vh-2rem)]",
            "flex flex-col overflow-hidden rounded-xl bg-white shadow-theme-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-150",
            ANCHO[size]
          )}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between gap-4 shrink-0 dark:border-gray-800">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="text-sm text-gray-500 mt-0.5 dark:text-gray-400">
                  {description}
                </Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{title}</Dialog.Description>
              )}
            </div>
            <Dialog.Close
              disabled={busy}
              aria-label="Cerrar"
              className="p-1.5 -mr-1.5 rounded-full text-gray-500 hover:bg-brand-50 disabled:opacity-40 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <XIcon className="size-5" />
            </Dialog.Close>
          </div>

          {children && <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>}

          {footer && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0 dark:bg-white/5 dark:border-gray-800">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
