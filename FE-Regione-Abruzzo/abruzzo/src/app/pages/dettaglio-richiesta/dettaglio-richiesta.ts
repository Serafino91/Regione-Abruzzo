import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Url } from '../../components/url/url';
import { ProgettoDetailCard } from "../../components/progetto-detail-card/progetto-detail-card";
import { RichiesteService } from "../../services/richieste.service";
import { RichiestaModel } from "../../model/richiestaModel";
import { ServizioAccordion } from '../../components/servizio-accordion/servizio-accordion';
import {InfoBar} from '../../components/info-bar/info-bar';

@Component({
  selector: 'app-dettaglio-richiesta',
  imports: [Url, ProgettoDetailCard,  RouterLink, ServizioAccordion, InfoBar],
  templateUrl: './dettaglio-richiesta.html',
  styleUrl: './dettaglio-richiesta.css',
  standalone: true,
})
export class DettaglioRichiesta {
  richiestaId!: string;
  richiestaDetail!: RichiestaModel;
  nuovaRichiesta: boolean = false;
  showDeleteModal = false;
  infoRichiesta: any;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private richiestaService: RichiesteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.richiestaId = this.route.snapshot.paramMap.get('id')!;
    this.getRichiesta(this.richiestaId);
  }

  onElimina() {
    this.richiestaService
      .deleteRichieste(this.richiestaId as any)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.router.navigate(['/home/richieste']);
        },
        error: (err) => {
          console.error('Errore eliminazione richiesta:', err);
          this.showDeleteModal = false;
        },
      });
  }

  private getRichiesta(id: string) {
    this.richiestaService
      .getRichiesta(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any) => {
          this.richiestaDetail = resp.requestDetail ?? resp;
          this.infoRichiesta = [
            {
              label: 'ID Richiesta',
              value: this.richiestaDetail.requestId,
              icon: 'it-file',
            },
            {
              label: 'Stato',
              value: this.richiestaDetail.state.stateName,
              icon: 'it-file',
            },
            {
              label: 'Data apertura',
              value: this.richiestaDetail.createdAt,
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
