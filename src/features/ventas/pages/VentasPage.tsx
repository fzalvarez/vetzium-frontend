import { useNavigate } from "react-router-dom";
import { ReceiptTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectNativo } from "@/components/ui/input";
import { BuscadorSeleccion } from "@/shared/components/BuscadorSeleccion";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { formatearNumero, formatearSoles } from "@/shared/utils/formato";
import { coincide } from "@/shared/utils/texto";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import { useConfiguracionStore } from "@/features/configuracion/store/configuracion.store";
import { useMascotasStore } from "@/features/mascotas/store/mascotas.store";
import { BarraCliente } from "../components/BarraCliente";
import { FilaLineaVenta } from "../components/FilaLineaVenta";
import { ResumenVenta } from "../components/ResumenVenta";
import { ITEMS_VENDIBLES_EJEMPLO } from "../datos-ejemplo";
import { calcularTotales } from "../lib/totales";
import { ALMACENES_VENTA, useVentaStore } from "../store/venta.store";
import type { ItemVendible } from "../types/venta";

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

export default function VentasPage() {
  const navigate = useNavigate();
  const tasaIgv = useConfiguracionStore((s) => s.datosFiscales.tasaIgv);
  const usuarios = useConfiguracionStore((s) => s.usuarios);
  // Vendedores que pueden comisionar: usuarios activos.
  const vendedores = usuarios.filter((u) => u.activo);
  const clientes = useClientesStore((s) => s.clientes);
  const todasMascotas = useMascotasStore((s) => s.mascotas);
  // La venta en curso vive en un store: se conserva al ir a registrar una mascota y volver.
  const { clienteId, almacen, lineas, setCliente, setAlmacen, actualizar, quitar, agregar: agregarLinea } = useVentaStore();

  const cliente = clientes.find((c) => c.id === clienteId) ?? null;
  const mascotas = cliente ? todasMascotas.filter((m) => m.clienteId === cliente.id) : [];
  // Productos con stock en el almacén elegido; los servicios no dependen del almacén.
  const disponibles = ITEMS_VENDIBLES_EJEMPLO.filter((i) => i.tipo === "servicio" || i.almacen === almacen);
  const totales = calcularTotales(lineas, tasaIgv);

  // Con una sola mascota, se asigna sola.
  const agregar = (item: ItemVendible) => agregarLinea(item, mascotas.length === 1 ? mascotas[0].id : null);

  return (
    <>
      <EncabezadoPagina modulo="Ventas" titulo="Ventas" acciones={<EtiquetaEjemplo />} />

      <div className="flex flex-col gap-6">
        <Tarjeta className="overflow-visible">
          <BarraCliente
            cliente={cliente}
            mascotas={mascotas}
            onSeleccionar={(c) => setCliente(c.id)}
            onQuitar={() => setCliente(null)}
          />
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
            {lineas.map((l) => (
              <FilaLineaVenta
                key={l.item.id}
                linea={l}
                tasaIgv={tasaIgv}
                mascotas={mascotas}
                vendedores={vendedores}
                onActualizar={(cambios) => actualizar(l.item.id, cambios)}
                onQuitar={() => quitar(l.item.id)}
              />
            ))}
          </Tabla>

          <div className="flex flex-col gap-5 border-t border-gray-200 p-5 dark:border-gray-800">
            <ResumenVenta totales={totales} />
            <div className="flex justify-end">
              <Button variant="success" onClick={() => navigate("/ventas/comprobantes/nuevo")} disabled={!cliente || lineas.length === 0}>
                <ReceiptTextIcon className="size-4" />
                Ir a caja y generar comprobante
              </Button>
            </div>
          </div>
        </Tarjeta>
      </div>
    </>
  );
}
