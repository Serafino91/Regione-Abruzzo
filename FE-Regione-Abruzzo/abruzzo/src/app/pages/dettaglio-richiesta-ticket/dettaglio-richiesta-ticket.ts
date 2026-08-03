import { Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from "../../components/info-bar/info-bar";

@Component({
    selector: 'app-dettaglio-richiesta-ticket',
    imports: [
        PageHeader,
        InfoBar
    ],
    templateUrl: './dettaglio-richiesta-ticket.html',
    styleUrl: './dettaglio-richiesta-ticket.css',
})

export class DettaglioRichiestaTicket {

    infoRichiestaTicket = [
        {
            label: 'ID richiesta',
            value: "REQ_78",
            icon: 'it-file',
        },
        {
            label: 'Stato',
            value: "Inviata",
            icon: 'it-arrow-up',
        },
        {
            label: 'Data apertura',
            value: "31/07/2026",
            icon: 'it-calendar',
        },
    ];

}