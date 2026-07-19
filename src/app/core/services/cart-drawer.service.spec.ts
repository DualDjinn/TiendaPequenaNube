import { TestBed } from '@angular/core/testing';
import { CartDrawerService } from './cart-drawer.service';

describe('CartDrawerService', () => {
  let service: CartDrawerService;

  beforeEach(() => { service = TestBed.inject(CartDrawerService); });

  it('should be closed initially', () => expect(service.isOpen()).toBe(false));

  it('should open', () => { service.open(); expect(service.isOpen()).toBe(true); });

  it('should close', () => {
    service.open();
    service.close();
    expect(service.isOpen()).toBe(false);
  });
});
