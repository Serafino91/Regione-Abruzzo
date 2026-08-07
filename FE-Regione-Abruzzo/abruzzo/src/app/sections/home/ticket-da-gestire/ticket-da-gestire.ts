import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SectionHeader } from "../../../components/section-header/section-header";

@Component({
    selector: 'app-ticket-da-gestire',
    imports: [SectionHeader],
    standalone: true,
    templateUrl: './ticket-da-gestire.html',
    styleUrl: './ticket-da-gestire.css',
})

export class TicketDaGestire {

    private router: Router = inject(Router);

    ticketItems = [
        {
            label: 'Richieste servizi',
            value: '12',
            icon: 'it-folder',
        },
        {
            label: 'Incident',
            value: '5',
            icon: 'it-error',
        },
        {
            label: 'Accreditamenti',
            value: '2',
            icon: 'it-check',
        },
    ];

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
