import { useState } from "react";
import { BotonActualizar, BotonBorrar } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo, Insignia } from "@/shared/components/Insignia";
import { RangoFechas } from "@/shared/components/RangoFechas";
import { SelectorFiltro } from "@/shared/components/SelectorFiltro";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { formatearFecha } from "@/shared/utils/fechas";
import { coincide } from "@/shared/utils/texto";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import { useConfiguracionStore } from "@/features/configuracion/store/configuracion.store";
import { useMascotasStore } from "@/features/mascotas/store/mascotas.store";
import { ESTADOS_EVENTO, TIPOS_EVENTO, TONO_ESTADO_EVENTO } from "../constants";
import { EVENTOS_EJEMPLO } from "../datos-ejemplo";

const COLUMNAS: Columna[] = [
  { titulo: "Fecha" },
  { titulo: "Cliente" },
  { titulo: "Mascota" },
  { titulo: "Teléfonos" },
  { titulo: "Correo electrónico" },
  { titulo: "Motivo" },
  { titulo: "Tipo de evento" },
  { titulo: "Estado" },
  { titulo: "Usuario responsable" },
  { titulo: "Opciones", alinear: "centro" },
];

const TODOS = { valor: "todos", label: "Todos" };
const opciones = (mapa: Record<string, string>) => [TODOS, ...Object.entries(mapa).map(([valor, label]) => ({ valor, label }))];

export default function ListadoEventosPage() {
  const usuarios = useConfiguracionStore((s) => s.usuarios);
  const mascotas = useMascotasStore((s) => s.mascotas);
  const clientes = useClientesStore((s) => s.clientes);

  const [busqueda, setBusqueda] = useState("");
  const [rango, setRango] = useState({ desde: "", hasta: "" });
  const [tipo, setTipo] = useState("todos");
  const [estado, setEstado] = useState("pendiente");
  const [usuario, setUsuario] = useState("todos");
  const [sala, setSala] = useState("todos");

  const cliente = (id: number) => clientes.find((c) => c.id === id);
  const mascota = (id: number) => mascotas.find((m) => m.id === id);
  const usuarioNombre = (id: number) => usuarios.find((u) => u.id === id)?.nombre ?? "";

  // Ordenados por fecha y hora.
  const filtrados = EVENTOS_EJEMPLO.filter((e) => {
    const c = cliente(e.clienteId);
    return (
      coincide(busqueda, c && nombreCompleto(c), mascota(e.mascotaId)?.nombre, e.motivo, c?.email, ...(c?.telefonos ?? [])) &&
      (!rango.desde || e.fecha >= rango.desde) &&
      (!rango.hasta || e.fecha <= rango.hasta) &&
      (tipo === "todos" || e.tipo === tipo) &&
      (estado === "todos" || e.estado === estado) &&
      (usuario === "todos" || e.usuarioId === Number(usuario)) &&
      (sala === "todos" || e.enSalaEspera === (sala === "si"))
    );
  }).sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
  const { visibles, paginacion } = usePaginacion(filtrados);

  return (
    <>
      <EncabezadoPagina modulo="Eventos" titulo="Listado" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas>
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar" />
          <RangoFechas desde={rango.desde} hasta={rango.hasta} onChange={setRango} />
          <BotonBorrar />
          <BotonActualizar />
        </BarraHerramientas>
        <BarraHerramientas>
          <SelectorFiltro etiqueta="Tipo de evento" opciones={opciones(TIPOS_EVENTO)} valor={tipo} onChange={setTipo} />
          <SelectorFiltro etiqueta="Estado" opciones={opciones(ESTADOS_EVENTO)} valor={estado} onChange={setEstado} />
          <SelectorFiltro
            etiqueta="Usuario"
            opciones={[TODOS, ...usuarios.map((u) => ({ valor: String(u.id), label: u.nombre }))]}
            valor={usuario}
            onChange={setUsuario}
          />
          <SelectorFiltro
            etiqueta="Sala de espera"
            opciones={[TODOS, { valor: "si", label: "Enviado" }, { valor: "no", label: "No enviado" }]}
            valor={sala}
            onChange={setSala}
          />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio="Ningún evento coincide con los filtros."
          paginacion={paginacion}
        >
          {visibles.map((e) => {
            const c = cliente(e.clienteId);
            return (
              <Fila key={e.id}>
                <Celda numerica>
                  {formatearFecha(e.fecha)} <span className="text-gray-500 dark:text-gray-400">{e.hora}</span>
                </Celda>
                <Celda destacada>{c ? nombreCompleto(c) : null}</Celda>
                <Celda>{mascota(e.mascotaId)?.nombre}</Celda>
                <Celda numerica>{c?.telefonos.join(" · ")}</Celda>
                <Celda>{c?.email}</Celda>
                <Celda>{e.motivo}</Celda>
                <Celda>{TIPOS_EVENTO[e.tipo]}</Celda>
                <Celda>
                  <Insignia tono={TONO_ESTADO_EVENTO[e.estado]}>{ESTADOS_EVENTO[e.estado]}</Insignia>
                </Celda>
                <Celda>{usuarioNombre(e.usuarioId)}</Celda>
                <CeldaOpciones etiqueta={`evento ${e.id}`} />
              </Fila>
            );
          })}
        </Tabla>
      </Tarjeta>
    </>
  );
}
