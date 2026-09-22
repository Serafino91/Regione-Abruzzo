import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { FiltriServizi } from '../../sections/catalogo/filtri-servizi/filtri-servizi';
import { ListaServizi } from '../../sections/catalogo/lista-servizi/lista-servizi';
import { ServizioModel } from '../../model/servizioModel';
import { ServiziService } from '../../services/servizi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeader } from '../../components/page-header/page-header';
import { finalize } from 'rxjs';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';
import { FiltroServiziCriteriaModel } from '../../constants/filtro-servizi-criteria.model';
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-catalogue',
    imports: [FiltriServizi, ListaServizi, PageHeader, SpinnerCard],
    standalone: true,
    templateUrl: './catalogo.html',
    styleUrl: './catalogo.css',
})

export class Catalogo implements OnInit {

    private destroyRef = inject(DestroyRef);
    isAdmin= true;
    public servizi: ServizioModel[] = [];
    isLoading = signal(false);

    private cdr = inject(ChangeDetectorRef);

    constructor(private servizioService: ServiziService, private userService: UserService) { }

    ngOnInit(): void {
        this.getServizi();
        this.isAdmin = this.userService.getUser().isAdmin;


    }

    private getServizi(): void {
        this.isLoading.set(true);

        this.servizioService.getServizi().pipe(

          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false))

        ).subscribe({
          next: (resp) => {
            this.servizi = resp;
            this.cdr.detectChanges();
          }
        });
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

}
