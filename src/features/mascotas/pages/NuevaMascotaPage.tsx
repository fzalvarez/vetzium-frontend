import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { notifySuccess } from "@/shared/utils";
import { separarEtiquetas } from "@/shared/utils/texto";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import Error404 from "@/features/error-pages/pages/Error404";
import { CamposMascota } from "../components/CamposMascota";
import { useMascotasStore } from "../store/mascotas.store";
import { mascotaSchema, type MascotaForm } from "../validation";

// Solo rutas internas en ?volver= (evita redirigir fuera de la app).
const rutaInterna = (ruta: string | null) => (ruta && ruta.startsWith("/") && !ruta.startsWith("//") ? ruta : null);

/**
 * Registro de una mascota vinculada a un cliente (`?cliente=ID`). Al guardar vuelve a
 * `?volver=` (p. ej. la venta en curso) o abre la mascota nueva.
 */
export default function NuevaMascotaPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const volver = rutaInterna(params.get("volver"));
  const cliente = useClientesStore((s) => s.clientes.find((c) => c.id === Number(params.get("cliente"))));
  const agregarMascota = useMascotasStore((s) => s.agregarMascota);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MascotaForm>({
    resolver: zodResolver(mascotaSchema),
    defaultValues: { nombre: "", especie: "", raza: "", sexo: "macho", esterilizado: "no", fechaNacimiento: "", etiquetas: "" },
  });

  if (!cliente) return <Error404 />;

  const guardar = handleSubmit((v) => {
    const mascota = agregarMascota(cliente.id, {
      nombre: v.nombre.trim(),
      especie: v.especie,
      raza: v.raza.trim(),
      sexo: v.sexo,
      esterilizado: v.esterilizado === "si",
      fechaNacimiento: v.fechaNacimiento || null,
      etiquetas: separarEtiquetas(v.etiquetas),
    });
    notifySuccess(`Mascota "${mascota.nombre}" registrada (${mascota.numeroHistoria}).`);
    navigate(volver ?? `/mascotas/${mascota.id}`);
  });

  return (
    <>
      {volver && (
        <Link
          to={volver}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <ArrowLeftIcon className="size-4" />
          Volver
        </Link>
      )}
      <EncabezadoPagina
        modulo="Mascotas"
        titulo="Registrar mascota"
        descripcion={`Propietario: ${nombreCompleto(cliente)}`}
        acciones={<EtiquetaEjemplo />}
      />

      <Tarjeta className="p-6">
        <form onSubmit={guardar} noValidate className="flex flex-col gap-5">
          <CamposMascota register={register} errors={errors} />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(volver ?? "/mascotas")}>
              Cancelar
            </Button>
            <Button type="submit">Registrar mascota</Button>
          </div>
        </form>
      </Tarjeta>
    </>
  );
}
