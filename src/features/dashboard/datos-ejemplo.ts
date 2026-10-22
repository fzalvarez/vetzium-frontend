// DATOS DE EJEMPLO: no hay backend todavía. Sirven solo para ver la composición del
// dashboard; la página lo indica con una etiqueta. Se reemplazan por servicios.

export const DIAS_DEL_MES = 31;

// Ventas por día del mes en curso (S/). Solo hay datos hasta "hoy" (día 22).
export const VENTAS_POR_DIA: number[] = [
  1840, 2310, 1975, 2650, 3120, 3480, 1420, 2080, 2265, 2490, 2870, 3310, 3655, 1510, 1960, 2205, 2540,
  2785, 3240, 3590, 1380, 2125,
];

export const KPIS = {
  ventasDelDia: VENTAS_POR_DIA[VENTAS_POR_DIA.length - 1],
  ventasDelMes: VENTAS_POR_DIA.reduce((a, b) => a + b, 0),
  salaDeEspera: 4,
  citasDeHoy: 12,
};

// Distribución de ventas por categoría (cantidad). Suman 532.
export const VENTAS_POR_CATEGORIA = [
  { categoria: "Vacunaciones", cantidad: 186 },
  { categoria: "Consultas", cantidad: 214 },
  { categoria: "Desparasitaciones", cantidad: 92 },
  { categoria: "Otros", cantidad: 40 },
];

// Visitas médicas por especie (cantidad en el mes).
export const VISITAS_POR_ESPECIE = [
  { especie: "Perros", visitas: 268 },
  { especie: "Gatos", visitas: 141 },
  { especie: "Otros", visitas: 31 },
];

// Promedio de visitas por día de la semana.
export const PROMEDIO_VISITAS_DIARIAS = [
  { dia: "Lun", promedio: 18 },
  { dia: "Mar", promedio: 15 },
  { dia: "Mié", promedio: 16 },
  { dia: "Jue", promedio: 17 },
  { dia: "Vie", promedio: 21 },
  { dia: "Sáb", promedio: 24 },
  { dia: "Dom", promedio: 9 },
];
