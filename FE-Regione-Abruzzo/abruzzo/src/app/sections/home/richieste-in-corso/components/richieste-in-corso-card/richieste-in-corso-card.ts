import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Richieste {
  id: string;
  codice: string;
  nomeProgetto: string;
  tipoOperazione: string;
  dataOra: string;
  stato: 'inviate' | 'in_valutazione' | 'in_elaborazione';
}

@Component({
  selector: 'app-richieste-in-corso-card', // Con la "e" al plurale
  standalone: true,
  imports: [CommonModule],
  templateUrl: './richieste-in-corso-card.html'
})
export class RichiesteInCorsoCard {
  @Input() dati!: Richieste;
}