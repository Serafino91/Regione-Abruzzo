import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TicketModel} from '../../model/ticket.model';
import {IncidentService} from '../../services/incident.service';
import {PageHeader} from '../../components/page-header/page-header';

@Component({
  selector: 'app-dettaglio-incident',
  imports: [PageHeader],
  standalone: true,
  templateUrl: './dettaglio-incident.html',
  styleUrl: './dettaglio-incident.css',
})

export class DettaglioIncident {
  incidentId!: string;
  ticketModel!: TicketModel;
  infoTicket: any;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private ticketService: IncidentService,
  ) {}

  ngOnInit() {
    this.incidentId = this.route.snapshot.paramMap.get('id')!;
    /*this.getProgetto(this.progettoId);*/
  }

  /*
  private getProgetto(id: string): void {
    this.progettiService
      .getProgetto(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any) => {
          const progetto = resp.serviceDetail ?? resp;

          console.log(progetto);
          this.progettoDetail = {
            ...progetto,
            nome: resp.serviceDetail.name,
          };

          this.infoProgetto = [
            {
              label: 'ID Progetto',
              value: progetto.id,
              icon: 'it-file',
            },
            {
              label: 'Nome',
              value: progetto.name,
              icon: 'it-arrow-up-right',
            },
            {
              label: 'Data Creazione',
              value: progetto.createAt,
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
  */
}
