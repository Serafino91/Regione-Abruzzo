import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { TabellaRichieste } from '../../sections/richieste/tabella-richieste/tabella-richieste';
import { RichiestaModel } from '../../model/richiestaModel';
import { CategoriaService } from '../../services/categoria.service';
import { RichiesteService } from '../../services/richieste.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaModel } from '../../model/categoria.model';
import { Filtri } from '../../sections/richieste/filtri/filtri';
import { FiltroRichiestaCriteriaModel } from '../../model/filtro-richiesta-criteria.model';
import { PageHeader } from '../../components/page-header/page-header';
import { finalize } from 'rxjs';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-richieste',
    imports: [TabellaRichieste, ReactiveFormsModule, Filtri, PageHeader, SpinnerCard],
    templateUrl: './richieste.html',
    styleUrl: './richieste.css',
    standalone: true,
})

export class Richieste implements OnInit {

    categorie: CategoriaModel[] = [];
    listaRichieste: RichiestaModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);

    constructor(
        private richiestaService: RichiesteService,
        private categoriaService: CategoriaService,
    ) { }

    ngOnInit(): void {
        this.getRichieste();
        this.getCategorie();
    }

    private getRichieste() {
        this.isLoading.set(true);
        this.richiestaService.getAllRichieste().pipe(

          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false))

        ).subscribe({
          next: (resp) => {
            this.listaRichieste = resp;
            this.cdr.detectChanges();
          }
        });
    }

    getCategorie() {
        this.isLoading.set(true);
        this.categoriaService.getCategorie().pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false))
        ).subscribe({
          next: (resp) => {
            this.categorie = resp;
            this.cdr.detectChanges();
          }
        });
    }

    onFiltra(criteria: FiltroRichiestaCriteriaModel): void {
        this.isLoading.set(true);
        this.richiestaService.filterRichieste(criteria).pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false))
        ).subscribe({
          next: (richieste) => {
            this.listaRichieste = richieste;
            this.cdr.detectChanges();
          }
        });
    }

    onResetFiltri(): void {
        this.getRichieste();
    }


}
