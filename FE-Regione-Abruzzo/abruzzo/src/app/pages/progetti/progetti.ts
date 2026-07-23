import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Filtri} from '../../sections/progetti/filtri/filtri';
import {TabellaProgetti} from '../../sections/progetti/tabella-progetti/tabella-progetti';
import {map} from 'rxjs';
import {ProgettoModel} from '../../model/progetto.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProgettiService} from '../../services/progetti.service';
import { PageHeader } from '../../components/page-header/page-header';


@Component({
  selector: 'app-progetti',
  standalone: true,
  imports: [CommonModule, Filtri, TabellaProgetti, PageHeader],
  templateUrl: './progetti.html',
  styleUrl: './progetti.css',
})
export class Progetti implements OnInit {
  progetti: ProgettoModel[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(private progettiService: ProgettiService) {}

  ngOnInit(): void {
    this.getProgetti();
  }

  private getProgetti(): void {
    this.progettiService
      .getProgetti()
      .pipe(
        map((resp: ProgettoModel[]) => resp.slice(0, 3)), //prende massimo 3 progetti per la sezione in home
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (resp: any[]) => {
          // mapping repsonse dal backend
          this.progetti = resp.map((p) => ({
            idProgetto: p.id,
            nome: p.name,
            destinationLink: p.destinationLink,
            description: p.description,
            dataCreazione: p.createAt,
            dataUltimaModifica: p.updateAt,
          }));
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei progetti:', err);
        },
      });
  }
}
