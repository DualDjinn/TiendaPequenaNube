import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), AuthService,
        { provide: Router, useValue: { navigateByUrl: vi.fn() } }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('should start unauthenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should login and store token', () => {
    service.login('admin', 'pass');
    const req = httpMock.expectOne('/api/auth/login');
    req.flush({ token: 'jwt-token' });
    expect(sessionStorage.getItem('pnube_admin_token')).toBe('jwt-token');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should not authenticate on error', () => {
    service.login('admin', 'wrong');
    const req = httpMock.expectOne('/api/auth/login');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should restore session from storage', () => {
    sessionStorage.setItem('pnube_admin_token', 'existing-token');
    const restored = TestBed.inject(AuthService);
    expect(restored.isAuthenticated()).toBe(true);
  });

  it('should logout and clear token', () => {
    sessionStorage.setItem('pnube_admin_token', 'token');
    service = TestBed.inject(AuthService);
    service.logout();
    expect(sessionStorage.getItem('pnube_admin_token')).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return token from getToken', () => {
    sessionStorage.setItem('pnube_admin_token', 'my-token');
    expect(service.getToken()).toBe('my-token');
  });

  it('should return null getToken when not authenticated', () => {
    expect(service.getToken()).toBeNull();
  });
});
