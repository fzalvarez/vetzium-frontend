import { lazy } from "react";

// Cada pantalla es un chunk aparte que se descarga al visitarla. Las páginas de
// error quedan en el chunk inicial (se importan directo en router.tsx). Va en su
// propio archivo: router.tsx exporta `router`, y un archivo que mezcla componentes
// con otras exportaciones rompe el fast refresh de Vite.
export const InicioPage = lazy(() => import("@/features/inicio/pages/InicioPage"));
export const EnConstruccionPage = lazy(() => import("@/features/en-construccion/pages/EnConstruccionPage"));
