import { Component, input, output, signal, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../models/product';
import { QuantitySelector } from './quantity-selector';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [NgOptimizedImage, QuantitySelector],
  template: `
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center" (click)="close.emit()">
      <div class="absolute inset-0 bg-black/30" aria-hidden="true"></div>
      <div class="relative w-full sm:max-w-lg bg-cream rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-slide-up" (click)="$event.stopPropagation()">
        <button (click)="close.emit()" class="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-ink hover:text-coral transition-colors" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        @let p = product();

        <div class="relative aspect-square bg-stone/10">
          <img [ngSrc]="p.images[imageIndex()]" [alt]="p.name" fill class="object-cover" sizes="(max-width: 640px) 100vw, 512px" priority />
          @if (p.images.length > 1) {
            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              @for (img of p.images; track img; let i = $index) {
                <button (click)="imageIndex.set(i)" class="w-2 h-2 rounded-full transition-colors" [class.bg-white]="i === imageIndex()" [class.bg-white/40]="i !== imageIndex()" aria-label="Imagen {{ i + 1 }}"></button>
              }
            </div>
          }
        </div>

        <div class="p-5 space-y-4">
          <div class="flex items-start justify-between gap-3">
            <h2 class="font-heading text-xl font-semibold">{{ p.name }}</h2>
            <span class="text-coral text-lg font-medium shrink-0">\${{ p.price.toFixed(2) }}</span>
          </div>

          <p class="text-stone text-sm leading-relaxed">{{ p.description }}</p>

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

          <div class="flex items-center gap-3">
            <span class="text-sm text-stone">Stock: {{ p.stock }}</span>
          </div>

          <div class="flex items-center gap-3">
            @if (p.stock > 0) {
              <app-quantity-selector [value]="quantity()" (valueChange)="quantity.set($event)" [max]="p.stock" />
              <button (click)="addToCart()" class="flex-1 bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors">Agregar al carrito</button>
            } @else {
              <button disabled class="flex-1 bg-stone/20 text-stone/50 px-6 py-3 rounded-lg font-medium text-sm cursor-not-allowed">Sin stock</button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slideUp 0.3s ease-out;
    }
    @media (min-width: 640px) {
      .animate-slide-up {
        animation: none;
      }
    }
  `],
})
export class QuickView {
  readonly product = input.required<Product>();
  readonly close = output<void>();

  protected readonly imageIndex = signal(0);
  protected readonly quantity = signal(1);
  private cartService = inject(CartService);

  protected addToCart(): void {
    this.cartService.add(this.product(), this.quantity());
    this.close.emit();
  }
}
