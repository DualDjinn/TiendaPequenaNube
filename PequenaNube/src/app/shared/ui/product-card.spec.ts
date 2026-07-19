import { TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { CartService } from '../../core/services/cart.service';

describe('ProductCard', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      providers: [
        ProductCard,
        { provide: CartService, useValue: { add: vi.fn() } },
      ],
    });
    expect(TestBed.inject(ProductCard)).toBeTruthy();
  });
});
