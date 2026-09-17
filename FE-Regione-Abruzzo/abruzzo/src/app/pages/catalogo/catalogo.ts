import { Component, OnInit, OnDestroy, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { FiltriServizi } from '../../sections/catalogo/filtri-servizi/filtri-servizi';
import { ListaServizi } from '../../sections/catalogo/lista-servizi/lista-servizi';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeader } from '../../components/page-header/page-header';
import { finalize, Subscription } from 'rxjs';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';
import { FiltroServiziCriteriaModel } from '../../constants/filtro-servizi-criteria.model';

@Component({
    selector: 'app-catalogue',
    imports: [FiltriServizi, ListaServizi, PageHeader, SpinnerCard],
    standalone: true,
    templateUrl: './catalogo.html',
    styleUrl: './catalogo.css',
})

export class Catalogo implements OnInit, OnDestroy {

    private destroyRef = inject(DestroyRef);
    public servizi: ServizioModel[] = [];
    isLoading = signal(false);

    private tuttiIServizi: ServizioModel[] = [];
    private cdr = inject(ChangeDetectorRef);
    private subscriptions: Subscription[] = [];

    constructor(private servizioService: ServiziService) { }

    ngOnInit(): void {
        this.getServizi();
    }

    private getServizi(): void {
        this.isLoading.set(true);

        this.subscriptions.push(
            this.servizioService.getServizi().pipe(

                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
                next: (resp) => {
                    this.tuttiIServizi = resp;
                    this.servizi = resp;

                    this.cdr.detectChanges();
                }
            })
        );
    }

    onFiltra(criteria: FiltroServiziCriteriaModel): void {
        this.isLoading.set(true);

        this.servizioService.filterServizio(criteria).pipe(

            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.isLoading.set(false))

        ).subscribe({
            next: (resp) => {
                this.servizi = resp;
                console.log(resp);
                this.cdr.detectChanges();
            }
        });
    }

    onResetFiltri(): void {
        this.getServizi();
    }

    ngOnDestroy(): void {
        this.subscriptions.map((s: Subscription) => s.unsubscribe());
    }

}