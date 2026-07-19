import { TestBed } from '@angular/core/testing';
import { ProductForm } from './product-form';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { LineaService } from '../../core/services/linea.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('ProductForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductForm,
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { paramMap: signal({ get: () => null }) } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: ProductService, useValue: { products: signal([]), loadAll: vi.fn() } },
        { provide: CategoriaService, useValue: { getByLinea: () => of([]) } },
        { provide: LineaService, useValue: { getAll: () => of([]) } },
      ],
    });
  });

  it('should create', () => expect(TestBed.inject(ProductForm)).toBeTruthy());
});
