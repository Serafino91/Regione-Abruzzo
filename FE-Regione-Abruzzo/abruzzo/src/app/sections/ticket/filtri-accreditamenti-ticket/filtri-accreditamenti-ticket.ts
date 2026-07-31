import { Component, inject } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';

@Component({
    selector: 'app-filtri-accreditamenti-ticket',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './filtri-accreditamenti-ticket.html',
    styleUrl: './filtri-accreditamenti-ticket.css',
})

export class FiltriAccreditamentiTicket {

    private formBuilder: FormBuilder = inject(FormBuilder);

    formIncidentTicket: FormGroup = this.formBuilder.group({
        codiceUtente: ['', Validators.nullValidator],
        ruolo: [0, Validators.nullValidator],
        stato: [0, Validators.nullValidator],
        dataAperturaDa: [null, Validators.nullValidator],
        dataAperturaA: [null, Validators.nullValidator]
    });

    ruoli = [
        { id: 1, content: "ruolo 1" }
    ];
    stati = [
        { id: 1, content: "stato 1" }
    ];

    eliminaFiltri(): void {

    }

    applicaFiltri(): void {

    }

}