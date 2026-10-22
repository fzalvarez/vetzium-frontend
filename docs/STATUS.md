# Estado — vetzium-frontend

Última actualización: 2026-10-22

## Hecho y verificado

- [x] Proyecto base con la configuración de `hcvet-dev-frontend`: Vite + mkcert,
      Tailwind 4 y tokens, alias `@/`, tsconfig, ESLint, `vercel.json`, mismas dependencias.
- [x] Infraestructura compartida: tema claro/oscuro, toasts, overlay de carga, `useCarga`,
      `ServiceResponse`, cliente axios, páginas de error (404 y `RouteErrorBoundary`).
- [x] Layout principal (`AdminLayout`): sidebar con marca y menú por grupos, header con
      tema claro/oscuro, menú móvil, contenido centrado y páginas lazy. Página `Inicio`
      vacía en `/`. Verificado con Chrome headless (escritorio, móvil y 404).
- [x] Menú lateral mapeado: 19 módulos, 8 con submódulos (Ventas, Peluquería, Transporte,
      Clientes, Mascotas, Eventos, Productos, Proveedores), 43 rutas. Submenús
      desplegables (uno a la vez, se abre el de la ruta actual). Toda ruta sin pantalla
      muestra "Módulo en construcción" con su título. Verificado con Chrome headless
      (`/ventas/comprobantes` y `/hotel`).

## Siguiente

- [ ] Definir backend, dominio y primera pantalla.
- [ ] Identidad visual: hoy usa los colores, la tipografía y el favicon de HCVet.
- [ ] Contenido del header (búsqueda, notificaciones, sede…) y tarjeta de usuario en el
      sidebar: dependen del dominio y de la autenticación.
- [ ] Autenticación (store de sesión, `AuthLayout`/rutas protegidas, interceptores de axios).
- [ ] El bundle inicial pasa de 500 kB (aviso de Vite; framer-motion entra con el overlay).
