import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../core/services/venta.service';
import { RankingResponse } from '../../shared/models/venta';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, NgApexchartsModule],
  template: `
    <div>
      <h2 class="font-heading text-2xl mb-6">Dashboard de Ventas</h2>

      <div class="flex gap-4 mb-8">
        <select [(ngModel)]="selectedMes" class="px-4 py-2 rounded-lg border border-stone/30 text-sm bg-white">
          @for (m of meses; track m.value) {
            <option [value]="m.value">{{ m.label }}</option>
          }
        </select>
        <select [(ngModel)]="selectedAnio" class="px-4 py-2 rounded-lg border border-stone/30 text-sm bg-white">
          @for (a of anios; track a) {
            <option [value]="a">{{ a }}</option>
          }
        </select>
        <button (click)="load()" class="bg-coral text-white px-6 py-2 rounded-lg text-sm font-medium">Actualizar</button>
      </div>

      @if (error()) {
        <p class="text-stone text-center py-8">No hay ventas aún para este período.</p>
      } @else if (data(); as d) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg p-4 shadow-md">
            <h3 class="font-heading text-lg mb-4">Top productos</h3>
            <div id="chart-top" class="max-w-full">
              <apx-chart [series]="topSeries()" [chart]="topChartOptions()" [xaxis]="topXaxis()" [plotOptions]="{bar:{horizontal:true}}"></apx-chart>
            </div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-md">
            <h3 class="font-heading text-lg mb-4">Evolución mensual ({{ selectedAnio }})</h3>
            <div id="chart-evol" class="max-w-full">
              <apx-chart [series]="evolSeries()" [chart]="evolChartOptions()" [xaxis]="evolXaxis()"></apx-chart>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminDashboard implements OnInit {
  private ventaService = inject(VentaService);

  protected selectedMes = new Date().getMonth() + 1;
  protected selectedAnio = new Date().getFullYear();
  protected data = signal<RankingResponse | null>(null);
  protected error = signal(false);

  protected readonly meses = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1, label: new Date(2024, i).toLocaleString('es', { month: 'long' })
  }));
  protected readonly anios = [2026, 2025, 2024];

  ngOnInit(): void { this.load(); }

  protected load(): void {
    this.error.set(false);
    this.ventaService.getRanking(this.selectedMes, this.selectedAnio).subscribe({
      next: d => this.data.set(d),
      error: () => this.error.set(true),
    });
  }

  protected readonly topSeries = computed(() => {
    const d = this.data();
    if (!d || d.topProductos.length === 0) return [];
    return [{ name: 'Vendidos', data: d.topProductos.map(p => p.cantidadVendida) }];
  });

  protected readonly topChartOptions = () => ({
    type: 'bar' as const, height: 350,
    toolbar: { show: true },
  });

  protected readonly topXaxis = computed(() => ({
    categories: this.data()?.topProductos.map(p => p.productName) ?? [],
  }));

  protected readonly evolSeries = computed(() => {
    const d = this.data();
    if (!d || d.evolucion.length === 0) return [];
    return [{ name: 'Ventas ($)', data: d.evolucion.map(e => e.total) }];
  });

  protected readonly evolChartOptions = () => ({
    type: 'line' as const, height: 350,
    toolbar: { show: true },
  });

  protected readonly evolXaxis = computed(() => ({
    categories: this.data()?.evolucion.map(e => `${e.mes}/${e.anio}`) ?? [],
  }));
}
