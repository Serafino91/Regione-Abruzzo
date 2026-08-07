import { ChangeDetectorRef, Component, DestroyRef, PLATFORM_ID, inject } from '@angular/core';
import { Input } from '@angular/core';
import { ProjectCard } from './components/project-card/project-card';
import { ProgettoModel } from '../../../model/progetto.model';
import { ServiziService } from '../../../services/servizi.service';
import { ProgettiService } from '../../../services/progetti.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SectionHeader } from '../../../components/section-header/section-header';
import { map } from 'rxjs';

@Component({
  selector: 'app-progetti-in-corso',
  imports: [ProjectCard, SectionHeader],
  templateUrl: './progetti-in.corso.html',
  styleUrl: './progetti-in-corso.css',
  standalone: true,
})
export class ProgettiInCorso {
  progetti: ProgettoModel[] = [];

  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(private progettiService: ProgettiService) {}

  richieste: number[] = [1, 2, 1];

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
          console.log(resp);
          this.progetti = resp.map((p) => ({
            idProgetto: p.id,
            nome: p.name,
            destinationLink: p.destinationLink,
            description: p.description,
            dataCreazione: p.createAt,
            dataUltimaModifica: p.updateAt,
            servizi: p.services
          }));
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei progetti:', err);
        },
      });
  }
}
