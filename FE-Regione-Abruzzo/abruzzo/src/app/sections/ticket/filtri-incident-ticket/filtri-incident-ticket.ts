import { Component,OnInit, inject } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';

@Component({
    selector: 'app-filtri-incident-ticket',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './filtri-incident-ticket.html',
    styleUrl: './filtri-incident-ticket.css',
})

export class FiltriIncidentTicket implements OnInit {

    private formBuilder: FormBuilder = inject(FormBuilder);

    formIncidentTicket: FormGroup = this.formBuilder.group({
        cercaCodice: ['', Validators.nullValidator],
        categoria: [0, Validators.nullValidator],
        sottoCategoria: [0, Validators.nullValidator],
        stato: [0, Validators.nullValidator],
        dataAperturaDa: [null, Validators.nullValidator],
        dataAperturaA: [null, Validators.nullValidator],
        codiceUtente: ['', Validators.nullValidator]
    });

    categorie = [
        { id: 1, content: "categoria 1" }
    ];
    sottoCategorie = [
        { id: 1, content: "sotto-categoria 1" }
    ];
    stati = [
        { id: 1, content: "stato 1" }
    ];

    ngOnInit(): void {
        this.formIncidentTicket.get('sottoCategoria')!.disable();
    }

    eliminaFiltri(): void {

    }

    applicaFiltri(): void {
        
    }

}