import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 class="font-heading text-6xl text-coral mb-4">404</h1>
      <p class="text-xl text-stone mb-2">Página no encontrada</p>
      <p class="text-stone mb-8">La página que buscás no existe o fue movida.</p>
      <a routerLink="/" class="bg-coral text-white w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors hover:bg-coral/90">Volver al inicio</a>
    </div>
  `,
})
export class NotFound {}
