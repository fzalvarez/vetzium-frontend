import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { MetodoPagoModal } from "../components/MetodoPagoModal";
import { TIPOS_METODO_PAGO } from "../constants";
import { useConfiguracionStore } from "../store/configuracion.store";

const COLUMNAS: Columna[] = [
  { titulo: "Método" },
  { titulo: "Tipo" },
  { titulo: "N.° de operación" },
  { titulo: "Activo", alinear: "centro" },
  { titulo: "Opciones", alinear: "centro" },
];

export default function MetodosPagoPage() {
  const metodos = useConfiguracionStore((s) => s.metodosPago);
  const agregarMetodoPago = useConfiguracionStore((s) => s.agregarMetodoPago);
  const setMetodoPagoActivo = useConfiguracionStore((s) => s.setMetodoPagoActivo);
  const [modalAbierto, setModalAbierto] = useState(false);

  const { visibles, paginacion } = usePaginacion(metodos);

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
        />

        <Tabla
          columnas={COLUMNAS}
          vacia={metodos.length === 0}
          mensajeVacio="No hay métodos de pago."
          paginacion={paginacion}
        >
          {visibles.map((m) => (
            <Fila key={m.id}>
              <Celda destacada>{m.nombre}</Celda>
              <Celda>{TIPOS_METODO_PAGO[m.tipo]}</Celda>
              <Celda>
                {m.requiereOperacion ? <Insignia tono="info">Obligatorio</Insignia> : <Insignia tono="neutro">No se pide</Insignia>}
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
