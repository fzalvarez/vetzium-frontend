import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Campo } from "@/shared/components/Campo";
import { Insignia } from "@/shared/components/Insignia";
import { formatearFecha } from "@/shared/utils/fechas";
import { DNI_DE_EJEMPLO, consultarReniec, type PersonaReniec } from "../reniec-simulado";
import { dniSchema } from "../validation";

/** Busca un DNI en RENIEC (simulado) y devuelve la persona para completar el formulario. */
export function BuscarReniecModal({
  dniInicial,
  onClose,
  onUsar,
}: {
  dniInicial: string;
  onClose: () => void;
  onUsar: (persona: PersonaReniec) => void;
}) {
  const [dni, setDni] = useState(dniInicial);
  const [error, setError] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [resultado, setResultado] = useState<PersonaReniec | null | undefined>(undefined);

  const buscar = async (e?: React.FormEvent) => {
    e?.preventDefault();
    // Este modal se abre desde el formulario del cliente: en React el submit sube por el
    // árbol de componentes (aunque esté en un portal) y lo enviaría.
    e?.stopPropagation();
    const valido = dniSchema.safeParse(dni);
    if (!valido.success) {
      setError(valido.error.issues[0].message);
      return;
    }
    setError(null);
    setBuscando(true);
    setResultado(await consultarReniec(valido.data));
    setBuscando(false);
  };

  return (
    <Modal
      open
      size="sm"
      title="Buscar en RENIEC"
      description="Consulta simulada: aún no hay conexión con RENIEC."
      onClose={onClose}
      busy={buscando}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={buscando}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => resultado && onUsar(resultado)} disabled={!resultado}>
            Usar estos datos
          </Button>
        </>
      }
    >
      <form onSubmit={buscar} noValidate className="flex flex-col gap-4">
        <Campo
          etiqueta="N.° de DNI"
          htmlFor="reniec-dni"
          error={error ?? undefined}
          ayuda={`DNI de ejemplo: ${DNI_DE_EJEMPLO.join(", ")}`}
        >
          <div className="flex gap-2">
            <Input
              id="reniec-dni"
              inputMode="numeric"
              maxLength={8}
              value={dni}
              onChange={(e) => {
                setDni(e.target.value.replace(/\D/g, ""));
                setResultado(undefined);
              }}
              aria-invalid={!!error}
              className="tabular-nums"
            />
            <Button type="submit" loading={buscando} className="shrink-0">
              {!buscando && <SearchIcon className="size-4" />}
              Buscar
            </Button>
          </div>
        </Campo>

        {resultado === null && (
          <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
            No se encontró el DNI {dni}.
          </p>
        )}
        {resultado && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-lg bg-success-50 px-4 py-3 text-sm dark:bg-success-500/10">
            <dt className="col-span-2 mb-1">
              <Insignia tono="exito">Encontrado</Insignia>
            </dt>
            <dt className="text-gray-500 dark:text-gray-400">Nombres</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-100">{resultado.nombres}</dd>
            <dt className="text-gray-500 dark:text-gray-400">Apellidos</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-100">{resultado.apellidos}</dd>
            <dt className="text-gray-500 dark:text-gray-400">Nacimiento</dt>
            <dd className="tabular-nums text-gray-800 dark:text-gray-100">{formatearFecha(resultado.fechaNacimiento)}</dd>
          </dl>
        )}
      </form>
    </Modal>
  );
}
