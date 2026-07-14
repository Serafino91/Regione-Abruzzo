import { Component, DestroyRef, inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { ServizioModel } from '../../../model/servizioModel';
import { ServiziService } from '../../../services/servizi.service';
import { CategoriaService } from '../../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../../model/categoria.model';
import {ServiceName} from "../../../constants/service-name.constants";
import {ServiceCategory} from "../../../constants/service-category.constants";
import {LabelServizio} from '../../../components/label-servizio/label-servizio';

@Component({
  selector: 'app-seleziona-servizio',
  imports: [ReactiveFormsModule, LabelServizio],
  templateUrl: './seleziona-servizio.html',
  styleUrl: './seleziona-servizio.css',
  standalone: true,
})
export class SelezionaServizio implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef); // <-- 1. Iniettiamo il ChangeDetectorRef
  protected readonly ServiceName = ServiceName;
  protected readonly ServiceCategory = ServiceCategory;

  categorie: CategoriaModel[] = [];
  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;

  @Input({ required: true })
  formGroup!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  aggiungiServizioForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    servizio: new FormControl('', Validators.required),
    unit: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  expanded: boolean[] = [];

  toggleCollapse(index: number): void {
    this.expanded[index] = !this.expanded[index];
  }
  ngOnInit(): void {
    this.inizializzaForm();

    this.aggiungiServizioForm
      .get('categoria')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.popolaServizi(Number(id)));

    this.aggiungiServizioForm
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

  private inizializzaForm(): void {
    if (!this.formGroup.get('servizi')) {
      this.formGroup.addControl('servizi', new FormArray([]));
    }
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
          this.cdr.detectChanges(); //
        },
        error: (err) => {
          console.error('Errore nel recupero servizi:', err);
        },
      });
  }

  onServizioChange(id: string): void {
    const servizio = this.servizi.find((s) => s.id === id);
    if (!servizio) return;
    this.servizio = servizio;
    this.cdr.detectChanges();
  }

  aggiungiServizi(): void {
    const idServizio = this.aggiungiServizioForm.get('servizio')?.value;
    const unit = this.aggiungiServizioForm.get('unit')?.value;
    const categoriaId = this.aggiungiServizioForm.get('categoria')?.value;

    if (unit == null || idServizio == null || categoriaId == null) {
      return;
    }

    const servizio = this.servizi.find((s) => String(s.id) === String(idServizio));
    if (!servizio) return;
    const servizi = this.formGroup.get('servizi') as FormArray;

    for (let i = 0; i < unit; i++) {
      const paramsGroup = new FormGroup({});
      servizio.params.forEach((p) => {
        paramsGroup.addControl(p.name, new FormControl(p.minValue ?? 0));
      });

      servizi.push(
        new FormGroup({
          servizioId: new FormControl(servizio.id),
          categoriaId: new FormControl(categoriaId),
          unit: new FormControl(unit),
          params: paramsGroup,
          item: new FormControl(servizio.item),
          type: new FormControl(servizio.type),
        }),
      );

      this.aggiungiServizioForm.reset({
        categoria: '',
        servizio: '',
        unit: 1,
      });
      this.servizi = [];
      this.servizio = undefined;
    }
  }

  get serviziArray(): FormArray {
    return this.formGroup.get('servizi') as FormArray;
  }

  getParamControl(servizio: AbstractControl, param: string): FormControl {
    return servizio.get(['params', param]) as FormControl;
  }

  rimuoviServizio(index: number): void {
    this.serviziArray.removeAt(index);
  }

  getKeys(control: AbstractControl): string[] {
    return control instanceof FormGroup ? Object.keys(control.controls) : [];
  }
}
