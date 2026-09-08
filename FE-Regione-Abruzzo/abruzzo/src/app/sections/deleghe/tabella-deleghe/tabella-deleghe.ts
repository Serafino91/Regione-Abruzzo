import { Component, Input } from '@angular/core';
import {TableColumn, TableComponent} from '../../../components/table/table';

@Component({
  selector: 'app-tabella-deleghe',
  imports: [TableComponent],
  standalone: true,
  templateUrl: './tabella-deleghe.html',
  styleUrl: './tabella-deleghe.css',
})
export class TabellaDeleghe {
  @Input() deleghe: any[] = [];
  colonneDeleghe: TableColumn[] = [
    { key: 'idDelega', label: 'ID Delegato', sortable: true, class: 'col-stato' },
    { key: 'nome', label: 'Nome e Cognome delegato', sortable: true, class: 'col-reqid' },
    { key: 'Categoria', label: 'Progetti in Gestione', sortable: true, class: 'col-cat' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-azioni' },
  ];

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}
