import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

// Endpoint pubblici che non devono ricevere Authorization / X-Active-Role
const EXCLUDED_URLS = ['/auth/login', 'pre-accesso' ];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const isExcluded = EXCLUDED_URLS.some((url) => req.url.includes(url));
  const token = authService.getToken();
  const activeRole = authService.getActiveRole();

  let headers = req.headers;

  if (token && !isExcluded) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  if (activeRole && !isExcluded) {
    headers = headers.set('X-Active-Role', activeRole);
  }

  const clonedRequest = req.clone({ headers });

  return next(clonedRequest);
};
