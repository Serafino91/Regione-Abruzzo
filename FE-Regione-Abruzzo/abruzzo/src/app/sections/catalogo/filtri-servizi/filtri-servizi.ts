import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaService } from '../../../services/categoria.service';
import { ServiziService } from '../../../services/servizi.service';
import { ServizioModel } from '../../../model/servizioModel';
import { CategoriaModel } from '../../../model/categoria.model';
import {FiltroProgettoCriteriaModel} from '../../../constants/filtro-progetto-criteria.model';
import {FiltroServiziCriteriaModel} from '../../../constants/filtro-servizi-criteria.model';
import {FiltroRichiestaCriteriaModel} from '../../../model/filtro-richiesta-criteria.model';

@Component({
  selector: 'app-filtri-servizi',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri-servizi.html',
  styleUrl: './filtri-servizi.css',
})
export class FiltriServizi {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  categorie: CategoriaModel[] = [];
  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;

  @Output() filtra = new EventEmitter<FiltroServiziCriteriaModel>();
  @Output() reset = new EventEmitter<void>();

  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  filtersForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    servizio: new FormControl('', Validators.required),
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

  popolaServizi(idCategoria: number): void {
    this.servizio = undefined;
    this.filtersForm.get('servizio')?.setValue('', { emitEvent: false });

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
          this.cdr.detectChanges(); //
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
      });
  }

  onServizioChange(id: string): void {
    if (!id) {
      this.servizio = undefined;
      this.cdr.detectChanges();
      return;
    }
    const servizio = this.servizi.find((s) => String(s.id) === String(id));
    if (!servizio) return;
    this.servizio = servizio;
    this.cdr.detectChanges();
  }

  applicaFiltri() {
    const criteria: FiltroRichiestaCriteriaModel = {
      categoryId: this.filtersForm.value.categoria
        ? Number(this.filtersForm.value.categoria)
        : undefined,

      serviceIds: this.filtersForm.value.servizio
        ? [Number(this.filtersForm.value.servizio)]
        : undefined,
    };

    this.filtra.emit(criteria);
  }

  resetFiltri() {
    this.filtersForm.reset();
    this.servizi = [];
    this.servizio = undefined;
    this.reset.emit();
  }
}
