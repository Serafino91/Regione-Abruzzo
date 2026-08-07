import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketModel } from '../../model/ticket.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IncidentService } from '../../services/incident.service';
import { PageHeader } from '../../components/page-header/page-header';
import { InfoBar } from '../../components/info-bar/info-bar';
import { getStatoRichiesta } from '../../constants/incident-state-icon.constants';
import { IncidentDetailCard } from '../../components/incident-detail-card/incident-detail-card';
import { RichiedenteCard } from '../../components/richiedente-card/richiedente-card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dettaglio-incident',
  imports: [
    PageHeader,
    InfoBar,
    IncidentDetailCard,
    RichiedenteCard,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './dettaglio-incident.html',
  styleUrl: './dettaglio-incident.css',
})
export class DettaglioIncident {
  incidentId!: string;
  incidentDetail!: TicketModel;
  infoIncident: any;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
  ) {}

  ngOnInit() {
    this.incidentId = this.route.snapshot.paramMap.get('id')!;
    this.getIncident(this.incidentId);
  }

  private getIncident(id: string): void {
    this.incidentService
      .getTicketDetail(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any) => {
          this.incidentDetail = resp.serviceDetail ?? resp;
          const stato = getStatoRichiesta(this.incidentDetail.state.id);

          console.log(this.incidentDetail);

          this.infoIncident = [
            {
              label: 'Codice',
              value: this.incidentDetail.code,
              icon: 'it-file',
            },
            {
              label: 'Stato',
              value: this.incidentDetail.state.name,
              icon: stato?.icon,
            },
            {
              label: 'Data Apertura',
              value: this.incidentDetail.openingDate,
              icon: 'it-calendar',
            },
          ];

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
