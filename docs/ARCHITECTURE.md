# Arquitectura — vetzium-frontend

React + Vite + TypeScript. Tailwind 4 (tokens en `src/index.css`), Zustand,
react-router-dom, axios, react-hook-form + zod, sonner, framer-motion.

Mismo patrón que `hcvet-dev-frontend`.

## Estructura

```
src/
├── app/
│   ├── router.tsx               # rutas (createBrowserRouter)
│   └── layouts/                 # AppLayout (RouterProvider)
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
│   ├── hooks/useCarga.ts        # carga de datos por clave, con recarga
│   ├── lib/                     # axios, mensajes de error
│   ├── store/                   # loading, theme
│   ├── types/                   # ServiceResponse (con status HTTP)
│   └── utils/                   # notifySuccess/notifyError
├── components/ui                # primitivos shadcn (button, sonner)
└── lib/utils.ts                 # cn()
```

| Feature | Backend | Rutas |
|---|---|---|
| `error-pages` | — | `*` (404), `errorElement` |

## Integración con el backend

- `shared/lib/axios.ts`: `baseURL` = `VITE_VETZIUM_API_URL`. Sin interceptores aún
  (sesión y manejo de 401 por definir).
- `shared/lib/http-error.ts`: asume errores estilo FastAPI (`{ detail }`); revisar cuando
  se defina el backend.

## Despliegue

`vercel.json` reescribe todas las rutas a `index.html` (SPA).
