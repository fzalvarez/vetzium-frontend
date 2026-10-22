import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  BanIcon,
  CircleCheckIcon,
  ClockIcon,
  FileDownIcon,
  FileMinusIcon,
  MessageCircleIcon,
  PencilIcon,
  PrinterIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, SelectNativo, Textarea } from "@/components/ui/input";
import { Campo } from "@/shared/components/Campo";
import { EncabezadoPagina } from "@/shared/components/EncabezadoPagina";
import { EtiquetaEjemplo } from "@/shared/components/Insignia";
import { MenuDesplegable } from "@/shared/components/MenuDesplegable";
import { Celda, Fila, Tabla, type Columna } from "@/shared/components/Tabla";
import { Tarjeta } from "@/shared/components/Tarjeta";
import { notifyError, notifySuccess, proximamente } from "@/shared/utils";
import { hoyPeru } from "@/shared/utils/fechas";
import { formatearNumero, formatearSoles } from "@/shared/utils/formato";
import { nombreCompleto } from "@/features/clientes/datos-ejemplo";
import { useClientesStore } from "@/features/clientes/store/clientes.store";
import { metodoPredeterminado, useConfiguracionStore } from "@/features/configuracion/store/configuracion.store";
import {
  DOCUMENTOS_IDENTIDAD,
  TIPOS_COMPROBANTE,
  TIPOS_OPERACION,
  montoPago,
  type DocumentoIdentidad,
  type Pago,
  type TipoComprobante,
} from "../comprobante";
import { DescuentoModal } from "../components/DescuentoModal";
import { FormasPago } from "../components/FormasPago";
import { calcularComprobante, calcularLinea, redondear } from "../lib/totales";
import { formatearNumeroComprobante, useComprobantesStore } from "../store/comprobantes.store";
import { useVentaStore } from "../store/venta.store";
import type { Descuento } from "../types/venta";

const COLUMNAS: Columna[] = [
  { titulo: "Concepto" },
  { titulo: "Valor unitario", alinear: "derecha" },
  { titulo: "Cantidad", alinear: "derecha" },
  { titulo: "Subtotal", alinear: "derecha" },
  { titulo: "Impuestos", alinear: "derecha" },
  { titulo: "Total", alinear: "derecha" },
];

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <Tarjeta className="p-5">
      <h2 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">{titulo}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </Tarjeta>
  );
}

