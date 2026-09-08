import { Component, input } from '@angular/core';
import { TableComponent, TableColumn } from '../../../components/table/table';
import { File } from '../../../model/file.model';

@Component({
    selector: 'app-tabella-file-incident-dettaglio',
    imports: [TableComponent],
    standalone: true,
    templateUrl: './tabella-file-incident-dettaglio.html',
    styleUrl: './tabella-file-incident-dettaglio.css',
})

export class TabellaFileIncidentDettaglio {

    colonneFileIncident: TableColumn[] = [
        { key: 'name', label: 'Nome file', sortable: false, class: 'col-small' },
        { key: 'size', label: 'Dimensione', sortable: false, class: 'col-small' },
        { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-actions' }
    ];

    files = input.required<File[]>();

    getValue(row: any, key: string): string {
        if (!key) return '';
        return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
    }

}
