import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      @if (loading()) {
        <p class="text-stone">Confirmando pago...</p>
      } @else if (confirmed()) {
        <span class="text-5xl mb-4">✅</span>
        <h1 class="font-heading text-3xl mb-2">¡Pago exitoso!</h1>
        <p class="text-stone mb-8">Gracias por tu compra. Te vamos a contactar pronto para coordinar la entrega.</p>
        <a routerLink="/" class="bg-coral text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-coral/90">Volver al inicio</a>
      } @else {
        <span class="text-5xl mb-4">⏳</span>
        <h1 class="font-heading text-3xl mb-2">Verificando pago...</h1>
        <p class="text-stone mb-8">Si el pago ya fue debitado, no te preocupes. Te contactaremos pronto.</p>
        <a routerLink="/" class="bg-coral text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-coral/90">Volver al inicio</a>
      }
    </div>
  `,
})
export class CheckoutSuccess implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  protected loading = signal(true);
  protected confirmed = signal(false);

  ngOnInit(): void {
    const paymentId = this.route.snapshot.queryParamMap.get('payment_id');
    if (paymentId) {
      this.http.post('/api/mercadopago/confirm', { paymentId: Number(paymentId) }).subscribe({
        next: () => { this.cartService.clear(); this.loading.set(false); this.confirmed.set(true); },
        error: () => { this.loading.set(false); },
      });
    } else {
      this.loading.set(false);
    }
  }
}
