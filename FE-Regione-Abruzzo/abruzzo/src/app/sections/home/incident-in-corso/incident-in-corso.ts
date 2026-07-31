import { ChangeDetectorRef, Component, DestroyRef, inject, Input } from '@angular/core';
import { IncidentCard } from './components/incident-card/incident-card';
import {SectionHeader} from '../../../components/section-header/section-header';
import { ProjectCard } from '../progetti-in-corso/components/project-card/project-card';
import { TicketModel } from '../../../model/ticket.model';
import { IncidentService } from '../../../services/incident.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IncidentAccordion } from '../../../components/incident-accordion/incident-accordion';
import { map } from 'rxjs';
import { ProgettoModel } from '../../../model/progetto.model';

@Component({
  selector: 'app-incident-in-corso',
  imports: [SectionHeader, IncidentAccordion],
  templateUrl: './incident-in-corso.html',
  styleUrl: './incident-in-corso.css',
  standalone: true,
})
export class IncidentInCorso {
  incidents: TicketModel[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(private incident: IncidentService) {}

  ngOnInit() {
    this.getAllTickets();
  }
  private getAllTickets(): void {
    this.incident
      .getTickets()
      .pipe(
        map((resp: TicketModel[]) => resp.slice(0, 3)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.incidents = resp;
          console.log('resp tickets: ', this.incidents);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
