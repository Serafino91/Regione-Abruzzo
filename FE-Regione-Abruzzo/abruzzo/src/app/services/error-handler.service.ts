import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ErrorHandlerService {

    handle(error: unknown): void {

        console.error('API Error:', error);

        // Qui puoi integrare:
        // - Snackbar
        // - Toast
        // - Dialog
        // - Application Insights
        // - Sentry
    }

}