import { Component, OnInit, OnDestroy, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichiesteInCorsoCard } from './components/richieste-in-corso-card/richieste-in-corso-card';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RichiesteService } from '../../../services/richieste.service';
import { RichiestaModel } from '../../../model/richiestaModel';
import { Alert } from '../../../components/alert/alert';
import { finalize, Subscription } from 'rxjs';
import { SpinnerCard } from '../../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-richieste-in-corso',
    standalone: true,
    imports: [CommonModule, RichiesteInCorsoCard, RouterLink, Alert, SpinnerCard],
    templateUrl: './richieste-in-corso.html',
})

export class RichiesteInCorso implements OnInit, OnDestroy {

    statoSelezionato: 'Inviate' | 'In valutazione' | 'In elaborazione' = 'In valutazione';
    listaRichieste: RichiestaModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    private subscriptions: Subscription[] = [];

    constructor(
        private richiestaService: RichiesteService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getRichieste();
    }

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

    private getRichieste() {
        this.isLoading.set(true);

        this.subscriptions.push(
            this.richiestaService.getAllRichieste().pipe(

                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
                next: (resp) => {
                    this.listaRichieste = resp;
                    this.cdr.detectChanges();
                },
            })
        );
    }

    apriDettaglio(id: string) {
        this.router.navigate(['/home/richieste/dettaglio-richiesta', id]);
    }

    ngOnDestroy(): void {
        this.subscriptions.map((s: Subscription) => s.unsubscribe());
    }

}