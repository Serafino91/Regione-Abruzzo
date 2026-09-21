import { Component, OnInit, DestroyRef, ChangeDetectorRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { PageHeader } from '../../components/page-header/page-header';

import { FiltriRichiesteTicket } from '../../sections/ticket/filtri-richieste-ticket/filtri-richieste-ticket';
import { FiltriIncidentTicket } from '../../sections/ticket/filtri-incident-ticket/filtri-incident-ticket';
import { FiltriAccreditamentiTicket } from '../../sections/ticket/filtri-accreditamenti-ticket/filtri-accreditamenti-ticket';

import { TabellaRichiesteTicket } from '../../sections/ticket/tabella-richieste-ticket/tabella-richieste-ticket';
import { TabellaIncidentTicket } from '../../sections/ticket/tabella-incident-ticket/tabella-incident-ticket';
import { TabellaAccreditamentiTicket } from '../../sections/ticket/tabella-accreditamenti-ticket/tabella-accreditamenti-ticket';

import { SpinnerCard } from '../../components/spinner-card/spinner-card';

import { TicketService } from '../../services/ticket.service';
import { RichiestaTicketModel } from '../../model/richiestaModel';
import { IncidentTicketModel } from '../../model/ticket.model';

import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-ticket',
	imports: [
		PageHeader,
		FiltriRichiesteTicket,
		FiltriIncidentTicket,
		FiltriAccreditamentiTicket,
		TabellaRichiesteTicket,
		TabellaIncidentTicket,
		TabellaAccreditamentiTicket,
		SpinnerCard
	],
	templateUrl: './ticket.html',
	styleUrl: './ticket.css',
})

export class Ticket implements OnInit {

	private router: Router = inject(Router);
	private ticketService: TicketService = inject(TicketService);
	private destroyRef = inject(DestroyRef);
	private cdr = inject(ChangeDetectorRef);

	tipologiaTicketSelezionata = this.initTipoTicket();
	isLoading = signal(false);

	richieste: RichiestaTicketModel[] = [];
	incident: IncidentTicketModel[] = [];

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
		this.initTables();
	}

	private initTables(): void {
		if (this.tipologiaTicketSelezionata === "Richieste servizi") {

			this.getAllRichiesteTicket();

		} else if (this.tipologiaTicketSelezionata === "Incident") {

			this.getAllIncidentTicket();

		} else {

		}
	}

	private getAllRichiesteTicket() {
		this.isLoading.set(true);
		this.ticketService.getAllRichiesteTicket().pipe(

			takeUntilDestroyed(this.destroyRef),
			finalize(() => this.isLoading.set(false))

		).subscribe({
			next: (response) => {
				this.richieste = response;
				this.cdr.detectChanges();
			}
		});
	}

	private getAllIncidentTicket() {
		this.isLoading.set(true);
		this.ticketService.getAllIncidentTicket().pipe(

			takeUntilDestroyed(this.destroyRef),
			finalize(() => this.isLoading.set(false))

		).subscribe({
			next: (response) => {
				this.incident = response;
				console.log("response: ", response);
				this.cdr.detectChanges();
			}
		});
	}

	setTabTicket(section: string) {
		this.router.navigateByUrl(section);
	}

}