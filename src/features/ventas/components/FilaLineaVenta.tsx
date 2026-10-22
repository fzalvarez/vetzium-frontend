import { useState } from "react";
import {
  ClockIcon,
  GiftIcon,
  MessageSquareIcon,
  PencilIcon,
  PercentIcon,
  Trash2Icon,
  UserCheckIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, SelectNativo } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Insignia } from "@/shared/components/Insignia";
import { Celda, Fila } from "@/shared/components/Tabla";
import { proximamente } from "@/shared/utils";
import { formatearNumero, formatearSoles } from "@/shared/utils/formato";
import type { Usuario } from "@/features/configuracion/types";
import type { Mascota } from "@/features/mascotas/types";
import { calcularLinea } from "../lib/totales";
import type { LineaVenta } from "../types/venta";
import { CambiarPrecioModal } from "./CambiarPrecioModal";
import { ComentarioModal } from "./ComentarioModal";
import { DescuentoModal } from "./DescuentoModal";
import { VendedorModal } from "./VendedorModal";

type ModalAbierto = "precio" | "descuento" | "vendedor" | "comentario" | null;

function Accion({
  icono: Icono,
  etiqueta,
  activa = false,
  peligro = false,
  onClick,
}: {
  icono: LucideIcon;
  etiqueta: string;
  /** Resaltada cuando la línea ya la tiene (p. ej. descuento aplicado). */
  activa?: boolean;
  peligro?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      title={etiqueta}
      aria-label={etiqueta}
      aria-pressed={activa || undefined}
      onClick={onClick}
      className={cn(
        activa && "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
        peligro && "hover:text-error-600 dark:hover:text-error-400"
      )}
    >
      <Icono className="size-4" />
    </Button>
  );
}

