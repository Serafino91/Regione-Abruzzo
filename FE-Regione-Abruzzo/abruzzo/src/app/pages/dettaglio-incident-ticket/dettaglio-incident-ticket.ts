import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from "../../components/info-bar/info-bar";

import { TabellaFileIncidentTicket } from './tabella-file-incident-ticket/tabella-file-incident-ticket';
import { File } from '../../model/file.model';

import { TicketService } from '../../services/ticket.service';
import { TicketModel } from '../../model/ticket.model';
import { getStatoRichiesta } from '../../constants/incident-state-icon.constants';

import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-dettaglio-incident-ticket',
    imports: [
        PageHeader,
        InfoBar,
        TabellaFileIncidentTicket
    ],
    standalone: true,
    templateUrl: './dettaglio-incident-ticket.html',
    styleUrl: './dettaglio-incident-ticket.css',
})

export class DettaglioIncidentTicket implements OnInit {

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private ticketService: TicketService = inject(TicketService);

    incidentId = this.activatedRoute.snapshot.paramMap.get('id')!;
    incidentDettaglio!: TicketModel;
    infoIncidentTicket: any;

    files: File[] = [];
    filesChiusuraIncident: File[] = [];

    isLoading = signal(false);
    isShowChiusuraIncident = false;

    ngOnInit(): void {
        this.getIncidentTicket();
    }

    private getIncidentTicket(): void {
        this.isLoading.set(true);

        this.ticketService.getTicketDetail(this.incidentId).pipe(

            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.isLoading.set(false))

        ).subscribe({
            next: (resp: any) => {
                this.incidentDettaglio = resp.serviceDetail ?? resp;
                const stato = getStatoRichiesta(this.incidentDettaglio.state.id);
                console.log(this.incidentDettaglio);

                this.infoIncidentTicket = [
                    {
                        label: 'Codice',
                        value: (this.incidentDettaglio.code && this.incidentDettaglio.code !== '') ? this.incidentDettaglio.code : '',
                        icon: 'it-file',
                    },
                    {
                        label: 'Stato',
                        value: this.incidentDettaglio.state.name,
                        icon: stato?.icon,
                    },
                    {
                        label: 'Data Apertura',
                        value: this.incidentDettaglio.openingDate,
                        icon: 'it-calendar',
                    },
                ];
                this.cdr.detectChanges();
            }
        });
    }

    onFileSelected(event: Event): void {
        if (event) {
            const inputFile = event.target as HTMLInputElement;

            if (inputFile && inputFile.files && inputFile.files.length > 0) {

                const fileId = this.files.length + 1;
                const name = inputFile.files[0].name;
                const size = inputFile.files[0].size;

                this.files = [...this.files, { fileId: fileId, file: inputFile.files[0], name: name, size: size }];

            }
        }
    }

    onDeleteFile(fileId: number): void {
        let filesFiltered = this.files.filter(f => f.fileId !== fileId);

        if (filesFiltered.length > 0) {
            filesFiltered = filesFiltered.map((f, index) => ({ ...f, fileId: index + 1 }));
        }

        this.files = [...filesFiltered];
    }

    onFileSelectedChiusura(event: Event): void {
        if (event) {
            const inputFile = event.target as HTMLInputElement;

            if (inputFile && inputFile.files && inputFile.files.length > 0) {

                const fileId = this.filesChiusuraIncident.length + 1;
                const name = inputFile.files[0].name;
                const size = inputFile.files[0].size;

                this.filesChiusuraIncident = [...this.filesChiusuraIncident, { fileId: fileId, file: inputFile.files[0], name: name, size: size }];

            }
        }
    }

    onDeleteFileChiusuraIncident(fileId: number): void {
        let filesFiltered = this.filesChiusuraIncident.filter(f => f.fileId !== fileId);

        if (filesFiltered.length > 0) {
            filesFiltered = filesFiltered.map((f, index) => ({ ...f, fileId: index + 1 }));
        }

        this.filesChiusuraIncident = [...filesFiltered];
    }

}
