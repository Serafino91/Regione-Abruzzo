import { Component, Input } from '@angular/core';
import {TableColumn, TableComponent} from '../table/table';
import {ServizioModel} from '../../model/servizioModel';



@Component({
  selector: 'app-tabella-servizi-progetto',
  imports: [TableComponent],
  standalone: true,
  templateUrl: './tabella-servizi-progetto.html',
  styleUrl: './tabella-servizi-progetto.css',
})
export class TabellaServiziProgetto {


  @Input() data!: any[];

  colonneServizi: TableColumn[] = [
    { key: 'idServizio', label: 'ID Servizio', sortable: true, class: 'col-id' },
    { key: 'servizio', label: 'Servizio', sortable: true, class: 'col-nome' },
    { key: 'categoria', label: 'Categoria', sortable: true, class: 'col-desc' },
  ];

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}
