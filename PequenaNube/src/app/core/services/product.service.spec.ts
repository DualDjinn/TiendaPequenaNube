import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProductService],
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('should load all products', () => {
    service.loadAll();
    http.expectOne('/api/products').flush([{ id: 1, name: 'Test', images: '', price: 100 }]);
    expect(service.products().length).toBe(1);
  });

  it('should get by slug', () => {
    service.loadAll();
    http.expectOne('/api/products').flush([{ id: 1, slug: 'test', name: 'Test', images: '', price: 100 }]);
    expect(service.getBySlug('test')?.slug).toBe('test');
  });

  it('should return undefined for unknown slug', () => {
    service.loadAll();
    http.expectOne('/api/products').flush([]);
    expect(service.getBySlug('nope')).toBeUndefined();
  });

  it('should soft delete via http', () => {
    service.softDelete(1);
    http.expectOne('/api/products/1').flush(null);
  });
});
