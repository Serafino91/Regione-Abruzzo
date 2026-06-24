import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RichiestaModel } from '../../model/richiestaModel';

export type StatoRichiesta =
  | 'in_elaborazione'
  | 'in_valutazione'
  | 'rifiutata'
  | 'completata'
  | 'incompleta';

export type SortColumn = 'state' | 'requestId' | 'project' | 'service' | 'category' | 'createdAt';
export type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-richieste-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './richieste-table.html',
  styleUrl: './richieste-table.css',
})
export class RichiesteTable implements OnChanges {
  @Input() dati: RichiestaModel[] = [];
  constructor() {
    console.log("dati",this.dati);
  }
  itemsPerPage = 10;
  currentPage = 1;
  sortColumn: SortColumn = 'createdAt';
  sortDir: SortDir = 'desc';

  perPageOptions = [5, 10, 20, 50];

  readonly statoConfig: Record<
    StatoRichiesta,
    { label: string; colorBorder: string; colorBg: string; colorText: string }
  > = {
    in_elaborazione: {
      label: 'In elaborazione',
      colorBorder: '#0066CC',
      colorBg: '#e8f1fb',
      colorText: '#0066CC',
    },
    in_valutazione: {
      label: 'In valutazione',
      colorBorder: '#fd7e14',
      colorBg: '#fff4e8',
      colorText: '#c45b00',
    },
    rifiutata: {
      label: 'Rifiutata',
      colorBorder: '#d9364f',
      colorBg: '#fdedf0',
      colorText: '#d9364f',
    },
    completata: {
      label: 'Completata',
      colorBorder: '#1a8a5a',
      colorBg: '#e6f5ef',
      colorText: '#1a8a5a',
    },
    incompleta: {
      label: 'Incompleta',
      colorBorder: '#6c757d',
      colorBg: '#f0f1f2',
      colorText: '#4a5056',
    },
  };

  getStatoConfig(stateName: string | undefined) {
    const key = (stateName ?? '').toLowerCase().replace(/ /g, '_') as StatoRichiesta;
    return this.statoConfig[key] ?? this.statoConfig['incompleta'];
  }

  get sorted(): RichiestaModel[] {
    return [...this.dati].sort((a, b) => {
      const va = (a[this.sortColumn] ?? '') as string;
      const vb = (b[this.sortColumn] ?? '') as string;
      return this.sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }

  get totalResults(): number {
    return this.dati.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalResults / this.itemsPerPage));
  }

  get paginated(): RichiestaModel[] {
    debugger;
    console.log("dentro")
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.sorted.slice(start, start + this.itemsPerPage);
  }

  ngOnChanges(): void {
    this.currentPage = 1;
    console.log('[RichiesteTable] dati ricevuti:', this.dati);
    if (this.dati?.length) {
      const first = this.dati[0];
      console.log('[RichiesteTable] primo elemento - requestId:', first.requestId, '| state:', first.state, '| project:', first.project);
    }
  }

  sort(col: SortColumn): void {
    if (this.sortColumn === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDir = 'asc';
    }
  }

  onPerPageChange(): void {
    this.currentPage = 1;
  }
  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
