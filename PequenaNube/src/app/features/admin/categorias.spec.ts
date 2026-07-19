import { TestBed } from '@angular/core/testing';
import { AdminCategorias } from './categorias';
import { CategoriaService } from '../../core/services/categoria.service';
import { LineaService } from '../../core/services/linea.service';
import { of } from 'rxjs';

describe('AdminCategorias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminCategorias,
        { provide: CategoriaService, useValue: { getByLinea: () => of([]), create: () => of({}), update: () => of({}), delete: () => of({}) } },
        { provide: LineaService, useValue: { getAll: () => of([]) } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(AdminCategorias)).toBeTruthy());
});
