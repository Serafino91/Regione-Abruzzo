import { Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from "../../components/info-bar/info-bar";

@Component({
    selector: 'app-dettaglio-accreditamento-ticket',
    imports: [
        PageHeader,
        InfoBar
    ],
    templateUrl: './dettaglio-accreditamento-ticket.html',
    styleUrl: './dettaglio-accreditamento-ticket.css',
})

export class DettaglioAccreditamentoTicket {

    infoIncidentTicket = [
        {
            label: 'Nome',
            value: "Mario",
            icon: 'it-user',
        },
        {
            label: 'Cognome',
            value: "Rossi",
            icon: 'it-user',
        },
        {
            label: 'Data richiesta',
            value: "31/07/2026",
            icon: 'it-calendar',
        },
    ];

    isShowRifiutoAccreditamento = false;

}