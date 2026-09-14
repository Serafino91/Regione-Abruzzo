import { Injectable, signal } from '@angular/core';
import { AlertMessage } from '../model/alert.model';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    readonly alerts = signal<AlertMessage[]>([]);

    add(alert: AlertMessage): void {

        this.alerts.update(alerts => [...alerts, alert]);

        setTimeout(() => {
            this.remove(alert);
        }, 5000);
    }

    remove(alert: AlertMessage): void {

        this.alerts.update(alerts =>
            alerts.filter(item => item !== alert)
        );

    }

    clear(): void {
        this.alerts.set([]);
    }

}