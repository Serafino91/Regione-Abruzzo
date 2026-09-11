import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn =
    (req, next) => {

        const alertService = inject(AlertService);

        return next(req).pipe(

            catchError((error: HttpErrorResponse) => {

                let message = '';

                switch (error.status) {

                    case 0:
                        message =
                            'Impossibile raggiungere il server.';
                        break;

                    case 400:
                        message =
                            'La richiesta non è valida.';
                        break;

                    case 401:
                        message =
                            'Sessione scaduta. Effettua nuovamente il login.';
                        break;

                    case 403:
                        message =
                            'Non possiedi le autorizzazioni necessarie.';
                        break;

                    case 404:
                        message =
                            'Risorsa non trovata.';
                        break;

                    case 500:
                        message =
                            'Errore interno del server.';
                        break;

                    default:
                        message =
                            error.error?.message ??
                            'Errore inatteso.';
                }

                console.log('HTTP ERROR', error);
                console.log('STATUS', error.status);
                console.log('BODY', error.error);

                // alertService.showError(message);

                return throwError(() => error);

            })

        );

    };