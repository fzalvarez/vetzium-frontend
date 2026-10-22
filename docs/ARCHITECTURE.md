# Arquitectura — vetzium-frontend

React + Vite + TypeScript. Tailwind 4 (tokens en `src/index.css`), Zustand,
react-router-dom, axios, react-hook-form + zod, sonner, framer-motion.

Mismo patrón que `hcvet-dev-frontend`.

## Estructura

```
src/
├── app/
│   ├── router.tsx               # rutas (createBrowserRouter)
│   ├── paginas.ts               # páginas lazy (un chunk por pantalla)
│   ├── navegacion.ts            # menú lateral (módulos y submódulos, con rutas)
│   └── layouts/                 # AppLayout (RouterProvider), AdminLayout (sidebar + header)
├── features/<feature>/
│   ├── pages/                   # vistas de ruta
│   ├── components/              # UI propia del feature
│   ├── services/                # acceso a la API (un archivo por operación)
│   ├── mappers/                 # API (snake_case) ↔ modelo del front (camelCase)
│   ├── types/                   # tipos: dominio y contrato de la API
│   ├── validation/              # esquemas zod
│   ├── store/                   # estado Zustand del feature
│   └── constants.ts             # etiquetas de enums
├── shared/
│   ├── components/              # EncabezadoPagina, Tarjeta, Pestanas, Tabla (con estado
│   │   │                        # vacío/carga), LoadingOverlay, ThemeToggle, ToasterWithTheme…
│   │   └── sidebar/             # AppSidebar, AppHeader, Backdrop
│   ├── hooks/                   # useCarga (carga por clave), usePestanaUrl (?vista=)
│   ├── lib/                     # axios, mensajes de error
│   ├── store/                   # loading, theme, sidebar (menú móvil)
│   ├── types/                   # ServiceResponse (con status HTTP)
│   └── utils/                   # notifySuccess/notifyError
├── components/ui                # primitivos shadcn (button, sonner)
└── lib/utils.ts                 # cn()
```

| Feature | Backend | Rutas |
|---|---|---|
| `inicio` | — | `/` |
| `marketing` | por definir (`datos-ejemplo.ts`, en memoria) | `/marketing/promociones`, `/marketing/puntos` |
| `eventos` | por definir (`datos-ejemplo.ts`) | `/eventos/listado` |
| `sala-espera` | por definir (`sala-espera.store` en memoria) | `/sala-espera` |
| `mascotas` | por definir (`mascotas.store` en memoria) | `/mascotas` (listado), `/mascotas/:id` (mascota abierta) y `/mascotas/nueva?cliente=&volver=` (registro), fuera del menú |
| `dashboard` | por definir (hoy `datos-ejemplo.ts`) | `/dashboard` |
| `configuracion` | — (módulos: localStorage; resto: `configuracion.store` en memoria) | `/configuracion` (General), `/configuracion/usuarios`, `/roles`, `/metodos-pago`, `/datos-fiscales`; el resto en construcción |
| `ventas` | por definir (en memoria con `datos-ejemplo.ts`; totales en `lib/totales.ts`) | `/ventas` (venta), `/ventas/comprobantes/nuevo` (generar comprobante, fuera del menú), `/ventas/cuentas-activas`, `/ventas/comprobantes`, `/ventas/entradas-salidas` |
| `clientes` | por definir | `/clientes` (listado), `/clientes/gestion` |
| `proveedores` | por definir | `/proveedores` (directorio), `/proveedores/ordenes-compra` |
| `productos` | por definir | `/productos` (catálogo), `/productos/descargar-stock`, `/productos/cargar-stock` (ambas con `MovimientosStock`), `/productos/stock-almacen`, `/productos/almacenes`, `/productos/lotes` |
| `en-construccion` | — | toda ruta del menú sin pantalla propia |
| `error-pages` | — | `*` (404), `errorElement` |

## Layout

`AdminLayout` (patrón de `tms`): sidebar fijo de 256px (en `< lg` se abre con el botón
del header, con fondo oscuro que lo cierra), header sticky de 64px con las acciones
(Buscar, Calendario, Maximizar ventana —Fullscreen API, `usePantallaCompleta`—, Ayuda,
tema y Mi cuenta; botones `BotonHeader`; en móvil se ocultan Calendario y Maximizar)
y el contenido a **todo el ancho** disponible (sin centrar ni
ancho máximo). Las páginas se cargan lazy dentro de un `Suspense`.

