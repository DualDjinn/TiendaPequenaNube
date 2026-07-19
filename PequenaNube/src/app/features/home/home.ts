import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/ui/product-card';
import { QuickView } from '../../shared/ui/quick-view';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Product, ProductLine } from '../../shared/models/product';

interface CategoryDef {
  name: string;
  slug: string;
  line: ProductLine;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ReactiveFormsModule, ProductCard, QuickView, ScrollRevealDirective],
  template: `
    <!-- Hero -->
    <section class="relative min-h-[17rem] flex items-center overflow-hidden">
      <img ngSrc="images/backGroundWeb.png" alt="" fill class="object-cover" priority sizes="100vw" />
      <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(46,42,39,0.75) 0%, rgba(46,42,39,0.35) 45%, transparent 75%)"></div>
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div class="flex justify-center">
            <img ngSrc="images/logo.png" alt="Pequeña Nube" width="200" height="161" priority class="w-64 md:w-72 h-auto" />
          </div>
          <div class="space-y-5 text-center md:text-left">
            <h1 class="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_70%),_0_0_0_1px_rgb(0_0_0_/_30%)]">Artesanía que abraza</h1>
            <div class="relative">
              <p class="text-lg md:text-xl text-white/80 [text-shadow:_0_1px_4px_rgb(0_0_0_/_70%)]">Amigurumis tejidos a crochet y joyería de fantasía, hechos a mano con amor</p>
              <p class="text-lg md:text-xl absolute inset-0 animate-rainbow-shine" aria-hidden="true">Amigurumis tejidos a crochet y joyería de fantasía, hechos a mano con amor</p>
            </div>
            <a routerLink="/catalogo" class="block sm:inline-block w-full sm:w-auto bg-coral hover:bg-coral/90 text-white px-8 py-3 rounded-lg font-medium border-2 border-white/30 transition-colors">Elegí tu próximo favorito</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías - Amigurumis -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" appScrollReveal>
      <h2 class="font-heading text-3xl text-center mb-2">Amigurumis</h2>
      <p class="text-stone text-center mb-10">Muñecos y figuras tejidas a crochet con todo el cariño</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @for (cat of amigurumiDefs; track cat.slug; let first = $first) {
          <a [routerLink]="['/catalogo']" [queryParams]="{linea: 'amigurumi', categoria: cat.slug}" class="group relative aspect-square overflow-hidden rounded-lg">
            <img [ngSrc]="carouselImage(cat.slug)" [alt]="cat.name" fill class="object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1" sizes="25vw" [priority]="first" />
            <div class="absolute inset-0 bg-black/20 flex items-end p-4">
              <span class="text-white font-heading text-lg font-semibold">{{ cat.name }}</span>
            </div>
            @if (productCount(cat.slug) > 1) {
              <div class="absolute bottom-2 right-2 flex gap-1">
                @for (n of dots(productCount(cat.slug)); track n) {
                  <span class="w-1.5 h-1.5 rounded-full" [class.bg-white]="n === carouselIndex()[cat.slug] % productCount(cat.slug)" [class.bg-white/40]="n !== carouselIndex()[cat.slug] % productCount(cat.slug)"></span>
                }
              </div>
            }
          </a>
        }
      </div>
    </section>

    <!-- Categorías - Joyería -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" appScrollReveal>
      <h2 class="font-heading text-3xl text-center mb-2">Joyería</h2>
      <p class="text-stone text-center mb-10">Bijouterie delicada y moderna para acompañar tu estilo</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @for (cat of jewelryDefs; track cat.slug) {
          <a [routerLink]="['/catalogo']" [queryParams]="{linea: 'jewelry', categoria: cat.slug}" class="group relative aspect-square overflow-hidden rounded-lg">
            <img [ngSrc]="carouselImage(cat.slug)" [alt]="cat.name" fill class="object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1" sizes="25vw" />
            <div class="absolute inset-0 bg-black/20 flex items-end p-4">
              <span class="text-white font-heading text-lg font-semibold">{{ cat.name }}</span>
            </div>
            @if (productCount(cat.slug) > 1) {
              <div class="absolute bottom-2 right-2 flex gap-1">
                @for (n of dots(productCount(cat.slug)); track n) {
                  <span class="w-1.5 h-1.5 rounded-full" [class.bg-white]="n === carouselIndex()[cat.slug] % productCount(cat.slug)" [class.bg-white/40]="n !== carouselIndex()[cat.slug] % productCount(cat.slug)"></span>
                }
              </div>
            }
          </a>
        }
      </div>
    </section>

    <!-- Productos destacados -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" appScrollReveal>
      <h2 class="font-heading text-3xl text-center mb-12">Lo nuevo</h2>
      @if (loading()) {
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (_ of [1,2,3,4]; track $index) {
            <div class="animate-pulse space-y-3">
              <div class="aspect-square bg-stone/20 rounded-lg"></div>
              <div class="h-4 bg-stone/20 rounded w-3/4"></div>
              <div class="h-3 bg-stone/20 rounded w-1/2"></div>
            </div>
          }
        </div>
      } @else {
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (product of featured(); track product.id) {
            <app-product-card [product]="product" (quickView)="quickViewProduct.set($event)" />
          }
        </div>
      }
    </section>

    <!-- Sobre Pnube -->
    <section id="sobre-pnube" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" appScrollReveal>
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="w-full md:w-1/2">
          <img ngSrc="https://placehold.co/600x500/f5f0eb/2e2a27?text=Sobre+Pequeña+Nube" alt="Sobre Pequeña Nube" width="600" height="500" class="rounded-lg object-cover w-full" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div class="w-full md:w-1/2 space-y-6">
          <h2 class="font-heading text-3xl">Sobre Pequeña Nube</h2>
          <p class="text-stone leading-relaxed">Pequeña Nube nace del amor por crear con las manos. Del tejido a crochet puntada por puntada, al diseño de bijouterie delicada. Cada pieza, ya sea un amigurumi suave o un anillo brillante, está hecha para acompañarte con calidez y estilo.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 border border-stone/20 rounded-lg text-center">
              <span class="text-2xl mb-2 block">✧</span>
              <h4 class="font-medium text-sm">Hecho a mano</h4>
            </div>
            <div class="p-4 border border-stone/20 rounded-lg text-center">
              <span class="text-2xl mb-2 block">✦</span>
              <h4 class="font-medium text-sm">Materiales de calidad</h4>
            </div>
            <div class="p-4 border border-stone/20 rounded-lg text-center">
              <span class="text-2xl mb-2 block">♡</span>
              <h4 class="font-medium text-sm">Envío cuidado</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="bg-coral/20 py-16" appScrollReveal>
      <div class="max-w-xl mx-auto px-4 text-center">
        <h2 class="font-heading text-3xl mb-3">Enterate de las novedades</h2>
        <p class="text-stone mb-6">Suscribite para recibir colecciones exclusivas y ofertas especiales.</p>
        <form (ngSubmit)="subscribe()" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" placeholder="tu@email.com" [formControl]="emailControl" class="flex-1 px-4 py-3 rounded-lg border border-stone/30 bg-white focus:outline-none focus:border-coral transition-colors text-sm" [class.border-red-400]="emailControl.invalid && emailControl.touched" />
          <button type="submit" class="bg-ink hover:bg-ink/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap" [disabled]="subscribing()">{{ subscribing() ? 'Enviando...' : 'Sumarme' }}</button>
        </form>
        @if (emailControl.invalid && emailControl.touched) {
          <p class="text-red-500 text-sm mt-2">Ingresá un email válido</p>
        }
        @if (subscribed()) {
          <p class="text-green-600 text-sm mt-2">¡Listo, ya estás en la lista! 💛</p>
        }
      </div>
    </section>

    @if (quickViewProduct(); as p) {
      <app-quick-view [product]="p" (close)="quickViewProduct.set(undefined)" />
    }
  `,
})
export class Home implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  protected readonly quickViewProduct = signal<Product | undefined>(undefined);

  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  protected readonly subscribing = signal(false);
  protected readonly subscribed = signal(false);
  protected readonly loading = this.productService.loading;
  protected readonly featured = this.productService.products;
  protected readonly carouselIndex = signal<Record<string, number>>({});

  protected readonly amigurumiDefs: CategoryDef[] = [
    { name: 'Animales', slug: 'animales', line: 'amigurumi' },
    { name: 'Personajes', slug: 'personajes', line: 'amigurumi' },
    { name: 'Llaveros', slug: 'llaveros', line: 'amigurumi' },
    { name: 'Decoración', slug: 'decoracion', line: 'amigurumi' },
  ];

  protected readonly jewelryDefs: CategoryDef[] = [
    { name: 'Anillos', slug: 'anillos', line: 'jewelry' },
    { name: 'Aros', slug: 'aros', line: 'jewelry' },
    { name: 'Collares', slug: 'collares', line: 'jewelry' },
    { name: 'Pulseras', slug: 'pulseras', line: 'jewelry' },
  ];

  protected readonly productsByCategory = computed(() => {
    const products = this.productService.products();
    const map: Record<string, Product[]> = {};
    for (const def of [...this.amigurumiDefs, ...this.jewelryDefs]) {
      map[def.slug] = products.filter(p => p.productLine === def.line && p.category === def.name);
    }
    return map;
  });

  protected carouselImage(catSlug: string): string {
    const products = this.productsByCategory()[catSlug] || [];
    if (products.length === 0) return 'https://placehold.co/400x400/f5f0eb/2e2a27?text=Pronto';
    const idx = this.carouselIndex()[catSlug] ?? 0;
    return products[idx % products.length].images[0];
  }

  protected dots(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  protected productCount(catSlug: string): number {
    return (this.productsByCategory()[catSlug] || []).length;
  }

  ngOnInit(): void {
    this.productService.loadAll();
    const cats = [...this.amigurumiDefs, ...this.jewelryDefs].map(c => c.slug);
    this.intervalId = setInterval(() => {
      this.carouselIndex.update(idx => {
        const next = { ...idx };
        for (const slug of cats) {
          const count = this.productCount(slug);
          if (count > 0) next[slug] = ((idx[slug] ?? 0) + 1) % count;
        }
        return next;
      });
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  protected subscribe(): void {
    if (this.emailControl.invalid) return;
    this.subscribing.set(true);
    setTimeout(() => {
      this.subscribing.set(false);
      this.subscribed.set(true);
      this.emailControl.reset();
    }, 1000);
  }
}
