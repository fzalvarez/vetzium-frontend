import { useState } from "react";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Pestanas } from "@/shared/components/Pestanas";
import { SelectorFiltro } from "@/shared/components/SelectorFiltro";
import { Celda, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { notifySuccess } from "@/shared/utils";
import { formatearFecha, hoyPeru } from "@/shared/utils/fechas";
import { formatearNumero } from "@/shared/utils/formato";
import { coincide } from "@/shared/utils/texto";
import { ITEMS_VENDIBLES_EJEMPLO } from "@/features/ventas/datos-ejemplo";
import { ImagenPromocion } from "../components/ImagenPromocion";
import { PromocionModal } from "../components/PromocionModal";
import { PROMOCIONES_EJEMPLO } from "../datos-ejemplo";
import type { Promocion } from "../types";

const VISTAS = ["lista", "catalogo"] as const;

const COLUMNAS: Columna[] = [
  { titulo: "Fecha de creación" },
  { titulo: "Imagen" },
  { titulo: "Nombre de la promoción" },
  { titulo: "Nombre del producto" },
  { titulo: "Fecha de expiración" },
  { titulo: "Valor" },
  { titulo: "Estado", alinear: "centro" },
  { titulo: "Opciones", alinear: "centro" },
];

const ESTADOS = [
  { valor: "todos", label: "Todos" },
  { valor: "activa", label: "Activas" },
  { valor: "inactiva", label: "Inactivas" },
];

// Productos y servicios a los que se puede aplicar una promoción (sin la bolsa).
const PRODUCTOS = [...new Set(ITEMS_VENDIBLES_EJEMPLO.filter((i) => !i.icbper).map((i) => i.nombre))];

const vencida = (p: Promocion) => p.fechaExpiracion < hoyPeru();

function Puntos({ valor }: { valor: number }) {
  return <Insignia tono="info">+{formatearNumero(valor)} puntos</Insignia>;
}

function Lista({
  promociones,
  setPromociones,
}: {
  promociones: Promocion[];
  setPromociones: React.Dispatch<React.SetStateAction<Promocion[]>>;
}) {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");
  const [venceHasta, setVenceHasta] = useState("");
  const [creando, setCreando] = useState(false);
  const [viendo, setViendo] = useState<Promocion | null>(null);
  const [eliminando, setEliminando] = useState<Promocion | null>(null);

  const filtradas = promociones.filter(
    (p) =>
      coincide(busqueda, p.producto, p.nombre) &&
      (estado === "todos" || p.activa === (estado === "activa")) &&
      (!venceHasta || p.fechaExpiracion <= venceHasta)
  );
  const { visibles, paginacion } = usePaginacion(filtradas);

  const actualizar = (id: number, cambios: Partial<Promocion>) =>
    setPromociones((actuales) => actuales.map((p) => (p.id === id ? { ...p, ...cambios } : p)));

  return (
    <>
      <BarraHerramientas
        derecha={<BotonNuevo label="Crear promoción" que="Crear promoción" onClick={() => setCreando(true)} />}
      >
        <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Producto o servicio" />
        <SelectorFiltro etiqueta="Estado" opciones={ESTADOS} valor={estado} onChange={setEstado} />
        <label className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          Expira hasta:
          <input
            type="date"
            value={venceHasta}
            onChange={(e) => setVenceHasta(e.target.value)}
            className="h-8 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
      </BarraHerramientas>

      <Tabla
        columnas={COLUMNAS}
        vacia={filtradas.length === 0}
        mensajeVacio="Ninguna promoción coincide con los filtros."
        paginacion={paginacion}
      >
        {visibles.map((p) => (
          <Fila key={p.id}>
            <Celda numerica>{formatearFecha(p.fechaCreacion)}</Celda>
            <Celda>
              <ImagenPromocion src={p.imagen} alt={p.nombre} className="size-10" />
            </Celda>
            <Celda destacada>{p.nombre}</Celda>
            <Celda>{p.producto}</Celda>
            <Celda numerica>
              <span className="flex items-center gap-2">
                {formatearFecha(p.fechaExpiracion)}
                {vencida(p) && <Insignia tono="neutro">Vencida</Insignia>}
              </span>
            </Celda>
            <Celda>
              <Puntos valor={p.puntos} />
            </Celda>
            <Celda alinear="centro">
              <Switch
                checked={p.activa}
                onCheckedChange={(activa) => actualizar(p.id, { activa })}
                aria-label={`${p.activa ? "Desactivar" : "Activar"} ${p.nombre}`}
              />
            </Celda>
            <Celda alinear="centro">
              <div className="flex items-center justify-center gap-1">
                <Button variant="ghost" size="icon-sm" title="Ver" aria-label={`Ver ${p.nombre}`} onClick={() => setViendo(p)}>
                  <EyeIcon className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title="Eliminar"
                  aria-label={`Eliminar ${p.nombre}`}
                  onClick={() => setEliminando(p)}
                  className="hover:text-error-600 dark:hover:text-error-400"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </Celda>
          </Fila>
        ))}
      </Tabla>

      {creando && (
        <PromocionModal
          productos={PRODUCTOS}
          onClose={() => setCreando(false)}
          onGuardar={(nueva) => {
            const id = Math.max(0, ...promociones.map((p) => p.id)) + 1;
            setPromociones((actuales) => [{ id, ...nueva }, ...actuales]);
            notifySuccess(`Promoción "${nueva.nombre}" creada.`);
            setCreando(false);
          }}
        />
      )}

      {viendo && (
        <Modal open size="sm" title={viendo.nombre} onClose={() => setViendo(null)}>
          <div className="flex flex-col gap-4">
            <ImagenPromocion src={viendo.imagen} alt={viendo.nombre} className="aspect-video w-full" />
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-500 dark:text-gray-400">Producto o servicio</dt>
              <dd className="text-right font-medium text-gray-800 dark:text-gray-100">{viendo.producto}</dd>
              <dt className="text-gray-500 dark:text-gray-400">Valor</dt>
              <dd className="text-right">
                <Puntos valor={viendo.puntos} />
              </dd>
              <dt className="text-gray-500 dark:text-gray-400">Creada</dt>
              <dd className="text-right tabular-nums text-gray-800 dark:text-gray-100">{formatearFecha(viendo.fechaCreacion)}</dd>
              <dt className="text-gray-500 dark:text-gray-400">Expira</dt>
              <dd className="text-right tabular-nums text-gray-800 dark:text-gray-100">{formatearFecha(viendo.fechaExpiracion)}</dd>
              <dt className="text-gray-500 dark:text-gray-400">Estado</dt>
              <dd className="text-right">
                <Insignia tono={viendo.activa ? "exito" : "neutro"}>{viendo.activa ? "Activa" : "Inactiva"}</Insignia>
              </dd>
            </dl>
          </div>
        </Modal>
      )}

      {eliminando && (
        <Modal
          open
          size="sm"
          title="Eliminar promoción"
          onClose={() => setEliminando(null)}
          footer={
            <>
              <Button variant="outline" onClick={() => setEliminando(null)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setPromociones((actuales) => actuales.filter((p) => p.id !== eliminando.id));
                  notifySuccess(`Promoción "${eliminando.nombre}" eliminada.`);
                  setEliminando(null);
                }}
              >
                Eliminar
              </Button>
            </>
          }
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Eliminar la promoción <strong className="text-gray-800 dark:text-gray-100">{eliminando.nombre}</strong>? Esta
            acción no se puede deshacer.
          </p>
        </Modal>
      )}
    </>
  );
}

