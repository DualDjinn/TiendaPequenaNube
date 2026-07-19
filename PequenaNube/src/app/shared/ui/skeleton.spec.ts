import { TestBed } from '@angular/core/testing';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [Skeleton] });
    const comp = TestBed.inject(Skeleton);
    expect(comp).toBeTruthy();
  });
});
