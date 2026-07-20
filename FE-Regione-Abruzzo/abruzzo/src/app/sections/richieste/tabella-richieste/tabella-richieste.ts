import { Component, Input, SimpleChanges } from '@angular/core';
import { TableColumn, TableComponent } from '../../../components/table/table';
import { RichiestaModel } from '../../../model/richiestaModel';
import { ServizioModel } from '../../../model/servizioModel';
// 🌟 Importiamo la costante e il tipo dal file appena creato
import { STATO_CONFIG, StatoRichiesta } from '../../../constants/request-state-badge.constants';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tabella-richieste',
  imports: [TableComponent, RouterLink],
  standalone: true,
  templateUrl: './tabella-richieste.html',
  styleUrl: './tabella-richieste.css',
})
export class TabellaRichieste {
  @Input() richieste: RichiestaModel[] = [];
  listaRichieste: any[] = [];

  colonneRichieste: TableColumn[] = [
    { key: 'state.config.label', label: 'Stato richiesta', sortable: true, class: 'col-stato' },
    { key: 'requestId', label: 'ID richiesta', sortable: true, class: 'col-reqid' },
    { key: 'project', label: 'Progetto', sortable: true, class: 'col-proj' },
    { key: 'service', label: 'Servizio', sortable: true, class: 'col-serv' },
    { key: 'category', label: 'Categoria', sortable: true, class: 'col-cat' },
    { key: 'createdAt', label: 'Data invio', sortable: true, class: 'col-data' },
    { key: 'azioni', label: 'Azioni', sortable: false, class: 'text-center col-azioni' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['richieste'] && this.richieste) {
      const datiUguali: any = this.richieste;
      const arrayRichieste: RichiestaModel[] = Array.isArray(datiUguali)
        ? datiUguali
        : datiUguali.requestsList || [];

      this.listaRichieste = arrayRichieste.flatMap((richiesta: RichiestaModel) => {
        const statoKey = this.getStatoKey(richiesta.state?.stateName);

        // 🌟 Usiamo la costante globale STATO_CONFIG al posto di this.statoConfig
        const config = STATO_CONFIG[statoKey] || STATO_CONFIG['incompleta'];

        const stateData = {
          ...richiesta.state,
          key: statoKey,
          config: config,
        };

        if (!richiesta.services || richiesta.services.length === 0) {
          return [
            {
              state: stateData,
              requestId: richiesta.requestId,
              project: richiesta.project?.name,
              service: 'Nessun servizio',
              category: richiesta.category?.name,
              createdAt: richiesta.createdAt,
            },
          ];
        }

        return richiesta.services.map((servizio: ServizioModel) => ({
          state: stateData,
          requestId: richiesta.requestId,
          project: richiesta.project?.name,
          service: servizio.item,
          category: richiesta.category?.name,
          createdAt: richiesta.createdAt,
        }));
      });
    }
  }

  private getStatoKey(stateName: string | undefined): StatoRichiesta {
    if (!stateName) return 'incompleta';
    const formatted = stateName.toLowerCase().replace(/\s+/g, '_');
    return formatted as StatoRichiesta;
  }

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}
