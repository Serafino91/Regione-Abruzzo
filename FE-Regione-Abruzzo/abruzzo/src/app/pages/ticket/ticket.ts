import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';

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

export class Ticket implements OnInit, OnDestroy {

	private router: Router = inject(Router);

	tipologiaTicketSelezionata = this.initTipoTicket();

	initTipoTicket(): string {
		let returnValue = '';

		if (this.router.url.includes("richieste-servizi")) {
			returnValue = "Richieste servizi";
		}
		
		if (this.router.url.includes("incident")) {
			returnValue = "Incident";
		}

		if (this.router.url.includes("accreditamenti")) {
			returnValue = "Accreditamenti";
		}

		return returnValue;
	}

	ngOnInit(): void {
		console.log("tipologiaTicketSelezionata: ", this.tipologiaTicketSelezionata);
	}

	setTabTicket(section: string) {
		this.router.navigateByUrl(section);
	}

	ngOnDestroy(): void {
		console.log("componente distrutto.");
	}

}