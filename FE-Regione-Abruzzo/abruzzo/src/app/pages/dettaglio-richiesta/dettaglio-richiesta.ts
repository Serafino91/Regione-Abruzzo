import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Url } from '../../components/url/url';
import { ProgettoDetailCard } from "../../components/progetto-detail-card/progetto-detail-card";
import { ServiziAccordion } from '../../components/servizi-accordion/servizi-accordion';
import { RichiestaInfoBar } from '../../components/richiesta-info-bar/richiesta-info-bar';
import { RichiesteService } from "../../services/richieste.service";
import { RichiestaModel } from "../../model/richiestaModel";

@Component({
  selector: 'app-dettaglio-richiesta',
  imports: [Url, ProgettoDetailCard, ServiziAccordion, RichiestaInfoBar, RouterLink],
  templateUrl: './dettaglio-richiesta.html',
  styleUrl: './dettaglio-richiesta.css',
  standalone: true,
})
export class DettaglioRichiesta {
  richiestaId!: string;
  richiestaDetail!: RichiestaModel;
  showDeleteModal = false;

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
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero richieste:', err);
        },
      });
  }
}
