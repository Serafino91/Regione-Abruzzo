import { Component, Input } from '@angular/core';
import { TableComponent, TableColumn } from '../../../components/table/table';
import { RouterLink } from '@angular/router';
import { RichiestaTicketModel } from '../../../model/richiestaModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabella-richieste-ticket',
  imports: [TableComponent, RouterLink, DatePipe],
  standalone: true,
  templateUrl: './tabella-richieste-ticket.html',
  styleUrl: './tabella-richieste-ticket.css',
})
export class TabellaRichiesteTicket {
  colonneRichiesteTicket: TableColumn[] = [
    { key: 'state.config.label', label: 'Stato richiesta', sortable: true, class: 'col-small' },
    { key: 'idRichiesta', label: 'ID richiesta', sortable: true, class: 'col-small' },
    { key: 'progetto', label: 'Progetto', sortable: true, class: 'col-large' },
    { key: 'servizio', label: 'Servizio', sortable: true, class: 'col-small' },
    { key: 'categoria', label: 'Categoria', sortable: true, class: 'col-small' },
    { key: 'dataInvio', label: 'Data invio', sortable: true, class: 'col-small' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-actions' },
  ];

  @Input() listaRichiesteTicket: RichiestaTicketModel[] = [];

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}
