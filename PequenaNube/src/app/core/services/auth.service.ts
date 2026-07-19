import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly isAuthenticated = signal(false);
  private readonly TOKEN_KEY = 'pnube_admin_token';

  constructor() {
    if (typeof window !== 'undefined' && sessionStorage.getItem(this.TOKEN_KEY)) {
      this.isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): void {
    this.http.post<{ token: string }>('/api/auth/login', { username, password })
      .subscribe({
        next: res => {
          sessionStorage.setItem(this.TOKEN_KEY, res.token);
          this.isAuthenticated.set(true);
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.isAuthenticated.set(false);
        }
      });
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/admin/login']);
  }
}
