import { TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { Product } from '../models/product';

const mockProduct: Product = {
  id: 1, name: 'Test', slug: 'test', price: 100, description: 'Desc',
  images: ['img.jpg'], stock: 5, productLine: 'jewelry', category: 'Anillos',
  material: 'Metal', color: 'Dorado', isNew: true, isSale: false,
};

describe('ProductCard', () => {
  it('should create with product input', () => {
    TestBed.configureTestingModule({ providers: [ProductCard] });
    const card = TestBed.inject(ProductCard);
    expect(card).toBeTruthy();
  });
});