/** Fila de la venta con precio editable y opciones (tiempo, comentario, vendedor, descuento, regalo, quitar). */
export function FilaLineaVenta({
  linea,
  tasaIgv,
  mascotas,
  vendedores,
  onActualizar,
  onQuitar,
}: {
  linea: LineaVenta;
  tasaIgv: number;
  mascotas: Mascota[];
  vendedores: Usuario[];
  onActualizar: (cambios: Partial<LineaVenta>) => void;
  onQuitar: () => void;
}) {
  const [modal, setModal] = useState<ModalAbierto>(null);
  const m = calcularLinea(linea, tasaIgv);
  const nombre = linea.item.nombre;
  const vendedor = vendedores.find((v) => v.id === linea.vendedorId);
  const cerrar = () => setModal(null);

  return (
    <Fila>
      <Celda destacada className="whitespace-normal">
        <span>{nombre}</span>
        {linea.item.icbper && <span className="ml-2 text-xs font-normal text-gray-500">(afecto a ICBPER)</span>}
        {/* Lo aplicado a la línea, con texto (no solo color). */}
        <span className="mt-1 flex flex-wrap gap-1 font-normal">
          {linea.regalo && <Insignia tono="exito" icono={GiftIcon}>Regalo</Insignia>}
          {!linea.regalo && linea.descuento && (
            <Insignia tono="aviso" icono={PercentIcon}>
              {linea.descuento.tipo === "porcentaje"
                ? `−${formatearNumero(linea.descuento.valor)} %`
                : `−${formatearSoles(linea.descuento.valor)}`}
            </Insignia>
          )}
          {linea.precio !== undefined && <Insignia tono="info">Precio cambiado</Insignia>}
          {vendedor && <Insignia tono="neutro" icono={UserCheckIcon}>{vendedor.nombre}</Insignia>}
        </span>
        {linea.comentario && (
          <span className="mt-1 block text-xs font-normal italic text-gray-500 dark:text-gray-400">“{linea.comentario}”</span>
        )}
      </Celda>
      <Celda alinear="derecha" numerica>
        <span className="inline-flex items-center gap-1">
          {formatearSoles(m.valorUnitario)}
          <Button variant="ghost" size="icon-sm" title="Cambiar precio" aria-label={`Cambiar precio de ${nombre}`} onClick={() => setModal("precio")}>
            <PencilIcon className="size-3.5" />
          </Button>
        </span>
      </Celda>
      <Celda alinear="centro">
        <Input
          type="number"
          min={1}
          step={1}
          value={linea.cantidad}
          onChange={(e) => onActualizar({ cantidad: Math.max(1, Math.floor(Number(e.target.value) || 1)) })}
          aria-label={`Cantidad de ${nombre}`}
          className="mx-auto h-8 w-20 text-center tabular-nums"
        />
      </Celda>
      <Celda alinear="derecha" numerica>{formatearSoles(m.subtotal)}</Celda>
      <Celda alinear="derecha" numerica>{formatearSoles(m.impuestos)}</Celda>
      <Celda alinear="derecha" numerica destacada>{formatearSoles(m.total)}</Celda>
      <Celda>
        <SelectNativo
          value={linea.mascotaId ?? ""}
          onChange={(e) => onActualizar({ mascotaId: e.target.value ? Number(e.target.value) : null })}
          aria-label={`Mascota de ${nombre}`}
          className="h-8 w-36"
        >
          <option value="">Sin mascota</option>
          {mascotas.map((ms) => (
            <option key={ms.id} value={ms.id}>
              {ms.nombre}
            </option>
          ))}
        </SelectNativo>
      </Celda>
      <Celda alinear="centro">
        <div className="flex items-center justify-center gap-0.5">
          <Accion icono={ClockIcon} etiqueta="Tiempo" onClick={() => proximamente("Tiempo")} />
          <Accion icono={MessageSquareIcon} etiqueta="Comentario" activa={!!linea.comentario} onClick={() => setModal("comentario")} />
          <Accion icono={UserCheckIcon} etiqueta="Asignar vendedor" activa={!!vendedor} onClick={() => setModal("vendedor")} />
          <Accion icono={PercentIcon} etiqueta="Aplicar descuento" activa={!!linea.descuento && !linea.regalo} onClick={() => setModal("descuento")} />
          <Accion
            icono={GiftIcon}
            etiqueta={linea.regalo ? "Quitar regalo" : "Aplicar regalo"}
            activa={!!linea.regalo}
            onClick={() => onActualizar({ regalo: !linea.regalo })}
          />
          <Accion icono={Trash2Icon} etiqueta={`Quitar ${nombre}`} peligro onClick={onQuitar} />
        </div>
      </Celda>

      {modal === "precio" && (
        <CambiarPrecioModal
          concepto={nombre}
          precioActual={m.precio}
          tasaIgv={tasaIgv}
          onClose={cerrar}
          onCambiar={(precio) => {
            // Volver al precio de lista no deja la marca "Precio cambiado".
            onActualizar({ precio: precio === linea.item.precio ? undefined : precio });
            cerrar();
          }}
        />
      )}
      {modal === "descuento" && (
        <DescuentoModal
          titulo="Aplicar descuento"
          descripcion={nombre}
          base={m.precio * linea.cantidad}
          actual={linea.descuento}
          onClose={cerrar}
          onAplicar={(descuento) => {
            onActualizar({ descuento, regalo: false });
            cerrar();
          }}
        />
      )}
      {modal === "vendedor" && (
        <VendedorModal
          concepto={nombre}
          vendedores={vendedores}
          actual={linea.vendedorId}
          onClose={cerrar}
          onAsignar={(vendedorId) => {
            onActualizar({ vendedorId });
            cerrar();
          }}
        />
      )}
      {modal === "comentario" && (
        <ComentarioModal
          concepto={nombre}
          actual={linea.comentario}
          onClose={cerrar}
          onGuardar={(comentario) => {
            onActualizar({ comentario: comentario || undefined });
            cerrar();
          }}
        />
      )}
    </Fila>
  );
}
