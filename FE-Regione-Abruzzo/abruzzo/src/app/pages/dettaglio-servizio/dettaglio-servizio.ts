import { Component, OnInit, OnDestroy, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ServizioDetailCard } from '../../components/servizio-detail-card/servizio-detail-card';
import { InfoBar } from '../../components/info-bar/info-bar';
import { PageHeader } from '../../components/page-header/page-header';
import { finalize, Subscription } from 'rxjs';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-dettaglio-servizio',
    imports: [ServizioDetailCard, InfoBar, PageHeader, SpinnerCard],
    templateUrl: './dettaglio-servizio.html',
    styleUrl: './dettaglio-servizio.css',
    standalone: true,
})

export class DettaglioServizio implements OnInit, OnDestroy {

    servizioId!: string;
    servizioDetail!: ServizioModel;
    infoServizio: any;
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private serviziService: ServiziService,
    ) { }

    ngOnInit() {
        this.servizioId = this.route.snapshot.paramMap.get('id')!;
        this.getServizio(this.servizioId);
    }

    private getServizio(id: string) {
        this.isLoading.set(true);

        this.subscriptions.push(
            this.serviziService.getServizio(id).pipe(

                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
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
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.map((s: Subscription) => s.unsubscribe());
    }

}