/** Generar el comprobante de la venta en curso: datos, conceptos, totales y formas de pago. */
export default function GenerarComprobantePage() {
  const navigate = useNavigate();
  const { clienteId, lineas, limpiar } = useVentaStore();
  const cliente = useClientesStore((s) => s.clientes.find((c) => c.id === clienteId));
  const { datosFiscales, metodosPago, metodoPredeterminadoId } = useConfiguracionStore();
  const { siguientes, emitir } = useComprobantesStore();
  const tasaIgv = datosFiscales.tasaIgv;
  const metodosActivos = metodosPago.filter((m) => m.activo);

  // Datos del comprobante
  const [fechaEmision, setFechaEmision] = useState(hoyPeru());
  const [fechaVencimiento, setFechaVencimiento] = useState(hoyPeru());
  const [tipo, setTipo] = useState<TipoComprobante>("boleta");
  const [tipoOperacion, setTipoOperacion] = useState(TIPOS_OPERACION[0].valor);
  const serie = TIPOS_COMPROBANTE[tipo].series[0];

  // Datos del cliente (se completan con el de la venta)
  const [docTipo, setDocTipo] = useState<DocumentoIdentidad>(cliente?.documento ? "dni" : "ninguno");
  const [docNumero, setDocNumero] = useState(cliente?.documento ?? "");
  const [nombre, setNombre] = useState(cliente ? nombreCompleto(cliente) : "");
  const [email, setEmail] = useState(cliente?.email ?? "");
  const [direccion, setDireccion] = useState(cliente?.direccion ?? "");

  const [descuentoGlobal, setDescuentoGlobal] = useState<Descuento | null>(null);
  const [descuentoAbierto, setDescuentoAbierto] = useState(false);
  const [observaciones, setObservaciones] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [emitido, setEmitido] = useState<string | null>(null);

  const totales = calcularComprobante(lineas, tasaIgv, descuentoGlobal);
  const [pagos, setPagos] = useState<Pago[]>(() => [
    {
      id: 1,
      metodoId: metodoPredeterminado(metodosPago, metodoPredeterminadoId)?.id ?? 0,
      monto: calcularComprobante(lineas, tasaIgv, null).total.toFixed(2),
      motivo: "",
      operacion: "",
    },
  ]);

  if (lineas.length === 0 && !emitido) {
    return (
      <>
        <EncabezadoPagina modulo="Ventas" titulo="Generar comprobante" />
        <Tarjeta className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No hay una venta en curso.</p>
          <Link to="/ventas" className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
            Ir a Ventas
          </Link>
        </Tarjeta>
      </>
    );
  }

  const bloqueado = emitido !== null;
  // Base con IGV para el descuento global (sin ICBPER): lo que se ve antes del descuento.
  const baseDescuento = redondear(totales.subtotal * (1 + tasaIgv / 100));

  const emitirComprobante = () => {
    const e: Record<string, string> = {};
    if (!fechaEmision) e.fechaEmision = "Ingresa la fecha de emisión.";
    if (fechaVencimiento && fechaVencimiento < fechaEmision) e.fechaVencimiento = "No puede ser anterior a la emisión.";
    if (tipo === "factura" && docTipo !== "ruc") e.docTipo = "La factura requiere RUC.";
    const doc = DOCUMENTOS_IDENTIDAD[docTipo];
    if (docTipo !== "ninguno" && !doc.patron.test(docNumero.trim())) e.docNumero = doc.error;
    if (!nombre.trim()) e.nombre = "Ingresa el cliente.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Correo no válido.";
    for (const p of pagos) {
      const metodo = metodosPago.find((m) => m.id === p.metodoId);
      if (montoPago(p) <= 0) e[`pago-${p.id}`] = "Monto mayor a 0, con hasta 2 decimales.";
      else if (metodo?.requiereOperacion && !p.operacion.trim()) e[`pago-${p.id}`] = `${metodo.nombre} requiere el N.° de operación.`;
    }
    const pagado = redondear(pagos.reduce((a, p) => a + montoPago(p), 0));
    if (pagado < totales.total) e.pagos = `Falta cobrar ${formatearSoles(redondear(totales.total - pagado))}.`;

    setErrores(e);
    if (Object.keys(e).length > 0) {
      notifyError("Revisa los datos marcados.");
      return;
    }
    const numero = emitir(serie);
    setEmitido(`${serie}-${numero}`);
    notifySuccess(`Comprobante ${serie}-${numero} emitido.`);
  };

  const regresar = () => {
    // Tras emitir, la venta terminó: se empieza una nueva.
    if (emitido) limpiar();
    navigate("/ventas");
  };

  const erroresPago = Object.fromEntries(
    Object.entries(errores)
      .filter(([k]) => k.startsWith("pago-"))
      .map(([k, v]) => [Number(k.slice(5)), v])
  );

  return (
    <>
      <EncabezadoPagina
        modulo="Ventas › Comprobantes"
        titulo="Generar comprobante"
        descripcion="Emisión simulada: aún no se envía a SUNAT."
        acciones={<EtiquetaEjemplo />}
      />

      {emitido && (
        <p className="mb-6 flex items-center gap-2 rounded-lg bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:bg-success-500/10 dark:text-success-400">
          <CircleCheckIcon className="size-4" />
          Comprobante {emitido} emitido. Ya puedes imprimirlo o usar sus opciones.
        </p>
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Bloque titulo="Datos del comprobante">
            <Campo etiqueta="Fecha de emisión" htmlFor="cp-emision" error={errores.fechaEmision}>
              <Input id="cp-emision" type="date" value={fechaEmision} disabled={bloqueado} onChange={(e) => setFechaEmision(e.target.value)} />
            </Campo>
            <Campo etiqueta="Emisor" htmlFor="cp-emisor">
              <SelectNativo id="cp-emisor" disabled={bloqueado}>
                <option>
                  {datosFiscales.razonSocial} · RUC {datosFiscales.ruc}
                </option>
              </SelectNativo>
            </Campo>
            <Campo etiqueta="Tipo de comprobante" htmlFor="cp-tipo">
              <SelectNativo
                id="cp-tipo"
                value={tipo}
                disabled={bloqueado}
                onChange={(e) => {
                  const nuevo = e.target.value as TipoComprobante;
                  setTipo(nuevo);
                  if (nuevo === "factura") setDocTipo("ruc");
                }}
              >
                {Object.entries(TIPOS_COMPROBANTE).map(([valor, t]) => (
                  <option key={valor} value={valor}>
                    {t.label}
                  </option>
                ))}
              </SelectNativo>
            </Campo>
            <Campo etiqueta="Fecha de vencimiento" htmlFor="cp-vencimiento" error={errores.fechaVencimiento}>
              <Input
                id="cp-vencimiento"
                type="date"
                min={fechaEmision}
                value={fechaVencimiento}
                disabled={bloqueado}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </Campo>
            <Campo etiqueta="Serie de comprobante" htmlFor="cp-serie">
              <SelectNativo id="cp-serie" value={serie} disabled={bloqueado}>
                {TIPOS_COMPROBANTE[tipo].series.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </SelectNativo>
            </Campo>
            <Campo etiqueta="Número de comprobante" htmlFor="cp-numero" ayuda="Correlativo de la serie.">
              <Input
                id="cp-numero"
                readOnly
                value={emitido ? emitido.split("-")[1] : formatearNumeroComprobante(siguientes[serie] ?? 1)}
                className="bg-gray-50 tabular-nums dark:bg-white/5"
              />
            </Campo>
            <Campo etiqueta="Tipo de operación" htmlFor="cp-operacion" className="sm:col-span-2">
              <SelectNativo id="cp-operacion" value={tipoOperacion} disabled={bloqueado} onChange={(e) => setTipoOperacion(e.target.value)}>
                {TIPOS_OPERACION.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.label}
                  </option>
                ))}
              </SelectNativo>
            </Campo>
          </Bloque>

          <Bloque titulo="Datos del cliente">
            <Campo etiqueta="Doc. de identidad" htmlFor="cp-doc-tipo" error={errores.docTipo}>
              <SelectNativo
                id="cp-doc-tipo"
                value={docTipo}
                disabled={bloqueado}
                onChange={(e) => setDocTipo(e.target.value as DocumentoIdentidad)}
                aria-invalid={!!errores.docTipo}
              >
                {Object.entries(DOCUMENTOS_IDENTIDAD).map(([valor, d]) => (
                  <option key={valor} value={valor}>
                    {d.label}
                  </option>
                ))}
              </SelectNativo>
            </Campo>
            <Campo etiqueta="N.° de documento" htmlFor="cp-doc" error={errores.docNumero}>
              <Input
                id="cp-doc"
                value={docNumero}
                disabled={bloqueado || docTipo === "ninguno"}
                onChange={(e) => setDocNumero(e.target.value)}
                aria-invalid={!!errores.docNumero}
                className="tabular-nums"
              />
            </Campo>
            <Campo etiqueta={docTipo === "ruc" ? "Razón social" : "Cliente"} htmlFor="cp-cliente" error={errores.nombre} className="sm:col-span-2">
              <Input id="cp-cliente" value={nombre} disabled={bloqueado} onChange={(e) => setNombre(e.target.value)} aria-invalid={!!errores.nombre} />
            </Campo>
            <Campo etiqueta="Email" htmlFor="cp-email" error={errores.email}>
              <Input id="cp-email" type="email" placeholder="Opcional" value={email} disabled={bloqueado} onChange={(e) => setEmail(e.target.value)} />
            </Campo>
            <Campo etiqueta="Dirección" htmlFor="cp-direccion">
              <Input id="cp-direccion" placeholder="Opcional" value={direccion} disabled={bloqueado} onChange={(e) => setDireccion(e.target.value)} />
            </Campo>
          </Bloque>
        </div>

        <Tarjeta>
          <Tabla columnas={COLUMNAS} vacia={lineas.length === 0}>
            {lineas.map((l) => {
              const m = calcularLinea(l, tasaIgv);
              return (
                <Fila key={l.item.id}>
                  <Celda destacada>
                    {l.item.nombre}
                    {l.regalo && <span className="ml-2 text-xs font-normal text-success-700 dark:text-success-400">(regalo)</span>}
                  </Celda>
                  <Celda alinear="derecha" numerica>{formatearSoles(m.valorUnitario)}</Celda>
                  <Celda alinear="derecha" numerica>{formatearNumero(l.cantidad)}</Celda>
                  <Celda alinear="derecha" numerica>{formatearSoles(m.subtotal)}</Celda>
                  <Celda alinear="derecha" numerica>{formatearSoles(m.impuestos)}</Celda>
                  <Celda alinear="derecha" numerica destacada>{formatearSoles(m.total)}</Celda>
                </Fila>
              );
            })}
          </Tabla>

          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 p-5 lg:grid-cols-2 dark:border-gray-800">
            <Campo etiqueta="Observaciones y comentarios" htmlFor="cp-observaciones">
              <Textarea id="cp-observaciones" rows={5} value={observaciones} disabled={bloqueado} onChange={(e) => setObservaciones(e.target.value)} />
            </Campo>

            <dl className="ml-auto w-full max-w-sm text-sm">
              {(
                [
                  ["Subtotal", totales.subtotal],
                  ["Descuento total en porcentaje", null],
                  ["Descuento total", -totales.descuento],
                  ["Valor de venta neto", totales.valorNeto],
                  ["Valor venta de operaciones gravadas", totales.gravadas],
                  ["Impuestos", totales.impuestos],
                  ...(totales.icbper > 0 ? ([["ICBPER", totales.icbper]] as const) : []),
                ] as const
              ).map(([etiqueta, valor]) => (
                <div key={etiqueta} className="flex items-center justify-between gap-4 py-1.5">
                  <dt className="text-gray-500 dark:text-gray-400">{etiqueta}</dt>
                  <dd className="tabular-nums text-gray-700 dark:text-gray-200">
                    {valor === null ? (
                      <span className="inline-flex items-center gap-1">
                        {formatearNumero(totales.descuentoPorcentaje)} %
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title="Descuento global"
                          aria-label="Aplicar descuento global"
                          disabled={bloqueado}
                          onClick={() => setDescuentoAbierto(true)}
                        >
                          <PencilIcon className="size-3.5" />
                        </Button>
                      </span>
                    ) : valor < 0 ? (
                      `− ${formatearSoles(-valor)}`
                    ) : (
                      formatearSoles(Math.abs(valor))
                    )}
                  </dd>
                </div>
              ))}
              <div className="mt-1 flex items-center justify-between gap-4 border-t border-gray-200 pt-3 dark:border-gray-800">
                <dt className="text-base font-semibold text-gray-800 dark:text-gray-100">TOTAL</dt>
                <dd className="text-xl font-bold tabular-nums text-gray-800 dark:text-gray-100">{formatearSoles(totales.total)}</dd>
              </div>
            </dl>
          </div>
        </Tarjeta>

        <Tarjeta className="p-5">
          <h2 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">Formas de pago</h2>
          <FormasPago
            pagos={pagos}
            metodos={metodosActivos}
            total={totales.total}
            errores={erroresPago}
            deshabilitado={bloqueado}
            onChange={setPagos}
          />
          {errores.pagos && <p className="mt-2 text-sm text-error-600 dark:text-error-400">{errores.pagos}</p>}
        </Tarjeta>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={regresar}>
            <ArrowLeftIcon className="size-4" />
            Regresar
          </Button>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            {/* Imprimir y Opciones actúan sobre un comprobante ya emitido. */}
            <Button variant="outline" disabled={!emitido} title={emitido ? undefined : "Emite el comprobante primero"} onClick={() => proximamente("Imprimir ticket")}>
              <PrinterIcon className="size-4" />
              Imprimir ticket
            </Button>
            <Button variant="outline" disabled={!emitido} title={emitido ? undefined : "Emite el comprobante primero"} onClick={() => proximamente("Imprimir PDF")}>
              <FileDownIcon className="size-4" />
              Imprimir PDF
            </Button>
            <MenuDesplegable
              etiqueta="Opciones"
              disabled={!emitido}
              title={emitido ? undefined : "Emite el comprobante primero"}
              opciones={[
                { label: "Generar nota de crédito", icono: FileMinusIcon, onClick: () => proximamente("Generar nota de crédito") },
                { label: "Enviar", icono: SendIcon, onClick: () => proximamente("Enviar") },
                { label: "Enviar por WhatsApp", icono: MessageCircleIcon, onClick: () => proximamente("Enviar por WhatsApp") },
                { label: "Marcar como pendiente", icono: ClockIcon, onClick: () => proximamente("Marcar como pendiente") },
                { label: "Anular", icono: BanIcon, peligro: true, onClick: () => proximamente("Anular") },
              ]}
            />
            {!emitido && (
              <Button onClick={emitirComprobante}>
                <CircleCheckIcon className="size-4" />
                Emitir comprobante
              </Button>
            )}
          </div>
        </div>
      </div>

      {descuentoAbierto && (
        <DescuentoModal
          titulo="Descuento global"
          descripcion="Se aplica sobre el valor de venta; el IGV se recalcula."
          base={baseDescuento}
          actual={descuentoGlobal}
          onClose={() => setDescuentoAbierto(false)}
          onAplicar={(d) => {
            setDescuentoGlobal(d);
            // Con una sola forma de pago, su monto sigue al nuevo total.
            if (pagos.length === 1) {
              const nuevo = calcularComprobante(lineas, tasaIgv, d).total;
              setPagos([{ ...pagos[0], monto: nuevo.toFixed(2) }]);
            }
            setDescuentoAbierto(false);
          }}
        />
      )}
    </>
  );
}
