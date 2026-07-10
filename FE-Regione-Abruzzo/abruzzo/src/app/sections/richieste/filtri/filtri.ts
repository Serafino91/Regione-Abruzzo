import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RichiestaModel } from '../../../model/richiestaModel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../../model/categoria.model';
import { RichiesteService } from '../../../services/richieste.service';
import { CategoriaService } from '../../../services/categoria.service';
import { ServizioModel } from '../../../model/servizioModel';
import { ServiziService } from '../../../services/servizi.service';
import { RequestState } from '../../../constants/request-state-constants';

@Component({
  selector: 'app-filtri',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri.html',
  styleUrl: './filtri.css',
})
export class Filtri {
  categorie: CategoriaModel[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;
  requestStates = Object.entries(RequestState).map(([key, value]) => ({
    key,
    value,
  }));
  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  filtersForm = new FormGroup({
    stato: new FormControl(''),
    categoria: new FormControl(null),
    dataDa: new FormControl(null),
    dataA: new FormControl(null),
    servizio: new FormControl(null),
  });

  ngOnInit(): void {
    this.filtersForm
      .get('categoria')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.popolaServizi(Number(id)));

    this.filtersForm
      .get('servizio')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        if (id == null) {
          return;
        }
        this.onServizioChange(id);
      });

    this.getCategorie();
  }

  onServizioChange(id: string): void {
    const servizio = this.servizi.find((s) => s.id === id);
    if (!servizio) return;
    this.servizio = servizio;
    this.cdr.detectChanges();
  }
  popolaServizi(idCategoria: number): void {
    if (!idCategoria) {
      this.servizi = [];
      this.cdr.detectChanges();
      return;
    }

    this.serviziService
      .getServiziDaCategoria(idCategoria)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.servizi = resp;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero servizi:', err);
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
  applicaFiltri() {}
  eliminaFiltri() {
    this.filtersForm.reset();
  }
}
