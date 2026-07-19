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
    const req = http.expectOne('/api/products');
    req.flush([{ id: 1, name: 'Test', images: '', price: 100 }]);
    expect(service.products().length).toBe(1);
    expect(service.products()[0].name).toBe('Test');
  });

  it('should get by slug', () => {
    service.loadAll();
    const req = http.expectOne('/api/products');
    req.flush([{ id: 1, slug: 'test-product', name: 'Test', images: '', price: 100 }]);
    const found = service.getBySlug('test-product');
    expect(found).toBeTruthy();
    expect(found!.slug).toBe('test-product');
  });

  it('should return undefined for unknown slug', () => {
    service.loadAll();
    const req = http.expectOne('/api/products');
    req.flush([]);
    expect(service.getBySlug('nope')).toBeUndefined();
  });

  it('should soft delete via http', () => {
    service.softDelete(1);
    const req = http.expectOne('/api/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should normalize images from comma-separated to array', () => {
    service.loadAll();
    const req = http.expectOne('/api/products');
    req.flush([{ id: 1, name: 'Test', images: 'a.jpg,b.jpg', price: 100 }]);
    expect(Array.isArray(service.products()[0].images)).toBe(true);
    expect(service.products()[0].images.length).toBe(2);
  });
});
