import { ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeader } from '../../components/page-header/page-header';
import { CategoriaService } from '../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../model/categoria.model';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuovo-servizio',
  imports: [PageHeader, ReactiveFormsModule],
  standalone: true,
  templateUrl: './nuovo-servizio.html',
  styleUrl: './nuovo-servizio.css',
})
export class NuovoServizio {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  categorie!: CategoriaModel[];
  families: string[] = ['Linux', 'Windows', 'MacOS'];
  disc_type: string[] = ['hdd', 'ssd', 'nvme'];
  network_type: string[] = ['nat', 'bridged', 'private'];
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.getCategorie();
    this.aggiungiDisco();
  }

  categoriaForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    sottocategoria: new FormControl('', Validators.required),
  });

  servizioForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl('', Validators.required),
    os: new FormGroup({
      family: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
    }),
    hardware: new FormGroup({
      vcpu: new FormControl('', Validators.required),
      ram_gb: new FormControl('', Validators.required),
      disks: new FormArray([]),
    }),
    network_interfaces: new FormArray([]),
  });


  get interfacciaArray(): FormArray {
    return this.servizioForm.get('network_interfaces') as FormArray;
  }

  aggiungiInterfaccia(): void {
    this.interfacciaArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        network_type: new FormControl('', Validators.required),
        ip_address: new FormControl('', Validators.required),
      }),
    );
  }

  rimuoviInterfaccia(index: number): void {
    this.interfacciaArray.removeAt(index);
  }

  get discsArray(): FormArray {
    return this.servizioForm.get('hardware.disks') as FormArray;
  }

  aggiungiDisco(): void {
    this.discsArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        size_gb: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
      }),
    );
  }

  rimuoviDisco(index: number): void {
    this.discsArray.removeAt(index);
  }

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


  debugForm() {
    console.log(this.servizioForm.value);
  }
}
