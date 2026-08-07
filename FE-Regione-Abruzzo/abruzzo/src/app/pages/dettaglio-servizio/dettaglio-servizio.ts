import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ServizioDetailCard } from '../../components/servizio-detail-card/servizio-detail-card';
import { InfoBar } from '../../components/info-bar/info-bar';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-dettaglio-servizio',
  imports: [ ServizioDetailCard, InfoBar, PageHeader],
  templateUrl: './dettaglio-servizio.html',
  styleUrl: './dettaglio-servizio.css',
  standalone: true,
})
export class DettaglioServizio {
  servizioId!: string;
  servizioDetail!: ServizioModel;
  infoServizio: any;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private serviziService: ServiziService,
  ) {}

  ngOnInit() {
    this.servizioId = this.route.snapshot.paramMap.get('id')!;
    this.getServizio(this.servizioId);
  }

  private getServizio(id: string) {
    this.serviziService
      .getServizio(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any) => {
          this.servizioDetail = resp.serviceDetail ?? resp;
          this.infoServizio = [
            {
              label: 'ID Servizio',
              value: this.servizioDetail.id,
              icon: 'it-file',
            },
            {
              label: 'Servizio',
              value: this.servizioDetail.item,
              icon: 'it-file',
            },
            {
              label: 'Categoria',
              value: this.servizioDetail.type.name,
              icon: 'it-calendar',
            },
          ];
          console.log(this.servizioDetail);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
