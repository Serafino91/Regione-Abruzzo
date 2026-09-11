import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertMessage } from '../model/alert.model';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    private readonly alertSubject = new Subject<AlertMessage>();

    readonly alert$ = this.alertSubject.asObservable();

    show(alert: AlertMessage): void {
        this.alertSubject.next(alert);
    }

    showError(message: string): void {
        this.show({
            type: 'error',
            title: 'Errore',
            message
        });
    }

    showSuccess(message: string): void {
        this.show({
            type: 'success',
            title: 'Successo',
            message
        });
    }

}