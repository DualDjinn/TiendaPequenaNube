import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item';
import { Product } from '../../shared/models/product';
import { CartPersistence, CART_PERSISTENCE } from './cart-persistence';

@Injectable({ providedIn: 'root' })
export class CartService {
  private persistence = inject(CART_PERSISTENCE);

  private itemsSignal = signal<CartItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();
  readonly totalItems = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  constructor() {
    const saved = this.persistence.restore();
    if (saved?.items?.length) {
      this.itemsSignal.set(saved.items);
    }
    effect(() => {
      this.persistence.save({ items: this.itemsSignal() });
    });
  }

  add(product: Product, quantity = 1): void {
    this.itemsSignal.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      const currentQty = existing?.quantity ?? 0;
      if (currentQty + quantity > product.stock) return items;
      if (existing) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { product, quantity }];
    });
  }

  getQuantity(productId: number): number {
    return this.itemsSignal().find(i => i.product.id === productId)?.quantity ?? 0;
  }

  availableStock(product: Product): number {
    return product.stock;
  }

  remove(productId: number): void {
    this.itemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.itemsSignal.update(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}
