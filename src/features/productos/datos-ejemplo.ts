import type { Almacen, Lote, MovimientoStock, Producto, StockAlmacen } from "./types";

// DATOS DE EJEMPLO: no hay backend todavía. Las páginas lo indican con una etiqueta.
// Productos, almacenes y proveedores se repiten entre tablas para que cuadren.

export const PRODUCTOS_EJEMPLO: Producto[] = [
  {
    id: 1,
    codigoBarras: "7750182000123",
    nombre: "Vacuna séxtuple canina",
    marca: "Zoetis",
    proveedor: "Distribuidora VetPerú S.A.C.",
    lineas: "Biológicos",
    codigoTributario: "10 – Gravado",
    empresa: "Clínica Central",
  },
  {
    id: 2,
    codigoBarras: "7891106001572",
    nombre: "Bravecto 20–40 kg",
    marca: "MSD",
    proveedor: "Distribuidora VetPerú S.A.C.",
    lineas: "Farmacia",
    codigoTributario: "10 – Gravado",
    empresa: "Clínica Central",
  },
  {
    id: 3,
    codigoBarras: "7750243001189",
    nombre: "Alimento adulto raza mediana 15 kg",
    marca: "Royal Canin",
    proveedor: "Alimentos Pet S.A.",
    lineas: "Alimentos",
    codigoTributario: "10 – Gravado",
    empresa: "Clínica Central",
  },
  {
    id: 4,
    codigoBarras: "7702184010436",
    nombre: "Shampoo hipoalergénico 500 ml",
    marca: "Petys",
    proveedor: "Insumos Grooming E.I.R.L.",
    lineas: "Peluquería",
    codigoTributario: "10 – Gravado",
    empresa: "Clínica Central",
  },
  {
    id: 5,
    codigoBarras: "7750111002345",
    nombre: "Jeringa descartable 5 ml x100",
    marca: "BD",
    proveedor: "Insumos Médicos del Sur S.A.C.",
    lineas: "Insumos",
    codigoTributario: "10 – Gravado",
    empresa: "Clínica Central",
  },
];

export const DESCARGAS_EJEMPLO: MovimientoStock[] = [
  { numero: "DS-0005", fechaCreacion: "2026-10-22", tipoOperacion: "Consumo interno", motivo: "Uso en consultas del día", responsable: "Dra. Patricia Salas", registradoPor: "Recepción" },
  { numero: "DS-0004", fechaCreacion: "2026-10-19", tipoOperacion: "Merma", motivo: "Frasco roto", responsable: "Luis Gómez", registradoPor: "Administrador" },
  { numero: "DS-0003", fechaCreacion: "2026-10-15", tipoOperacion: "Vencimiento", motivo: "Lote vencido", responsable: "Luis Gómez", registradoPor: "Administrador" },
  { numero: "DS-0002", fechaCreacion: "2026-10-11", tipoOperacion: "Ajuste de inventario", motivo: "Diferencia en conteo", responsable: "Carla Ríos", registradoPor: "Administrador" },
  { numero: "DS-0001", fechaCreacion: "2026-10-04", tipoOperacion: "Consumo interno", motivo: "Uso en peluquería", responsable: "Miguel Torres", registradoPor: "Recepción" },
];

export const CARGAS_EJEMPLO: MovimientoStock[] = [
  { numero: "CS-0005", fechaCreacion: "2026-10-21", tipoOperacion: "Compra", motivo: "Recepción OC-0004", responsable: "Luis Gómez", registradoPor: "Administrador" },
  { numero: "CS-0004", fechaCreacion: "2026-10-16", tipoOperacion: "Compra", motivo: "Recepción OC-0003", responsable: "Carla Ríos", registradoPor: "Administrador" },
  { numero: "CS-0003", fechaCreacion: "2026-10-09", tipoOperacion: "Ajuste de inventario", motivo: "Diferencia en conteo", responsable: "Carla Ríos", registradoPor: "Administrador" },
  { numero: "CS-0002", fechaCreacion: "2026-10-06", tipoOperacion: "Compra", motivo: "Recepción OC-0001", responsable: "Luis Gómez", registradoPor: "Administrador" },
  { numero: "CS-0001", fechaCreacion: "2026-10-01", tipoOperacion: "Devolución", motivo: "Devolución de cliente", responsable: "Miguel Torres", registradoPor: "Recepción" },
];

export const STOCK_ALMACEN_EJEMPLO: StockAlmacen[] = [
  { id: 1, producto: "Vacuna séxtuple canina", almacen: "Almacén principal", precioCompra: 52, precioVenta: 85, stockContable: 24 },
  { id: 2, producto: "Bravecto 20–40 kg", almacen: "Farmacia", precioCompra: 98, precioVenta: 145, stockContable: 12 },
  { id: 3, producto: "Alimento adulto raza mediana 15 kg", almacen: "Almacén principal", precioCompra: 210, precioVenta: 289.9, stockContable: 8 },
  { id: 4, producto: "Shampoo hipoalergénico 500 ml", almacen: "Peluquería", precioCompra: 18.5, precioVenta: 32, stockContable: 15 },
  { id: 5, producto: "Jeringa descartable 5 ml x100", almacen: "Hospitalización", precioCompra: 28, precioVenta: 45, stockContable: 6 },
];

export const ALMACENES_EJEMPLO: Almacen[] = [
  { id: 1, nombre: "Almacén principal", codigo: "ALM-01", tipo: "principal", estado: "activo", usarParaVentas: true },
  { id: 2, nombre: "Farmacia", codigo: "ALM-02", tipo: "secundario", estado: "activo", usarParaVentas: true },
  { id: 3, nombre: "Peluquería", codigo: "ALM-03", tipo: "secundario", estado: "activo", usarParaVentas: false },
  { id: 4, nombre: "Hospitalización", codigo: "ALM-04", tipo: "secundario", estado: "activo", usarParaVentas: false },
  { id: 5, nombre: "Depósito antiguo", codigo: "ALM-05", tipo: "secundario", estado: "inactivo", usarParaVentas: false },
];

export const LOTES_EJEMPLO: Lote[] = [
  { id: 5, fechaRegistro: "2026-10-02", producto: "Vacuna séxtuple canina", numeroLote: "L-ZT2409", almacen: "Almacén principal", fechaVencimiento: "2027-04-30", cantidadEntrada: 30, saldo: 24 },
  { id: 4, fechaRegistro: "2026-09-25", producto: "Bravecto 20–40 kg", numeroLote: "L-MS8812", almacen: "Farmacia", fechaVencimiento: "2028-01-31", cantidadEntrada: 20, saldo: 12 },
  { id: 3, fechaRegistro: "2026-09-18", producto: "Alimento adulto raza mediana 15 kg", numeroLote: "L-RC5521", almacen: "Almacén principal", fechaVencimiento: "2027-03-15", cantidadEntrada: 10, saldo: 8 },
  { id: 2, fechaRegistro: "2026-09-10", producto: "Shampoo hipoalergénico 500 ml", numeroLote: "L-PT0934", almacen: "Peluquería", fechaVencimiento: "2026-10-12", cantidadEntrada: 24, saldo: 15 },
  { id: 1, fechaRegistro: "2026-08-29", producto: "Jeringa descartable 5 ml x100", numeroLote: "L-BD7710", almacen: "Hospitalización", fechaVencimiento: "2026-11-08", cantidadEntrada: 10, saldo: 6 },
];
