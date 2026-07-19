import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="w-full max-w-sm">
        <h1 class="font-heading text-3xl text-center mb-8">Admin</h1>
        <form (ngSubmit)="login()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Usuario</label>
            <input type="text" [(ngModel)]="username" name="username" required
              class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Contraseña</label>
            <input type="password" [(ngModel)]="password" name="password" required
              class="w-full px-4 py-2 rounded-lg border border-stone/30 focus:outline-none focus:border-coral transition-colors text-sm" />
          </div>
          @if (error) {
            <p class="text-red-500 text-sm">Credenciales inválidas</p>
          }
          <button type="submit"
            class="w-full bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  `,
})
export class AdminLogin {
  private auth = inject(AuthService);

  protected username = '';
  protected password = '';
  protected error = false;

  protected login(): void {
    this.error = false;
    this.auth.login(this.username, this.password);
    setTimeout(() => {
      if (!this.auth.isAuthenticated()) this.error = true;
    }, 500);
  }
}
