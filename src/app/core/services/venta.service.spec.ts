import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { VentaService } from './venta.service';

describe('VentaService', () => {
  let service: VentaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), VentaService],
    });
    service = TestBed.inject(VentaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should post checkout', () => {
    service.checkout({ nombre: 'T', direccion: 'D', telefono: '1', items: [{ productId: 1, cantidad: 1 }] })
      .subscribe(r => expect(r.preferenceId).toBe('pref-123'));
    const req = http.expectOne('/api/ventas');
    expect(req.request.method).toBe('POST');
    req.flush({ preferenceId: 'pref-123', initPoint: 'https://mp.com' });
  });

  it('should get ranking', () => {
    service.getRanking(7, 2026).subscribe(r => expect(r.topProductos).toEqual([]));
    const req = http.expectOne('/api/admin/ventas/ranking?mes=7&anio=2026');
    req.flush({ topProductos: [], evolucion: [] });
  });

  it('should get ventas del dia', () => {
    service.getVentasDelDia().subscribe(r => expect(r.length).toBe(0));
    const req = http.expectOne('/api/admin/ventas/del-dia');
    req.flush([]);
  });
});
