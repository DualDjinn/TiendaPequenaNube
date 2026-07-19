import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../shared/models/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/categorias';

  getByLinea(lineaId: number) { return this.http.get<Categoria[]>(`${this.apiUrl}/linea/${lineaId}`); }

  create(data: { lineaId: number; nombre: string }) { return this.http.post<Categoria>(this.apiUrl, data); }

  update(id: number, nombre: string) { return this.http.put<Categoria>(`${this.apiUrl}/${id}`, { nombre }); }

  delete(id: number) { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
