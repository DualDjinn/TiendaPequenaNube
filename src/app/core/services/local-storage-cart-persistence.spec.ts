import { TestBed } from '@angular/core/testing';
import { LocalStorageCartPersistence } from './local-storage-cart-persistence';

describe('LocalStorageCartPersistence', () => {
  let persistence: LocalStorageCartPersistence;

  beforeEach(() => {
    persistence = TestBed.inject(LocalStorageCartPersistence);
    localStorage.clear();
  });

  it('should save and restore', () => {
    const data = { items: [{ product: { id: 1, name: 'T', images: [''], price: 100 }, quantity: 2 }] };
    persistence.save(data);
    const restored = persistence.restore();
    expect(restored?.items.length).toBe(1);
    expect(restored?.items[0].quantity).toBe(2);
  });

  it('should return null when nothing saved', () => {
    expect(persistence.restore()).toBeNull();
  });
});
