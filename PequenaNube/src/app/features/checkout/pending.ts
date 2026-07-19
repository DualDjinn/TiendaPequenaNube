import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-pending',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span class="text-5xl mb-4">⏳</span>
      <h1 class="font-heading text-3xl mb-2">Pago pendiente</h1>
      <p class="text-stone mb-8">El pago está siendo procesado. Te avisaremos cuando se confirme.</p>
      <a routerLink="/" class="bg-coral text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-coral/90">Volver al inicio</a>
    </div>
  `,
})
export class CheckoutPending {}
