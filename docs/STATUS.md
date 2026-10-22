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
- [x] **Configuración** (`/configuracion`, enlace fijo al pie del sidebar): interruptor
      por módulo y submódulo; lo desactivado sale del menú y su ruta muestra un aviso.
      "Activar todos". Inicio y Configuración siempre visibles. Guardado en el navegador.
      Verificado con Chrome headless (clics reales vía DevTools Protocol): desactivar
      Hotel y Ventas › Comprobantes los quita del menú, la URL muestra el aviso, el
      estado se conserva al recargar y "Activar todos" lo limpia.

- [x] Clientes y Productos, estructura visual sin datos, verificada con Chrome headless:
      - **Clientes › Listado**: casilla de selección, Fecha de registro, Nombres y
        apellidos, Teléfonos, Email, Dirección, Estado, Opciones.
      - **Clientes › Gestión** (indicadores): pestañas Nuevos clientes (Mes, Clientes
        registrados), Ubicación, Zona, Información, Etiquetas (estas cuatro por definir).
      - **Productos › Catálogo**: Cód. de barras, Nombre, Marca, Proveedor, Líneas,
        Código tributario, Empresa.
      - **Descargar stock** (Descargas emitidas, Por ítems) y **Cargar stock** (Cargas
        emitidas, Por ítems): columnas por definir.

- [x] Contenido de las pantallas a todo el ancho (sin centrar). Verificado a 1920px.
- [x] Configuración muestra la descripción de cada módulo y submódulo (definida en
      `navegacion.ts`) en columnas: Módulo · Descripción · Activo (en móvil la
      descripción va debajo del nombre). Solo Clientes › Gestión tiene descripción; el resto
      "Sin descripción" hasta definirlas.

- [x] Proveedores, estructura visual sin datos, verificada con Chrome headless:
      - **Directorio**: buscador y "Crear nuevo proveedor"; tabla ID, Nombre legal,
        Número tributario, Teléfono fijo, Celular, Correo.
      - **Órdenes de compra**: pestañas Órdenes de compra, Recepciones, Pagos (estas dos
        por definir). Barra: Buscar producto, Más filtros, Agrupar, Borrar, Actualizar,
        + Nuevo; a la derecha Exportar y Opciones. Tabla #, Proveedor, Fecha de creación,
        Estado (Recibido/Aprobado), Valor neto, Impuestos, Monto, Opciones.
      - Los botones muestran "Próximamente" (verificado con clic real).
- [x] `Button` y `ThemeToggle` pasan de colores fijos heredados a tokens de marca.
- [x] Productos, estructura visual sin datos, verificada con Chrome headless:
      - **Lotes**: barra Buscar producto, Más filtros, Agrupar, Borrar, Actualizar; a la
        derecha Exportar y Opciones. Tabla ID, Fecha de registro, Producto, # Lote,
        Almacén, Fecha de vencimiento, Cantidad entrada, Saldo, Opciones.
      - **Almacenes**: barra Estados (Todos), Borrar, Actualizar, + Nuevo; a la derecha
        Exportar y Opciones. Tabla ID, Nombre de almacén, Código personalizado, Tipo de
        almacén, Estado, Usar para ventas, Opciones.
- [x] Botones de barra compartidos (`AccionesTabla`) y `SelectorFiltro`; Órdenes de compra
      los usa (sin cambio visual).
- [x] Productos, verificado con Chrome headless:
      - **Stock por almacén**: Producto, Almacén, Precio de compra, Precio de venta,
        Stock contable.
      - **Descargar stock / Cargar stock** (componente común `MovimientosStock`): pestaña
        Descargas/Cargas emitidas con barra (Buscar número, Más filtros, Agrupar, Borrar,
        Actualizar, + Descargar/Cargar stock; Exportar y Opciones) y tabla N.° de
        descarga/carga, Fecha de creación, Tipo de operación, Motivo, Responsable,
        Registrado por, Opciones. "Por ítems" sigue por definir.
      - **Catálogo**: columna de casilla de selección antes de Cód. de barras.
- [x] Ícono en cada submódulo (menú lateral y Configuración).

## Siguiente

- [ ] Por definir en Productos: estados de un almacén (el filtro solo tiene "Todos") y
      tipos de almacén además de "Principal".

- [ ] Por definir en Proveedores: Recepciones y Pagos; qué borra "Borrar"; qué filtros
      tiene "Más filtros" y por qué campos se agrupa; qué incluye el menú Opciones.
- [ ] Descripciones de los módulos y submódulos.
- [ ] Por definir: pestañas Ubicación, Zona, Información y Etiquetas de Clientes ›
      Gestión; columnas de Descargar stock y Cargar stock; qué se hace con los clientes
      seleccionados (acciones masivas).
- [ ] Configuración de módulos en el backend (hoy es por navegador) y quién puede cambiarla.

- [ ] Columnas de las dos pestañas de Comprobantes.
- [ ] Qué hace "Opciones" en cada tabla; filtros/búsqueda; acciones de cabecera.
- [ ] Backend y contrato de la API para llenar las tablas.
- [ ] Identidad visual: hoy usa los colores, la tipografía y el favicon de HCVet.
- [ ] Contenido del header (búsqueda, notificaciones, sede…) y tarjeta de usuario en el
      sidebar: dependen del dominio y de la autenticación.
- [ ] Autenticación (store de sesión, `AuthLayout`/rutas protegidas, interceptores de axios).
- [ ] El bundle inicial pasa de 500 kB (aviso de Vite; framer-motion entra con el overlay).
