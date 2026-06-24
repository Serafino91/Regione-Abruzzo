import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Richieste {
  id: string;
  codice: string;
  nomeProgetto: string;
  tipoOperazione: string;
  dataOra: string;
  stato: 'inviate' | 'in_valutazione' | 'in_elaborazione';
}

@Component({
  selector: 'app-richieste-in-corso-card', 
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './richieste-in-corso-card.html'
})
export class RichiesteInCorsoCard {
  @Input() dati!: Richieste;
}