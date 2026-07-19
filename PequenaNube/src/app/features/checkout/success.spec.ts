import { TestBed } from '@angular/core/testing';
import { CheckoutSuccess } from './success';
import { CartService } from '../../core/services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

describe('CheckoutSuccess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutSuccess,
        provideHttpClient(),
        { provide: CartService, useValue: { clear: vi.fn() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: { get: () => '123' } } } },
        { provide: Router, useValue: { navigateByUrl: vi.fn() } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(CheckoutSuccess)).toBeTruthy());
});
