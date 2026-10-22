import { ArmchairIcon, CalendarCheckIcon, ReceiptIcon, WalletIcon } from "lucide-react";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { formatearCompacto, formatearNumero, formatearSoles } from "@/shared/utils/formato";
import { BarrasHorizontales } from "../components/BarrasHorizontales";
import { GraficoBarras } from "../components/GraficoBarras";
import { GraficoDona } from "../components/GraficoDona";
import { TarjetaGrafico } from "../components/TarjetaGrafico";
import { TarjetaKpi } from "../components/TarjetaKpi";
import {
  DIAS_DEL_MES,
  KPIS,
  PROMEDIO_VISITAS_DIARIAS,
  VENTAS_POR_CATEGORIA,
  VENTAS_POR_DIA,
  VISITAS_POR_ESPECIE,
} from "../datos-ejemplo";

// Un punto por día del mes; los días que aún no llegan quedan vacíos.
const ventasDelMes = Array.from({ length: DIAS_DEL_MES }, (_, i) => ({
  etiqueta: String(i + 1),
  valor: VENTAS_POR_DIA[i] ?? null,
}));

export default function DashboardPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Dashboard"
        acciones={
          <span className="rounded-full bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 dark:bg-warning-500/15 dark:text-warning-400">
            Datos de ejemplo
          </span>
        }
      />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <TarjetaKpi etiqueta="Ventas del día" valor={formatearSoles(KPIS.ventasDelDia)} icono={ReceiptIcon} />
          <TarjetaKpi etiqueta="Ventas del mes" valor={formatearSoles(KPIS.ventasDelMes)} icono={WalletIcon} />
          <TarjetaKpi etiqueta="Sala de espera" valor={formatearNumero(KPIS.salaDeEspera)} icono={ArmchairIcon} />
          <TarjetaKpi etiqueta="Citas de hoy" valor={formatearNumero(KPIS.citasDeHoy)} icono={CalendarCheckIcon} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <TarjetaGrafico
            className="xl:col-span-3"
            titulo="Ventas del mes"
            descripcion="Monto vendido por día del mes."
            tabla={{
              columnas: ["Día", "Monto"],
              filas: ventasDelMes.map((d) => [d.etiqueta, d.valor === null ? "Sin datos" : formatearSoles(d.valor)]),
            }}
          >
            <GraficoBarras
              datos={ventasDelMes}
              alto={300}
              formatear={formatearSoles}
              formatearEje={(v) => `S/ ${formatearCompacto(v)}`}
            />
          </TarjetaGrafico>

          <TarjetaGrafico
            className="xl:col-span-2"
            titulo="Distribución de ventas por categoría"
            tabla={{
              columnas: ["Categoría", "Cantidad"],
              filas: VENTAS_POR_CATEGORIA.map((c) => [c.categoria, c.cantidad]),
            }}
          >
            <GraficoDona datos={VENTAS_POR_CATEGORIA.map((c) => ({ etiqueta: c.categoria, valor: c.cantidad }))} />
          </TarjetaGrafico>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          <TarjetaGrafico
            titulo="Distribución de visitas médicas por especie"
            tabla={{
              columnas: ["Especie", "Visitas"],
              filas: VISITAS_POR_ESPECIE.map((e) => [e.especie, e.visitas]),
            }}
          >
            <BarrasHorizontales datos={VISITAS_POR_ESPECIE.map((e) => ({ etiqueta: e.especie, valor: e.visitas }))} />
          </TarjetaGrafico>

          <TarjetaGrafico
            titulo="Promedio de visitas diarias"
            descripcion="Visitas promedio por día de la semana."
            tabla={{
              columnas: ["Día", "Promedio de visitas"],
              filas: PROMEDIO_VISITAS_DIARIAS.map((d) => [d.dia, d.promedio]),
            }}
          >
            <GraficoBarras
              datos={PROMEDIO_VISITAS_DIARIAS.map((d) => ({ etiqueta: d.dia, valor: d.promedio }))}
              formatear={(v) => `${formatearNumero(v)} visitas`}
              formatearEje={formatearNumero}
            />
          </TarjetaGrafico>
        </div>
      </div>
    </>
  );
}
