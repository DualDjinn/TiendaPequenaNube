import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('authInterceptor', () => {
  let http: HttpTestingController;
  let client: HttpClient;
  let auth: AuthService;
  const navigate = vi.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        AuthService,
        { provide: Router, useValue: { navigate } },
      ],
    });
    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
    auth = TestBed.inject(AuthService);
    sessionStorage.clear();
    navigate.mockClear();
  });

  afterEach(() => http.verify());

  it('should add Authorization header when token exists', () => {
    sessionStorage.setItem('pnube_admin_token', 'my-token');
    client.get('/api/test').subscribe();
    const req = http.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-token');
    req.flush({});
  });

  it('should not add Authorization header when no token', () => {
    client.get('/api/test').subscribe();
    const req = http.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should logout and navigate to admin login on 403 with token', () => {
    sessionStorage.setItem('pnube_admin_token', 'my-token');
    client.get('/api/admin').subscribe({ error: () => {} });
    const req = http.expectOne('/api/admin');
    req.flush({}, { status: 403, statusText: 'Forbidden' });
    expect(sessionStorage.getItem('pnube_admin_token')).toBeNull();
    expect(auth.isAuthenticated()).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/admin/login']);
  });

  it('should not navigate on 403 when no token', () => {
    client.get('/api/test').subscribe({ error: () => {} });
    const req = http.expectOne('/api/test');
    req.flush({}, { status: 403, statusText: 'Forbidden' });
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should not logout on 401 from auth login', () => {
    sessionStorage.setItem('pnube_admin_token', 'my-token');
    client.post('/api/auth/login', {}).subscribe({ error: () => {} });
    const req = http.expectOne('/api/auth/login');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(sessionStorage.getItem('pnube_admin_token')).toBe('my-token');
    expect(navigate).not.toHaveBeenCalled();
  });
});
