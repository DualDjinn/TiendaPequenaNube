import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CartDrawerService } from '../../core/services/cart-drawer.service';
import { QuantitySelector } from '../../shared/ui/quantity-selector';
import { VentaService } from '../../core/services/venta.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, QuantitySelector, FormsModule],
  template: `
    @if (drawer.isOpen()) {
      <div class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/30" (click)="closeAll()"></div>
        <div class="relative w-full max-w-md bg-cream h-full flex flex-col shadow-xl animate-slide-in">
          @if (showForm()) {
            <div class="flex-1 overflow-y-auto px-6 py-6">
              <button (click)="showForm.set(false)" class="text-sm text-stone hover:text-coral mb-4 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                Volver al carrito
              </button>
              <h2 class="font-heading text-xl mb-6">Finalizar compra</h2>
              <div class="space-y-4">
                <div><label class="block text-sm font-medium mb-1">Nombre completo</label><input type="text" [(ngModel)]="checkoutNombre" class="w-full px-4 py-2 rounded-lg border border-stone/30 text-sm" /></div>
                <div><label class="block text-sm font-medium mb-1">Dirección</label><input type="text" [(ngModel)]="checkoutDireccion" class="w-full px-4 py-2 rounded-lg border border-stone/30 text-sm" /></div>
                <div><label class="block text-sm font-medium mb-1">Teléfono</label><input type="tel" [(ngModel)]="checkoutTelefono" class="w-full px-4 py-2 rounded-lg border border-stone/30 text-sm" /></div>
                <button (click)="confirmarCheckout()" class="w-full bg-ink hover:bg-ink/90 text-white py-3 rounded-lg font-medium text-sm transition-colors" [disabled]="checkoutLoading()">
                  {{ checkoutLoading() ? 'Procesando...' : 'Pagar con Mercado Pago' }}
                </button>
              </div>
            </div>
          } @else {
            <div class="flex items-center justify-between px-6 py-4 border-b border-stone/10">
              <h2 class="font-heading text-xl">Carrito</h2>
              <button (click)="drawer.close()" class="p-1 hover:text-coral transition-colors" aria-label="Cerrar carrito">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            @if (items().length === 0) {
              <div class="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <span class="text-4xl mb-4">🛍</span>
                <p class="text-lg text-stone mb-2">Tu carrito espera a su primer amigo</p>
                <p class="text-sm text-stone mb-6">Explorá y sumá tu próximo favorito</p>
                <a routerLink="/catalogo" class="bg-coral text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors hover:bg-coral/90" (click)="drawer.close()">Descubrir productos</a>
              </div>
            } @else {
              <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                @for (item of items(); track item.product.id) {
                  <div class="flex gap-4 py-4 border-b border-stone/10">
                    <div class="w-20 h-20 rounded-lg overflow-hidden bg-stone/10 shrink-0 relative">
                      <img [ngSrc]="item.product.images[0]" [alt]="item.product.name" fill class="object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-medium text-sm truncate">{{ item.product.name }}</h3>
                      <p class="text-coral text-sm font-medium mt-1">\${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                      <div class="flex items-center gap-3 mt-2">
                        <app-quantity-selector [value]="item.quantity" [max]="item.product.stock" (valueChange)="updateQuantity(item.product.id, $event)" />
                        <span class="text-[10px] text-stone/50">disp. {{ item.product.stock }}</span>
                        <button (click)="remove(item.product.id)" class="text-xs text-stone hover:text-red-500 transition-colors">Eliminar</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div class="px-6 py-4 border-t border-stone/10 space-y-3">
                <div class="flex justify-between text-sm"><span class="text-stone">Subtotal</span><span class="font-medium">\${{ subtotal().toFixed(2) }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-stone">Envío</span><span class="font-medium">Calculado al checkout</span></div>
                <div class="flex justify-between font-medium text-lg pt-2 border-t border-stone/10"><span>Total</span><span>\${{ subtotal().toFixed(2) }}</span></div>
                <button (click)="showForm.set(true)" class="w-full bg-ink hover:bg-ink/90 text-white py-3 rounded-lg font-medium text-sm transition-colors mt-2">Finalizar compra</button>
              </div>
            }
          }
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
    .animate-slide-in { animation: slideIn 0.3s ease-out; }
  `],
})
export class Cart {
  protected readonly drawer = inject(CartDrawerService);
  protected readonly cartService = inject(CartService);
  private ventaService = inject(VentaService);

  protected readonly items = this.cartService.items;
  protected readonly subtotal = this.cartService.subtotal;
  protected readonly showForm = signal(false);
  protected readonly checkoutLoading = signal(false);
  protected checkoutNombre = '';
  protected checkoutDireccion = '';
  protected checkoutTelefono = '';

  protected updateQuantity(productId: number, quantity: number): void { this.cartService.updateQuantity(productId, quantity); }
  protected remove(productId: number): void { this.cartService.remove(productId); }
  protected closeAll(): void { this.showForm.set(false); this.drawer.close(); }

  protected confirmarCheckout(): void {
    if (!this.checkoutNombre || !this.checkoutDireccion || !this.checkoutTelefono) return;
    this.checkoutLoading.set(true);
    const items = this.items().map(i => ({ productId: i.product.id, cantidad: i.quantity }));
    console.log('Checkout request:', JSON.stringify({ nombre: this.checkoutNombre, direccion: this.checkoutDireccion, telefono: this.checkoutTelefono, items }));
    this.ventaService.checkout({ nombre: this.checkoutNombre, direccion: this.checkoutDireccion, telefono: this.checkoutTelefono, items })
      .subscribe({
        next: res => { window.location.href = res.initPoint; },
        error: (err) => {
          this.checkoutLoading.set(false);
          const msg = err.error?.error || err.error?.message || (typeof err.error === 'string' ? err.error : JSON.stringify(err.error)) || 'Error desconocido';
          alert('Error: ' + msg);
        },
      });
  }
}
