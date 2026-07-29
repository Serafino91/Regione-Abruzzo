import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaService } from '../../../services/categoria.service';
import { ServiziService } from '../../../services/servizi.service';
import { ServizioModel } from '../../../model/servizioModel';
import { CategoriaModel } from '../../../model/categoria.model';

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

  @Output() risultatiCerca = new EventEmitter<ServizioModel[]>();

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

  onServizioChange(id: string): void {
    const servizio = this.servizi.find((s) => String(s.id) === String(id));
    if (!servizio) return;
    this.servizio = servizio;
    this.cdr.detectChanges();
  }

  cercaServizi(): void {
    if (this.servizio) {
      this.risultatiCerca.emit([this.servizio]);
    } else {
      this.risultatiCerca.emit([...this.servizi]);
    }
  }
}
