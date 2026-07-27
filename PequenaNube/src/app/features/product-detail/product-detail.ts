import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ProductCard } from '../../shared/ui/product-card';
import { QuantitySelector } from '../../shared/ui/quantity-selector';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgOptimizedImage, ProductCard, QuantitySelector, ScrollRevealDirective],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      @if (loading()) {
        <div class="text-center py-16">
          <p class="text-stone">Cargando...</p>
        </div>
      } @else if (!product()) {
        <div class="text-center py-16">
          <p class="text-stone">Producto no encontrado</p>
        </div>
      } @else {
        @let p = product()!;
        <div class="flex flex-col md:flex-row gap-8 mb-16" appScrollReveal>
          <div class="w-full md:w-1/2">
            <div class="relative aspect-square overflow-hidden rounded-lg bg-stone/10 group" (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
              <img [ngSrc]="p.images[currentIndex()]" [alt]="p.name" fill class="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              @if (p.images.length > 1) {
                <button type="button" (click)="prevImage()" class="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">‹</button>
                <button type="button" (click)="nextImage()" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">›</button>
                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  @for (img of p.images; track img; let i = $index) {
                    <div class="w-1.5 h-1.5 rounded-full transition-all" [class]="i === currentIndex() ? 'bg-white scale-125' : 'bg-white/50'"></div>
                  }
                </div>
              }
            </div>
          </div>
          <div class="w-full md:w-1/2 space-y-6">
            <span class="inline-block text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full" [class]="p.productLine === 'amigurumi' ? 'bg-sage/80 text-white' : 'bg-coral/80 text-white'">{{ p.productLine === 'amigurumi' ? 'Amigurumi' : 'Joyería' }}</span>
            <h1 class="font-heading text-3xl">{{ p.name }}</h1>
            <p class="text-coral text-2xl font-medium">\${{ p.price.toFixed(2) }}</p>
            <p class="text-stone leading-relaxed">{{ p.description }}</p>
            <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone">
              @if (p.productLine === 'jewelry') {
                <span>Material: {{ p.material }}</span>
                <span>Color: {{ p.color }}</span>
              }
              @if (p.productLine === 'amigurumi') {
                <span>Hilo: {{ p.yarnType }}</span>
                <span>Tamaño: {{ p.size }}</span>
              }
            </div>
            <p class="text-sm text-stone/60">Stock disponible: {{ p.stock }}</p>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <app-quantity-selector [value]="quantity()" (valueChange)="quantity.set($event)" [max]="available()" />
              @if (available() > 0) {
                <button (click)="addToCart()" class="w-full sm:flex-1 bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">Agregar al carrito</button>
              } @else {
                <button disabled class="flex-1 bg-stone/20 text-stone/50 px-6 py-3 rounded-lg font-medium cursor-not-allowed">Sin stock</button>
              }
            </div>
          </div>
        </div>

        @if (related().length > 0) {
          <section appScrollReveal>
            <h2 class="font-heading text-2xl mb-6">También te puede gustar</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              @for (p of related(); track p.id) {
                <app-product-card [product]="p" />
              }
            </div>
          </section>
        }
      }
    </div>
  `,
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  private readonly slug = signal<string | undefined>(undefined);
  protected readonly quantity = signal(1);
  protected readonly currentIndex = signal(0);
  private touchX = 0;

  protected readonly product = computed(() => {
    const s = this.slug();
    return s ? this.productService.getBySlug(s) : undefined;
  });

  protected readonly loading = computed(() => {
    const s = this.slug();
    return !!s && !this.product() && this.productService.loading();
  });

  ngOnInit(): void {
    this.productService.loadAll();
    this.route.paramMap.subscribe(params => {
      this.quantity.set(1);
      this.currentIndex.set(0);
      this.slug.set(params.get('slug') ?? undefined);
    });
  }

  protected readonly available = computed(() => {
    const p = this.product();
    return p ? this.cartService.availableStock(p) : 0;
  });

  protected readonly related = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.productService.products().filter(x => x.productLine === p.productLine && x.id !== p.id).slice(0, 4);
  });

  protected prevImage(): void {
    const p = this.product();
    if (p) this.currentIndex.update(i => i === 0 ? p.images.length - 1 : i - 1);
  }

  protected nextImage(): void {
    const p = this.product();
    if (p) this.currentIndex.update(i => i === p.images.length - 1 ? 0 : i + 1);
  }

  protected onTouchStart(e: TouchEvent): void {
    this.touchX = e.touches[0].clientX;
  }

  protected onTouchEnd(e: TouchEvent): void {
    const delta = e.changedTouches[0].clientX - this.touchX;
    if (delta > 50) this.prevImage();
    else if (delta < -50) this.nextImage();
  }

  protected addToCart(product?: Product): void {
    const p = product ?? this.product();
    if (p) this.cartService.add(p, this.quantity());
  }
}
