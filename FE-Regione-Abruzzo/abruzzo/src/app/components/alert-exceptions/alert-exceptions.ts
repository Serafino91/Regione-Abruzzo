import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AlertService } from '../../services/alert.service';
import { AlertMessage } from '../../model/alert.model';

@Component({
    selector: 'app-alert-exceptions',
    imports: [CommonModule],
    templateUrl: './alert-exceptions.html',
    styleUrl: './alert-exceptions.css',
})

export class AlertExceptions {

    private alertService = inject(AlertService);

    alert?: AlertMessage;

    constructor() {

        this.alertService.alert$.subscribe(value => {

                this.alert = value;

                setTimeout(() => {

                    this.alert = undefined;

                }, 5000);

        });

    }

}