import {ChangeDetectorRef, Component, DestroyRef, inject, PLATFORM_ID} from '@angular/core';
import {ServizioModel} from '../../../model/servizioModel';
import {ServiziService} from '../../../services/servizi.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ServizioCard} from '../../../components/servizio-card/servizio-card';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-servizi',
  imports: [ServizioCard, FormsModule],
  standalone: true,
  templateUrl: './lista-servizi.html',
  styleUrl: './lista-servizi.css',
})
export class ListaServizi {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  public servizi: ServizioModel[] = [];

  constructor(
    private servizioService: ServiziService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getServizi();
  }

  private getServizi(): void {
    this.servizioService
      .getServizi()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.servizi = resp;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei servizi:', err);
        },
      });
  }

  pageSize = 6;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.servizi.length / this.pageSize);
  }

  get paginatedServizi() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.servizi.slice(start, start + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSize = Number(size);
    this.currentPage = 1;
  }

  apriDettaglio(id: string) {
    this.router.navigate(['/home/catalogo/dettaglio-servizio', id]);
  }
}
