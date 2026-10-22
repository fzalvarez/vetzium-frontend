import { create } from "zustand";
import {
  DATOS_FISCALES_EJEMPLO,
  METODOS_PAGO_EJEMPLO,
  ROLES_EJEMPLO,
  USUARIOS_EJEMPLO,
} from "../datos-ejemplo";
import type { DatosFiscales, MetodoPago, PermisosRol, Rol, Usuario } from "../types";

// Configuración de ejemplo compartida entre pantallas durante la sesión (sin persistir:
// al recargar vuelve a los datos de ejemplo). Se reemplaza por la API cuando exista.
interface ConfiguracionState {
  usuarios: Usuario[];
  roles: Rol[];
  metodosPago: MetodoPago[];
  datosFiscales: DatosFiscales;
  agregarUsuario: (usuario: Omit<Usuario, "id" | "ultimoAcceso">) => void;
  agregarRol: (rol: Pick<Rol, "nombre" | "descripcion">) => void;
  setPermisosRol: (rolId: number, permisos: PermisosRol) => void;
  agregarMetodoPago: (metodo: Omit<MetodoPago, "id">) => void;
  setMetodoPagoActivo: (id: number, activo: boolean) => void;
  setDatosFiscales: (datos: DatosFiscales) => void;
}

const siguienteId = (items: { id: number }[]) => Math.max(0, ...items.map((i) => i.id)) + 1;

export const useConfiguracionStore = create<ConfiguracionState>()((set) => ({
  usuarios: USUARIOS_EJEMPLO,
  roles: ROLES_EJEMPLO,
  metodosPago: METODOS_PAGO_EJEMPLO,
  datosFiscales: DATOS_FISCALES_EJEMPLO,

  agregarUsuario: (usuario) =>
    set((s) => ({ usuarios: [...s.usuarios, { id: siguienteId(s.usuarios), ultimoAcceso: null, ...usuario }] })),

  // Un rol nuevo empieza sin permisos; se asignan desde "Permisos".
  agregarRol: (rol) =>
    set((s) => ({ roles: [...s.roles, { id: siguienteId(s.roles), fijo: false, permisos: {}, ...rol }] })),

  setPermisosRol: (rolId, permisos) =>
    set((s) => ({ roles: s.roles.map((r) => (r.id === rolId && !r.fijo ? { ...r, permisos } : r)) })),

  agregarMetodoPago: (metodo) =>
    set((s) => ({ metodosPago: [...s.metodosPago, { id: siguienteId(s.metodosPago), ...metodo }] })),

  setMetodoPagoActivo: (id, activo) =>
    set((s) => ({ metodosPago: s.metodosPago.map((m) => (m.id === id ? { ...m, activo } : m)) })),

  setDatosFiscales: (datos) => set({ datosFiscales: datos }),
}));
