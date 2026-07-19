import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { CART_PERSISTENCE } from './cart-persistence';
import { Product } from '../../shared/models/product';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  price: 1000,
  images: [],
  productLine: 'jewelry',
  category: 'Test',
  description: '',
  material: '',
  color: '',
  stock: 10,
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    const mockPersistence = {
      save: vi.fn(),
      restore: vi.fn(() => null),
    };

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: CART_PERSISTENCE, useValue: mockPersistence },
      ],
    });

    service = TestBed.inject(CartService);
  });

  it('should start empty', () => {
    expect(service.items().length).toBe(0);
    expect(service.totalItems()).toBe(0);
    expect(service.subtotal()).toBe(0);
  });

  it('should add product', () => {
    service.add(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(1);
    expect(service.totalItems()).toBe(1);
    expect(service.subtotal()).toBe(1000);
  });

  it('should increase quantity when adding same product', () => {
    service.add(mockProduct);
    service.add(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.totalItems()).toBe(2);
    expect(service.subtotal()).toBe(2000);
  });

  it('should add products with different ids separately', () => {
    const other = { ...mockProduct, id: 2 };
    service.add(mockProduct);
    service.add(other);
    expect(service.items().length).toBe(2);
    expect(service.totalItems()).toBe(2);
  });

  it('should update quantity', () => {
    service.add(mockProduct);
    service.updateQuantity(1, 5);
    expect(service.items()[0].quantity).toBe(5);
    expect(service.subtotal()).toBe(5000);
  });

  it('should remove item when quantity is 0', () => {
    service.add(mockProduct);
    service.updateQuantity(1, 0);
    expect(service.items().length).toBe(0);
  });

  it('should remove product', () => {
    service.add(mockProduct);
    service.remove(1);
    expect(service.items().length).toBe(0);
  });

  it('should clear all items', () => {
    service.add(mockProduct);
    service.add({ ...mockProduct, id: 2 });
    service.clear();
    expect(service.items().length).toBe(0);
  });
});
