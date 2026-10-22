import { MENU, claveDe } from "@/app/navegacion";
import { ACCIONES, type AccionPermiso } from "./constants";
import type { DatosFiscales, MetodoPago, PermisosRol, Rol, Usuario } from "./types";

// DATOS DE EJEMPLO: no hay backend todavía. Las páginas lo indican con una etiqueta.
// Los nombres coinciden con los de otras tablas de ejemplo (Recepción, Luis Gómez…).

/** Permisos a partir de "módulo → acciones"; los módulos no listados quedan sin acceso. */
function permisos(por: Record<string, AccionPermiso[]>): PermisosRol {
  return Object.fromEntries(MENU.map((m) => [claveDe(m), por[claveDe(m)] ?? []]));
}
const TODO = ACCIONES;
const VER: AccionPermiso[] = ["ver"];
const GESTION: AccionPermiso[] = ["ver", "crear", "editar"];

export const ROLES_EJEMPLO: Rol[] = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Acceso total al sistema.",
    fijo: true,
    permisos: Object.fromEntries(MENU.map((m) => [claveDe(m), TODO])),
  },
  {
    id: 2,
    nombre: "Veterinario",
    descripcion: "Atención clínica, agenda e internamientos.",
    fijo: false,
    permisos: permisos({
      "/": VER, "/dashboard": VER, "/sala-espera": GESTION, "/hospitalizaciones": GESTION,
      clientes: VER, mascotas: GESTION, eventos: GESTION, productos: VER, "/servicios": VER, "/laboratorio": GESTION,
    }),
  },
  {
    id: 3,
    nombre: "Recepción",
    descripcion: "Caja, sala de espera, clientes y citas.",
    fijo: false,
    permisos: permisos({
      "/": VER, "/dashboard": VER, ventas: GESTION, "/sala-espera": GESTION, peluqueria: VER, "/hotel": GESTION,
      transporte: GESTION, clientes: GESTION, mascotas: GESTION, eventos: GESTION, productos: VER, "/servicios": VER,
    }),
  },
  {
    id: 4,
    nombre: "Peluquería",
    descripcion: "Turnos y servicios de grooming.",
    fijo: false,
    permisos: permisos({ "/": VER, peluqueria: TODO, clientes: VER, mascotas: VER, productos: VER }),
  },
  {
    id: 5,
    nombre: "Logística",
    descripcion: "Inventario, almacenes, compras y guías.",
    fijo: false,
    permisos: permisos({ "/": VER, productos: TODO, proveedores: TODO, "/guias-remision": GESTION, "/reportes": VER }),
  },
];

export const USUARIOS_EJEMPLO: Usuario[] = [
  { id: 1, nombre: "Luis Gómez", correo: "luis.gomez@clinicacentral.pe", rolId: 1, activo: true, ultimoAcceso: "2026-10-22 08:14" },
  { id: 2, nombre: "Dra. Patricia Salas", correo: "patricia.salas@clinicacentral.pe", rolId: 2, activo: true, ultimoAcceso: "2026-10-22 09:02" },
  { id: 3, nombre: "Miguel Torres", correo: "miguel.torres@clinicacentral.pe", rolId: 3, activo: true, ultimoAcceso: "2026-10-21 18:47" },
  { id: 4, nombre: "Sofía Paredes", correo: "sofia.paredes@clinicacentral.pe", rolId: 4, activo: true, ultimoAcceso: "2026-10-20 16:30" },
  { id: 5, nombre: "Carla Ríos", correo: "carla.rios@clinicacentral.pe", rolId: 5, activo: false, ultimoAcceso: "2026-09-30 12:05" },
];

export const METODOS_PAGO_EJEMPLO: MetodoPago[] = [
  { id: 1, nombre: "Efectivo", tipo: "efectivo", requiereOperacion: false, observaciones: "Caja principal.", activo: true },
  { id: 2, nombre: "Yape", tipo: "billetera", requiereOperacion: true, observaciones: "Número 987 100 200.", activo: true },
  { id: 3, nombre: "Plin", tipo: "billetera", requiereOperacion: true, observaciones: "", activo: true },
  { id: 4, nombre: "Tarjeta", tipo: "tarjeta", requiereOperacion: true, observaciones: "POS Izipay; comisión 3.5 %.", activo: true },
  { id: 5, nombre: "Transferencia", tipo: "transferencia", requiereOperacion: true, observaciones: "BCP cta. cte. 193-0000000-0-00.", activo: true },
];

export const DATOS_FISCALES_EJEMPLO: DatosFiscales = {
  ruc: "20601234567",
  razonSocial: "Clínica Veterinaria Central S.A.C.",
  nombreComercial: "Clínica Central",
  direccionFiscal: "Av. Javier Prado Este 1234",
  departamento: "Lima",
  provincia: "Lima",
  distrito: "San Isidro",
  telefono: "01 422 5566",
  correo: "facturacion@clinicacentral.pe",
  regimen: "mype",
  ambiente: "pruebas",
  tasaIgv: 18,
};
