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
- [x] Menú: Dashboard (tras Inicio); Gestión Multisede, WhatsApp y Complementos (tras
      Cloud, que ya existía). Configuración pasa a grupo con General (interruptores de
      módulos), Datos fiscales, Comprobantes, Métodos de pago, Etiquetas, Usuarios,
      Roles, Clasificación; el grupo se abre solo al entrar a una de sus rutas.
- [x] **Dashboard** con **datos de ejemplo** (etiqueta visible): KPIs Ventas del día,
      Ventas del mes, Sala de espera, Citas de hoy; barras Ventas del mes (monto × día);
      dona Distribución de ventas por categoría (532 al centro; Vacunaciones, Consultas,
      Desparasitaciones, Otros a la derecha); barras horizontales Visitas médicas por
      especie; barras Promedio de visitas diarias (por día de la semana). Verificado con
      Chrome headless en claro y oscuro, con hover real (tooltip de barra y centro de la
      dona).

- [x] Ventas del mes muestra los 31 días en el eje (en columnas angostas, como en
      móvil, las etiquetas van verticales). El gráfico reserva su alto y se mide antes
      de pintar, así no aparece vacío ni hace saltar la tarjeta. Verificado a 500,
      1366 y 1920px.
- [x] **Ventas › Entradas / Salidas de caja** con 5 movimientos de **ejemplo** (etiqueta
      visible, en memoria: se pierden al recargar). Barra: Buscar por descripción
      (funciona, sin distinguir tildes ni mayúsculas), Más filtros, Borrar, Actualizar,
      + Entrada, + Salida; a la derecha Exportar y Opciones. Modales "Nueva entrada/salida
      de caja" funcionales: Fecha (hoy, Perú), Medio de pago, Descripción, Monto (S/),
      Etiquetas, Doc. de referencia, N.° de operación; validan con zod y agregan la fila
      arriba con aviso. Tipo de movimiento con ícono + texto. Verificado con clics y
      tecleo reales en Chrome headless (errores, alta, Esc, búsqueda "cirugia").
- [x] **Datos de ejemplo y paginación en todas las tablas** (13): Cuentas activas (por
      cliente —calculada desde los ítems— y por ítems), Entradas/Salidas, Clientes
      (listado y nuevos por mes), Catálogo, Descargas, Cargas, Stock por almacén,
      Almacenes, Lotes, Directorio y Órdenes de compra. 5 registros por tabla, con los
      mismos clientes, productos, almacenes y proveedores entre tablas.
- [x] Funciona en el cliente: búsquedas (Entradas/Salidas, Descargas, Cargas, Lotes,
      Directorio, Órdenes de compra —por número y proveedor, las OC aún no tienen
      productos—), filtro Estados de Almacenes, selección con "seleccionar todos"
      (Clientes, Catálogo).
- [x] **Modales de alta funcionales** (validan y agregan la fila en memoria con número
      correlativo y aviso): Entrada / Salida de caja, Descargar stock (DS-…), Cargar
      stock (CS-…), Nuevo almacén, Crear nuevo proveedor (RUC 11 dígitos, correo) y
      Nueva orden de compra (OC-…, IGV y monto calculados al escribir).
- [x] Avisos arriba a la derecha (abajo tapaban la paginación tras guardar).
- [x] Verificado con Chrome headless y clics/tecleo reales: 13 tablas con 5 filas y pie
      "Mostrando 1–5 de 5", errores de validación, altas, filtro, selección, paso a la
      página 2 con 11 registros y cambio a 25 filas por página.
- [x] **Reglas de los módulos** (Configuración › General, arriba de los módulos; se
      guarda en el navegador): Productos › Lotes "Aviso de vencimiento" = 30 días (1–365).
      Lotes muestra "Vencido" o "Por vencer · N días" junto a la fecha. Verificado: con 30
      días marca shampoo (vencido) y jeringas (17 días); con 10, solo el vencido.
- [x] **Mascotas** (datos de ejemplo en `mascotas.store`, en memoria):
      - **Listado** (`/mascotas`): N.° HC, nombre (abre la mascota), especie, raza, sexo,
        edad, propietario; buscador y paginación.
      - **Mascota abierta** (`/mascotas/:id`): izquierda foto (o ícono de la especie) y
        datos (N.° HC, especie, raza, sexo, esterilizado, nacimiento, edad calculada,
        etiquetas, propietario). Derecha pestañas: Editar (funciona), **Historia
        clínica** (por defecto: Registro de consulta con fecha/hora, motivo, anamnesis y
        7 constantes —temperatura, FC, FR, peso, deshidratación, TLC, PA— y consultas
        anteriores), Calendario, Galería, Historia de compras, Órdenes de peluquería y
        Auditoría (por definir). Verificado con clics reales.
