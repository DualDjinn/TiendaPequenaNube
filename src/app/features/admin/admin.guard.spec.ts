import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  let auth: AuthService;
  let router: Router;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: { parseUrl: vi.fn(() => '/admin/login') } },
      ],
    });
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    route = {} as ActivatedRouteSnapshot;
    sessionStorage.clear();
  });

  it('should return true when authenticated', () => {
    sessionStorage.setItem('pnube_admin_token', 'token');
    const restored = TestBed.inject(AuthService);
    expect(adminGuard()).toBe(true);
  });

  it('should redirect to login when not authenticated', () => {
    const result = adminGuard();
    expect(result).toEqual(router.parseUrl('/admin/login'));
  });
});
