import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../models/product';
import { Badge } from './badge';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, Badge],
  template: `
    <a [routerLink]="['/producto', product().slug]" class="group h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div class="relative aspect-square bg-stone/10 shrink-0">
        <img [ngSrc]="product().images[0]" [alt]="product().name" fill class="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        <span class="absolute top-2 left-2 inline-block text-[0.625rem] font-medium uppercase tracking-wider px-2 py-1 rounded-full" [class]="product().productLine === 'amigurumi' ? 'bg-sage/80 text-white' : 'bg-coral/80 text-white'">{{ product().productLine === 'amigurumi' ? 'Amigurumi' : 'Joyería' }}</span>
        @if (product().isNew || product().isSale) {
          <div class="absolute top-2 right-2 flex flex-col gap-1">
            @if (product().isNew) {
              <app-badge color="#F4A6A0">Nuevo</app-badge>
            }
            @if (product().isSale) {
              <app-badge color="#FFD36E">Oferta</app-badge>
            }
          </div>
        }
      </div>
      <div class="p-3 h-[6.875rem] flex flex-col overflow-hidden">
        <div class="flex-1 flex flex-col justify-between gap-1">
          <h3 class="font-heading text-[0.9375rem] font-semibold leading-tight min-h-[2.5em]">{{ product().name }}</h3>
          <span class="text-xs font-medium text-ink min-h-[1.25em]">\${{ product().price.toFixed(2) }}</span>
        </div>
        <div class="mt-1.5 flex flex-col sm:flex-row gap-2">
          @if (product().stock > 0) {
            <a [routerLink]="['/producto', product().slug]" (click)="$event.stopPropagation()" class="hidden sm:inline-block shrink-0 text-xs px-2 py-0.5 rounded border border-coral text-coral hover:bg-coral hover:text-white transition-colors font-medium self-start">
              ¡Lo quiero!
            </a>
            <button (click)="$event.preventDefault(); $event.stopPropagation(); quickView.emit(product())" class="sm:hidden w-full text-xs px-2 py-[0.3125rem] rounded border border-coral text-coral hover:bg-coral hover:text-white transition-colors font-medium" aria-label="Ver {{ product().name }}">
              ¡Lo quiero!
            </button>
          } @else {
            <span class="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-red-500 text-white font-medium self-start">Sin stock</span>
            <span class="sm:hidden w-full text-center text-xs px-2 py-[0.3125rem] rounded bg-red-500 text-white font-medium">Sin stock</span>
          }
        </div>
      </div>
    </a>
  `,
  host: {
    'class': 'block h-full',
  },
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly quickView = output<Product>();
}
