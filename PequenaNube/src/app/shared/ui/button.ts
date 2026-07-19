import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  host: {
    '[class]': 'variant()',
  },
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-family: var(--font-sans);
      font-weight: 500;
      font-size: 0.875rem;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    :host(.primary) {
      background-color: var(--color-champagne);
      color: #fff;
      border: 1px solid var(--color-champagne);
    }
    :host(.primary:hover) {
      background-color: #c09c2e;
    }
    :host(.outline) {
      background: transparent;
      color: var(--color-charcoal);
      border: 1px solid var(--color-stone);
    }
    :host(.outline:hover) {
      border-color: var(--color-charcoal);
    }
    :host(.ghost) {
      background: transparent;
      color: var(--color-charcoal);
      border: 1px solid transparent;
    }
    :host(.ghost:hover) {
      background: var(--color-bone);
    }
  `],
})
export class Button {
  readonly variant = input<'primary' | 'outline' | 'ghost'>('primary');
}
