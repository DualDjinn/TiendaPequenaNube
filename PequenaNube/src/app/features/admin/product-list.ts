import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-admin-product-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-heading text-2xl">Productos</h2>
      <a routerLink="/admin/nuevo" class="bg-coral hover:bg-coral/90 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors">+ Nuevo producto</a>
    </div>

    @if (loading()) {
      <p class="text-stone">Cargando productos...</p>
    } @else if (products().length === 0) {
      <p class="text-stone">No hay productos cargados.</p>
    } @else {
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="border-b border-stone/20 text-stone uppercase tracking-wider text-xs">
            <tr>
              <th class="py-3 pr-4">ID</th>
              <th class="py-3 pr-4">Nombre</th>
              <th class="py-3 pr-4">Línea</th>
              <th class="py-3 pr-4">Categoría</th>
              <th class="py-3 pr-4">Precio</th>
              <th class="py-3 pr-4">Stock</th>
              <th class="py-3 pr-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (p of products(); track p.id) {
              <tr class="border-b border-stone/10 hover:bg-stone/5">
                <td class="py-3 pr-4 text-stone">{{ p.id }}</td>
                <td class="py-3 pr-4 font-medium">{{ p.name }}</td>
                <td class="py-3 pr-4">
                  <span class="text-xs px-2 py-0.5 rounded-full" [class]="p.productLine === 'amigurumi' ? 'bg-sage/80 text-white' : 'bg-coral/80 text-white'">{{ p.productLine === 'amigurumi' ? 'Amigurumi' : 'Joyería' }}</span>
                </td>
                <td class="py-3 pr-4 text-stone">{{ p.category }}</td>
                <td class="py-3 pr-4">\${{ p.price.toFixed(2) }}</td>
                <td class="py-3 pr-4">{{ p.stock }}</td>
                <td class="py-3 pr-4 flex gap-2 flex-wrap">
                  <a [routerLink]="['/admin/editar', p.id]" class="text-coral hover:text-coral/80 font-medium text-xs">Editar</a>
                  <button (click)="confirmDelete(p)" class="text-red-500 hover:text-red-700 font-medium text-xs">Eliminar</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
})
export class AdminProductList implements OnInit {
  private productService = inject(ProductService);
  protected readonly products = this.productService.products;
  protected readonly loading = this.productService.loading;

  ngOnInit(): void { this.productService.loadAll(); }

  protected confirmDelete(product: { id: number; name: string }): void {
    if (confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) {
      this.productService.softDelete(product.id);
    }
  }
}
