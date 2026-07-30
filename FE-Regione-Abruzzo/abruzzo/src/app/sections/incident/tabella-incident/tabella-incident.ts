import { Component, Input, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../../model/ticket.model';
import {TableColumn, TableComponent} from '../../../components/table/table';
import {STATO_TICKET_CONFIG, StatoTicket} from '../../../constants/request-state-badge.constants';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tabella-incident',
  imports: [TableComponent, RouterLink],
  standalone: true,
  templateUrl: './tabella-incident.html',
  styleUrl: './tabella-incident.css',
})
export class TabellaIncident {
  @Input() tickets: TicketModel[] = [];
  listaTicket: any[] = [];

  colonneTicket: TableColumn[] = [
    { key: 'state.config.label', label: 'Stato', sortable: true, class: 'col-stato' },
    { key: 'code', label: 'Codice', sortable: true, class: 'col-reqid' },
    { key: 'category', label: 'Categoria', sortable: true, class: 'col-cat' },
    { key: 'subcategory', label: 'Sottocategoria', sortable: true, class: 'col-cat' },
    { key: 'openingDate', label: 'Data apertura', sortable: true, class: 'col-data' },
    { key: 'applicant', label: 'Richiedente', sortable: true, class: 'col-proj' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-azioni' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    this.listaTicket = this.tickets.map((ticket: TicketModel) => {
      const statoKey = this.getTicketStatoKey(ticket.state?.name);
      const config = STATO_TICKET_CONFIG[statoKey] || STATO_TICKET_CONFIG['chiuso'];
      return {
        ...ticket,
        state: { ...ticket.state, key: statoKey, config },
      };
    });
  }

  private getTicketStatoKey(stateName: string | undefined): StatoTicket {
    if (!stateName) return 'chiuso';
    return stateName.toLowerCase().replace(/\s+/g, '_') as StatoTicket;
  }

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}
