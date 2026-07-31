import { Component } from '@angular/core';
import { TableComponent, TableColumn } from '../../../components/table/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tabella-incident-ticket',
    imports: [
        TableComponent,
        RouterLink
    ],
    templateUrl: './tabella-incident-ticket.html',
    styleUrl: './tabella-incident-ticket.css',
})

export class TabellaIncidentTicket { 

    colonneIncidentTicket: TableColumn[] = [
        { key: 'statoIncident', label: 'Stato', sortable: true, class: 'col-small' },
        { key: 'codice', label: 'Codice', sortable: true, class: 'col-small' },
        { key: 'categoria', label: 'Categoria', sortable: true, class: 'col-small' },
        { key: 'sottoCategoria', label: 'Sottocategoria', sortable: true, class: 'col-small' },
        { key: 'dataApertura', label: 'Data Apertura', sortable: true, class: 'col-small' },
        { key: 'richiedente', label: 'Richiedente', sortable: true, class: 'col-large' },
        { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-actions' }
    ];

    listaIncidentTicket = [
        {
            statoIncident: "stato 1",
            codice: "Codice 1",
            categoria: "categoria 1",
            sottoCategoria: "Sottocategoria 1",
            dataApertura: "31/07/2026",
            richiedente: "progetto 1"
        },
        {
            statoIncident: "stato 1",
            codice: "Codice 2",
            categoria: "categoria 1",
            sottoCategoria: "Sottocategoria 1",
            dataApertura: "31/07/2026",
            richiedente: "progetto 1"
        },
        {
            statoIncident: "stato 1",
            codice: "Codice 3",
            categoria: "categoria 1",
            sottoCategoria: "Sottocategoria 1",
            dataApertura: "31/07/2026",
            richiedente: "progetto 1"
        }
    ];

    getValue(row: any, key: string): string {
        if (!key) return '';
        return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
    }

}