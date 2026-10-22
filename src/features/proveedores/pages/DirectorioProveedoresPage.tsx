import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarraHerramientas } from "@/shared/components/BarraHerramientas";
import { Buscador } from "@/shared/components/Buscador";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { proximamente } from "@/shared/utils";

const COLUMNAS: Columna[] = [
  { titulo: "ID" },
  { titulo: "Nombre legal" },
  { titulo: "Número tributario" },
  { titulo: "Teléfono fijo" },
  { titulo: "Celular" },
  { titulo: "Correo" },
];

export default function DirectorioProveedoresPage() {
  const [busqueda, setBusqueda] = useState("");

  return (
    <>
      <EncabezadoPagina modulo="Proveedores" titulo="Directorio" />

      <Tarjeta>
        <BarraHerramientas
          derecha={
            <Button size="sm" onClick={() => proximamente("Crear nuevo proveedor")}>
              <PlusIcon className="size-4" />
              Crear nuevo proveedor
            </Button>
          }
        >
          <Buscador valor={busqueda} onChange={setBusqueda} placeholder="Buscar" />
        </BarraHerramientas>

        <Tabla columnas={COLUMNAS} vacia mensajeVacio="No hay proveedores registrados." />
      </Tarjeta>
    </>
  );
}
