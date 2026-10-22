import type { OrdenCompra, Proveedor } from "./types";

// DATOS DE EJEMPLO: no hay backend todavía. Las páginas lo indican con una etiqueta.
export const PROVEEDORES_EJEMPLO: Proveedor[] = [
  {
    id: 1,
    nombreLegal: "Distribuidora VetPerú S.A.C.",
    numeroTributario: "20512345678",
    telefonoFijo: "01 445 2200",
    celular: "987 100 200",
    correo: "ventas@vetperu.pe",
  },
  {
    id: 2,
    nombreLegal: "Alimentos Pet S.A.",
    numeroTributario: "20498765432",
    telefonoFijo: "01 610 3300",
    celular: "965 300 400",
    correo: "pedidos@alimentospet.pe",
  },
  {
    id: 3,
    nombreLegal: "Insumos Grooming E.I.R.L.",
    numeroTributario: "20601122334",
    telefonoFijo: null,
    celular: "912 555 666",
    correo: "contacto@insumosgrooming.pe",
  },
  {
    id: 4,
    nombreLegal: "Insumos Médicos del Sur S.A.C.",
    numeroTributario: "20455667788",
    telefonoFijo: "054 223 344",
    celular: "958 777 888",
    correo: "ventas@imsur.pe",
  },
  {
    id: 5,
    nombreLegal: "Laboratorio Biovet S.A.C.",
    numeroTributario: "20388990011",
    telefonoFijo: "01 330 4455",
    celular: "999 111 222",
    correo: "atencion@biovet.pe",
  },
];

export const ORDENES_COMPRA_EJEMPLO: OrdenCompra[] = [
  { numero: "OC-0005", proveedorId: 1, fechaCreacion: "2026-10-21", estado: "aprobado", valorNeto: 1200, impuestos: 216 },
  { numero: "OC-0004", proveedorId: 2, fechaCreacion: "2026-10-18", estado: "recibido", valorNeto: 850, impuestos: 153 },
  { numero: "OC-0003", proveedorId: 3, fechaCreacion: "2026-10-15", estado: "recibido", valorNeto: 320, impuestos: 57.6 },
  { numero: "OC-0002", proveedorId: 4, fechaCreacion: "2026-10-10", estado: "aprobado", valorNeto: 540, impuestos: 97.2 },
  { numero: "OC-0001", proveedorId: 5, fechaCreacion: "2026-10-05", estado: "recibido", valorNeto: 2100, impuestos: 378 },
];

export const nombreProveedor = (id: number) =>
  PROVEEDORES_EJEMPLO.find((p) => p.id === id)?.nombreLegal ?? `Proveedor ${id}`;