### Menú lateral

`MENU` en `navegacion.ts` es la única fuente del menú y de sus rutas. Módulos y
submódulos llevan ícono (`lucide-react`). Un módulo tiene ruta propia (`to`) o
submódulos (`items`); el primer submódulo usa la ruta base del
módulo (Ventas → `/ventas`, Comprobantes → `/ventas/comprobantes`). En el sidebar se
despliega un módulo a la vez y, al navegar, se abre el de la ruta actual.

Hay un **3.er nivel**: un submódulo puede agrupar pantallas (`items` + `id`), p. ej.
Gestión › Rankings › Pacientes / Clientes / Ítems. En el sidebar el grupo es un título con
sus pantallas debajo (siempre visibles); en Configuración › General cada nivel tiene su
interruptor. Helpers: `claveSub`, `hojasDe`, `rutasDeModulo`.

`router.tsx` crea una ruta por cada entrada del menú: la pantalla de `PAGINAS` si existe
o "en construcción" (con título `Módulo › Submódulo`).

Para construir una pantalla del menú: página en `features/<f>/pages`, `lazy` en
`paginas.ts` y su entrada en `PAGINAS` de `router.tsx`.

### Módulos activables (Configuración)

Configuración es un grupo propio (`MENU_CONFIGURACION`, fuera de `MENU`) fijo al pie
del sidebar: General, Datos fiscales, Comprobantes, Métodos de pago, Etiquetas,
Usuarios, Roles, Clasificación. Sus rutas no pasan por `RutaModulo`.

`/configuracion` (General) lista `MENU` con un interruptor y la `descripcion` de cada módulo y
submódulo ("Sin descripción" si está vacía; solo se llena cuando está claro qué hace,
hoy solo Clientes › Gestión). La clave
de un módulo es su `id` si tiene submódulos, si no su ruta; la de un submódulo, su ruta.
`modulos.store` guarda las claves **desactivadas** (persistido en `localStorage`,
`vetzium-modulos`), así un módulo nuevo aparece activo.

- Sidebar: `filtrarMenu()` quita lo desactivado y los módulos sin submódulos activos.
- Rutas: `RutaModulo` envuelve cada ruta del menú y muestra "Este módulo está
  desactivado" si su módulo o submódulo lo está.
- Inicio (`RUTAS_FIJAS`) y Configuración (pie del sidebar) no se pueden desactivar.

**Reglas de los módulos** (`reglas.store`, persistido como `vetzium-reglas`): parámetros
que cambian el comportamiento de un módulo, editables en Configuración › General. Hoy:
días de aviso de vencimiento de lotes (30 por defecto).

### Configuración compartida (`configuracion.store`)

Usuarios, roles, métodos de pago y datos fiscales viven en un store Zustand **sin
persistir** (datos de ejemplo; se reinicia al recargar), para que las pantallas se
afecten entre sí en la sesión: los roles alimentan el modal de usuarios y su conteo; los
métodos de pago **activos** son los que ofrece el modal de caja, y los que piden N.° de
operación lo vuelven obligatorio (`crearMovimientoCajaSchema`). Permisos de rol: matriz
módulo (`claveDe` de `MENU`) × Ver/Crear/Editar/Eliminar; marcar una acción marca Ver y
quitar Ver quita todo. El rol fijo (Administrador) no se edita. Aún no se aplican los
permisos al menú: no hay sesión.

### Datos de la sesión (stores en memoria)

Mientras no hay backend, lo que varias pantallas comparten vive en stores Zustand sin
persistir (se reinician al recargar): `clientes.store`, `mascotas.store`,
`configuracion.store`, `sala-espera.store` y `venta.store` (la venta en curso se
conserva al ir a registrar una mascota y volver). Las búsquedas de propietario leen
`clientes.store`, así un cliente recién registrado aparece en todas partes.

Totales de venta y comprobante en `ventas/lib/totales.ts`: precios con IGV; por línea,
precio cambiado, descuento (monto o %) o regalo (100 %); el comprobante agrega un
descuento global sobre el valor de venta y recalcula el IGV. La emisión es **simulada**
(correlativos en `comprobantes.store`, sin SUNAT).

