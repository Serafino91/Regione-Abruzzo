import { Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';

import { FiltriRichiesteTicket } from '../../sections/ticket/filtri-richieste-ticket/filtri-richieste-ticket';
import { FiltriIncidentTicket } from '../../sections/ticket/filtri-incident-ticket/filtri-incident-ticket';
import { FiltriAccreditamentiTicket } from '../../sections/ticket/filtri-accreditamenti-ticket/filtri-accreditamenti-ticket';

import { TabellaRichiesteTicket } from '../../sections/ticket/tabella-richieste-ticket/tabella-richieste-ticket';
import { TabellaIncidentTicket } from '../../sections/ticket/tabella-incident-ticket/tabella-incident-ticket';
import { TabellaAccreditamentiTicket } from '../../sections/ticket/tabella-accreditamenti-ticket/tabella-accreditamenti-ticket';

@Component({
	selector: 'app-ticket',
	imports: [
		PageHeader,
		FiltriRichiesteTicket,
		FiltriIncidentTicket,
		FiltriAccreditamentiTicket,
		TabellaRichiesteTicket,
		TabellaIncidentTicket,
		TabellaAccreditamentiTicket
	],
	templateUrl: './ticket.html',
	styleUrl: './ticket.css',
})

export class Ticket {

	tipologiaTicketSelezionata = "Richieste";

	setTipoTicket(nuovoStato: string) {
		this.tipologiaTicketSelezionata = nuovoStato;
	}

}