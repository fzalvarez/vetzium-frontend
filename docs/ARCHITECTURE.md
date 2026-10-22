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
│   ├── navegacion.ts            # items y grupos del menú lateral
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
│   ├── components/              # LoadingOverlay, ThemeHydrator, ThemeToggle, ToasterWithTheme
│   │   └── sidebar/             # AppSidebar, AppHeader, Backdrop
│   ├── hooks/useCarga.ts        # carga de datos por clave, con recarga
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
| `error-pages` | — | `*` (404), `errorElement` |

## Layout

`AdminLayout` (patrón de `tms`): sidebar fijo de 256px (en `< lg` se abre con el botón
del header, con fondo oscuro que lo cierra), header sticky de 64px con las acciones
(hoy solo el tema) y contenido centrado a 1440px. Una ruta con
`handle: { anchoCompleto: true }` usa todo el ancho. Las páginas se cargan lazy
dentro de un `Suspense`.

Para agregar una pantalla: página en `features/<f>/pages`, `lazy` en `paginas.ts`,
ruta hija en `router.tsx` y, si va en el menú, item en `navegacion.ts`.
Colores solo con tokens (`brand-*`, `gray-*`) para cambiar la identidad desde `index.css`.

## Integración con el backend

- `shared/lib/axios.ts`: `baseURL` = `VITE_VETZIUM_API_URL`. Sin interceptores aún
  (sesión y manejo de 401 por definir).
- `shared/lib/http-error.ts`: asume errores estilo FastAPI (`{ detail }`); revisar cuando
  se defina el backend.

## Despliegue

`vercel.json` reescribe todas las rutas a `index.html` (SPA).
