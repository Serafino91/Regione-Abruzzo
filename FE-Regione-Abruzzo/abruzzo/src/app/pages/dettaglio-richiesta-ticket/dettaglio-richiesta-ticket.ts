import { Component, OnInit, DestroyRef, ChangeDetectorRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from "../../components/info-bar/info-bar";
import { ProgettoDetailCard } from '../../components/progetto-detail-card/progetto-detail-card';
import { ServizioAccordion } from '../../components/servizio-accordion/servizio-accordion';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

import { TicketService } from '../../services/ticket.service';
import { RichiestaModel } from '../../model/richiestaModel';
import { getStatoRichiesta } from '../../constants/incident-state-icon.constants';

import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-dettaglio-richiesta-ticket',
    providers: [DatePipe],
    imports: [
        PageHeader,
        InfoBar,
        ProgettoDetailCard,
        ServizioAccordion,
        SpinnerCard
    ],
    templateUrl: './dettaglio-richiesta-ticket.html',
    styleUrl: './dettaglio-richiesta-ticket.css',
})

export class DettaglioRichiestaTicket implements OnInit {

    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private ticketService: TicketService = inject(TicketService);
    private destroyRef: DestroyRef = inject(DestroyRef);
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    private datePipe: DatePipe = inject(DatePipe);

    richiestaId = this.activatedRoute.snapshot.paramMap.get('id')!;
    isLoading = signal(false);
    infoRichiestaTicket: any;
    richiestaDettaglio!: RichiestaModel;

    nuovaRichiesta = false;
    isShowRichiestaIntegrazioniModal = false;

    ngOnInit(): void {
        this.getRichiestaDettaglio();
    }

    private getRichiestaDettaglio() {
        this.isLoading.set(true);

        this.ticketService.getRichiesta(this.richiestaId).pipe(

            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.isLoading.set(false)),

        ).subscribe({
            next: (response) => {
                this.richiestaDettaglio = response.requestDetail ?? response;

                this.infoRichiestaTicket = [
                    {
                        label: 'ID Richiesta',
                        value: this.richiestaDettaglio.requestId,
                        icon: 'it-file',
                    },
                    {
                        label: 'Stato',
                        value: this.richiestaDettaglio.state.stateName,
                        icon: getStatoRichiesta(this.richiestaDettaglio.state.id)?.icon,
                    },
                    {
                        label: 'Data apertura',
                        value: this.datePipe.transform(
                            this.richiestaDettaglio.createdAt,
                            'dd/MM/yyyy - HH:mm',
                        ),
                        icon: 'it-calendar',
                    },
                ];

                this.cdr.detectChanges();
            },
        });
    }

}