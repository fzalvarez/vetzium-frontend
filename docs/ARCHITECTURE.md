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
| `configuracion` | — (localStorage) | `/configuracion` |
| `ventas` | por definir | `/ventas/cuentas-activas`, `/ventas/comprobantes`, `/ventas/entradas-salidas` |
| `clientes` | por definir | `/clientes` (listado), `/clientes/gestion` |
| `productos` | por definir | `/productos` (catálogo), `/productos/descargar-stock`, `/productos/cargar-stock` |
| `en-construccion` | — | toda ruta del menú sin pantalla propia |
| `error-pages` | — | `*` (404), `errorElement` |

## Layout

`AdminLayout` (patrón de `tms`): sidebar fijo de 256px (en `< lg` se abre con el botón
del header, con fondo oscuro que lo cierra), header sticky de 64px con las acciones
(hoy solo el tema) y contenido centrado a 1440px. Una ruta con
`handle: { anchoCompleto: true }` usa todo el ancho. Las páginas se cargan lazy
dentro de un `Suspense`.

### Menú lateral

`MENU` en `navegacion.ts` es la única fuente del menú y de sus rutas. Un módulo tiene
ruta propia (`to`) o submódulos (`items`); el primer submódulo usa la ruta base del
módulo (Ventas → `/ventas`, Comprobantes → `/ventas/comprobantes`). En el sidebar se
despliega un módulo a la vez y, al navegar, se abre el de la ruta actual.

`router.tsx` crea una ruta por cada entrada del menú: la pantalla de `PAGINAS` si existe
o "en construcción" (con título `Módulo › Submódulo`).

Para construir una pantalla del menú: página en `features/<f>/pages`, `lazy` en
`paginas.ts` y su entrada en `PAGINAS` de `router.tsx`.

### Módulos activables (Configuración)

`/configuracion` lista `MENU` con un interruptor por módulo y por submódulo. La clave
de un módulo es su `id` si tiene submódulos, si no su ruta; la de un submódulo, su ruta.
`modulos.store` guarda las claves **desactivadas** (persistido en `localStorage`,
`vetzium-modulos`), así un módulo nuevo aparece activo.

- Sidebar: `filtrarMenu()` quita lo desactivado y los módulos sin submódulos activos.
- Rutas: `RutaModulo` envuelve cada ruta del menú y muestra "Este módulo está
  desactivado" si su módulo o submódulo lo está.
- Inicio (`RUTAS_FIJAS`) y Configuración (pie del sidebar) no se pueden desactivar.

### Pantallas de listado

`EncabezadoPagina` (módulo + título + acciones) y debajo una `Tarjeta` con `Pestanas`
(si hay varias vistas) y `Tabla`. La pestaña activa va en `?vista=` (`usePestanaUrl`);
la primera es la de por defecto y no se escribe. En `Tabla`, montos y cantidades se
alinean a la derecha y "Opciones" al centro; `encabezado` reemplaza el título de una
columna (p. ej. la casilla de seleccionar todos). Una vista sin columnas definidas
muestra `PorDefinir`.
Colores solo con tokens (`brand-*`, `gray-*`) para cambiar la identidad desde `index.css`.

## Integración con el backend

- `shared/lib/axios.ts`: `baseURL` = `VITE_VETZIUM_API_URL`. Sin interceptores aún
  (sesión y manejo de 401 por definir).
- `shared/lib/http-error.ts`: asume errores estilo FastAPI (`{ detail }`); revisar cuando
  se defina el backend.

## Despliegue

`vercel.json` reescribe todas las rutas a `index.html` (SPA).
