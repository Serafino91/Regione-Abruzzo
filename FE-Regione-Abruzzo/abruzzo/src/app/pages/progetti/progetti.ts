import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filtri } from '../../sections/progetti/filtri/filtri';
import { TabellaProgetti } from '../../sections/progetti/tabella-progetti/tabella-progetti';
import { combineLatest, map, finalize } from 'rxjs';
import { ProgettoModel } from '../../model/progetto.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgettiService } from '../../services/progetti.service';
import { PageHeader } from '../../components/page-header/page-header';
import { UserService } from '../../services/user.service';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';
import {FiltroProgettoCriteriaModel} from "../../constants/filtro-progetto-criteria.model";

const INDICI_PER_PROFILO: Record<string, number[]> = {
    delegato: [0, 1],
    delegato2: [2, 3],
};

@Component({
    selector: 'app-progetti',
    standalone: true,
    imports: [CommonModule, Filtri, TabellaProgetti, PageHeader, SpinnerCard],
    templateUrl: './progetti.html',
    styleUrl: './progetti.css',
})

export class Progetti implements OnInit {

    progetti: ProgettoModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);

  // lista già ristretta al profilo utente, usata come base per i filtri
  private progettiProfilo: ProgettoModel[] = [];

  constructor(
    private progettiService: ProgettiService,
    private userService: UserService,
  ) {}

    ngOnInit(): void {
        this.getProgetti();
    }

  private getProgetti(): void {
    combineLatest([this.progettiService.getProgetti(), this.userService.user$])
      .pipe(
        map(([resp, user]: [any[], any]) => {
          const progetti = this.mapToProgettoModel(resp);
          return this.filterByProfile(progetti, user.role);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (filtered) => {
          this.progettiProfilo = filtered;
          this.progetti = filtered;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei progetti:', err);
        },
      });
  }

  onFiltra(criteria: FiltroProgettoCriteriaModel): void {
    this.progettiService
      .filterProgetto(criteria)
      .pipe(
        map((resp: any[]) => this.mapToProgettoModel(resp)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (progetti) => {
          this.progetti = progetti;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore durante il filtro dei progetti:', err);
        },
      });
  }

  onResetFiltri(): void {
    this.getProgetti();
  }

  private mapToProgettoModel(resp: any[]): ProgettoModel[] {
    return resp.map((p) => ({
      idProgetto: p.id,
      nome: p.name,
      destinationLink: p.destinationLink,
      description: p.description,
      dataCreazione: p.createAt,
      dataUltimaModifica: p.updateAt,
      servizi: p.services,
    }));
  }

  private filterByProfile(progetti: ProgettoModel[], role: string): ProgettoModel[] {
    const indici = INDICI_PER_PROFILO[role];
    if (!indici) {
      return progetti;
    }
    return indici.map((i) => progetti[i]).filter((p): p is ProgettoModel => !!p);
  }
}
