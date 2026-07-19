import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      font-size: 0.625rem;
      font-weight: 500;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `],
  host: {
    '[style.backgroundColor]': 'color()',
    '[style.color]': '"#fff"',
  },
})
export class Badge {
  readonly color = input('#9e3fff');
}
