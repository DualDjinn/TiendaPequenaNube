import { TestBed } from '@angular/core/testing';
import { QuantitySelector } from './quantity-selector';

describe('QuantitySelector', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [QuantitySelector] });
    expect(TestBed.inject(QuantitySelector)).toBeTruthy();
  });
});
