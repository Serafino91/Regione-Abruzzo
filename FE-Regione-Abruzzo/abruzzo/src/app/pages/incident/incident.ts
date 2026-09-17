import { Component, OnInit, OnDestroy, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { FiltriIncident } from '../../sections/incident/filtri-incident/filtri-incident';
import { PageHeader } from '../../components/page-header/page-header';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IncidentService } from '../../services/incident.service';
import { TicketModel } from '../../model/ticket.model';
import { TabellaIncident } from '../../sections/incident/tabella-incident/tabella-incident';
import { finalize, Subscription } from 'rxjs';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-incident',
    imports: [FiltriIncident, PageHeader, TabellaIncident, SpinnerCard],
    standalone: true,
    templateUrl: './incident.html',
    styleUrl: './incident.css',
})

export class Incident implements OnInit, OnDestroy {

    tickets: TicketModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    private subscriptions: Subscription[] = [];

    constructor(private incident: IncidentService) { }

    ngOnInit() {
        this.getAllTickets();
    }

    private getAllTickets(): void {
        this.isLoading.set(true);

        this.subscriptions.push(
            this.incident.getTickets().pipe(

                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
                next: (resp) => {
                    console.log(resp);
                    this.tickets = resp;
                    this.cdr.detectChanges();
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.map((s: Subscription) => s.unsubscribe());
    }

}
