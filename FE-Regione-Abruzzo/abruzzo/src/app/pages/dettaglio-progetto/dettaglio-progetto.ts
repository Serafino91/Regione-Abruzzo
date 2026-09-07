import {ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgettoModel } from '../../model/progetto.model';
import { ProgettiService } from '../../services/progetti.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgettoDetailCard } from '../../components/progetto-detail-card/progetto-detail-card';
import { ServizioAccordion } from '../../components/servizio-accordion/servizio-accordion';
import { InfoBar } from '../../components/info-bar/info-bar';
import { PageHeader } from '../../components/page-header/page-header';
import { DelegatoCard } from '../../components/delegato-card/delegato-card';
import { ServizioModel } from '../../model/servizioModel';
import { CategoriaModel } from '../../model/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

export interface ServizioDto {
  id: number;
  name: string;
  type: string | null;
  item: string | null;
  base: boolean | null;
  optional?: boolean | null;
  quantity?: string | null;
  durationMonths?: string | null;
  params?: any[];
}



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
  categorie: CategoriaModel[] = [];

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private progettiService: ProgettiService,
  ) {}

  ngOnInit() {
    this.progettoId = this.route.snapshot.paramMap.get('id')!;
    this.getProgetto(this.progettoId);
  }

  private mapServizio(dto: ServizioDto): ServizioModel {
    return {
      id: String(dto.id),
      type: dto.type as any, // oppure una mappatura verso CategoriaModel se serve
      item: dto.name,
      base: !!dto.base,
      optional: !!dto.optional,
      quantity: dto.quantity ?? null,
      durationMonths: dto.durationMonths ?? null,
      params: dto.params ?? [],
    };
  }

  private getProgetto(id: string): void {
    this.progettiService
      .getProgetto(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any) => {
          const progetto = resp.serviceDetail ?? resp;
          console.log(resp.serviceDetail);
          this.progettoDetail = {
            ...progetto,
            nome: resp.serviceDetail.name,
            servizi: (resp.serviceDetail.services ?? []).map((s: ServizioDto) =>
              this.mapServizio(s),
            ),
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
              icon: 'it-note',
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

}
