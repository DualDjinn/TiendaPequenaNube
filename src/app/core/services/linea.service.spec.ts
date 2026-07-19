import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LineaService } from './linea.service';

describe('LineaService', () => {
  let service: LineaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), LineaService],
    });
    service = TestBed.inject(LineaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should get all', () => {
    service.getAll().subscribe(r => expect(r).toEqual([]));
    const req = http.expectOne('/api/lineas');
    req.flush([]);
  });

  it('should create', () => {
    service.create('L').subscribe();
    const req = http.expectOne('/api/lineas');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, nombre: 'L' });
  });

  it('should delete', () => {
    service.delete(1).subscribe();
    const req = http.expectOne('/api/lineas/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
