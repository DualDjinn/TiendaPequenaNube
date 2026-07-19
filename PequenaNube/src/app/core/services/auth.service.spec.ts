import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        { provide: Router, useValue: { navigateByUrl: vi.fn() } },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(TestBed.inject(AuthService)).toBeTruthy());

  it('should start unauthenticated', () => {
    expect(TestBed.inject(AuthService).isAuthenticated()).toBe(false);
  });

  it('should login and store token', () => {
    const service = TestBed.inject(AuthService);
    service.login('admin', 'pass');
    httpMock.expectOne('/api/auth/login').flush({ token: 'jwt' });
    expect(sessionStorage.getItem('pnube_admin_token')).toBe('jwt');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should not authenticate on error', () => {
    const service = TestBed.inject(AuthService);
    service.login('admin', 'wrong');
    httpMock.expectOne('/api/auth/login').error(new ErrorEvent('error'));
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return null getToken when not authenticated', () => {
    expect(TestBed.inject(AuthService).getToken()).toBeNull();
  });
});
