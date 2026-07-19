import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-ink text-cream">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-heading text-xl mb-4">Pequeña Nube</h3>
            <p class="text-stone text-sm leading-relaxed">Amigurumis tejidos a crochet y joyería de fantasía hechos a mano con amor. Dos líneas, una sola esencia artesanal.</p>
          </div>
          <div>
            <h4 class="font-medium mb-3 text-sm uppercase tracking-wider">Explorar</h4>
            <ul class="space-y-2 text-sm text-stone">
              <li><a href="/" class="hover:text-coral transition-colors">Inicio</a></li>
              <li><a href="/catalogo" class="hover:text-coral transition-colors">Catálogo</a></li>
              <li><a href="/#sobre-pnube" class="hover:text-coral transition-colors">Sobre Pequeña Nube</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-3 text-sm uppercase tracking-wider">Contacto</h4>
            <ul class="space-y-2 text-sm text-stone">
              <li>
                <a href="mailto:pequenanube2019@gmail.com" class="flex items-center gap-1.5 hover:text-coral transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 shrink-0">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>pequenanube2019@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/pequena_n.u.b.e" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-coral transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 shrink-0">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@pequena_n.u.b.e</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-3 text-sm uppercase tracking-wider">Métodos de pago</h4>
            <div class="flex flex-wrap gap-2 text-stone text-sm">
              <span>Visa</span> <span>MC</span> <span>MP</span> <span>Efectivo</span>
            </div>
          </div>
        </div>
        <div class="border-t border-stone/20 mt-8 pt-8 text-center text-sm text-stone">
          <p>&copy; 2026 Pequeña Nube. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {}
