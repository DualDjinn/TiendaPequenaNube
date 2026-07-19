import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  template: `
    <button (click)="decrement()" [disabled]="value() <= 1" aria-label="Reducir cantidad">−</button>
    <span>{{ value() }}</span>
    <button (click)="increment()" [disabled]="value() >= max()" aria-label="Aumentar cantidad">+</button>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0;
      border: 1px solid #9e3fff;
      border-radius: 0.5rem;
      overflow: hidden;
    }
    button {
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 1rem;
      color: #9e3fff;
      transition: background 0.15s;
      font-weight: 500;
    }
    button:hover:not([disabled]) {
      background: rgba(158, 63, 255, 0.1);
    }
    button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    span {
      padding: 0.5rem 0.75rem;
      min-width: 2rem;
      text-align: center;
      font-weight: 600;
      color: #9e3fff;
      border-left: 1px solid #9e3fff;
      border-right: 1px solid #9e3fff;
    }
  `],
})
export class QuantitySelector {
  readonly value = input(1);
  readonly max = input(999999);
  readonly valueChange = output<number>();

  protected increment(): void {
    if (this.value() < this.max()) {
      this.valueChange.emit(this.value() + 1);
    }
  }

  protected decrement(): void {
    if (this.value() > 1) {
      this.valueChange.emit(this.value() - 1);
    }
  }
}
