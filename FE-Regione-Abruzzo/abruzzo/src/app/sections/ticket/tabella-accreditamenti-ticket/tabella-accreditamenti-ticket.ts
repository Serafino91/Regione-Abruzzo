import { Component } from '@angular/core';
import { TableComponent, TableColumn } from '../../../components/table/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tabella-accreditamenti-ticket',
    imports: [
        TableComponent,
        RouterLink
    ],
    templateUrl: './tabella-accreditamenti-ticket.html',
    styleUrl: './tabella-accreditamenti-ticket.css',
})

export class TabellaAccreditamentiTicket {

    colonneAccreditamentiTicket: TableColumn[] = [
        { key: 'state.config.label', label: 'Stato', sortable: true, class: 'col-small' },
        { key: 'idUtente', label: 'ID utente', sortable: true, class: 'col-small' },
        { key: 'nome', label: 'Codice', sortable: true, class: 'col-small' },
        { key: 'cognome', label: 'Categoria', sortable: true, class: 'col-small' },
        { key: 'ruolo', label: 'Sottocategoria', sortable: true, class: 'col-small' },
        { key: 'dataApertura', label: 'Data Apertura', sortable: true, class: 'col-small' },
        { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-actions' }
    ];

    listaAccreditamentiTicket = [
        {
            statoAccreditamento: "Da accreditare",
            idUtente: "ID Utente 1",
            nome: "Nome 1",
            cognome: "Cognome 1",
            ruolo: "ruolo 1",
            dataApertura: "31/07/2026"
        },
        {
            statoAccreditamento: "Accreditato",
            idUtente: "ID Utente 2",
            nome: "Nome 1",
            cognome: "Cognome 1",
            ruolo: "ruolo 1",
            dataApertura: "31/07/2026"
        },
        {
            statoAccreditamento: "Accreditato",
            idUtente: "ID Utente 3",
            nome: "Nome 1",
            cognome: "Cognome 1",
            ruolo: "ruolo 1",
            dataApertura: "31/07/2026"
        }
    ];

    getValue(row: any, key: string): string {
        if (!key) return '';
        return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
    }

}