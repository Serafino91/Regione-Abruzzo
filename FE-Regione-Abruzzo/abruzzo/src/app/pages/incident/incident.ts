import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FiltriIncident } from '../../sections/incident/filtri-incident/filtri-incident';
import { PageHeader } from '../../components/page-header/page-header';
import { map } from 'rxjs';
import { ProgettoModel } from '../../model/progetto.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgettiService } from '../../services/progetti.service';
import { IncidentService } from '../../services/incident.service';
import { TicketModel } from '../../model/ticket.model';
import { TabellaRichieste } from '../../sections/richieste/tabella-richieste/tabella-richieste';

@Component({
  selector: 'app-incident',
  imports: [FiltriIncident, PageHeader, TabellaRichieste],
  standalone: true,
  templateUrl: './incident.html',
  styleUrl: './incident.css',
})
export class Incident implements OnInit {
  tickets: TicketModel[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(private incident: IncidentService) {}

  ngOnInit() {
    this.getAllTickets();
  }
  private getAllTickets(): void {
    this.incident
      .getTickets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.tickets = resp;
          console.log('resp tickets: ', this.tickets);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
