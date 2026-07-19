import { TestBed } from '@angular/core/testing';
import { AdminLogin } from './admin-login';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

describe('AdminLogin', () => {
  let component: AdminLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminLogin,
        { provide: AuthService, useValue: { login: vi.fn(), isAuthenticated: signal(false) } },
        { provide: Router, useValue: { navigateByUrl: vi.fn() } },
      ],
    });
    component = TestBed.inject(AdminLogin);
  });

  it('should create', () => expect(component).toBeTruthy());
});
