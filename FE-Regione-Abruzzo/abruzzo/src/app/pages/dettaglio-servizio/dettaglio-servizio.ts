import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ServizioInfoBar } from '../../components/servizio-info-bar/servizio-info-bar';
import { Url } from '../../components/url/url';
import { ServizioDetailCard } from '../../components/servizio-detail-card/servizio-detail-card';

@Component({
  selector: 'app-dettaglio-servizio',
  imports: [ServizioInfoBar, Url, RouterLink, ServizioDetailCard],
  templateUrl: './dettaglio-servizio.html',
  styleUrl: './dettaglio-servizio.css',
  standalone: true,
})
export class DettaglioServizio {
  servizioId!: string;
  servizioDetail!: ServizioModel;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private serviziService: ServiziService,
    private router: Router,
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
          console.log(this.servizioDetail);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
