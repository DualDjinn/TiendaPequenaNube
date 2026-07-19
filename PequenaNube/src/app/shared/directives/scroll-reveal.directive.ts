import { Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: {
    '[style.opacity]': 'visible() ? 1 : 0',
    '[style.transform]': 'visible() ? "translateY(0)" : "translateY(30px)"',
    '[style.transition]': '"opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"',
  },
})
export class ScrollRevealDirective {
  private el = inject(ElementRef<HTMLElement>);

  protected readonly visible = signal(false);

  constructor() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(this.el.nativeElement);
  }
}
