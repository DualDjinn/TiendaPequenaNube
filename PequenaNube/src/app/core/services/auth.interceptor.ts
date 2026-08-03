import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(cloned).pipe(
      catchError(err => {
        if ((err.status === 401 || err.status === 403) && !req.url.includes('/api/auth/')) {
          auth.logout();
        }
        return throwError(() => err);
      }),
    );
  }
  return next(req);
};
