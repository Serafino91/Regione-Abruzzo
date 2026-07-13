import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from '../../components/table/table';


@Component({
  selector: 'app-progetti',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './progetti.html',
})
export class Progetti implements OnInit {
  listaProgetti: any[] = [];

  // Configurazione con le 8 colonne totali nell'ordine richiesto
  colonneProgetti: TableColumn[] = [
    { key: 'idProgetto', label: 'ID progetto', sortable: true, class: 'col-id' },
    { key: 'nomeProgetto', label: 'Nome progetto', sortable: true, class: 'col-nome' },
    { key: 'descrizione', label: 'Descrizione progetto', sortable: true, class: 'col-desc' },
    { key: 'dataCreazione', label: 'Data creazione', sortable: true, class: 'col-data' },
    { key: 'totaleServizi', label: 'Totale servizi', sortable: true, class: 'text-end col-small' },
    { key: 'richiesteAttive', label: 'Richieste attive', sortable: true, class: 'text-end col-small' },
    { key: 'incidentAperti', label: 'Incidenti aperti', sortable: true, class: 'text-end col-small' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-azioni' }
  ];

  ngOnInit(): void {
    // Mock dei dati strutturato con i campi separati
    this.listaProgetti = Array(6).fill(null).map((_, i) => ({
      idProgetto: 'REQ_1781595972077168',
      nomeProgetto: 'Nome Progetto Lorem ipsum dolor sit amet, consectetuer adipiscing...',
      descrizione: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque...',
      dataCreazione: 'GG/MM/AAAA',
      totaleServizi: i % 2 === 0 ? 2 : 15,
      richiesteAttive: i % 2 === 0 ? 1 : 15,
      incidentAperti: i % 2 === 0 ? '1' : '-'
    }));
  }

  // Risolve in sicurezza le chiavi nell'HTML, incluse eventuali proprietà annidate
  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}