- [x] **Ventas › Ventas** (`/ventas`, pantalla de venta) con datos de ejemplo:
      - Buscar y seleccionar cliente (combobox con teclado); al elegirlo se ven sus
        datos y mascotas. A la derecha: Editar (requiere cliente), Nuevo cliente, Baño /
        peluquería, Hotel, Movilidad, Consulta y "Agregar nota" (color distinto); por
        ahora "Próximamente".
      - Almacén de origen (activos con "Usar para ventas") y buscador de productos (con
        stock en ese almacén) y servicios; requiere cliente. Repetir un ítem suma 1.
      - Tabla: Concepto, Valor unitario, Cantidad (editable), Subtotal, Impuestos, Total,
        Mascota (del cliente; se asigna sola si tiene una), Opciones (quitar). Sin
        paginación a propósito: es la cuenta en curso y los totales deben verse completos.
      - Resumen: valor bruto, descuentos (0 por ahora), valor con descuentos, impuestos
        (IGV de Datos fiscales; precios con IGV incluido), ICBPER (S/ 0.50 por bolsa) y
        total. Verificado con Chrome headless: S/ 230.60 y S/ 171.80 en los casos probados.
- [x] **Configuración** con datos de ejemplo compartidos en la sesión:
      - **Usuarios**: buscador, tabla (usuario con iniciales y correo, rol, estado, último
        acceso) y modal "Nuevo usuario" (nombre, correo, rol, estado).
      - **Roles**: tabla (rol, descripción, usuarios, módulos con acceso) y "Nuevo rol";
        modal **Permisos** por módulo × Ver/Crear/Editar/Eliminar; Administrador fijo.
      - **Métodos de pago**: tabla con interruptor Activo y "Nuevo método" (tipo, pedir
        N.° de operación). Entradas/Salidas usa solo los activos y exige el N.° de
        operación cuando el método lo pide.
      - **Datos fiscales**: formulario Empresa / Domicilio fiscal / Facturación
        electrónica (RUC 11 dígitos, régimen SUNAT, ambiente, IGV), Guardar y Descartar.
      - Verificado con clics reales navegando dentro de la SPA (sin recargar).
- [x] Barra superior: Buscar, Calendario, Maximizar ventana (pantalla completa real,
      alterna a Restaurar), Ayuda, tema y Mi cuenta. Verificado con clics reales en
      Chrome headless; en móvil se ocultan Calendario y Maximizar.

## Siguiente

- [ ] Ventas: cómo se aplican descuentos (por línea, global, %), qué abren los accesos
      rápidos, acción final (¿Cobrar / Emitir comprobante / Guardar en cuenta activa?) y
      si el precio de lista incluye IGV (hoy sí).

- [ ] Configuración: confirmar roles base y sus permisos, acciones por módulo (¿solo
      Ver/Crear/Editar/Eliminar?), regímenes/ambiente/IGV, si los usuarios pertenecen a
      una sede (Gestión Multisede) y qué hace "Opciones" (editar, desactivar, reenviar
      invitación). Aplicar permisos al menú cuando exista sesión.

- [ ] Valores provisionales a confirmar: estados de cliente y almacén (Activo/Inactivo),
      tipo de almacén "Secundario", tipos de operación de carga/descarga, IGV 18% en
      órdenes de compra, "Registrado por" sin sesión ("Usuario actual").
- [ ] Comprobantes sigue sin columnas (no tiene tabla ni datos).

- [ ] Entradas/Salidas: medios de pago reales (hoy provisionales: Efectivo, Yape, Plin,
      Tarjeta, Transferencia), etiquetas (¿lista fija desde Configuración › Etiquetas?),
      qué campos son obligatorios, qué hace "Opciones" por fila y la API.

- [ ] Qué abren Buscar, Calendario, Ayuda y Mi cuenta (hoy "Próximamente").

- [ ] Dashboard: reemplazar `datos-ejemplo.ts` por la API; confirmar especies, período
      del "Promedio de visitas diarias" y si Dashboard reemplaza a Inicio.

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
