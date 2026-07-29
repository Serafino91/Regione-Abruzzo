import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FiltriServizi } from '../../sections/catalogo/filtri-servizi/filtri-servizi';
import { ListaServizi } from '../../sections/catalogo/lista-servizi/lista-servizi';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-catalogue',
  imports: [FiltriServizi, ListaServizi, PageHeader],
  standalone: true,
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  public servizi: ServizioModel[] = [];
  private tuttiIServizi: ServizioModel[] = [];

  constructor(private servizioService: ServiziService) {}

  ngOnInit(): void {
    this.getServizi();
  }

  private getServizi(): void {
    this.servizioService
      .getServizi()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.tuttiIServizi = resp;
          this.servizi = resp;

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei servizi:', err);
        },
      });
  }

  onCerca(risultati: ServizioModel[]): void {
    this.servizi = risultati.length > 0 ? risultati : this.tuttiIServizi;
    this.cdr.detectChanges();
  }
}
