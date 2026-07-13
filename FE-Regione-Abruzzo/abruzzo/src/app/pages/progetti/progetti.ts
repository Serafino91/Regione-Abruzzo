import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn} from '../../components/table/table';


@Component({
  selector: 'app-progetti',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './progetti.html',
  styleUrl: './progetti.css' // Se hai un file CSS specifico per questa pagina
})
export class Progetti implements OnInit {
  listaProgetti: any[] = [];

  colonneProgetti: TableColumn[] = [
    { key: 'idProgetto', label: 'ID progetto', sortable: true, class: 'col-id' },
    { key: 'nomeProgetto', label: 'Nome progetto', sortable: true, class: 'col-nome' },
    { key: 'descrizione', label: 'Descrizione progetto', sortable: true, class: 'col-desc' },
    { key: 'totaleServizi', label: 'Totale servizi', sortable: true, class: 'col-servizi text-end' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'col-azioni text-center' }
  ];

  ngOnInit(): void {
    // Mock dei dati per riflettere lo screenshot fornito
    this.listaProgetti = Array(6).fill(null).map((_, i) => ({
      idProgetto: 'REQ_1781595972077168',
      nomeProgetto: 'Nome Progetto Lorem ipsum dolor sit amet, consectetuer adipiscing...',
      descrizione: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque...',
      totaleServizi: i % 2 === 0 ? 2 : (i % 3 === 0 ? 15 : 8)
    }));
  }

  // Risolve in sicurezza le chiavi nell'HTML (es. per future chiavi annidate come 'utente.nome')
  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}