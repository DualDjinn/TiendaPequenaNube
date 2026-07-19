import { TestBed } from '@angular/core/testing';
import { AdminLineas } from './lineas';
import { LineaService } from '../../core/services/linea.service';
import { of } from 'rxjs';

describe('AdminLineas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminLineas,
        { provide: LineaService, useValue: { getAll: () => of([]), create: () => of({}), update: () => of({}), delete: () => of({}) } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(AdminLineas)).toBeTruthy());
});
