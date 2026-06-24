import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importiamo la classe aggiornata "RichiestaInCorsoCard"
import { RichiesteInCorsoCard, Richieste } from './components/richieste-in-corso-card/richieste-in-corso-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-richieste-in-corso',
  standalone: true,
  imports: [CommonModule, RichiesteInCorsoCard, RouterLink], // Aggiornato anche qui
  templateUrl: './richieste-in-corso.html',
})
export class RichiesteInCorso {
  statoSelezionato: 'inviate' | 'in_valutazione' | 'in_elaborazione' = 'in_valutazione';

  tutteLeRichieste: Richieste[] = [
    {
      id: '1',
      codice: 'req_1234005670089',
      nomeProgetto: 'Nome Progetto Lorem ipsum dolor sit amet',
      tipoOperazione: 'Aggiungi disco virtuale',
      dataOra: '22/01/2026 - 10:30',
      stato: 'in_valutazione',
    },
    {
      id: '2',
      codice: 'req_1234005670089',
      nomeProgetto: 'Nome Progetto Lorem ipsum dolor sit amet',
      tipoOperazione: 'Nuova VLAN/Rete VM',
      dataOra: '22/01/2026 - 10:30',
      stato: 'in_valutazione',
    },
    {
      id: '3',
      codice: 'req_1234005670090',
      nomeProgetto: 'Progetto Cloud di Test',
      tipoOperazione: 'Aggiungi disco virtuale',
      dataOra: '23/01/2026 - 09:15',
      stato: 'inviate',
    },
    {
      id: '4',
      codice: 'req_1234005670091',
      nomeProgetto: 'Infrastruttura Core',
      tipoOperazione: 'Nuova VLAN/Rete VM',
      dataOra: '24/01/2026 - 15:00',
      stato: 'in_elaborazione',
    },
  ];

  setStato(nuovoStato: 'inviate' | 'in_valutazione' | 'in_elaborazione', event: Event) {
    event.preventDefault();
    this.statoSelezionato = nuovoStato;
  }

  get listaFiltrata(): Richieste[] {
    return this.tutteLeRichieste.filter((r) => r.stato === this.statoSelezionato);
  }

  getConteggio(stato: 'inviate' | 'in_valutazione' | 'in_elaborazione'): number {
    return this.tutteLeRichieste.filter((r) => r.stato === stato).length;
  }
}
