import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../../../components/dynamic-form/dynamic-form';
import { ServizioModel } from '../../../model/servizioModel';
import { ServiziService} from '../../../services/servizi.service';
import { ParamentroModel } from '../../../model/parametro.model';
import { CategoriaService } from '../../../services/categoria.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaModel } from '../../../model/categoria.model';

@Component({
  selector: 'app-seleziona-servizio',
  imports: [FormsModule, DynamicForm],
  templateUrl: './seleziona-servizio.html',
  styleUrl: './seleziona-servizio.css',
  standalone: true,
})
export class SelezionaServizio implements OnInit {
  private destroyRef = inject(DestroyRef);
  categorie: CategoriaModel[] = [];
  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;
  selectedServiceId = '';
  public params: ParamentroModel[] = [];
  values: Record<string, any> = {};
  protected selezione: any;

  constructor(
    private categoriaService: CategoriaService,
    private serviziService: ServiziService,
  ) {}

  ngOnInit(): void {
    this.getCategorie();
  }

  popolaServizi(idCategoria: number): void {
    if (!idCategoria) return;
    this.serviziService
      .getServiziDaCategoria(idCategoria)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          console.log('resp servizi Catalog', resp);
          this.servizi = resp;
        },
        error: (err) => {
          console.error('Errore nel recupero delle categorie:', err);
        },
      });
  }

  onServizioChange(id: string): void {
    this.servizio = this.servizi.find((s) => s.id === id);
    if (this.servizio) this.params = this.servizio.params;
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
          console.error('Errore nel recupero delle categorie:', err);
        },
      });
  }
}