/** Catálogo: las promociones activas y vigentes, como las vería el cliente. */
function Catalogo({ promociones }: { promociones: Promocion[] }) {
  const vigentes = promociones.filter((p) => p.activa && !vencida(p));

  if (vigentes.length === 0) {
    return <p className="px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400">No hay promociones activas.</p>;
  }
  return (
    <ul className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
      {vigentes.map((p) => (
        <li key={p.id} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <ImagenPromocion src={p.imagen} alt={p.nombre} className="aspect-video w-full rounded-none" />
          <div className="flex flex-col gap-1.5 p-4">
            <p className="font-semibold text-gray-800 dark:text-gray-100">{p.nombre}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{p.producto}</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <Puntos valor={p.puntos} />
              <span className="text-xs tabular-nums text-gray-500 dark:text-gray-400">Hasta {formatearFecha(p.fechaExpiracion)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PromocionesPage() {
  const [vista, setVista] = usePestanaUrl(VISTAS);
  // Sin backend: en memoria (se pierde al recargar). Compartido entre Lista y Catálogo.
  const [promociones, setPromociones] = useState<Promocion[]>(PROMOCIONES_EJEMPLO);

  return (
    <>
      <EncabezadoPagina modulo="Marketing" titulo="Promociones" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <Pestanas
          valor={vista}
          onChange={setVista}
          opciones={[
            { valor: "lista", label: "Lista" },
            { valor: "catalogo", label: "Catálogo" },
          ]}
        />
        {vista === "lista" ? (
          <Lista promociones={promociones} setPromociones={setPromociones} />
        ) : (
          <Catalogo promociones={promociones} />
        )}
      </Tarjeta>
    </>
  );
}
