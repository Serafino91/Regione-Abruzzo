import { ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeader } from '../../components/page-header/page-header';
import { CategoriaService } from '../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../model/categoria.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuovo-servizio',
  imports: [PageHeader, ReactiveFormsModule],
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
  }

  categoriaForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    sottocategoria: new FormControl('', Validators.required),
  });

  servizioForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl('', Validators.required),
    stato: new FormControl('', Validators.required)
  });

  goBack(): void {
    this.router.navigateByUrl('home/catalogo');
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
}
