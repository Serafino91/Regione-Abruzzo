import { Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from "../../components/info-bar/info-bar";

@Component({
    selector: 'app-dettaglio-incident-ticket',
    imports: [
        PageHeader,
        InfoBar
    ],
    templateUrl: './dettaglio-incident-ticket.html',
    styleUrl: './dettaglio-incident-ticket.css',
})

export class DettaglioIncidentTicket {

    infoIncidentTicket = [
        {
            label: 'ID progetto',
            value: "T784354JIUU34534",
            icon: 'it-file',
        },
        {
            label: 'Stato',
            value: "Aperto",
            icon: 'it-unlocked',
        },
        {
            label: 'Data apertura',
            value: "31/07/2026",
            icon: 'it-calendar',
        },
    ];

    isShowChiusuraIncident = false;

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;

        console.log("file inserito: ", input.files);
    }

}