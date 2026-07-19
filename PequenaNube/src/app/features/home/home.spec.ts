import { TestBed } from '@angular/core/testing';
import { Home } from './home';
import { ProductService } from '../../core/services/product.service';
import { signal } from '@angular/core';
import { Product } from '../../shared/models/product';

const mockProducts: Product[] = [
  { id: 1, name: 'Anillo', slug: 'anillo', price: 100, images: [''], productLine: 'jewelry', category: 'Anillos', description: '', stock: 5 },
  { id: 2, name: 'Conejo', slug: 'conejo', price: 200, images: [''], productLine: 'amigurumi', category: 'Animales', description: '', stock: 3 },
];

describe('Home', () => {
  let component: Home;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Home,
        { provide: ProductService, useValue: { products: signal(mockProducts), loadAll: vi.fn() } },
      ],
    });
    component = TestBed.inject(Home);
  });

  it('should create', () => expect(component).toBeTruthy());
});
