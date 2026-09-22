import { Component, OnInit, DestroyRef, ChangeDetectorRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SectionHeader } from "../../../components/section-header/section-header";
import { SpinnerCard } from '../../../components/spinner-card/spinner-card';

import { TicketService } from '../../../services/ticket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-ticket-da-gestire',
    imports: [
    SectionHeader,
    SpinnerCard
],
    standalone: true,
    templateUrl: './ticket-da-gestire.html',
    styleUrl: './ticket-da-gestire.css',
})

export class TicketDaGestire implements OnInit {

    private router: Router = inject(Router);
    private ticketService: TicketService = inject(TicketService);
    private destroyRef = inject(DestroyRef);
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    isLoading = signal(false);

    ticketItems = [
        {
            label: 'Richieste servizi',
            value: 0,
            icon: 'it-folder',
        },
        {
            label: 'Incident',
            value: 0,
            icon: 'it-error',
        },
        {
            label: 'Accreditamenti',
            value: 2,
            icon: 'it-check',
        },
    ];

    ngOnInit(): void {
        this.getAllRichiesteTicket();
        this.getAllIncidentTicket();
    }

    private getAllRichiesteTicket() {
        this.isLoading.set(true);
        this.ticketService.getAllRichiesteTicket().pipe(

            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.isLoading.set(false))

        ).subscribe({
            next: (response) => {
                this.ticketItems[0].value = response.length;
                this.cdr.detectChanges()
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
                this.ticketItems[1].value = response.length;
                this.cdr.detectChanges()
            }
        });
    }

    goToTicket(section: string): void {
        switch (section) {
            case "Richieste servizi":
                this.router.navigateByUrl("home/ticket/richieste-servizi");
                break;

            case "Incident":
                this.router.navigateByUrl("home/ticket/incident");
                break;

            case "Accreditamenti":
                this.router.navigateByUrl("home/ticket/accreditamenti");
                break;
        }
    }

}