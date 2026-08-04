import {ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {ProgettoModel} from '../../model/progetto.model';
import {ProgettiService} from '../../services/progetti.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProgettoDetailCard} from '../../components/progetto-detail-card/progetto-detail-card';
import {ServizioAccordion} from '../../components/servizio-accordion/servizio-accordion';
import {InfoBar} from '../../components/info-bar/info-bar';
import { PageHeader } from '../../components/page-header/page-header';
import {DelegatoCard} from '../../components/delegato-card/delegato-card';

@Component({
  selector: 'app-dettaglio-progetto',
  imports: [ProgettoDetailCard, ServizioAccordion, InfoBar, PageHeader, DelegatoCard],
  standalone: true,
  templateUrl: './dettaglio-progetto.html',
  styleUrl: './dettaglio-progetto.css',
})
export class DettaglioProgetto {
  progettoId!: string;
  progettoDetail!: ProgettoModel;
  nuovaRichiesta: boolean = true;
  infoProgetto: any;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute, private progettiService: ProgettiService) {}

  ngOnInit() {
    this.progettoId = this.route.snapshot.paramMap.get('id')!;
    this.getProgetto(this.progettoId);
  }

  private getProgetto(id: string): void {
    this.progettiService
      .getProgetto(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any) => {

          const progetto = resp.serviceDetail ?? resp;
          this.progettoDetail = {
            ...progetto,
            servizi: resp.serviceDetail.services
          };

          console.log(this.progettoDetail);
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

          console.log(this.infoProgetto);

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
