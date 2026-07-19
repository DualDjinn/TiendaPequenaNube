import { TestBed } from '@angular/core/testing';
import { AdminDashboard } from './dashboard';
import { VentaService } from '../../core/services/venta.service';
import { of } from 'rxjs';
import { RankingResponse, VentaDelDia } from '../../shared/models/venta';

const mockRanking: RankingResponse = { topProductos: [{ productId: 1, productName: 'A', cantidadVendida: 5 }], evolucion: [{ mes: 7, anio: 2026, total: 1500 }] };
const mockVentas: VentaDelDia[] = [{ id: 1, fecha: new Date().toISOString(), nombre: 'Test', direccion: 'Dir', telefono: '123', mpPaymentId: 1, total: 200, cantidadItems: 2 }];

describe('AdminDashboard', () => {
  let component: AdminDashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminDashboard,
        { provide: VentaService, useValue: { getRanking: () => of(mockRanking), getVentasDelDia: () => of(mockVentas) } },
      ],
    });
    component = TestBed.inject(AdminDashboard);
  });

  it('should create', () => expect(component).toBeTruthy());
});
