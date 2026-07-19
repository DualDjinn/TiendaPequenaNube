import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../core/services/cart.service';
import { CartDrawerService } from '../core/services/cart-drawer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <header class="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-stone/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a routerLink="/" class="block">
            <img ngSrc="images/logo.png" alt="Pequeña Nube" width="100" height="81" priority class="h-auto w-auto max-h-9" />
          </a>
          <nav class="hidden md:flex items-center gap-6 text-base font-medium">
            <a routerLink="/" class="hover:text-coral transition-colors">Inicio</a>
            <a routerLink="/catalogo" [queryParams]="{linea: 'amigurumi'}" class="hover:text-coral transition-colors">Amigurumis</a>
            <a routerLink="/catalogo" [queryParams]="{linea: 'jewelry'}" class="hover:text-coral transition-colors">Joyería</a>
            <a routerLink="/catalogo" class="hover:text-coral transition-colors">Todo</a>
            <a routerLink="/" fragment="sobre-pnube" class="hover:text-coral transition-colors">Sobre Pequeña Nube</a>
          </nav>
          <div class="flex items-center gap-4">
            <button (click)="drawer.open()" class="relative p-2 hover:text-coral transition-colors" aria-label="Abrir carrito">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              @if (cart.totalItems() > 0) {
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs rounded-full flex items-center justify-center cart-bounce">{{ cart.totalItems() }}</span>
              }
            </button>
            <button (click)="mobileMenu.set(!mobileMenu())" class="md:hidden p-3" aria-label="Menú">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      @if (mobileMenu()) {
        <div class="md:hidden border-t border-stone/10 px-4 py-4 space-y-3 text-base font-medium">
          <a routerLink="/" class="block" (click)="mobileMenu.set(false)">Inicio</a>
          <a routerLink="/catalogo" [queryParams]="{linea: 'amigurumi'}" class="block" (click)="mobileMenu.set(false)">Amigurumis</a>
          <a routerLink="/catalogo" [queryParams]="{linea: 'jewelry'}" class="block" (click)="mobileMenu.set(false)">Joyería</a>
          <a routerLink="/catalogo" class="block" (click)="mobileMenu.set(false)">Todo</a>
          <a routerLink="/" fragment="sobre-pnube" class="block" (click)="mobileMenu.set(false)">Sobre Pequeña Nube</a>
        </div>
      }
    </header>
  `,
})
export class Header {
  protected readonly cart = inject(CartService);
  protected readonly drawer = inject(CartDrawerService);
  protected readonly mobileMenu = signal(false);
}
