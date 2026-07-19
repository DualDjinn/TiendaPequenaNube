import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/ui/product-card';
import { QuickView } from '../../shared/ui/quick-view';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Skeleton } from '../../shared/ui/skeleton';
import { Product, ProductLine } from '../../shared/models/product';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCard, QuickView, ScrollRevealDirective, Skeleton],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="font-heading text-3xl mb-8">Catálogo</h1>

      <!-- Filtros -->
      <div class="space-y-4 mb-8">
        <div class="flex flex-wrap gap-2">
          @for (line of lineOptions; track line.value) {
            <button (click)="selectedLine.set(line.value); selectedCategory.set('Todas')" class="px-5 py-3 sm:py-2 text-sm rounded-full border transition-colors font-medium" [class.bg-ink]="selectedLine() === line.value" [class.text-white]="selectedLine() === line.value" [class.border-stone/30]="selectedLine() !== line.value" [class.hover:border-ink]="selectedLine() !== line.value">
              {{ line.label }}
            </button>
          }
        </div>
        @if (selectedLine() !== 'all') {
          <div class="flex flex-wrap gap-2">
            @for (cat of categories(); track $index) {
              <button (click)="selectedCategory.set(cat)" class="px-4 py-3 sm:py-2 text-sm rounded-full border transition-colors" [class.bg-ink]="selectedCategory() === cat" [class.text-white]="selectedCategory() === cat" [class.border-stone/30]="selectedCategory() !== cat" [class.hover:border-ink]="selectedCategory() !== cat">
                {{ cat }}
              </button>
            }
          </div>
        }
        <div class="flex items-center gap-2">
          <label class="text-sm text-stone">Ordenar por:</label>
          <select (change)="onSortChange($event)" class="px-3 py-2 border border-stone/30 rounded-lg text-sm bg-white focus:outline-none focus:border-coral">
            <option value="new">Más nuevos</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
            <div class="space-y-3">
              <app-skeleton height="100%" class="aspect-square" />
              <app-skeleton width="75%" height="1rem" />
              <app-skeleton width="50%" height="0.875rem" />
            </div>
          }
        </div>
      <!-- Error -->
      } @else if (error()) {
        <div class="text-center py-16">
          <p class="text-stone mb-4">{{ error() }}</p>
          <button (click)="retry()" class="bg-coral text-white px-6 py-2 rounded-lg text-sm font-medium">Reintentar</button>
        </div>
      <!-- Empty -->
      } @else if (filteredProducts().length === 0) {
        <div class="text-center py-16">
          <p class="text-lg text-stone mb-4">No hay nada por aquí con esos filtros</p>
          <button (click)="selectedLine.set('all'); selectedCategory.set('Todas')" class="bg-coral text-white px-6 py-2 rounded-lg text-sm font-medium">Mostrar todo</button>
        </div>
      <!-- Grid -->
      } @else {
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" appScrollReveal>
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product" (quickView)="quickViewProduct.set($event)" />
          }
        </div>
      }
    </div>

    @if (quickViewProduct(); as p) {
      <app-quick-view [product]="p" (close)="quickViewProduct.set(undefined)" />
    }
  `,
})
export class Catalog implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  protected readonly loading = this.productService.loading;
  protected readonly quickViewProduct = signal<Product | undefined>(undefined);
  protected readonly error = this.productService.error;
  protected readonly selectedLine = signal<'all' | ProductLine>('all');
  protected readonly selectedCategory = signal('Todas');
  protected readonly sortBy = signal('new');

  protected readonly lineOptions = [
    { value: 'all' as const, label: 'Todo' },
    { value: 'amigurumi' as const, label: 'Amigurumis' },
    { value: 'jewelry' as const, label: 'Joyería' },
  ];

  protected readonly categories = computed(() => {
    const line = this.selectedLine();
    if (line === 'amigurumi') return ['Todas', 'Animales', 'Personajes', 'Llaveros', 'Decoración'];
    if (line === 'jewelry') return ['Todas', 'Anillos', 'Aros', 'Collares', 'Pulseras'];
    return [];
  });

  protected readonly filteredProducts = computed(() => {
    let products = this.productService.products();
    const line = this.selectedLine();
    if (line !== 'all') {
      products = products.filter(p => p.productLine === line);
    }
    const category = this.selectedCategory();
    if (category !== 'Todas') {
      products = products.filter(p => p.category === category);
    }
    const sort = this.sortBy();
    switch (sort) {
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
      default: return products;
    }
  });

  ngOnInit(): void {
    this.productService.loadAll();
    this.route.queryParams.subscribe(params => {
      if (params['linea'] === 'amigurumi' || params['linea'] === 'jewelry') {
        this.selectedLine.set(params['linea']);
      }
      if (params['categoria']) {
        const categories = this.categories();
        const cat = categories.find(c => c.toLowerCase() === params['categoria']);
        if (cat) this.selectedCategory.set(cat);
      }
    });
  }

  protected onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy.set(target.value);
  }

  protected retry(): void {
    this.productService.retry();
  }
}
