import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FiltriIncident } from '../../sections/incident/filtri-incident/filtri-incident';
import { PageHeader } from '../../components/page-header/page-header';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IncidentService } from '../../services/incident.service';
import { TicketModel } from '../../model/ticket.model';
import { TabellaIncident } from '../../sections/incident/tabella-incident/tabella-incident';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

@Component({
  selector: 'app-incident',
  imports: [FiltriIncident, PageHeader, TabellaIncident, SpinnerCard],
  standalone: true,
  templateUrl: './incident.html',
  styleUrl: './incident.css',
})
export class Incident implements OnInit {
  tickets: TicketModel[] = [];
  isLoading = false;
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(private incident: IncidentService) {}

  ngOnInit() {
    this.getAllTickets();
  }
  private getAllTickets(): void {
    this.isLoading = true;

    this.incident
      .getTickets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.tickets = resp;
          console.log('resp tickets: ', this.tickets);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
          this.isLoading = false;
        },
      });
  }
}
