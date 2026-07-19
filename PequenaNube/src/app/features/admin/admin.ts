import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="font-heading text-3xl">Panel de Administración</h1>
        <button (click)="logout()" class="text-stone/50 hover:text-red-500 text-xs transition-colors">Cerrar sesión</button>
      </div>

      <nav class="flex gap-4 mb-8 border-b border-stone/10 pb-4 overflow-x-auto">
        <a routerLink="/admin" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="text-coral border-coral" class="shrink-0 font-medium text-sm pb-1 border-b-2 border-transparent transition-colors">Productos</a>
        <a routerLink="/admin/lineas" routerLinkActive="text-coral border-coral" class="shrink-0 font-medium text-sm pb-1 border-b-2 border-transparent transition-colors">Líneas</a>
        <a routerLink="/admin/categorias" routerLinkActive="text-coral border-coral" class="shrink-0 font-medium text-sm pb-1 border-b-2 border-transparent transition-colors">Categorías</a>
        <a routerLink="/admin/dashboard" routerLinkActive="text-coral border-coral" class="shrink-0 font-medium text-sm pb-1 border-b-2 border-transparent transition-colors">Dashboard</a>
      </nav>

      <router-outlet />
    </div>
  `,
})
export class Admin implements OnInit {
  private productService = inject(ProductService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.productService.loadAll();
  }

  protected logout(): void {
    this.auth.logout();
  }
}
