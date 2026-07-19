import { TestBed } from '@angular/core/testing';
import { Catalog } from './catalog';
import { ProductService } from '../../core/services/product.service';
import { signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ActivatedRoute } from '@angular/router';

const mockProducts: Product[] = [
  { id: 1, name: 'A', slug: 'a', price: 100, images: [''], productLine: 'jewelry', category: 'Anillos', description: '', stock: 5 },
  { id: 2, name: 'B', slug: 'b', price: 50, images: [''], productLine: 'amigurumi', category: 'Animales', description: '', stock: 3 },
  { id: 3, name: 'C', slug: 'c', price: 200, images: [''], productLine: 'jewelry', category: 'Aros', description: '', stock: 1 },
];

describe('Catalog', () => {
  let component: Catalog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Catalog,
        { provide: ProductService, useValue: { products: signal(mockProducts), loadAll: vi.fn() } },
        { provide: ActivatedRoute, useValue: { queryParams: signal({}) } },
      ],
    });
    component = TestBed.inject(Catalog);
  });

  it('should create', () => expect(component).toBeTruthy());
});
