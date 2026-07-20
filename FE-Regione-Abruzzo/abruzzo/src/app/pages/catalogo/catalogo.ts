import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { Button } from '../../components/button/button';
import { Url } from '../../components/url/url';
import { FiltriServizi } from '../../sections/catalogo/filtri-servizi/filtri-servizi';
import { ListaServizi } from '../../sections/catalogo/lista-servizi/lista-servizi';
import {ServizioModel} from '../../model/servizioModel';
import {ServiziService} from '../../services/servizi.service';
import {Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-catalogue',
  imports: [Url, FiltriServizi, ListaServizi],
  standalone: true,
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
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
}
