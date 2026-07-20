import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichiesteInCorsoCard, Richieste } from './components/richieste-in-corso-card/richieste-in-corso-card';
import { Router, RouterLink } from '@angular/router';
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
  statoSelezionato: 'Inviate' | 'In valutazione' | 'In elaborazione' = 'In valutazione';

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  listaRichieste: RichiestaModel[] = [];
  constructor(
    private richiestaService: RichiesteService,
    private router: Router,
  ) {}

  setStato(nuovoStato: 'Inviate' | 'In valutazione' | 'In elaborazione', event: Event) {
    event.preventDefault();
    this.statoSelezionato = nuovoStato;
  }
  get listaFiltrata(): RichiestaModel[] {
    return this.listaRichieste.filter((r) => r.state.stateName === this.statoSelezionato);
  }
  getConteggio(stato: 'Inviate' | 'In valutazione' | 'In elaborazione'): number {
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

  apriDettaglio(id: string) {
    this.router.navigate(['/home/richieste/dettaglio-richiesta', id]);
  }
}
