import { Component, input, output, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../models/product';
import { Badge } from './badge';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, Badge],
  template: `
    <div class="bg-white rounded-2xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">

      <!-- Header estilo Instagram -->
      <div class="flex items-center gap-3 px-3 pt-3 pb-2">
        <span class="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
          [class]="linea() === 'Joyería' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'">
          {{ linea() === 'Joyería' ? '💎' : '🧶' }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-sm leading-tight truncate">{{ product().name }}</p>
          <p class="text-[0.7rem] text-stone/60 leading-tight">{{ product().category }}</p>
        </div>
      </div>

      <!-- Imagen clickable -->
      <a [routerLink]="['/producto', product().slug]" class="relative block aspect-square bg-stone/10 overflow-hidden">
        <img [ngSrc]="product().images[0]" [alt]="product().name" fill class="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        @if (product().isNew || product().isSale) {
          <div class="absolute top-2 right-2 flex flex-col gap-1">
            @if (product().isNew) {
              <app-badge color="#9e3fff">Nuevo</app-badge>
            }
            @if (product().isSale) {
              <app-badge color="#ff9a37">Oferta</app-badge>
            }
          </div>
        }
      </a>

      <!-- Action bar estilo Instagram -->
      <div class="flex items-center px-3 py-2 gap-2">
        <button (click)="toggleLike()" class="transition-transform active:scale-125 p-0.5" aria-label="Me gusta">
          @if (liked()) {
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3A3532" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          }
        </button>
        <span class="text-xs text-stone/60 font-medium min-w-[1.5rem]">{{ likesCount() }}</span>

        <button (click)="compartir()" class="p-0.5 transition-transform active:scale-125" aria-label="Compartir">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3A3532" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9Z"/></svg>
        </button>

        <button (click)="toggleSave()" class="ml-auto p-0.5 transition-transform active:scale-125" aria-label="Guardar">
          @if (saved()) {
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#9e3fff" stroke="#9e3fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3A3532" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          }
        </button>
      </div>

      <!-- Descripción -->
      <div class="px-3">
        <p class="text-sm leading-relaxed text-ink" [class.line-clamp-2]="!showFullDesc()">
          {{ product().description }}
        </p>
        @if (product().description.length > 100) {
          <button (click)="showFullDesc.set(!showFullDesc())" class="text-xs text-stone/50 hover:text-stone mt-0.5 transition-colors">
            {{ showFullDesc() ? 'ver menos' : 'ver más' }}
          </button>
        }
      </div>

      <!-- Precio -->
      <p class="px-3 mt-2 font-bold text-lg text-ink">\${{ product().price.toFixed(2) }}</p>

      <!-- CTA Lo quiero -->
      <div class="px-3 pb-3 mt-2">
        @if (product().stock > 0) {
          <button (click)="addToCart()" class="w-full bg-coral hover:bg-coral/90 text-white py-2.5 rounded-lg font-medium text-sm transition-colors">
            ¡Lo quiero!
          </button>
        } @else {
          <button disabled class="w-full bg-stone/20 text-stone/50 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed">Sin stock</button>
        }
      </div>
    </div>
  `,
  host: {
    'class': 'block h-full',
  },
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly quickView = output<Product>();

  private cartService = inject(CartService);

  protected readonly liked = signal(false);
  protected readonly saved = signal(false);
  protected readonly showFullDesc = signal(false);
  protected readonly likesCount = signal(Math.floor(Math.random() * 20) + 3);

  protected readonly linea = computed(() => this.product().productLine);

  protected toggleLike(): void {
    this.liked.update(v => !v);
    this.likesCount.update(c => c + (this.liked() ? 1 : -1));
  }

  protected toggleSave(): void {
    this.saved.update(v => !v);
  }

  protected compartir(): void {
    const url = `${location.origin}/producto/${this.product().slug}`;
    const texto = `Mira el producto que encontré!`;
    if (navigator.share) {
      navigator.share({ title: this.product().name, text: texto, url });
    } else {
      navigator.clipboard.writeText(`${texto} ${url}`);
    }
  }

  protected addToCart(): void {
    this.cartService.add(this.product());
    this.quickView.emit(this.product());
  }
}
