import { TestBed } from '@angular/core/testing';
import { AdminProductList } from './product-list';
import { ProductService } from '../../core/services/product.service';
import { signal } from '@angular/core';
import { Product } from '../../shared/models/product';

const mockProducts: Product[] = [
  { id: 1, name: 'Test', slug: 'test', price: 100, images: [''], productLine: 'jewelry', category: 'Anillos', description: '', stock: 5 },
];

describe('AdminProductList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminProductList,
        { provide: ProductService, useValue: { products: signal(mockProducts), loadAll: vi.fn(), softDelete: vi.fn() } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(AdminProductList)).toBeTruthy());
});
