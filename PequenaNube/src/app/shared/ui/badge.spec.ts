import { TestBed } from '@angular/core/testing';
import { Badge } from './badge';

describe('Badge', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [Badge] });
    const comp = TestBed.inject(Badge);
    expect(comp).toBeTruthy();
  });
});
