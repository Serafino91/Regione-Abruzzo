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

interface ParamForm {
  id: FormControl<number>;
  value: FormControl<number>;
  min: FormControl<number>;
  max: FormControl<number>;
}
interface ServizioForm {
  params: FormGroup<{ [key: string]: FormGroup<ParamForm> }>;
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
  private cdr = inject(ChangeDetectorRef); // <-- 1. Iniettiamo il ChangeDetectorRef
  protected readonly ServiceName = ServiceName;
  protected readonly ServiceCategory = ServiceCategory;
  private nextRigaId = 0;

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
    this.sincronizzaContatoreConRigheEsistenti();

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

  private sincronizzaContatoreConRigheEsistenti(): void {
    const righeIdEsistenti = this.serviziArray.controls
      .map((c) => Number(c.get('righeId')?.value))
      .filter((v) => !isNaN(v));

    this.nextRigaId = righeIdEsistenti.length > 0 ? Math.max(...righeIdEsistenti) + 1 : 0;
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
        paramsGroup.addControl(
          p.name,
          new FormGroup({
            id: new FormControl(p.id),
            value: new FormControl(p.minValue ?? 0, [
              Validators.required,
              Validators.min(Number(p.minValue)),
              Validators.max(Number(p.maxValue)),
            ]),
          }),
        );
      });

      servizi.push(
        new FormGroup({
          righeId: new FormControl(this.nextRigaId++),
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

  onParamInput(servizio: AbstractControl, param: string, event: Event): void {
    const control = this.getParamControl(servizio, param);
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;

    if (isNaN(value)) {
      return;
    }

    const min = this.getParamMin(servizio, param);
    const max = this.getParamMax(servizio, param);

    let clamped = value;

    // 1. mai negativo, in ogni caso
    if (clamped < 0) {
      clamped = 0;
    }

    // 2. poi applica anche i limiti specifici del parametro
    if (min !== null && clamped < min) {
      clamped = min;
    } else if (max !== null && clamped > max) {
      clamped = max;
    }

    if (clamped !== value) {
      input.value = clamped.toString();
    }

    control.setValue(clamped);
  }

  getParamControl(servizio: AbstractControl, param: string): FormControl {
    return servizio.get(['params', param, 'value']) as FormControl;
  }

  getKeys(paramsGroup: AbstractControl): string[] {
    return paramsGroup instanceof FormGroup ? Object.keys(paramsGroup.controls) : [];
  }

  rimuoviServizio(index: number): void {
    this.serviziArray.removeAt(index);
  }
}
