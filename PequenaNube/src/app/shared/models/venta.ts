export interface CheckoutRequest {
  nombre: string;
  direccion: string;
  telefono: string;
  items: { productId: number; cantidad: number }[];
}

export interface CheckoutResponse {
  preferenceId: string;
  initPoint: string;
}

export interface RankingResponse {
  topProductos: { productId: number; productName: string; cantidadVendida: number }[];
  evolucion: { mes: number; anio: number; total: number }[];
}

export interface VentaDelDia {
  id: number;
  fecha: string;
  nombre: string;
  direccion: string;
  telefono: string;
  mpPaymentId: number;
  total: number;
  cantidadItems: number;
}
