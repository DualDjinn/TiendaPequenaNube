import { TestBed } from '@angular/core/testing';
import { QuickView } from './quick-view';
import { CartService } from '../../core/services/cart.service';
import { signal } from '@angular/core';
import { Product } from '../../shared/models/product';

const mockProduct: Product = {
  id: 1, name: 'Test', slug: 'test', price: 100, description: 'Desc',
  images: ['a.jpg', 'b.jpg'], stock: 5, productLine: 'jewelry', category: 'Anillos',
  material: 'Metal', color: 'Dorado',
};

describe('QuickView', () => {
  let component: QuickView;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuickView,
        { provide: CartService, useValue: { add: vi.fn() } },
      ],
    });
    component = TestBed.inject(QuickView);
    (component as any).product = () => mockProduct;
  });

  it('should create', () => expect(component).toBeTruthy());
});
