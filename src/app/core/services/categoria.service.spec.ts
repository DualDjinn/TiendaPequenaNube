import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CategoriaService } from './categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CategoriaService],
    });
    service = TestBed.inject(CategoriaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should get by linea', () => {
    service.getByLinea(1).subscribe(r => expect(r).toEqual([]));
    const req = http.expectOne('/api/categorias/linea/1');
    req.flush([]);
  });

  it('should create categoria', () => {
    service.create('Nueva', 1).subscribe();
    const req = http.expectOne('/api/categorias');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, nombre: 'Nueva' });
  });

  it('should delete categoria', () => {
    service.delete(1).subscribe();
    const req = http.expectOne('/api/categorias/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
