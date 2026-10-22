/** Producto o servicio que se puede agregar a la cuenta del cliente. */
export interface ItemVendible {
  /** "p-1" (producto) o "s-1" (servicio). */
  id: string;
  tipo: "producto" | "servicio";
  nombre: string;
  /** Precio de venta por unidad, con IGV incluido. */
  precio: number;
  /** Producto: almacén donde hay stock y cuánto. Servicio: no aplica. */
  almacen: string | null;
  stock: number | null;
  /** Afecto al impuesto a las bolsas plásticas (ICBPER). */
  icbper: boolean;
}

/** Descuento en monto (S/, con IGV) o en porcentaje. */
export interface Descuento {
  tipo: "monto" | "porcentaje";
  valor: number;
}

/** Línea de la cuenta en la pantalla de venta. */
export interface LineaVenta {
  item: ItemVendible;
  cantidad: number;
  /** Id de la mascota del cliente; null = sin mascota. */
  mascotaId: number | null;
  /** Precio unitario con IGV cambiado para esta venta; ausente = precio de lista. */
  precio?: number;
  descuento?: Descuento | null;
  /** Regalo: la línea se registra pero no se cobra (descuento del 100 %). */
  regalo?: boolean;
  /** Usuario que comisiona por la línea. */
  vendedorId?: number | null;
  comentario?: string;
}
