import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LineaService } from '../../core/services/linea.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Linea } from '../../shared/models/linea';
import { Categoria } from '../../shared/models/categoria';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-2xl mx-auto">
      <h2 class="font-heading text-2xl mb-6">Categorías</h2>

      <div class="flex gap-2 mb-4">
        <select [(ngModel)]="selectedLineaId" (change)="loadCategorias()" class="flex-1 px-4 py-2 rounded-lg border border-stone/30 text-sm bg-white">
          <option [value]="0">Seleccionar línea...</option>
          @for (l of lineas(); track l.id) {
            <option [value]="l.id">{{ l.nombre }}</option>
          }
        </select>
      </div>

      @if (selectedLineaId > 0) {
        <form (ngSubmit)="save()" class="flex gap-2 mb-8">
          <input type="text" [(ngModel)]="editingNombre" name="nombre" required placeholder="Nombre de la categoría"
            class="flex-1 px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral text-sm" />
          <button type="submit" class="bg-coral text-white px-6 py-2 rounded-lg text-sm font-medium">
            {{ editingId ? 'Guardar' : 'Agregar' }}
          </button>
          @if (editingId) {
            <button type="button" (click)="cancelEdit()" class="px-4 py-2 border border-stone/30 rounded-lg text-sm">Cancelar</button>
          }
        </form>

        <div class="space-y-2">
          @for (c of categorias(); track c.id) {
            <div class="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-stone/10">
              <span class="font-medium" [class.text-stone/40]="!c.activo">{{ c.nombre }}</span>
              <div class="flex gap-2">
                <button (click)="edit(c)" class="text-xs text-coral font-medium">Editar</button>
                @if (c.activo) {
                  <button (click)="delete(c.id)" class="text-xs text-red-500 font-medium">Desactivar</button>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AdminCategorias implements OnInit {
  private lineaService = inject(LineaService);
  private categoriaService = inject(CategoriaService);

  protected lineas = signal<Linea[]>([]);
  protected categorias = signal<Categoria[]>([]);
  protected selectedLineaId = 0;
  protected editingId: number | null = null;
  protected editingNombre = '';

  ngOnInit(): void {
    this.lineaService.getAll().subscribe(data => this.lineas.set(data));
  }

  protected loadCategorias(): void {
    if (this.selectedLineaId > 0) {
      this.categoriaService.getByLinea(this.selectedLineaId).subscribe(data => this.categorias.set(data));
    }
    this.cancelEdit();
  }

  protected save(): void {
    if (!this.editingNombre.trim() || this.selectedLineaId <= 0) return;
    if (this.editingId) {
      this.categoriaService.update(this.editingId, this.editingNombre).subscribe(() => this.loadCategorias());
    } else {
      this.categoriaService.create({ lineaId: this.selectedLineaId, nombre: this.editingNombre })
        .subscribe(() => this.loadCategorias());
    }
    this.cancelEdit();
  }

  protected edit(c: Categoria): void {
    this.editingId = c.id;
    this.editingNombre = c.nombre;
  }

  protected cancelEdit(): void {
    this.editingId = null;
    this.editingNombre = '';
  }

  protected delete(id: number): void {
    if (confirm('¿Desactivar esta categoría?')) this.categoriaService.delete(id).subscribe(() => this.loadCategorias());
  }
}
