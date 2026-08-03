import { Component } from '@angular/core';
import { TicketDaGestire } from '../../sections/home/ticket-da-gestire/ticket-da-gestire';
import { RichiesteInCorso } from '../../sections/home/richieste-in-corso/richieste-in-corso';
import { IncidentInCorso } from '../../sections/home/incident-in-corso/incident-in-corso';
import { ProgettiInCorso } from '../../sections/home/progetti-in-corso/progetti-in-corso';
import { Catalogo } from '../../sections/home/catalogo/catalogo';

@Component({
    selector: 'app-home',
    imports: [
        TicketDaGestire,
        RichiesteInCorso,
        IncidentInCorso,
        ProgettiInCorso,
        Catalogo
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
    standalone: true,
})

export class Home {

    isAdmin = true;

}
