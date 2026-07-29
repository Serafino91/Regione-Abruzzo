import { Component, Input, SimpleChanges } from '@angular/core';
import { TableColumn, TableComponent } from '../../../components/table/table';
import { RichiestaModel } from '../../../model/richiestaModel';
import { ServizioModel } from '../../../model/servizioModel';
import { STATO_CONFIG, STATO_TICKET_CONFIG, StatoRichiesta, StatoTicket } from '../../../constants/request-state-badge.constants';
import { RouterLink } from '@angular/router';
import { TicketModel } from '../../../model/ticket.model';

@Component({
  selector: 'app-tabella-richieste',
  imports: [TableComponent, RouterLink],
  standalone: true,
  templateUrl: './tabella-richieste.html',
  styleUrl: './tabella-richieste.css',
})
export class TabellaRichieste {
  @Input() richieste: RichiestaModel[] = [];
  @Input() tickets: TicketModel[] = [];

  listaRichieste: any[] = [];
  listaTicket: any[] = [];

  mode: 'richieste' | 'tickets' = 'richieste';

  colonneRichieste: TableColumn[] = [
    { key: 'state.config.label', label: 'Stato richiesta', sortable: true, class: 'col-stato' },
    { key: 'requestId', label: 'ID richiesta', sortable: true, class: 'col-reqid' },
    { key: 'project', label: 'Progetto', sortable: true, class: 'col-proj' },
    { key: 'service', label: 'Servizio', sortable: true, class: 'col-serv' },
    { key: 'category', label: 'Categoria', sortable: true, class: 'col-cat' },
    { key: 'createdAt', label: 'Data invio', sortable: true, class: 'col-data' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-azioni' },
  ];

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
    if (changes['tickets'] && this.tickets?.length > 0) {
      this.mode = 'tickets';
      this.listaTicket = this.tickets.map((ticket: TicketModel) => {
        const statoKey = this.getTicketStatoKey(ticket.state?.name);
        const config = STATO_TICKET_CONFIG[statoKey] || STATO_TICKET_CONFIG['chiuso'];
        return {
          ...ticket,
          state: { ...ticket.state, key: statoKey, config },
        };
      });
    } else if (changes['richieste'] && this.richieste) {
      this.mode = 'richieste';
      const datiUguali: any = this.richieste;
      const arrayRichieste: RichiestaModel[] = Array.isArray(datiUguali)
        ? datiUguali
        : datiUguali.requestsList || [];

      this.listaRichieste = arrayRichieste.flatMap((richiesta: RichiestaModel) => {
        const statoKey = this.getStatoKey(richiesta.state?.stateName);
        const config = STATO_CONFIG[statoKey] || STATO_CONFIG['incompleta'];
        const stateData = { ...richiesta.state, key: statoKey, config };

        if (!richiesta.services || richiesta.services.length === 0) {
          return [{
            state: stateData,
            requestId: richiesta.requestId,
            project: richiesta.project?.name,
            service: 'Nessun servizio',
            category: richiesta.category?.name,
            createdAt: richiesta.createdAt,
          }];
        }

        return richiesta.services.map((servizio: ServizioModel) => ({
          state: stateData,
          requestId: richiesta.requestId,
          project: richiesta.project?.name,
          service: servizio.item,
          category: richiesta.category?.name,
          createdAt: richiesta.createdAt,
        }));
      });
    }
  }

  private getStatoKey(stateName: string | undefined): StatoRichiesta {
    if (!stateName) return 'incompleta';
    return stateName.toLowerCase().replace(/\s+/g, '_') as StatoRichiesta;
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
