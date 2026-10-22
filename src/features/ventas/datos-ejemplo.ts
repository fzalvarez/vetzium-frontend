import { CLIENTES_EJEMPLO, nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { PRODUCTOS_EJEMPLO, STOCK_ALMACEN_EJEMPLO } from "@/features/productos/datos-ejemplo";
import type { CuentaPorCliente, ItemCuenta } from "./types/cuenta-activa";
import type { MovimientoCaja } from "./types/movimiento-caja";
import type { ItemVendible } from "./types/venta";

// DATOS DE EJEMPLO: no hay backend todavía. Las páginas lo indican con una etiqueta.

/**
 * Lo que se puede vender: productos con stock (precio de venta de Stock por almacén),
 * una bolsa plástica (afecta a ICBPER) y servicios (precios de Cuentas activas).
 */
export const ITEMS_VENDIBLES_EJEMPLO: ItemVendible[] = [
  ...STOCK_ALMACEN_EJEMPLO.map((s) => ({
    id: `p-${PRODUCTOS_EJEMPLO.find((p) => p.nombre === s.producto)?.id ?? s.id}`,
    tipo: "producto" as const,
    nombre: s.producto,
    precio: s.precioVenta,
    almacen: s.almacen,
    stock: s.stockContable,
    icbper: false,
  })),
  { id: "p-bolsa", tipo: "producto", nombre: "Bolsa plástica", precio: 0.1, almacen: "Almacén principal", stock: 200, icbper: true },
  { id: "s-1", tipo: "servicio", nombre: "Consulta general", precio: 60, almacen: null, stock: null, icbper: false },
  { id: "s-2", tipo: "servicio", nombre: "Baño y corte", precio: 60, almacen: null, stock: null, icbper: false },
  { id: "s-3", tipo: "servicio", nombre: "Radiografía", precio: 90, almacen: null, stock: null, icbper: false },
  { id: "s-4", tipo: "servicio", nombre: "Hospitalización (día)", precio: 120, almacen: null, stock: null, icbper: false },
  { id: "s-5", tipo: "servicio", nombre: "Desparasitación interna", precio: 25, almacen: null, stock: null, icbper: false },
];

export const ITEMS_CUENTA_EJEMPLO: ItemCuenta[] = [
  { id: 5, fechaRegistro: "2026-10-22", clienteId: 1, mascota: "Firulais", descripcion: "Vacuna séxtuple", precioUnitario: 85, cantidad: 1 },
  { id: 4, fechaRegistro: "2026-10-21", clienteId: 2, mascota: "Luna", descripcion: "Hospitalización (día)", precioUnitario: 120, cantidad: 2 },
  { id: 3, fechaRegistro: "2026-10-20", clienteId: 3, mascota: "Michi", descripcion: "Desparasitación interna", precioUnitario: 25, cantidad: 2 },
  { id: 2, fechaRegistro: "2026-10-19", clienteId: 5, mascota: "Rocky", descripcion: "Baño y corte", precioUnitario: 60, cantidad: 1 },
  { id: 1, fechaRegistro: "2026-10-17", clienteId: 4, mascota: "Toby", descripcion: "Radiografía", precioUnitario: 90, cantidad: 1 },
];

/** Cuentas por cliente calculadas desde los ítems (así ambas pestañas cuadran). */
export function cuentasPorCliente(items: ItemCuenta[]): CuentaPorCliente[] {
  const porCliente = new Map<number, CuentaPorCliente>();
  for (const item of items) {
    const cliente = CLIENTES_EJEMPLO.find((c) => c.id === item.clienteId);
    const actual = porCliente.get(item.clienteId) ?? {
      clienteId: item.clienteId,
      cliente: cliente ? nombreCompleto(cliente) : `Cliente ${item.clienteId}`,
      telefono: cliente?.telefonos[0] ?? null,
      ultimoMovimiento: item.fechaRegistro,
      items: 0,
      monto: 0,
    };
    actual.items += 1;
    actual.monto += item.precioUnitario * item.cantidad;
    if (item.fechaRegistro > actual.ultimoMovimiento) actual.ultimoMovimiento = item.fechaRegistro;
    porCliente.set(item.clienteId, actual);
  }
  return [...porCliente.values()].sort((a, b) => b.ultimoMovimiento.localeCompare(a.ultimoMovimiento));
}
export const MOVIMIENTOS_CAJA_EJEMPLO: MovimientoCaja[] = [
  {
    id: 5,
    fecha: "2026-10-22",
    descripcion: "Pago de consulta – Firulais",
    etiquetas: ["Consulta"],
    medioPago: "Efectivo",
    tipo: "entrada",
    monto: 80,
    docReferencia: "B001-000154",
    numeroOperacion: null,
  },
  {
    id: 4,
    fecha: "2026-10-22",
    descripcion: "Compra de útiles de limpieza",
    etiquetas: ["Limpieza"],
    medioPago: "Efectivo",
    tipo: "salida",
    monto: 45.5,
    docReferencia: "F001-002311",
    numeroOperacion: null,
  },
  {
    id: 3,
    fecha: "2026-10-21",
    descripcion: "Adelanto de cirugía – Luna",
    etiquetas: ["Cirugía", "Adelanto"],
    medioPago: "Yape",
    tipo: "entrada",
    monto: 150,
    docReferencia: null,
    numeroOperacion: "872364",
  },
  {
    id: 2,
    fecha: "2026-10-21",
    descripcion: "Pago a proveedor de vacunas",
    etiquetas: ["Proveedores"],
    medioPago: "Transferencia",
    tipo: "salida",
    monto: 620,
    docReferencia: "F002-000873",
    numeroOperacion: "00451236",
  },
  {
    id: 1,
    fecha: "2026-10-20",
    descripcion: "Baño y corte – Rocky",
    etiquetas: ["Peluquería"],
    medioPago: "Tarjeta",
    tipo: "entrada",
    monto: 60,
    docReferencia: "B001-000150",
    numeroOperacion: "449120",
  },
];
