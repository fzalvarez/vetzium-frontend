import { useState } from "react";
import { StarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { SelectorFiltro } from "@/shared/components/SelectorFiltro";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { MetodoPagoModal } from "../components/MetodoPagoModal";
import { TIPOS_METODO_PAGO } from "../constants";
import { metodoPredeterminado, useConfiguracionStore } from "../store/configuracion.store";

const COLUMNAS: Columna[] = [
  { titulo: "Nombre" },
  { titulo: "Tipo de pago" },
  { titulo: "Observaciones" },
  { titulo: "Estado", alinear: "centro" },
  { titulo: "Opciones", alinear: "centro" },
];

export default function MetodosPagoPage() {
  const metodos = useConfiguracionStore((s) => s.metodosPago);
  const predeterminadoId = useConfiguracionStore((s) => s.metodoPredeterminadoId);
  const { agregarMetodoPago, setMetodoPagoActivo, setMetodoPredeterminado } = useConfiguracionStore();
  const [modalAbierto, setModalAbierto] = useState(false);

  const { visibles, paginacion } = usePaginacion(metodos);
  const predeterminado = metodoPredeterminado(metodos, predeterminadoId);

  return (
    <>
      <EncabezadoPagina
        modulo="Configuración"
        titulo="Métodos de pago"
        descripcion="Los métodos activos son los que se ofrecen al cobrar y en Entradas / Salidas de caja."
        acciones={<EtiquetaEjemplo />}
      />

      <Tarjeta>
        <BarraHerramientas
          derecha={<BotonNuevo label="Nuevo método" que="Nuevo método de pago" onClick={() => setModalAbierto(true)} />}
        >
          {/* Solo los activos pueden ser predeterminados. */}
          <SelectorFiltro
            etiqueta="Método de pago predeterminado"
            opciones={metodos.filter((m) => m.activo).map((m) => ({ valor: String(m.id), label: m.nombre }))}
            valor={String(predeterminado?.id ?? "")}
            onChange={(v) => {
              setMetodoPredeterminado(Number(v));
              notifySuccess(`"${metodos.find((m) => m.id === Number(v))?.nombre}" es el método predeterminado.`);
            }}
          />
        </BarraHerramientas>

        <Tabla columnas={COLUMNAS} vacia={metodos.length === 0} mensajeVacio="No hay métodos de pago." paginacion={paginacion}>
          {visibles.map((m) => (
            <Fila key={m.id}>
              <Celda destacada>
                <span className="flex items-center gap-2">
                  {m.nombre}
                  {m.id === predeterminado?.id && (
                    <Insignia tono="info" icono={StarIcon}>
                      Predeterminado
                    </Insignia>
                  )}
                </span>
              </Celda>
              <Celda>{TIPOS_METODO_PAGO[m.tipo]}</Celda>
              <Celda className="whitespace-normal">
                {m.observaciones}
                {m.requiereOperacion && (
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Pide N.° de operación.</span>
                )}
              </Celda>
              <Celda alinear="centro">
                <Switch
                  checked={m.activo}
                  onCheckedChange={(activo) => setMetodoPagoActivo(m.id, activo)}
                  aria-label={`${m.activo ? "Desactivar" : "Activar"} ${m.nombre}`}
                />
              </Celda>
              <CeldaOpciones etiqueta={m.nombre} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>

      {modalAbierto && (
        <MetodoPagoModal
          onClose={() => setModalAbierto(false)}
          onGuardar={(metodo) => {
            agregarMetodoPago(metodo);
            notifySuccess(`Método "${metodo.nombre}" creado.`);
            setModalAbierto(false);
          }}
        />
      )}
    </>
  );
}
