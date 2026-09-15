import { Component, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { FiltriServizi } from '../../sections/catalogo/filtri-servizi/filtri-servizi';
import { ListaServizi } from '../../sections/catalogo/lista-servizi/lista-servizi';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeader } from '../../components/page-header/page-header';
import { finalize } from 'rxjs';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-catalogue',
    imports: [FiltriServizi, ListaServizi, PageHeader, SpinnerCard],
    standalone: true,
    templateUrl: './catalogo.html',
    styleUrl: './catalogo.css',
})

export class Catalogo {

    public servizi: ServizioModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    private tuttiIServizi: ServizioModel[] = [];

    constructor(private servizioService: ServiziService) { }

    ngOnInit(): void {
        this.getServizi();
    }

    private getServizi(): void {
        this.isLoading.set(true);

        this.servizioService.getServizi().pipe(

            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.isLoading.set(false))

        ).subscribe({
            next: (resp) => {
                this.tuttiIServizi = resp;
                this.servizi = resp;

                this.cdr.detectChanges();
            }
        });
    }

    onCerca(risultati: ServizioModel[]): void {
        this.servizi = risultati.length > 0 ? risultati : this.tuttiIServizi;
        this.cdr.detectChanges();
    }

}