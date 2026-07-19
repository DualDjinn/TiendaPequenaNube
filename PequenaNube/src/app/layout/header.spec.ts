import { TestBed } from '@angular/core/testing';
import { Header } from './header';
import { CartService } from '../core/services/cart.service';
import { CartDrawerService } from '../core/services/cart-drawer.service';
import { signal } from '@angular/core';

describe('Header', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Header,
        { provide: CartService, useValue: { totalItems: signal(0) } },
        { provide: CartDrawerService, useValue: { open: vi.fn(), close: vi.fn() } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(Header)).toBeTruthy());
});
