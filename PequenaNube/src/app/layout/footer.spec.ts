import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [Footer] });
    expect(TestBed.inject(Footer)).toBeTruthy();
  });
});
