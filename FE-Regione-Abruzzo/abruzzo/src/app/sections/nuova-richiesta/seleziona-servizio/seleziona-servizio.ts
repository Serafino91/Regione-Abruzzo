import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../../../components/dynamic-form/dynamic-form';
import { ServizioModel } from '../../../model/servizioModel';
import { ServiziService } from '../../../services/servizi.service';
import { ParamentroModel } from '../../../model/parametro.model';
import { CategoriaService } from '../../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../../model/categoria.model';

@Component({
  selector: 'app-seleziona-servizio',
  imports: [DynamicForm, ReactiveFormsModule],
  templateUrl: './seleziona-servizio.html',
  styleUrl: './seleziona-servizio.css',
  standalone: true,
})
export class SelezionaServizio implements OnInit {
  private destroyRef = inject(DestroyRef);

  categorie: CategoriaModel[] = [];
  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;
  params: ParamentroModel[] = [];
  @Input({ required: true })
  formGroup!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  ngOnInit(): void {
    this.getCategorie();

    if (!this.formGroup.get('categoria')) {
      this.formGroup.addControl('categoria', new FormControl('', Validators.required));
    }
    if (!this.formGroup.get('servizio')) {
      this.formGroup.addControl('servizio', new FormControl('', Validators.required));
    }
    if (!this.formGroup.get('params')) {
      this.formGroup.addControl('params', new FormGroup({}));
    }

    this.formGroup
      .get('categoria')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.popolaServizi(id));

    this.formGroup
      .get('servizio')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.onServizioChange(id));
  }

  popolaServizi(idCategoria: number): void {
    if (!idCategoria) return;

    this.serviziService
      .getServiziDaCategoria(idCategoria)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.servizi = resp;
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
    this.params = servizio.params;

    const paramsGroup = this.formGroup.get('params') as FormGroup;

    Object.keys(paramsGroup.controls).forEach((key) => {
      paramsGroup.removeControl(key);
    });

    servizio.params.forEach((p) => {
      paramsGroup.addControl(p.name, new FormControl('', Validators.required));
    });
  }

  get paramsForm(): FormGroup {
    return this.formGroup.get('params') as FormGroup;
  }

  getCategorie() {
    this.categoriaService
      .getCategorie()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.categorie = resp;
        },
        error: (err) => {
          console.error('Errore categorie:', err);
        },
      });
  }
}
