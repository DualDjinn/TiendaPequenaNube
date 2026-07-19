import { InjectionToken } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item';

export interface CartState {
  items: CartItem[];
}

export interface CartPersistence {
  save(state: CartState): void;
  restore(): CartState | null;
}

export const CART_PERSISTENCE = new InjectionToken<CartPersistence>('CART_PERSISTENCE');
