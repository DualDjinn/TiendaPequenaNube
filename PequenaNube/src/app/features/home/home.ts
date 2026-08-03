import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/ui/product-card';
import { QuickView } from '../../shared/ui/quick-view';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Product } from '../../shared/models/product';

const BRAND_GRADIENT = 'linear-gradient(120deg, #FF9E8B 0%, #C9A9E9 100%)';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ReactiveFormsModule, ProductCard, QuickView, ScrollRevealDirective],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <img ngSrc="images/backGroundWeb.png" alt="" fill priority class="object-cover" sizes="100vw" />
      <div class="absolute inset-0" style="background: linear-gradient(100deg, rgba(255,248,244,0.92) 0%, rgba(255,248,244,0.65) 40%, rgba(255,248,244,0.15) 70%, rgba(255,248,244,0.35) 100%)"></div>
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div class="space-y-5 text-center md:text-left">
            <span class="inline-block px-4 py-1.5 rounded-full bg-white/80 text-coralDark text-sm font-semibold shadow-warm">✨ Hecho a mano, con amor</span>
            <h1 class="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-text leading-tight">Cositas tiernas para <span class="bg-gradient-to-r from-coral to-lilac bg-clip-text text-transparent">abrazar y brillar</span></h1>
            <p class="text-lg text-textSoft">Amigurumis tejidos a crochet y joyería de fantasía, pensados para acompañarte todos los días.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a routerLink="/catalogo" [queryParams]="{linea: 'amigurumi'}" class="btn-pill px-8 py-3 font-semibold text-white transition-transform active:scale-95" [style.background]="BRAND_GRADIENT">Ver Amigurumis 🧸</a>
              <a routerLink="/catalogo" [queryParams]="{linea: 'jewelry'}" class="btn-pill px-8 py-3 font-semibold bg-white/80 text-lilacDark shadow-warm hover:bg-white transition-colors">Ver Joyería 💎</a>
            </div>
          </div>
          <div class="hidden md:flex flex-col items-center justify-center gap-4">
            <div class="blob w-56 h-56 bg-coral/30"></div>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-warm text-sm font-medium">🔥 +20 me gusta</div>
              <div class="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-warm text-sm font-medium">💬 Comentarios amorosos</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Amigurumis -->
    <section class="bg-bgSoft py-16" appScrollReveal>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <span class="inline-block px-4 py-1.5 rounded-full bg-coral/20 text-coralDark text-sm font-semibold">🧸 Amigurumis</span>
          <h2 class="font-heading text-3xl mt-3">Tejidos a crochet con amor</h2>
          <p class="text-textSoft mt-2">Muñecos y figuras suaves hechas puntada por puntada</p>
        </div>
        @if (loading()) {
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @for (_ of [1,2,3,4]; track $index) {
              <div class="animate-pulse space-y-3">
                <div class="aspect-square bg-textSoft/15 rounded-[1.75rem]"></div>
                <div class="h-4 bg-textSoft/15 rounded w-3/4"></div>
                <div class="h-3 bg-textSoft/15 rounded w-1/2"></div>
              </div>
            }
          </div>
        } @else {
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @for (product of amigurumiProducts(); track product.id) {
              <app-product-card [product]="product" (quickView)="quickViewProduct.set($event)" />
            }
          </div>
        }
      </div>
    </section>

    <!-- Joyería -->
    <section class="bg-bg py-16" appScrollReveal>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <span class="inline-block px-4 py-1.5 rounded-full bg-lilac/25 text-lilacDark text-sm font-semibold">💎 Joyería</span>
          <h2 class="font-heading text-3xl mt-3">Brillo para todos los días</h2>
          <p class="text-textSoft mt-2">Bijouterie delicada y moderna para acompañar tu estilo</p>
        </div>
        @if (loading()) {
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @for (_ of [1,2,3,4]; track $index) {
              <div class="animate-pulse space-y-3">
                <div class="aspect-square bg-textSoft/15 rounded-[1.75rem]"></div>
                <div class="h-4 bg-textSoft/15 rounded w-3/4"></div>
                <div class="h-3 bg-textSoft/15 rounded w-1/2"></div>
              </div>
            }
          </div>
        } @else {
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @for (product of jewelryProducts(); track product.id) {
              <app-product-card [product]="product" (quickView)="quickViewProduct.set($event)" />
            }
          </div>
        }
      </div>
    </section>

    <!-- Franja de confianza -->
    <section class="py-16" appScrollReveal>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-white rounded-[1.75rem] p-6 text-center shadow-warm">
          <span class="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center text-xl text-white" [style.background]="BRAND_GRADIENT">🧶</span>
          <h3 class="font-heading text-lg">Hecho a mano</h3>
          <p class="text-sm text-textSoft mt-1">Cada pieza es única</p>
        </div>
        <div class="bg-white rounded-[1.75rem] p-6 text-center shadow-warm">
          <span class="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center text-xl text-white" [style.background]="BRAND_GRADIENT">✨</span>
          <h3 class="font-heading text-lg">Materiales de calidad</h3>
          <p class="text-sm text-textSoft mt-1">Pensados para durar</p>
        </div>
        <div class="bg-white rounded-[1.75rem] p-6 text-center shadow-warm">
          <span class="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center text-xl text-white" [style.background]="BRAND_GRADIENT">📦</span>
          <h3 class="font-heading text-lg">Envío cuidado</h3>
          <p class="text-sm text-textSoft mt-1">Llega seguro a tu casa</p>
        </div>
      </div>
    </section>

    <!-- Sobre Pnube -->
    <section id="sobre-pnube" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" appScrollReveal>
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="w-full md:w-1/2">
          <img ngSrc="https://placehold.co/600x500/f5f0eb/2e2a27?text=Sobre+Pequeña+Nube" alt="Sobre Pequeña Nube" width="600" height="500" class="rounded-[1.75rem] object-cover w-full shadow-warm" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div class="w-full md:w-1/2 space-y-6">
          <h2 class="font-heading text-3xl">Sobre Pequeña Nube</h2>
          <p class="text-textSoft leading-relaxed">Pequeña Nube nace del amor por crear con las manos. Del tejido a crochet puntada por puntada, al diseño de bijouterie delicada. Cada pieza, ya sea un amigurumi suave o un anillo brillante, está hecha para acompañarte con calidez y estilo.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 bg-white rounded-[1.5rem] shadow-warm text-center">
              <span class="text-2xl mb-2 block">✧</span>
              <h3 class="font-medium text-sm">Hecho a mano</h3>
            </div>
            <div class="p-4 bg-white rounded-[1.5rem] shadow-warm text-center">
              <span class="text-2xl mb-2 block">✦</span>
              <h3 class="font-medium text-sm">Materiales de calidad</h3>
            </div>
            <div class="p-4 bg-white rounded-[1.5rem] shadow-warm text-center">
              <span class="text-2xl mb-2 block">♡</span>
              <h3 class="font-medium text-sm">Envío cuidado</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="px-4 sm:px-6 lg:px-8 py-16" appScrollReveal>
      <div class="max-w-4xl mx-auto rounded-[2rem] p-10 md:p-14 text-center text-white" [style.background]="BRAND_GRADIENT">
        <h2 class="font-heading text-3xl mb-3">Enterate de las novedades</h2>
        <p class="text-white/90 mb-6">Suscribite para recibir colecciones exclusivas y ofertas especiales.</p>
        <form (ngSubmit)="subscribe()" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" placeholder="tu@email.com" [formControl]="emailControl" class="btn-pill flex-1 px-5 py-3 bg-white text-text placeholder:text-textSoft/60 focus:outline-none text-sm" [class.border-2]="emailControl.invalid && emailControl.touched" [class.border-red-400]="emailControl.invalid && emailControl.touched" />
          <button type="submit" class="btn-pill px-6 py-3 bg-plum hover:bg-plum/90 text-white font-semibold text-sm transition-colors whitespace-nowrap" [disabled]="subscribing()">{{ subscribing() ? 'Enviando...' : 'Sumarme' }}</button>
        </form>
        @if (emailControl.invalid && emailControl.touched) {
          <p class="text-white text-sm mt-2">Ingresá un email válido</p>
        }
        @if (subscribed()) {
          <p class="text-white text-sm mt-2">¡Listo, ya estás en la lista! 💛</p>
        }
      </div>
    </section>

    @if (quickViewProduct(); as p) {
      <app-quick-view [product]="p" (close)="quickViewProduct.set(undefined)" />
    }
  `,
})
export class Home implements OnInit {
  private productService = inject(ProductService);

  protected readonly BRAND_GRADIENT = BRAND_GRADIENT;
  protected readonly quickViewProduct = signal<Product | undefined>(undefined);

  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  protected readonly subscribing = signal(false);
  protected readonly subscribed = signal(false);
  protected readonly loading = this.productService.loading;
  protected readonly amigurumiProducts = computed(() =>
    this.productService.products().filter(p => p.productLine === 'amigurumi').slice(0, 4));
  protected readonly jewelryProducts = computed(() =>
    this.productService.products().filter(p => p.productLine === 'jewelry').slice(0, 4));

  ngOnInit(): void {
    this.productService.loadAll();
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
