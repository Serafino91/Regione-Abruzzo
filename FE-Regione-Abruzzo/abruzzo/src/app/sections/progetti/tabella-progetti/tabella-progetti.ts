import { Component, Input, SimpleChanges } from '@angular/core';
import { ProgettoModel } from '../../../model/progetto.model';
import { TableColumn, TableComponent } from '../../../components/table/table';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tabella-progetti',
  imports: [TableComponent, RouterLink],
  standalone: true,
  templateUrl: './tabella-progetti.html',
  styleUrl: './tabella-progetti.css',
})
export class TabellaProgetti {
  @Input() progetti: ProgettoModel[] = [];

  listaProgetti: any[] = [];

  colonneProgetti: TableColumn[] = [
    { key: 'idProgetto', label: 'ID progetto', sortable: true, class: 'col-id' },
    { key: 'nomeProgetto', label: 'Nome progetto', sortable: true, class: 'col-nome' },
    { key: 'descrizione', label: 'Descrizione progetto', sortable: true, class: 'col-desc' },
    { key: 'dataCreazione', label: 'Data creazione', sortable: true, class: 'col-data' },
    { key: 'totaleServizi', label: 'Totale servizi', sortable: true, class: 'text-end col-small' },
    {
      key: 'richiesteAttive',
      label: 'Richieste attive',
      sortable: true,
      class: 'text-end col-small',
    },
    {
      key: 'incidentAperti',
      label: 'Incidenti aperti',
      sortable: true,
      class: 'text-end col-small',
    },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-azioni' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progetti']) {
      this.listaProgetti = this.progetti.map((progetto, i) => ({
        // campi reali

        idProgetto: progetto.idProgetto,
        nomeProgetto: progetto.nome,
        descrizione: progetto.description,
        dataCreazione: progetto.dataCreazione,

        // campi mock
        totaleServizi: i % 2 === 0 ? 2 : 15,
        richiesteAttive: i % 2 === 0 ? 1 : 15,
        incidentAperti: i % 2 === 0 ? '1' : '-',
      }));
    }
  }

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}
