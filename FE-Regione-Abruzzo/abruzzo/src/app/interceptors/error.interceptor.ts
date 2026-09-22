import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const alertService = inject(AlertService);

    return next(req).pipe(

        catchError((error: HttpErrorResponse) => {

            console.log("httpErrorResponse: ", error);

            let message = '';

            switch (error.status) {
                case 0:
                    message = 'Server non raggiungibile';
                    break;
                case 400:
                    message = 'Richiesta non valida';
                    break;
                case 401:
                    message = 'Sessione scaduta';
                    break;
                case 403:
                    message = 'Accesso negato';
                    break;
                case 404:
                    message = 'Risorsa non trovata';
                    break;
                case 500:
                    message = 'Errore interno del server';
                    break;
                default:
                    message = error.error?.message || message;
            }

            const alert = {
                status: error.status,
                name: error.name,
                message: message,
                path: error.url
            };

            alertService.add(alert);

            return throwError(() => error);

        })

    );

};