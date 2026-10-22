import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Pestanas } from "@/shared/components/Pestanas";
import { PorDefinir } from "@/shared/components/PorDefinir";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { usePestanaUrl } from "@/shared/hooks/usePestanaUrl";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import Error404 from "@/features/error-pages/pages/Error404";
import { EditarMascota } from "../components/EditarMascota";
import { FichaMascota } from "../components/FichaMascota";
import { HistoriaClinica } from "../components/HistoriaClinica";
import { useMascotasStore } from "../store/mascotas.store";

// Historia clínica va primero en la lista de valores: es la pestaña por defecto.
const VISTAS = ["hc", "editar", "calendario", "galeria", "compras", "peluqueria", "auditoria"] as const;

const PESTANAS = [
  { valor: "editar", label: "Editar" },
  { valor: "hc", label: "Historia clínica" },
  { valor: "calendario", label: "Calendario" },
  { valor: "galeria", label: "Galería" },
  { valor: "compras", label: "Historia de compras" },
  { valor: "peluqueria", label: "Órdenes de peluquería" },
  { valor: "auditoria", label: "Auditoría" },
];

/** Mascota abierta: foto y datos a la izquierda; pestañas a la derecha. */
export default function MascotaPage() {
  const { id } = useParams();
  const mascota = useMascotasStore((s) => s.mascotas.find((m) => m.id === Number(id)));
  const clientes = useClientesStore((s) => s.clientes);
  const [vista, setVista] = usePestanaUrl(VISTAS);

  if (!mascota) return <Error404 />;
  const propietario = clientes.find((c) => c.id === mascota.clienteId);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/mascotas"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <ArrowLeftIcon className="size-4" />
          Mascotas
        </Link>
        <EtiquetaEjemplo />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[18rem_1fr]">
        <Tarjeta>
          <FichaMascota mascota={mascota} propietario={propietario} />
        </Tarjeta>

        <Tarjeta>
          <Pestanas opciones={PESTANAS} valor={vista} onChange={setVista} />
          <div className="p-6">
            {vista === "hc" ? (
              <HistoriaClinica mascotaId={mascota.id} />
            ) : vista === "editar" ? (
              // key: si cambia de mascota, el formulario se reinicia con sus datos.
              <EditarMascota key={mascota.id} mascota={mascota} />
            ) : (
              <PorDefinir />
            )}
          </div>
        </Tarjeta>
      </div>
    </>
  );
}
