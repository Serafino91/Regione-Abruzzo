import { Component } from '@angular/core';
import { TableComponent, TableColumn } from '../../../components/table/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tabella-richieste-ticket',
    imports: [
        TableComponent,
        RouterLink
    ],
    templateUrl: './tabella-richieste-ticket.html',
    styleUrl: './tabella-richieste-ticket.css',
})

export class TabellaRichiesteTicket {

    colonneRichiesteTicket: TableColumn[] = [
        { key: 'statoRichiesta', label: 'Stato richiesta', sortable: true, class: 'col-small' },
        { key: 'idRichiesta', label: 'ID richiesta', sortable: true, class: 'col-small' },
        { key: 'progetto', label: 'Progetto', sortable: true, class: 'col-large' },
        { key: 'servizio', label: 'Servizio', sortable: true, class: 'col-small' },
        { key: 'categoria', label: 'Categoria', sortable: true, class: 'col-small' },
        { key: 'dataInvio', label: 'Data invio', sortable: true, class: 'col-small' },
        { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-actions' },
    ];

    listaRichiesteTicket = [
        {
            statoRichiesta: "stato 1",
            idRichiesta: "ID 1",
            progetto: "progetto 1",
            servizio: "servizio 1",
            categoria: "categoria 1",
            dataInvio: "31/07/2026"
        },
        {
            statoRichiesta: "stato 1",
            idRichiesta: "ID 2",
            progetto: "progetto 1",
            servizio: "servizio 1",
            categoria: "categoria 1",
            dataInvio: "31/07/2026"
        },
        {
            statoRichiesta: "stato 1",
            idRichiesta: "ID 3",
            progetto: "progetto 1",
            servizio: "servizio 1",
            categoria: "categoria 1",
            dataInvio: "31/07/2026"
        }
    ];

    getValue(row: any, key: string): string {
        if (!key) return '';
        return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
    }

}