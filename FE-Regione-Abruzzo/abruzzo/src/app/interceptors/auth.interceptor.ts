import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

const EXCLUDED_URLS = ['/auth/login', '/login', 'pre-accesso'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  // 1. Verifica se è una richiesta pubblica/esclusa
  const isExcluded = EXCLUDED_URLS.some((url) => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const authService = inject(AuthService);
  
  // 2. Leggi il token direttamente da sessionStorage come fallback sicuro
  const token = authService.getToken() || sessionStorage.getItem('auth_token');
  const activeRole = authService.getActiveRole() || sessionStorage.getItem('auth_active_role');

  let headers = req.headers;

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  if (activeRole) {
    headers = headers.set('X-Active-Role', activeRole);
  }

  const clonedRequest = req.clone({ headers });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🛑 STAMPA L'ERRORE REALE IN CONSOLE PER IL DEBUG:
      console.error('Interceptor HttpError:', error.status, error.url, error.message);

      if (error.status === 401 || error.status === 403) {
        console.warn('⚠️ Interceptor: 401/403 rilevato su URL:', req.url);
        
        // Pulisci e reindirizza SOLO se la chiamata non era già di Auth
        authService.logout();
        router.navigate(['/pre-accesso']);
      }

      return throwError(() => error);
    })
  );
};