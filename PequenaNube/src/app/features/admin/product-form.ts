import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../core/services/product.service';
import { LineaService } from '../../core/services/linea.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Linea } from '../../shared/models/linea';
import { Categoria } from '../../shared/models/categoria';
import { Product } from '../../shared/models/product';

declare const cloudinary: any;

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="font-heading text-3xl mb-8">{{ isEditing() ? 'Editar producto' : 'Nuevo producto' }}</h1>

      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" formControlName="name" (input)="autoSlug()" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Slug</label>
          <input type="text" formControlName="slug" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Precio ($)</label>
            <input type="number" formControlName="price" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Stock</label>
            <input type="number" formControlName="stock" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Línea de producto</label>
          <select formControlName="lineaId" (change)="onLineaChange()" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm bg-white">
            <option value="">Seleccionar línea...</option>
            @for (l of lineas(); track l.id) { <option [value]="l.id">{{ l.nombre }}</option> }
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Categoría</label>
          @if (showNewCategoria()) {
            <div class="flex gap-2">
              <input #newCat type="text" placeholder="Nueva categoría" class="flex-1 px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
              <button type="button" (click)="confirmNewCategoria(newCat.value, $event)" class="bg-coral text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">Agregar</button>
              <button type="button" (click)="showNewCategoria.set(false)" class="px-4 py-2 border border-stone/30 rounded-lg text-sm">Cancelar</button>
            </div>
          } @else {
            <select formControlName="categoriaId" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm bg-white">
              <option value="">Seleccionar categoría...</option>
              @for (c of categorias(); track c.id) { <option [value]="c.id">{{ c.nombre }}</option> }
              @if (!isEditing()) { <option value="__new__">+ Agregar nueva...</option> }
            </select>
          }
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Imágenes</label>
          <div class="flex flex-wrap gap-3 mb-3">
            @for (url of imageList(); track url; let i = $index) {
              <div class="relative w-24 h-24 rounded-lg overflow-hidden border border-stone/20 group">
                <img [ngSrc]="url" alt="" fill class="object-cover" />
                <button type="button" (click)="removeImage(i)" class="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
              </div>
            }
          </div>
          <button type="button" (click)="openUpload()" class="px-4 py-2 border border-stone/30 rounded-lg text-sm hover:border-coral transition-colors">+ Subir imagen</button>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Descripción</label>
          <textarea formControlName="description" rows="4" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg" [class.bg-coral/10]="productLine()==='jewelry'" [class.bg-sage/20]="productLine()==='amigurumi'">
          @if (productLine() === 'jewelry') {
            <div><label class="block text-sm font-medium mb-1">Material</label><input type="text" formControlName="material" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" /></div>
            <div><label class="block text-sm font-medium mb-1">Color</label><input type="text" formControlName="color" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" /></div>
          }
          @if (productLine() === 'amigurumi') {
            <div><label class="block text-sm font-medium mb-1">Tipo de hilo</label><input type="text" formControlName="yarnType" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" /></div>
            <div><label class="block text-sm font-medium mb-1">Tamaño</label><input type="text" formControlName="size" class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" /></div>
          }
        </div>

        <div class="flex gap-6">
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" formControlName="isSale" class="rounded" /> Oferta</label>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button type="submit" class="bg-coral hover:bg-coral/90 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors" [disabled]="form.invalid">{{ isEditing() ? 'Guardar cambios' : 'Crear producto' }}</button>
          <a routerLink="/admin" class="px-8 py-3 rounded-lg border border-stone/30 text-sm font-medium transition-colors hover:border-ink">Cancelar</a>
        </div>
      </form>
    </div>
  `,
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private lineaService = inject(LineaService);
  private categoriaService = inject(CategoriaService);

  protected readonly isEditing = signal(false);
  protected readonly imageList = signal<string[]>([]);
  protected readonly lineas = signal<Linea[]>([]);
  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly showNewCategoria = signal(false);
  protected readonly productLine = signal('');
  private editingId: number | null = null;
  private widget: any = null;

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    lineaId: [0],
    categoriaId: [0],
    material: [''],
    color: [''],
    yarnType: [''],
    size: [''],
    description: [''],
    isSale: [false],
  });

  ngOnInit(): void {
    this.lineaService.getAll().subscribe(data => this.lineas.set(data));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.editingId = Number(id);
      const product = this.productService.getById(this.editingId);
      if (product) {
        const p = product as any;
        this.imageList.set(product.images);
        this.productLine.set(product.productLine ?? '');
        this.form.patchValue({
          name: product.name,
          slug: product.slug,
          price: product.price,
          stock: product.stock,
          lineaId: p.lineaId ?? 0,
          categoriaId: p.categoriaId ?? 0,
          material: product.material ?? '',
          color: product.color ?? '',
          yarnType: product.yarnType ?? '',
          size: product.size ?? '',
          description: product.description,
          isSale: product.isSale ?? false,
        });
        if (p.lineaId) {
          this.categoriaService.getByLinea(p.lineaId).subscribe(data => this.categorias.set(data));
        }
      }
    }
  }

  protected onLineaChange(): void {
    const lineaId = Number(this.form.get('lineaId')?.value);
    this.form.patchValue({ categoriaId: 0 });
    this.showNewCategoria.set(false);
    if (lineaId > 0) {
      this.categoriaService.getByLinea(lineaId).subscribe(data => this.categorias.set(data));
      const linea = this.lineas().find(l => l.id === lineaId);
      this.productLine.set(linea?.nombre.toLowerCase() ?? '');
    }
  }

  protected confirmNewCategoria(name: string, event: Event): void {
    event.preventDefault();
    const lineaId = Number(this.form.get('lineaId')?.value);
    if (!name.trim() || !lineaId) return;
    this.categoriaService.create({ lineaId, nombre: name.trim() }).subscribe(cat => {
      this.categorias.update(list => [...list, cat]);
      this.form.patchValue({ categoriaId: cat.id });
      this.showNewCategoria.set(false);
    });
  }

  protected openUpload(): void {
    if (!this.widget) {
      this.widget = cloudinary.createUploadWidget(
        { cloudName: 'pjhkswfc', uploadPreset: 'imagenesNube', folder: 'pnube' },
        (error: any, result: any) => {
          if (result.event === 'success') this.imageList.update(list => [...list, result.info.secure_url]);
        },
      );
    }
    this.widget.open();
  }

  protected removeImage(index: number): void { this.imageList.update(list => list.filter((_, i) => i !== index)); }

  protected autoSlug(): void {
    if (this.isEditing()) return;
    const name = this.form.value.name ?? '';
    this.form.patchValue({ slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') });
  }

  protected save(): void {
    if (this.form.invalid) return;
    const v = this.form.value;
    const catId = Number(v.categoriaId);
    if (!catId || catId <= 0) return;

    const payload: any = {
      name: v.name!, slug: v.slug!, price: Number(v.price), stock: Number(v.stock),
      images: this.imageList().join(','), description: v.description ?? '',
      isSale: v.isSale ?? false, material: v.material ?? '', color: v.color ?? '',
      yarnType: v.yarnType ?? '', size: v.size ?? '',
    };

    if (this.isEditing() && this.editingId) {
      this.http.put(`/api/products/${this.editingId}?categoriaId=${catId}`, payload).subscribe(() => {
        this.productService.loadAll();
        this.router.navigate(['/admin']);
      });
    } else {
      this.http.post<Product>(`/api/products?categoriaId=${catId}`, payload).subscribe(() => {
        this.productService.loadAll();
        this.router.navigate(['/admin']);
      });
    }
  }
}
