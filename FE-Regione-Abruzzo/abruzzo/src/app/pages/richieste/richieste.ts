import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RichiesteTable } from '../../components/richieste-table/richieste-table';
import { RichiestaModel } from '../../model/richiestaModel';
import { CategoriaService } from '../../services/categoria.service';
import { ServiziService } from '../../services/servizi.service';
import { RichiesteService } from '../../services/richieste.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-richieste',
  // imports: [RouterLink],
  imports: [RouterLink, RichiesteTable],
  templateUrl: './richieste.html',
  styleUrl: './richieste.css',
})
export class Richieste implements OnInit {
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  constructor(private richiestaService: RichiesteService) {}

  ngOnInit(): void {
    this.getRichieste();
  }

  listaRichieste: RichiestaModel[] = [];

  private getRichieste() {
    this.richiestaService
      .getAllRichieste()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.listaRichieste = resp;
          console.log('resp richieste: ', this.listaRichieste);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}

