import { ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeader } from '../../components/page-header/page-header';
import { CategoriaService } from '../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../model/categoria.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {FormIaaS} from "../../sections/nuovo-servizio/form-iaa-s/form-iaa-s";
type TipoForm = 'iaas' | 'storage' | 'os' | 'pubblicazione' | null;


@Component({
  selector: 'app-nuovo-servizio',
  imports: [PageHeader, ReactiveFormsModule, FormIaaS],
  standalone: true,
  templateUrl: './nuovo-servizio.html',
  styleUrl: './nuovo-servizio.css',
})
export class NuovoServizio {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  categorie!: CategoriaModel[];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.getCategorie();

    let tipoFormPrecedente: TipoForm = null;

    this.categoriaForm
      .get('categoria')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const tipoAttuale = this.tipoFormAttivo;
        if (tipoAttuale !== tipoFormPrecedente) {
          Object.keys(this.servizioForm.controls).forEach((key) => {
            this.servizioForm.removeControl(key);
          });
          tipoFormPrecedente = tipoAttuale;
        }
      });

  }

  categoriaForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    sottocategoria: new FormControl('', Validators.required),
  });

  servizioForm = new FormGroup({});



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

  debugForm() {
    console.log(this.servizioForm.value);
    console.log(this.categoriaForm.value);
  }

  get tipoFormAttivo(): TipoForm {
    switch (String(this.categoriaForm.get('categoria')?.value)) {
      case '1':
      case '3':
        return 'iaas';
      case '2':
      case '4':
        return 'storage';
      case '5':
        return 'os';
      case '6':
        return 'pubblicazione';
      default:
        return null;
    }
  }
}
