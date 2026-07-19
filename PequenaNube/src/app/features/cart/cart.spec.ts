import { TestBed } from '@angular/core/testing';
import { Cart } from './cart';
import { CartService } from '../../core/services/cart.service';
import { VentaService } from '../../core/services/venta.service';
import { CartDrawerService } from '../../core/services/cart-drawer.service';
import { signal } from '@angular/core';

describe('Cart', () => {
  let component: Cart;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Cart,
        { provide: CartService, useValue: { items: signal([]), totalItems: signal(0), subtotal: signal(0), remove: vi.fn(), clear: vi.fn() } },
        { provide: VentaService, useValue: { checkout: vi.fn(() => ({ subscribe: vi.fn() })) } },
        { provide: CartDrawerService, useValue: { isOpen: signal(false), close: vi.fn() } },
      ],
    });
    component = TestBed.inject(Cart);
  });

  it('should create', () => expect(component).toBeTruthy());
});
