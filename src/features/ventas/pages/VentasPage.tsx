import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, SelectNativo } from "@/components/ui/input";
import { BuscadorSeleccion } from "@/shared/components/BuscadorSeleccion";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Celda, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { formatearNumero, formatearSoles } from "@/shared/utils/formato";
import { coincide } from "@/shared/utils/texto";
import type { Cliente } from "@/features/clientes/types";
import { useConfiguracionStore } from "@/features/configuracion/store/configuracion.store";
import { MASCOTAS_EJEMPLO } from "@/features/mascotas/datos-ejemplo";
import { ALMACENES_EJEMPLO } from "@/features/productos/datos-ejemplo";
import { BarraCliente } from "../components/BarraCliente";
import { ResumenVenta } from "../components/ResumenVenta";
import { ITEMS_VENDIBLES_EJEMPLO } from "../datos-ejemplo";
import { calcularLinea, calcularTotales } from "../lib/totales";
import type { ItemVendible, LineaVenta } from "../types/venta";

const COLUMNAS: Columna[] = [
  { titulo: "Concepto" },
  { titulo: "Valor unitario", alinear: "derecha" },
  { titulo: "Cantidad", alinear: "centro" },
  { titulo: "Subtotal", alinear: "derecha" },
  { titulo: "Impuestos", alinear: "derecha" },
  { titulo: "Total", alinear: "derecha" },
  { titulo: "Mascota" },
  { titulo: "Opciones", alinear: "centro" },
];

// Solo se vende desde almacenes activos marcados "Usar para ventas".
const ALMACENES_VENTA = ALMACENES_EJEMPLO.filter((a) => a.estado === "activo" && a.usarParaVentas);

export default function VentasPage() {
  const tasaIgv = useConfiguracionStore((s) => s.datosFiscales.tasaIgv);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [almacen, setAlmacen] = useState(ALMACENES_VENTA[0]?.nombre ?? "");
  const [lineas, setLineas] = useState<LineaVenta[]>([]);

  const mascotas = cliente ? MASCOTAS_EJEMPLO.filter((m) => m.clienteId === cliente.id) : [];
  // Productos con stock en el almacén elegido; los servicios no dependen del almacén.
  const disponibles = ITEMS_VENDIBLES_EJEMPLO.filter((i) => i.tipo === "servicio" || i.almacen === almacen);
  const totales = calcularTotales(lineas, tasaIgv);

  const seleccionarCliente = (c: Cliente) => {
    setCliente(c);
    // La mascota de cada línea pertenece al cliente anterior: se limpia.
    setLineas((actuales) => actuales.map((l) => ({ ...l, mascotaId: null })));
  };

  const agregar = (item: ItemVendible) =>
    setLineas((actuales) => {
      const existente = actuales.find((l) => l.item.id === item.id);
      if (existente) return actuales.map((l) => (l === existente ? { ...l, cantidad: l.cantidad + 1 } : l));
      // Con una sola mascota, se asigna sola.
      return [...actuales, { item, cantidad: 1, mascotaId: mascotas.length === 1 ? mascotas[0].id : null }];
    });

  const actualizar = (id: string, cambios: Partial<LineaVenta>) =>
    setLineas((actuales) => actuales.map((l) => (l.item.id === id ? { ...l, ...cambios } : l)));

  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Ventas" acciones={<EtiquetaEjemplo />} />

      <div className="flex flex-col gap-6">
        <Tarjeta className="overflow-visible">
          <BarraCliente cliente={cliente} mascotas={mascotas} onSeleccionar={seleccionarCliente} onQuitar={() => setCliente(null)} />
        </Tarjeta>

        <Tarjeta className="overflow-visible">
          <div className="grid grid-cols-1 gap-4 border-b border-gray-200 p-5 md:grid-cols-[16rem_1fr] dark:border-gray-800">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="venta-almacen" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Almacén de origen
              </label>
              <SelectNativo id="venta-almacen" value={almacen} onChange={(e) => setAlmacen(e.target.value)}>
                {ALMACENES_VENTA.map((a) => (
                  <option key={a.id} value={a.nombre}>
                    {a.nombre}
                  </option>
                ))}
              </SelectNativo>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="venta-producto" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Buscar y agregar productos y servicios a la cuenta del cliente
              </label>
              <BuscadorSeleccion
                id="venta-producto"
                opciones={disponibles}
                filtrar={(i, q) => coincide(q, i.nombre)}
                clave={(i) => i.id}
                onSeleccionar={agregar}
                disabled={!cliente}
                placeholder={cliente ? "Buscar producto" : "Primero selecciona un cliente"}
                sinResultados="Ningún producto o servicio coincide."
                renderOpcion={(i) => (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Insignia tono={i.tipo === "producto" ? "info" : "neutro"}>
                        {i.tipo === "producto" ? "Producto" : "Servicio"}
                      </Insignia>
                      <span className="truncate text-gray-800 dark:text-gray-100">{i.nombre}</span>
                    </div>
                    <span className="shrink-0 text-xs tabular-nums text-gray-500 dark:text-gray-400">
                      {i.stock !== null && `Stock: ${formatearNumero(i.stock)} · `}
                      {formatearSoles(i.precio)}
                    </span>
                  </div>
                )}
              />
            </div>
          </div>

          <Tabla
            columnas={COLUMNAS}
            vacia={lineas.length === 0}
            mensajeVacio={cliente ? "Agrega productos o servicios a la cuenta." : "Selecciona un cliente para empezar."}
          >
            {lineas.map((l) => {
              const m = calcularLinea(l, tasaIgv);
              return (
                <Fila key={l.item.id}>
                  <Celda destacada>
                    {l.item.nombre}
                    {l.item.icbper && <span className="ml-2 text-xs font-normal text-gray-500">(afecto a ICBPER)</span>}
                  </Celda>
                  <Celda alinear="derecha" numerica>{formatearSoles(m.valorUnitario)}</Celda>
                  <Celda alinear="centro">
                    <Input
                      type="number"
                      min={1}
                      step={1}
                      value={l.cantidad}
                      onChange={(e) => actualizar(l.item.id, { cantidad: Math.max(1, Math.floor(Number(e.target.value) || 1)) })}
                      aria-label={`Cantidad de ${l.item.nombre}`}
                      className="mx-auto h-8 w-20 text-center tabular-nums"
                    />
                  </Celda>
                  <Celda alinear="derecha" numerica>{formatearSoles(m.subtotal)}</Celda>
                  <Celda alinear="derecha" numerica>{formatearSoles(m.impuestos)}</Celda>
                  <Celda alinear="derecha" numerica destacada>{formatearSoles(m.total)}</Celda>
                  <Celda>
                    <SelectNativo
                      value={l.mascotaId ?? ""}
                      onChange={(e) => actualizar(l.item.id, { mascotaId: e.target.value ? Number(e.target.value) : null })}
                      aria-label={`Mascota de ${l.item.nombre}`}
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
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Quitar ${l.item.nombre}`}
                      title="Quitar"
                      onClick={() => setLineas((actuales) => actuales.filter((x) => x.item.id !== l.item.id))}
                      className="hover:text-error-600 dark:hover:text-error-400"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </Celda>
                </Fila>
              );
            })}
          </Tabla>

          <div className="border-t border-gray-200 p-5 dark:border-gray-800">
            <ResumenVenta totales={totales} />
          </div>
        </Tarjeta>
      </div>
    </>
  );
}
