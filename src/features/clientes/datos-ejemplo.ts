import type { Cliente, NuevosClientesMes } from "./types";

// DATOS DE EJEMPLO: no hay backend todavía. Las páginas lo indican con una etiqueta.
export const CLIENTES_EJEMPLO: Cliente[] = [
  {
    id: 1,
    fechaRegistro: "2026-10-18",
    nombres: "María Fernanda",
    apellidos: "Quispe Rojas",
    telefonos: ["987 654 321"],
    email: "maria.quispe@gmail.com",
    direccion: "Av. Arequipa 1450, Lince",
    estado: "activo",
  },
  {
    id: 2,
    fechaRegistro: "2026-10-12",
    nombres: "Jorge Luis",
    apellidos: "Ramírez Paredes",
    telefonos: ["945 112 870", "01 442 3311"],
    email: "jorge.ramirez@hotmail.com",
    direccion: "Jr. Huancavelica 320, Cercado de Lima",
    estado: "activo",
  },
  {
    id: 3,
    fechaRegistro: "2026-09-28",
    nombres: "Ana Lucía",
    apellidos: "Torres Vega",
    telefonos: ["912 334 556"],
    email: "ana.torres@outlook.com",
    direccion: "Calle Los Pinos 155, Miraflores",
    estado: "activo",
  },
  {
    id: 4,
    fechaRegistro: "2026-09-03",
    nombres: "Carlos Alberto",
    apellidos: "Mendoza Huamán",
    telefonos: ["998 765 432"],
    email: "cmendoza@gmail.com",
    direccion: "Av. La Marina 2100, San Miguel",
    estado: "inactivo",
  },
  {
    id: 5,
    fechaRegistro: "2026-08-21",
    nombres: "Rosa Elena",
    apellidos: "Chávez Flores",
    telefonos: ["956 443 210"],
    email: null,
    direccion: "Mz. B Lt. 12, Urb. Santa Rosa, Los Olivos",
    estado: "activo",
  },
];

export const NUEVOS_CLIENTES_EJEMPLO: NuevosClientesMes[] = [
  { mes: "2026-10", registrados: 14 },
  { mes: "2026-09", registrados: 18 },
  { mes: "2026-08", registrados: 11 },
  { mes: "2026-07", registrados: 16 },
  { mes: "2026-06", registrados: 9 },
];

export const nombreCompleto = (c: Cliente) => `${c.nombres} ${c.apellidos}`;
