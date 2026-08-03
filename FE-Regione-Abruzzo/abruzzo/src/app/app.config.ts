// 1. Aggiungi provideAppInitializer e inject qui:
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { withCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';

// 2. Aggiungi l'import del tuo AuthService (adatta il path se diverso):
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient( 
      withInterceptors([
        withCredentialsInterceptor,
        authInterceptor
      ])
    ),
    // Ora provideAppInitializer e inject funzioneranno correttamente:
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      
      if (authService.isAuthenticated()) {
        const activeRole = authService.getActiveRole();
        if (activeRole) {
          authService.setActiveRole(activeRole);
        }
      }
    }),
  ],
};