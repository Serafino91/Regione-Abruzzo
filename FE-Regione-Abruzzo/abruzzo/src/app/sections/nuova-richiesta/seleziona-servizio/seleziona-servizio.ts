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
import { ServiceName } from '../../../constants/service-name.constants';
import { ServiceCategory } from '../../../constants/service-category.constants';
import { LabelServizio } from '../../../components/label-servizio/label-servizio';

interface RigaServizioForm {
  righeId: FormControl<number>;
  servizioId: FormControl<string>;
  categoriaId: FormControl<string>;
  unit: FormControl<number>;
  params: FormGroup;
  item: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-seleziona-servizio',
  imports: [ReactiveFormsModule, LabelServizio],
  templateUrl: './seleziona-servizio.html',
  styleUrl: './seleziona-servizio.css',
  standalone: true,
})
export class SelezionaServizio implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  protected readonly ServiceName = ServiceName;

  private nextRigaId = 0;

  categorie: CategoriaModel[] = [];
  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;
  expanded: boolean[] = [];

  @Input({ required: true })
  formGroup!: FormGroup;

  aggiungiServizioForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    servizio: new FormControl('', Validators.required),
    unit: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  // Lifecycle

  ngOnInit(): void {
    this.inizializzaForm();
    this.sincronizzaContatoreConRigheEsistenti();
    this.sottoscriviCambioCategoria();
    this.sottoscriviCambioServizio();
    this.getCategorie();
  }

  private sottoscriviCambioCategoria(): void {
    this.aggiungiServizioForm
      .get('categoria')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.popolaServizi(Number(id)));
  }

  private sottoscriviCambioServizio(): void {
    this.aggiungiServizioForm
      .get('servizio')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        if (id != null) {
          this.onServizioChange(id);
        }
      });
  }

  // Inizializzazione

  private inizializzaForm(): void {
    if (!this.formGroup.get('servizi')) {
      this.formGroup.addControl('servizi', new FormArray<FormGroup<RigaServizioForm>>([]));
    }
  }

  private sincronizzaContatoreConRigheEsistenti(): void {
    const righeIdEsistenti = this.serviziArray.controls
      .map((c) => Number(c.get('righeId')?.value))
      .filter((v) => !isNaN(v));

    this.nextRigaId = righeIdEsistenti.length > 0 ? Math.max(...righeIdEsistenti) + 1 : 0;
  }

  // Caricamento dati

  getCategorie(): void {
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
      });
  }

  onServizioChange(id: string): void {
    const servizio = this.servizi.find((s) => s.id === id);
    if (!servizio) {
      return;
    }
    this.servizio = servizio;
    this.cdr.detectChanges();
  }

  // Aggiunta / rimozione righe

  aggiungiServizi(): void {
    const { servizio: idServizio, unit, categoria: categoriaId } = this.aggiungiServizioForm.value;

    if (unit == null || idServizio == null || categoriaId == null) {
      return;
    }

    const servizio = this.servizi.find((s) => String(s.id) === String(idServizio));
    if (!servizio) {
      return;
    }

    for (let i = 0; i < unit; i++) {
      this.serviziArray.push(this.creaRigaServizio(servizio, categoriaId));
    }

    this.resetFormAggiunta();
  }

  private creaRigaServizio(servizio: ServizioModel, categoriaId: string): FormGroup {
    return new FormGroup({
      righeId: new FormControl(this.nextRigaId++),
      servizioId: new FormControl(servizio.id),
      categoriaId: new FormControl(categoriaId),
      unit: new FormControl(1),
      params: this.creaGruppoParametri(servizio),
      item: new FormControl(servizio.item),
      type: new FormControl(servizio.type),
    });
  }

  private creaGruppoParametri(servizio: ServizioModel): FormGroup {
    const paramsGroup = new FormGroup({});

    servizio.params.forEach((p) => {
      const min = p.minValue ?? 0;
      const max = p.maxValue ?? Number.MAX_SAFE_INTEGER;

      paramsGroup.addControl(
        p.name,
        new FormGroup({
          id: new FormControl(p.id),
          value: new FormControl(p.minValue ?? 0, [
            Validators.required,
            Validators.min(Number(min)),
            Validators.max(Number(max)),
          ]),
        }),
      );
    });

    return paramsGroup;
  }

  private resetFormAggiunta(): void {
    this.aggiungiServizioForm.reset({
      categoria: '',
      servizio: '',
      unit: 1,
    });
    this.servizi = [];
    this.servizio = undefined;
  }

  rimuoviServizio(index: number): void {
    this.serviziArray.removeAt(index);
  }

  // UI helpers

  toggleCollapse(index: number): void {
    this.expanded[index] = !this.expanded[index];
  }

  get serviziArray(): FormArray<FormGroup> {
    return this.formGroup.get('servizi') as FormArray<FormGroup>;
  }

  getParamMin(servizio: AbstractControl, param: string): number | null {
    const value = servizio.get(['params', param, 'min'])?.value;
    return value != null ? Number(value) : null;
  }

  getParamMax(servizio: AbstractControl, param: string): number | null {
    const value = servizio.get(['params', param, 'max'])?.value;
    return value != null ? Number(value) : null;
  }

  getParamControl(servizio: AbstractControl, param: string): FormControl {
    return servizio.get(['params', param, 'value']) as FormControl;
  }

  getKeys(paramsGroup: AbstractControl): string[] {
    return paramsGroup instanceof FormGroup ? Object.keys(paramsGroup.controls) : [];
  }

  onUnitInput(event: Event): void {
    const control = this.aggiungiServizioForm.get("unit");
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;

    if (isNaN(value)) {
      return;
    }

    const min = 1;
    const clamped = this.clamp(value, min, null);

    if (clamped !== value) {
      input.value = clamped.toString();
    }

    control?.setValue(clamped);
  }


  onParamInput(servizio: AbstractControl, param: string, event: Event): void {
    const control = this.getParamControl(servizio, param);
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;

    if (isNaN(value)) {
      return;
    }

    const min = this.getParamMin(servizio, param);
    const max = this.getParamMax(servizio, param);
    const clamped = this.clamp(value, min, max);

    if (clamped !== value) {
      input.value = clamped.toString();
    }

    control.setValue(clamped);
  }

  private clamp(value: number, min: number | null, max: number | null): number {
    let result = Math.max(value, 0);
    if (min !== null && result < min) {
      result = min;
    } else if (max !== null && result > max) {
      result = max;
    }
    return result;
  }
}
