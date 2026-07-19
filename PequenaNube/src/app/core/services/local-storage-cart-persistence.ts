import { Injectable } from '@angular/core';
import { CartPersistence, CartState } from './cart-persistence';

const STORAGE_KEY = 'pnube-cart';

@Injectable()
export class LocalStorageCartPersistence implements CartPersistence {
  save(state: CartState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  }

  restore(): CartState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartState) : null;
    } catch {
      return null;
    }
  }
}
