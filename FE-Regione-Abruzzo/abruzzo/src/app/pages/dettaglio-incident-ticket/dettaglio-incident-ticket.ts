import { Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from "../../components/info-bar/info-bar";
import { TabellaFileIncidentTicket } from './tabella-file-incident-ticket/tabella-file-incident-ticket';
import { File } from '../../model/file.model';

@Component({
    selector: 'app-dettaglio-incident-ticket',
    imports: [
        PageHeader,
        InfoBar,
        TabellaFileIncidentTicket
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

    files: File[] = [];
    filesChiusuraIncident: File[] = [];

    isShowChiusuraIncident = false;

    onFileSelected(event: Event): void {
        if (event) {
            const inputFile = event.target as HTMLInputElement;

            if (inputFile && inputFile.files && inputFile.files.length > 0) {

                const fileId = this.files.length + 1;
                const name = inputFile.files[0].name;
                const size = inputFile.files[0].size;

                this.files = [...this.files, {fileId: fileId, file: inputFile.files[0], name: name, size: size}];
                
            }
        }
    }

    onDeleteFile(fileId: number): void {
        let filesFiltered = this.files.filter(f => f.fileId !== fileId);

        if (filesFiltered.length > 0){
            filesFiltered = filesFiltered.map((f, index) => ({...f, fileId: index + 1}));
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

                this.filesChiusuraIncident = [...this.filesChiusuraIncident, {fileId: fileId, file: inputFile.files[0], name: name, size: size}];
                
            }
        }
    }

    onDeleteFileChiusuraIncident(fileId: number): void {
        let filesFiltered = this.filesChiusuraIncident.filter(f => f.fileId !== fileId);

        if (filesFiltered.length > 0){
            filesFiltered = filesFiltered.map((f, index) => ({...f, fileId: index + 1}));
        }

        this.filesChiusuraIncident = [...filesFiltered];
    }

}