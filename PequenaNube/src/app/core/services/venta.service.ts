import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutRequest, CheckoutResponse, RankingResponse } from '../../shared/models/venta';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private http = inject(HttpClient);

  checkout(data: CheckoutRequest) { return this.http.post<CheckoutResponse>('/api/ventas', data); }

  getRanking(mes: number, anio: number) {
    return this.http.get<RankingResponse>(`/api/admin/ventas/ranking?mes=${mes}&anio=${anio}`);
  }
}
