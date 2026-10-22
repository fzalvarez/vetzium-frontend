import { useState } from "react";
import { Link } from "react-router-dom";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, CeldaOpciones, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { calcularEdad } from "@/shared/utils/fechas";
import { coincide } from "@/shared/utils/texto";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import type { Cliente } from "@/features/clientes/types";
import { SEXOS } from "../constants";
import { useMascotasStore } from "../store/mascotas.store";

const COLUMNAS: Columna[] = [
  { titulo: "N.° HC" },
  { titulo: "Nombre" },
  { titulo: "Especie" },
  { titulo: "Raza" },
  { titulo: "Sexo" },
  { titulo: "Edad" },
  { titulo: "Propietario" },
  { titulo: "Opciones", alinear: "centro" },
];

const propietario = (clientes: Cliente[], clienteId: number) => {
  const c = clientes.find((x) => x.id === clienteId);
  return c ? nombreCompleto(c) : "";
};

export default function ListadoMascotasPage() {
  const mascotas = useMascotasStore((s) => s.mascotas);
  const clientes = useClientesStore((s) => s.clientes);
  const [busqueda, setBusqueda] = useState("");

  const filtradas = mascotas.filter((m) =>
    coincide(busqueda, m.nombre, m.numeroHistoria, m.especie, m.raza, propietario(clientes, m.clienteId))
  );
  const { visibles, paginacion } = usePaginacion(filtradas);

  return (
    <>
      <EncabezadoPagina modulo="Mascotas" titulo="Listado" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas>
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar mascota o propietario" />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtradas.length === 0}
          mensajeVacio={busqueda ? "Ninguna mascota coincide con la búsqueda." : "No hay mascotas registradas."}
          paginacion={paginacion}
        >
          {visibles.map((m) => (
            <Fila key={m.id}>
              <Celda numerica>{m.numeroHistoria}</Celda>
              <Celda destacada>
                <Link to={`/mascotas/${m.id}`} className="text-brand-600 hover:underline dark:text-brand-400">
                  {m.nombre}
                </Link>
              </Celda>
              <Celda>{m.especie}</Celda>
              <Celda>{m.raza}</Celda>
              <Celda>{SEXOS[m.sexo]}</Celda>
              <Celda>{m.fechaNacimiento ? calcularEdad(m.fechaNacimiento) : null}</Celda>
              <Celda>{propietario(clientes, m.clienteId)}</Celda>
              <CeldaOpciones etiqueta={m.nombre} />
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>
    </>
  );
}
