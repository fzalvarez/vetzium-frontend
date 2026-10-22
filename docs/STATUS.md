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
- [x] Ventas, estructura visual sin datos (no hay backend), verificada con Chrome headless:
      - **Cuentas activas**: pestañas *Por cliente* (Cliente, Teléfono, Último movimiento,
        Ítems en la lista, Monto, Opciones) y *Por ítems* (Fecha de registro, Cliente,
        Mascota, Descripción, P. U., Cantidad, Total, Opciones).
      - **Comprobantes**: pestañas *Comprobantes emitidos* y *Por ítems*; columnas por definir.
      - **Entradas/Salidas**: tabla (ID, Fecha, Descripción, Etiquetas, Medio de pago,
        Entrada, Salida, Doc. de referencia, N.° de operación, Tipo de movimiento, Opciones).
- [x] Componentes compartidos: `EncabezadoPagina`, `Tarjeta`, `Pestanas`, `Tabla`,
      `usePestanaUrl`.

## Siguiente

- [ ] Columnas de las dos pestañas de Comprobantes.
- [ ] Qué hace "Opciones" en cada tabla; filtros/búsqueda; acciones de cabecera.
- [ ] Backend y contrato de la API para llenar las tablas.
- [ ] Identidad visual: hoy usa los colores, la tipografía y el favicon de HCVet.
- [ ] Contenido del header (búsqueda, notificaciones, sede…) y tarjeta de usuario en el
      sidebar: dependen del dominio y de la autenticación.
- [ ] Autenticación (store de sesión, `AuthLayout`/rutas protegidas, interceptores de axios).
- [ ] El bundle inicial pasa de 500 kB (aviso de Vite; framer-motion entra con el overlay).
