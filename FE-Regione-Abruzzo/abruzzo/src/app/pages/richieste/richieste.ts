import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TabellaRichieste } from '../../sections/richieste/tabella-richieste/tabella-richieste';
import { RichiestaModel } from '../../model/richiestaModel';
import { CategoriaService } from '../../services/categoria.service';
import { RichiesteService } from '../../services/richieste.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoriaModel} from '../../model/categoria.model';
import {Filtri} from '../../sections/richieste/filtri/filtri';
import { FiltroRichiestaCriteriaModel } from '../../model/filtro-richiesta-criteria.model';
import {PageHeader} from '../../components/page-header/page-header';

@Component({
  selector: 'app-richieste',
  imports: [TabellaRichieste, ReactiveFormsModule, Filtri, PageHeader],
  templateUrl: './richieste.html',
  styleUrl: './richieste.css',
  standalone: true,
})
export class Richieste implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  categorie: CategoriaModel[] = [];
  constructor(
    private richiestaService: RichiesteService,
    private categoriaService: CategoriaService,
  ) {}

  ngOnInit(): void {
    this.getRichieste();
    this.getCategorie();
  }

  listaRichieste: RichiestaModel[] = [];

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

  getCategorie() {
    this.categoriaService
      .getCategorie()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.categorie = resp;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore categorie:', err);
        },
      });
  }

  onFiltra(criteria: FiltroRichiestaCriteriaModel): void {
    this.richiestaService
      .filterRichieste(criteria)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (richieste) => {
          this.listaRichieste = richieste;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore durante il filtro delle richieste:', err);
        },
      });
  }

  onResetFiltri(): void {
    this.getRichieste();
  }
}

