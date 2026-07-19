import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LineaService } from '../../core/services/linea.service';
import { Linea } from '../../shared/models/linea';

@Component({
  selector: 'app-admin-lineas',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-2xl mx-auto">
      <h2 class="font-heading text-2xl mb-6">Líneas de producto</h2>

      <form (ngSubmit)="save()" class="flex gap-2 mb-8">
        <input type="text" [(ngModel)]="editingNombre" name="nombre" required placeholder="Nombre de la línea"
          class="flex-1 px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral text-sm" />
        <button type="submit" class="bg-coral text-white px-6 py-2 rounded-lg text-sm font-medium">
          {{ editingId ? 'Guardar' : 'Agregar' }}
        </button>
        @if (editingId) {
          <button type="button" (click)="cancelEdit()" class="px-4 py-2 border border-stone/30 rounded-lg text-sm">Cancelar</button>
        }
      </form>

      <div class="space-y-2">
        @for (l of lineas(); track l.id) {
          <div class="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-stone/10">
            <span class="font-medium" [class.text-stone/40]="!l.activo">{{ l.nombre }}</span>
            <div class="flex gap-2">
              <button (click)="edit(l)" class="text-xs text-coral font-medium">Editar</button>
              @if (l.activo) {
                <button (click)="delete(l.id)" class="text-xs text-red-500 font-medium">Desactivar</button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class AdminLineas implements OnInit {
  private service = inject(LineaService);

  protected lineas = signal<Linea[]>([]);
  protected editingId: number | null = null;
  protected editingNombre = '';

  ngOnInit(): void { this.load(); }

  private load(): void {
    this.service.getAll().subscribe(data => this.lineas.set(data));
  }

  protected save(): void {
    if (!this.editingNombre.trim()) return;
    if (this.editingId) {
      this.service.update(this.editingId, { nombre: this.editingNombre }).subscribe(() => this.load());
    } else {
      this.service.create({ nombre: this.editingNombre }).subscribe(() => this.load());
    }
    this.cancelEdit();
  }

  protected edit(l: Linea): void {
    this.editingId = l.id;
    this.editingNombre = l.nombre;
  }

  protected cancelEdit(): void {
    this.editingId = null;
    this.editingNombre = '';
  }

  protected delete(id: number): void {
    if (confirm('¿Desactivar esta línea?')) this.service.delete(id).subscribe(() => this.load());
  }
}
