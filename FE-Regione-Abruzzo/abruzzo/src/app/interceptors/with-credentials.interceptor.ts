import { HttpInterceptorFn } from '@angular/common/http';

// Endpoint che devono girare SENZA withCredentials
// (es. login, registrazione, reset password: prima che esista un token/cookie di sessione)
const EXCLUDED_URLS = ['/auth/login', '/pre-accesso'];

export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const isExcluded = EXCLUDED_URLS.some((url) => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const clonedRequest = req.clone({ withCredentials: true });
  return next(clonedRequest);
};
