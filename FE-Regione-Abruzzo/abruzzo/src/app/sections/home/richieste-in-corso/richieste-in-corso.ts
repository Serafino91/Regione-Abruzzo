import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichiesteInCorsoCard, Richieste } from './components/richieste-in-corso-card/richieste-in-corso-card';
import {RouterLink} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RichiesteService } from '../../../services/richieste.service';
import { RichiestaModel } from '../../../model/richiestaModel';

@Component({
  selector: 'app-richieste-in-corso',
  standalone: true,
  imports: [CommonModule, RichiesteInCorsoCard, RouterLink],
  templateUrl: './richieste-in-corso.html',
})
export class RichiesteInCorso implements OnInit {
  statoSelezionato: 'inviate' | 'in valutazione' | 'in elaborazione' = 'in valutazione';

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  // tutteLeRichieste: Richieste[] = [
  //   {
  //     id: '1',
  //     codice: 'req_1234005670089',
  //     nomeProgetto: 'Progetto Artigiani',
  //     tipoOperazione: 'Aggiungi disco virtuale',
  //     dataOra: '22/01/2026 - 10:30',
  //     stato: 'in_valutazione',
  //   },
  //   {
  //     id: '2',
  //     codice: 'req_1234005670090',
  //     nomeProgetto: 'Progetto Artigiani',
  //     tipoOperazione: 'Nuova VLAN/Rete VM',
  //     dataOra: '22/01/2026 - 10:30',
  //     stato: 'in_valutazione',
  //   },
  //   {
  //     id: '3',
  //     codice: 'req_1234005670090',
  //     nomeProgetto: 'Link 2 Abruzzo',
  //     tipoOperazione: 'Aggiungi disco virtuale',
  //     dataOra: '23/01/2026 - 09:15',
  //     stato: 'inviate',
  //   },
  //   {
  //     id: '4',
  //     codice: 'req_1234005670091',
  //     nomeProgetto: 'Music & Festivals',
  //     tipoOperazione: 'Nuova VLAN/Rete VM',
  //     dataOra: '24/01/2026 - 15:00',
  //     stato: 'in_elaborazione',
  //   },
  // ];
  listaRichieste: RichiestaModel[] = [];
  constructor(private richiestaService: RichiesteService) {}

  setStato(nuovoStato: 'inviate' | 'in valutazione' | 'in elaborazione', event: Event) {
    event.preventDefault();
    this.statoSelezionato = nuovoStato;
  }

  get listaFiltrata(): RichiestaModel[] {
    return this.listaRichieste.filter((r) =>
       r.state.stateName === this.statoSelezionato);

  }

  getConteggio(stato: 'inviate' | 'in valutazione' | 'in elaborazione'): number {
    return this.listaRichieste.filter((r) => r.state.stateName === stato).length;
  }

  ngOnInit(): void {
    this.getRichieste();
  }

  private getRichieste() {
    this.richiestaService
      .getAllRichieste()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.listaRichieste = resp;
          console.log('resp richieste: ', this.listaRichieste);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
