import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../../shared/models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/products';

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private mapProduct(p: any): Product {
    const lineMap: Record<string, string> = {
      'joyería': 'jewelry',
      'amigurumi': 'amigurumi',
    };
    return {
      ...p,
      productLine: lineMap[(p.productLine ?? '').toLowerCase()] ?? p.productLine,
      images: typeof p.images === 'string' ? [p.images] : p.images,
    };
  }

  private unmapProduct(p: Product): any {
    return { ...p, images: p.images.join(',') };
  }

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(err => {
          this.error.set('Error al cargar productos. Intentalo de nuevo.');
          return of([]);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe(products => this.products.set(products.map(p => this.mapProduct(p))));
  }

  getById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  getBySlug(slug: string): Product | undefined {
    return this.products().find(p => p.slug === slug);
  }

  getByCategory(category: string): Product[] {
    return this.products().filter(p => p.category === category);
  }

  create(product: Omit<Product, 'id'>): void {
    this.loading.set(true);
    this.http.post<Product>(this.apiUrl, this.unmapProduct(product as Product))
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(created => {
        this.products.update(list => [...list, this.mapProduct(created)]);
      });
  }

  update(id: number, product: Product): void {
    this.http.put<Product>(`${this.apiUrl}/${id}`, this.unmapProduct(product))
      .subscribe(updated => {
        this.products.update(list => list.map(p => p.id === id ? this.mapProduct(updated) : p));
      });
  }

  remove(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.products.update(list => list.filter(p => p.id !== id));
      });
  }

  softDelete(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.products.update(list => list.filter(p => p.id !== id));
      });
  }

  retry(): void {
    this.loadAll();
  }
}