RENIEC está **simulado** (`clientes/reniec-simulado.ts`): unos DNI de ejemplo devuelven
datos; el modal lo dice. Se reemplaza por el servicio real vía backend.

### Formularios y modales

`components/ui/modal.tsx` (Radix Dialog, patrón de `tms`: Esc, clic afuera, foco
atrapado, pie con acciones). Formularios con react-hook-form + zod
(`features/<f>/validation`), campos con `Campo` (etiqueta + error/ayuda), `Input` y
`SelectNativo`. El modal se monta solo cuando se abre, así cada apertura empieza limpia.
Fechas en hora de Perú (`shared/utils/fechas.ts`), montos con `formatearSoles`.

### Gráficos (Dashboard)

SVG propio, sin librería (`features/dashboard/components`): `GraficoBarras` (una
serie, eje Y con paso redondo, tooltip por columna), `GraficoDona` (≤ 4 categorías,
total al centro, leyenda con valor y %; hover muestra la categoría al centro) y
`BarrasHorizontales` (valor escrito, sin tooltip). Cada `TarjetaGrafico` incluye la
tabla equivalente oculta para lectores de pantalla. Una serie usa `brand-*`; las
categorías usan `serie-1…4` (tokens en `index.css`, paleta de referencia validada para
claro y oscuro, en orden fijo). Nunca doble eje.

### Pantallas de listado

`EncabezadoPagina` (módulo + título + acciones) y debajo una `Tarjeta` con `Pestanas`
(si hay varias vistas) y `Tabla`. La pestaña activa va en `?vista=` (`usePestanaUrl`);
la primera es la de por defecto y no se escribe. En `Tabla`, montos y cantidades se
alinean a la derecha y "Opciones" al centro; `encabezado` reemplaza el título de una
columna (p. ej. la casilla de seleccionar todos). Una vista sin columnas definidas
muestra `PorDefinir`.

Filas con `Fila`, `Celda` (sin valor muestra "—"; `numerica`, `destacada`, `alinear`),
`CeldaCasilla` (selección, con `useSeleccion`) y `CeldaOpciones` (menú ⋮). Estados con
`Insignia` (siempre texto; ícono opcional). **Toda tabla lleva paginación**:
`usePaginacion(items)` devuelve `visibles` y `paginacion`, que se pasa a
`<Tabla paginacion>` (pie "Mostrando X–Y de N", filas por página 10/25/50 y páginas).
Mientras no hay backend, cada feature tiene `datos-ejemplo.ts` (5 registros coherentes
entre tablas) y la página muestra `EtiquetaEjemplo`; las altas viven en memoria.

Altas con `ModalFormulario` (formulario en grilla de 2 columnas + Cancelar/Guardar) y
react-hook-form + zod. Los avisos (sonner) salen arriba al centro, bajo la barra
superior: entre el título y los botones del encabezado (en las esquinas tapaban la
paginación o esos botones). Dentro de un modal, `BuscadorSeleccion enLinea` muestra la
lista en el flujo (flotante quedaría recortada por el scroll del modal).

Sobre la tabla va `BarraHerramientas`: `Buscador` y acciones a la izquierda (`children`)
y `derecha` alineado a la derecha. Los botones habituales están en `AccionesTabla`
(`BotonMasFiltros`, `BotonAgrupar`, `BotonBorrar`, `BotonActualizar`, `BotonNuevo` y
`AccionesDerecha` = Exportar + Opciones); sin `onClick` muestran `proximamente()`.
Filtros tipo "Estados: Todos" con `SelectorFiltro`.

Colores solo con tokens (`brand-*`, `gray-*`, `error-*`…), también en `components/ui`.
Colores solo con tokens (`brand-*`, `gray-*`) para cambiar la identidad desde `index.css`.

## Integración con el backend

- `shared/lib/axios.ts`: `baseURL` = `VITE_VETZIUM_API_URL`. Sin interceptores aún
  (sesión y manejo de 401 por definir).
- `shared/lib/http-error.ts`: asume errores estilo FastAPI (`{ detail }`); revisar cuando
  se defina el backend.

## Despliegue

`vercel.json` reescribe todas las rutas a `index.html` (SPA).
