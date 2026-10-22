import type { Consulta, Mascota } from "./types";

// DATOS DE EJEMPLO: mascotas de los clientes de ejemplo (mismos nombres que en
// Cuentas activas y Ventas).
export const MASCOTAS_EJEMPLO: Mascota[] = [
  { id: 1, clienteId: 1, numeroHistoria: "HC-0001", nombre: "Firulais", especie: "Perro", raza: "Mestizo", sexo: "macho", esterilizado: true, fechaNacimiento: "2021-03-14", etiquetas: ["Alérgico"], foto: null },
  { id: 2, clienteId: 1, numeroHistoria: "HC-0002", nombre: "Nala", especie: "Gato", raza: "Siamés", sexo: "hembra", esterilizado: true, fechaNacimiento: "2022-07-02", etiquetas: [], foto: null },
  { id: 3, clienteId: 2, numeroHistoria: "HC-0003", nombre: "Luna", especie: "Perro", raza: "Labrador", sexo: "hembra", esterilizado: false, fechaNacimiento: "2019-11-20", etiquetas: ["Hospitalizada"], foto: null },
  { id: 4, clienteId: 3, numeroHistoria: "HC-0004", nombre: "Michi", especie: "Gato", raza: "Persa", sexo: "macho", esterilizado: true, fechaNacimiento: "2020-05-09", etiquetas: [], foto: null },
  { id: 5, clienteId: 4, numeroHistoria: "HC-0005", nombre: "Toby", especie: "Perro", raza: "Beagle", sexo: "macho", esterilizado: false, fechaNacimiento: "2018-01-30", etiquetas: ["Senior"], foto: null },
  { id: 6, clienteId: 5, numeroHistoria: "HC-0006", nombre: "Rocky", especie: "Perro", raza: "Schnauzer", sexo: "macho", esterilizado: true, fechaNacimiento: "2023-02-11", etiquetas: ["Peluquería"], foto: null },
  { id: 7, clienteId: 5, numeroHistoria: "HC-0007", nombre: "Coco", especie: "Ave", raza: "Periquito", sexo: "hembra", esterilizado: false, fechaNacimiento: null, etiquetas: [], foto: null },
];

const SIN_MEDIR = { temperatura: "", frecuenciaCardiaca: "", frecuenciaRespiratoria: "", peso: "", hidratacion: "", tlc: "", presionArterial: "" };

export const CONSULTAS_EJEMPLO: Consulta[] = [
  {
    id: 2,
    mascotaId: 1,
    fechaHora: "2026-10-22T10:15",
    motivo: "Vacunación anual",
    anamnesis: "Paciente activo, come bien. Se aplica vacuna séxtuple. Sin reacciones inmediatas.",
    constantes: { temperatura: "38.6", frecuenciaCardiaca: "96", frecuenciaRespiratoria: "24", peso: "18.4", hidratacion: "0", tlc: "2", presionArterial: "" },
  },
  {
    id: 1,
    mascotaId: 1,
    fechaHora: "2026-07-08T17:40",
    motivo: "Prurito en orejas",
    anamnesis: "Se rasca las orejas hace 1 semana. Otitis externa leve. Limpieza y gotas óticas por 7 días.",
    constantes: { ...SIN_MEDIR, temperatura: "38.9", peso: "18.1" },
  },
  {
    id: 3,
    mascotaId: 3,
    fechaHora: "2026-10-21T09:00",
    motivo: "Vómitos y decaimiento",
    anamnesis: "Vómitos desde ayer, no come. Se hospitaliza para fluidoterapia y observación.",
    constantes: { temperatura: "39.4", frecuenciaCardiaca: "128", frecuenciaRespiratoria: "32", peso: "27.0", hidratacion: "6", tlc: "3", presionArterial: "110" },
  },
];
