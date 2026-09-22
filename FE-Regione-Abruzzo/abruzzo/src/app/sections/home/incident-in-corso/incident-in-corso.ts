import { Component, OnInit,  ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { SectionHeader } from '../../../components/section-header/section-header';
import { TicketModel } from '../../../model/ticket.model';
import { IncidentService } from '../../../services/incident.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IncidentAccordion } from '../../../components/incident-accordion/incident-accordion';
import { map, finalize } from 'rxjs';
import { SpinnerCard } from '../../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-incident-in-corso',
    imports: [SectionHeader, IncidentAccordion, SpinnerCard],
    templateUrl: './incident-in-corso.html',
    styleUrl: './incident-in-corso.css',
    standalone: true,
})

export class IncidentInCorso implements OnInit {

    incidents: TicketModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    constructor(private incident: IncidentService) { }

    ngOnInit() {
        this.getAllTickets();
    }

    private getAllTickets(): void {
        this.isLoading.set(true);

            this.incident.getTickets().pipe(

                map((resp: TicketModel[]) => resp.slice(0, 3)),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
                next: (resp) => {
                    console.log(resp);
                    this.incidents = resp;
                    this.cdr.detectChanges();
                }
            });
    }

}
