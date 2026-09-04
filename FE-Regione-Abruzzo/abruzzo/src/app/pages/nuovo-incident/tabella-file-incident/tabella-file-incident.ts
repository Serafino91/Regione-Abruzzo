import { Component, input, output } from '@angular/core';
import { TableComponent, TableColumn } from '../../../components/table/table';
import { File } from '../../../model/file.model';

@Component({
    selector: 'app-tabella-file-incident',
    imports: [TableComponent],
    templateUrl: './tabella-file-incident.html',
    styleUrl: './tabella-file-incident.css',
})

export class TabellaFileIncident {

    colonneFileIncident: TableColumn[] = [
        { key: 'name', label: 'Nome file', sortable: false, class: 'col-small' },
        { key: 'size', label: 'Dimensione', sortable: false, class: 'col-small' },
        { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-actions' }
    ];

    files = input.required<File[]>();

    fileId = output<number>();

    getValue(row: any, key: string): string {
        if (!key) return '';
        return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
    }

    onDelete(fileId: number): void {
        this.fileId.emit(fileId);
    }

}