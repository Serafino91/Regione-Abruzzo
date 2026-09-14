import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const alertService = inject(AlertService);

    return next(req).pipe(

        catchError((error: HttpErrorResponse) => {

            console.log("httpErrorResponse: ", error);

            const alert = {
                status: error.status,
                name: error.name,
                message: error.error?.message ?? error.message ?? 'Errore sconosciuto',
                path: error.error.path
            };

            alertService.add(alert);

            return throwError(() => error);

        })

    );

};