import {
  DownloadIcon,
  EllipsisVerticalIcon,
  GroupIcon,
  ListFilterIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { proximamente } from "@/shared/utils";

// Botones habituales de la barra sobre una tabla. Sin `onClick`, avisan "Próximamente".

type Props = { onClick?: () => void };

export function BotonMasFiltros({ onClick }: Props) {
  return (
    <Button variant="outline" size="sm" onClick={onClick ?? (() => proximamente("Más filtros"))}>
      <ListFilterIcon className="size-4" />
      Más filtros
    </Button>
  );
}

export function BotonAgrupar({ onClick }: Props) {
  return (
    <Button variant="outline" size="sm" onClick={onClick ?? (() => proximamente("Agrupar"))}>
      <GroupIcon className="size-4" />
      Agrupar
    </Button>
  );
}

export function BotonBorrar({ onClick }: Props) {
  return (
    <Button variant="outline" size="sm" onClick={onClick ?? (() => proximamente("Borrar"))}>
      <Trash2Icon className="size-4" />
      Borrar
    </Button>
  );
}

export function BotonActualizar({ onClick }: Props) {
  return (
    <Button variant="outline" size="sm" onClick={onClick ?? (() => proximamente("Actualizar"))}>
      <RefreshCwIcon className="size-4" />
      Actualizar
    </Button>
  );
}

/** Acción principal de creación. `que` nombra lo que se crea en el aviso ("Nueva orden de compra"). */
export function BotonNuevo({ onClick, label = "Nuevo", que }: Props & { label?: string; que: string }) {
  return (
    <Button size="sm" onClick={onClick ?? (() => proximamente(que))}>
      <PlusIcon className="size-4" />
      {label}
    </Button>
  );
}

/** Exportar y menú de opciones, a la derecha de la barra. */
export function AccionesDerecha() {
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => proximamente("Exportar")}>
        <DownloadIcon className="size-4" />
        Exportar
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Opciones"
        title="Opciones"
        onClick={() => proximamente("Opciones")}
      >
        <EllipsisVerticalIcon className="size-4" />
      </Button>
    </>
  );
}
