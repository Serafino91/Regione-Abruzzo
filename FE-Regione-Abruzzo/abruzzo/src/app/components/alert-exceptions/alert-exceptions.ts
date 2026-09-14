import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AlertService } from '../../services/alert.service';
import { AlertMessage } from '../../model/alert.model';

@Component({
    selector: 'app-alert-exceptions',
    imports: [CommonModule],
    templateUrl: './alert-exceptions.html',
    styleUrl: './alert-exceptions.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertExceptions {

    protected readonly alertService = inject(AlertService);

    removeAt(index: number): void {
        const alert = this.alertService.alerts()[index];
        this.alertService.remove(alert);
    }

}