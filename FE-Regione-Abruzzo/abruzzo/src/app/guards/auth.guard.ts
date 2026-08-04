import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // 1. L'UTENTE È AUTENTICATO?
  // Verifichiamo sia la funzione che il token grezzo in sessionStorage per sicurezza
  const token = authService.getToken() || sessionStorage.getItem('auth_token');
  const isAuthenticated = authService.isAuthenticated() || !!token;

  if (!isAuthenticated) {
    console.warn('🛑 GUARD: Accesso negato -> Token NON presente');
    return router.createUrlTree(['/pre-accesso']);
  }

  // 2. CONTROLLO RUOLI
  const expectedRoles = route.data['roles'] as string[] | undefined;
  
  if (expectedRoles && expectedRoles.length > 0) {
    const activeRole = authService.getActiveRole() || sessionStorage.getItem('auth_active_role');
    const availableRoles = authService.getAvailableRoles();

    // Puliamo activeRole se è la stringa "null" o "undefined"
    const validActiveRole = (activeRole && activeRole !== 'null' && activeRole !== 'undefined') ? activeRole : null;

    const hasRole = 
      !validActiveRole || 
      expectedRoles.includes(validActiveRole) || 
      availableRoles.some(r => expectedRoles.includes(r));

    if (!hasRole) {
      console.warn('🛑 GUARD: Accesso negato -> Ruolo non corrispondente', { activeRole: validActiveRole, expectedRoles });
      
      // 💡 FIX CRITICO: Se l'utente è loggato ma la rotta fallisce i ruoli, lo rimandiamo alla Home e NON a pre-accesso!
      return router.createUrlTree(['/home']);
    }
  }

  return true;
};