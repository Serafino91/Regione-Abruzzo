import { Component } from '@angular/core';
import { SectionHeader } from "../../../components/section-header/section-header";

@Component({
  selector: 'app-ticket-da-gestire',
  imports: [SectionHeader],
  standalone: true,
  templateUrl: './ticket-da-gestire.html',
  styleUrl: './ticket-da-gestire.css',
})

export class TicketDaGestire {

    ticketItems = [
        {
            label: 'Richieste servizi',
            value: '12',
            icon: 'it-settings',
        },
        {
            label: 'Incident',
            value: '5',
            icon: 'it-warning-circle',
        },
        {
            label: 'Accreditamenti',
            value: '2',
            icon: 'it-user',
        },
    ];

}
