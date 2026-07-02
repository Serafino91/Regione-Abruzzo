import { Component, DestroyRef, inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


import { ServizioModel } from '../../../model/servizioModel';
import { ServiziService } from '../../../services/servizi.service';
import { CategoriaService } from '../../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../../model/categoria.model';
import {ServiceName} from "../../../constants/service-name.constants";
import {ServiceCategory} from "../../../constants/service-category.constants";


@Component({
  selector: 'app-seleziona-servizio',
  imports: [ReactiveFormsModule],
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
  unit: number = 0;

  @Input({ required: true })
  formGroup!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  ngOnInit(): void {
    // 2. Prima inizializziamo i controlli del form in modo sicuro
    this.inizializzaForm();

    // 3. Ascoltiamo i cambiamenti reattivi
    this.formGroup
      .get('categoria')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.popolaServizi(id));

    this.formGroup
      .get('servizio')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.onServizioChange(id));

    // 4. Per ultimo, chiamiamo l'API asincrona
    this.getCategorie();
  }

  private inizializzaForm(): void {
    if (!this.formGroup.get('categoria')) {
      this.formGroup.addControl('categoria', new FormControl('', Validators.required));
    }
    if (!this.formGroup.get('servizio')) {
      this.formGroup.addControl('servizio', new FormControl('', Validators.required));
    }
    if (!this.formGroup.get('unit')) {
      this.formGroup.addControl('unit', new FormControl('', Validators.required));
    }
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
          this.cdr.detectChanges(); // <-- 5. Forza l'aggiornamento visivo del DOM delle categorie
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
          this.cdr.detectChanges(); // <-- 6. Forza l'aggiornamento visivo del DOM dei servizi
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
    this.cdr.detectChanges(); // <-- 7. Consigliato anche qui per il form dinamico sottostante
  }

  aggiungiServizi(): void {
    const idServizio = this.formGroup.get('servizio')?.value;
    const unit = this.formGroup.get('unit')?.value;
    const categoriaId = this.formGroup.get('categoria')?.value;

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
        }),
      );

      this.formGroup.patchValue({
        categoria: '',
        servizio: '',
        unit: '',
      });

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
