import { TestBed } from '@angular/core/testing';
import { ProductDetail } from './product-detail';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { Product } from '../../shared/models/product';

const mockProducts: Product[] = [
  { id: 1, name: 'Test', slug: 'test', price: 100, images: [''], productLine: 'jewelry', category: 'Anillos', description: 'Desc', stock: 5 },
];

describe('ProductDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductDetail,
        { provide: ProductService, useValue: { products: signal(mockProducts), loadAll: vi.fn(), getBySlug: (s: string) => mockProducts.find(p => p.slug === s) } },
        { provide: CartService, useValue: { add: vi.fn(), availableStock: () => 5 } },
        { provide: ActivatedRoute, useValue: { paramMap: signal({ get: () => 'test' }) } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(ProductDetail)).toBeTruthy());
});
