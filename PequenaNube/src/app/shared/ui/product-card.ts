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
    <div class="bg-white rounded-[1.75rem] shadow-md overflow-hidden card-lift">

      <!-- Header estilo Instagram -->
      <div class="flex items-center gap-3 px-3 pt-3 pb-2">
        <div class="relative w-10 h-10 shrink-0 rounded-full avatar-ring"
             [style.background]="lineConfig().gradient">
          <div class="absolute inset-[2px] rounded-full flex items-center justify-center text-xl avatar-inner"
               [class]="lineConfig().bg + ' ' + lineConfig().text">
            {{ lineConfig().icon }}
          </div>
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-sm leading-tight truncate">{{ product().name }}</p>
          <p class="text-[0.7rem] text-textSoft/70 leading-tight">{{ product().category }}</p>
        </div>
      </div>

      <!-- Imagen clickable -->
      <a [routerLink]="['/producto', product().slug]" class="relative block aspect-square bg-textSoft/10 overflow-hidden">
        <img [ngSrc]="product().images[0]" [alt]="product().name" fill class="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        @if (product().isNew || product().isSale) {
          <div class="absolute top-2 right-2 flex flex-col gap-1">
            @if (product().isNew) {
              <app-badge [color]="lineConfig().badgeColor">Nuevo</app-badge>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A3A50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          }
        </button>
        <span class="text-xs text-textSoft/70 font-medium min-w-[1.5rem]">{{ likesCount() }}</span>

        <button (click)="compartir()" class="p-0.5 transition-transform active:scale-125" aria-label="Compartir">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A3A50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9Z"/></svg>
        </button>

        <button (click)="toggleSave()" class="ml-auto p-0.5 transition-transform active:scale-125" aria-label="Guardar">
          @if (saved()) {
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" [attr.fill]="lineConfig().badgeColor" [attr.stroke]="lineConfig().badgeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A3A50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          }
        </button>
      </div>

      <!-- Descripción -->
      <div class="px-3">
        <p class="text-sm leading-relaxed text-text" [class.line-clamp-2]="!showFullDesc()">
          {{ product().description }}
        </p>
        @if (product().description.length > 100) {
          <button (click)="showFullDesc.set(!showFullDesc())" class="text-xs text-textSoft/60 hover:text-textSoft mt-0.5 transition-colors">
            {{ showFullDesc() ? 'ver menos' : 'ver más' }}
          </button>
        }
      </div>

      <!-- Precio -->
      <p class="px-3 mt-2 font-bold text-lg text-text">\${{ product().price.toFixed(2) }}</p>

      <!-- CTA Lo quiero -->
      <div class="px-3 pb-3 mt-2">
        @if (product().stock > 0) {
          <button (click)="addToCart()" [class]="'w-full text-white py-2.5 rounded-full font-medium text-sm transition-colors ' + lineConfig().cta + ' ' + lineConfig().ctaHover">
            ¡Lo quiero!
          </button>
        } @else {
          <button disabled class="w-full bg-textSoft/20 text-textSoft/50 py-2.5 rounded-full font-medium text-sm cursor-not-allowed">Sin stock</button>
        }
      </div>
    </div>
  `,
  styles: [`
    .avatar-ring {
      animation: spin-gradient 4s linear infinite;
    }
    .avatar-inner {
      animation: counter-spin 4s linear infinite;
    }
    @keyframes spin-gradient {
      to { transform: rotate(360deg); }
    }
    @keyframes counter-spin {
      to { transform: rotate(-360deg); }
    }
  `],
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

  private readonly lineConfigs: Record<string, { gradient: string; icon: string; bg: string; text: string; cta: string; ctaHover: string; badgeColor: string }> = {
    'Joyería': {
        gradient: 'conic-gradient(from 0deg, #B994E8, #F0E5FC, #FFF8F4, #B994E8)',
        icon: '💎',
        bg: 'bg-lilacBg',
        text: 'text-lilacDark',
        cta: 'bg-lilacDark',
        ctaHover: 'hover:bg-lilac',
        badgeColor: '#9C6FD8',
      },
      'Amigurumi': {
        gradient: 'conic-gradient(from 0deg, #FF9E8B, #FFE7E1, #FFF8F4, #FF9E8B)',
        icon: '🧶',
      bg: 'bg-coralBg',
      text: 'text-coralDark',
      cta: 'bg-coralDark',
      ctaHover: 'hover:bg-coral',
      badgeColor: '#FF7A61',
    },
  };

  protected readonly lineConfig = computed(() => {
    return this.product()?.productLine === 'jewelry'
      ? this.lineConfigs['Joyería']
      : this.lineConfigs['Amigurumi'];
  });

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
