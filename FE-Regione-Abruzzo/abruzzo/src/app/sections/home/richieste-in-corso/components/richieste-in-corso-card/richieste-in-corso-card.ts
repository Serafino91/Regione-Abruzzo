import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RichiestaModel } from '../../../../../model/richiestaModel';

export interface Richieste {
  id: string;
  codice: string;
  nomeProgetto: string;
  tipoOperazione: string;
  dataOra: string;
  // stato: 'inviate' | 'in_valutazione' | 'in_elaborazione';
}

@Component({
  selector: 'app-richieste-in-corso-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './richieste-in-corso-card.html',
  styleUrl: './richieste-in-corso-card.css',
})
export class RichiesteInCorsoCard {
  @Input() dati!: RichiestaModel;

  constructor(private router: Router) {}

  apriDettaglio() {
    this.router.navigate(['/home/richieste/dettaglio-richiesta', this.dati.requestId]);
  }

  apriElencoServizi(event: Event): void {
    event.preventDefault();

  }
}
