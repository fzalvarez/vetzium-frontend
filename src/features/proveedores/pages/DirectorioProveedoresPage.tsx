import { useState } from "react";
import { BotonNuevo } from "@/shared/components/AccionesTabla";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Celda, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePaginacion } from "@/shared/hooks/usePaginacion";
import { notifySuccess } from "@/shared/utils";
import { coincide } from "@/shared/utils/texto";
import { ProveedorModal } from "../components/ProveedorModal";
import { PROVEEDORES_EJEMPLO } from "../datos-ejemplo";
import type { Proveedor } from "../types";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Nombre legal" },
  { titulo: "Número tributario" },
  { titulo: "Teléfono fijo" },
  { titulo: "Celular" },
  { titulo: "Correo" },
];

export default function DirectorioProveedoresPage() {
  // Sin backend: en memoria (se pierde al recargar).
  const [proveedores, setProveedores] = useState<Proveedor[]>(PROVEEDORES_EJEMPLO);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const filtrados = proveedores.filter((p) => coincide(busqueda, p.nombreLegal, p.numeroTributario, p.correo));
  const { visibles, paginacion } = usePaginacion(filtrados);

  const guardar = (proveedor: Omit<Proveedor, "id">) => {
    const id = Math.max(0, ...proveedores.map((p) => p.id)) + 1;
    setProveedores((actuales) => [...actuales, { id, ...proveedor }]);
    notifySuccess(`Proveedor "${proveedor.nombreLegal}" creado.`);
    setModalAbierto(false);
  };

  return (
    <>
      <EncabezadoPagina modulo="Proveedores" titulo="Directorio" acciones={<EtiquetaEjemplo />} />

      <Tarjeta>
        <BarraHerramientas
          derecha={<BotonNuevo label="Crear nuevo proveedor" que="Crear nuevo proveedor" onClick={() => setModalAbierto(true)} />}
        >
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar" />
        </BarraHerramientas>

        <Tabla
          columnas={COLUMNAS}
          vacia={filtrados.length === 0}
          mensajeVacio={busqueda ? "Ningún proveedor coincide con la búsqueda." : "No hay proveedores registrados."}
          paginacion={paginacion}
        >
          {visibles.map((p) => (
            <Fila key={p.id}>
              <Celda numerica className="text-gray-500 dark:text-gray-400">{p.id}</Celda>
              <Celda destacada>{p.nombreLegal}</Celda>
              <Celda numerica>{p.numeroTributario}</Celda>
              <Celda numerica>{p.telefonoFijo}</Celda>
              <Celda numerica>{p.celular}</Celda>
              <Celda>{p.correo}</Celda>
            </Fila>
          ))}
        </Tabla>
      </Tarjeta>

      {modalAbierto && <ProveedorModal onClose={() => setModalAbierto(false)} onGuardar={guardar} />}
    </>
  );
}
