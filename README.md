# vetzium-frontend

Frontend de Vetzium. Estructura y stack tomados de
[`hcvet-dev-frontend`](../hcvet-dev-frontend). Ver [`docs/STATUS.md`](docs/STATUS.md).

## Stack

React 19 + Vite 8 + TypeScript, Tailwind 4, react-router-dom 7, Zustand, axios,
react-hook-form + zod, sonner (toasts), framer-motion, lucide-react.

## Comandos

```bash
pnpm install
cp .env.example .env    # ajustar VITE_VETZIUM_API_URL
pnpm dev                # https://localhost:5173 (certificado local con mkcert)
pnpm build              # tsc -b && vite build
pnpm lint
```

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `VITE_VETZIUM_API_URL` | URL base del backend (en local: `http://127.0.0.1:8000`). |

Documentación: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
