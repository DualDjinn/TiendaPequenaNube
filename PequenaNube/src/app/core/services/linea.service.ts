import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Linea } from '../../shared/models/linea';

@Injectable({ providedIn: 'root' })
export class LineaService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/lineas';

  getAll() { return this.http.get<Linea[]>(this.apiUrl); }

  create(data: Partial<Linea>) { return this.http.post<Linea>(this.apiUrl, data); }

  update(id: number, data: Partial<Linea>) { return this.http.put<Linea>(`${this.apiUrl}/${id}`, data); }

  delete(id: number) { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
