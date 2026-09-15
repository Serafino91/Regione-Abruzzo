import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filtri } from '../../sections/progetti/filtri/filtri';
import { TabellaProgetti } from '../../sections/progetti/tabella-progetti/tabella-progetti';
import { combineLatest, map, finalize } from 'rxjs';
import { ProgettoModel } from '../../model/progetto.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgettiService } from '../../services/progetti.service';
import { PageHeader } from '../../components/page-header/page-header';
import { UserService } from '../../services/user.service';
import { SpinnerCard } from '../../components/spinner-card/spinner-card';

const INDICI_PER_PROFILO: Record<string, number[]> = {
    delegato: [0, 1],
    delegato2: [2, 3],
};

@Component({
    selector: 'app-progetti',
    standalone: true,
    imports: [CommonModule, Filtri, TabellaProgetti, PageHeader, SpinnerCard],
    templateUrl: './progetti.html',
    styleUrl: './progetti.css',
})

export class Progetti implements OnInit {

    progetti: ProgettoModel[] = [];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);

    constructor(
        private progettiService: ProgettiService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.getProgetti();
    }

    private getProgetti(): void {
        // this.isLoading.set(true); DA IMPLEMENTARE QUANDO this.userService.user$ SARA' COMPLETO

        combineLatest([this.progettiService.getProgetti(), this.userService.user$])
            .pipe(

                map(([resp, user]: [any[], any]) => {
                    // mapping response dal backend
                    console.log(resp);
                    const progetti: ProgettoModel[] = resp.map((p) => ({
                        idProgetto: p.id,
                        nome: p.name,
                        destinationLink: p.destinationLink,
                        description: p.description,
                        dataCreazione: p.createAt,
                        dataUltimaModifica: p.updateAt,
                        servizi: p.services
                    }));

                    return this.filterByProfile(progetti, user.role);
                }),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
                next: (filtered) => {
                    this.progetti = filtered;
                    this.cdr.detectChanges();
                }
            });
    }

    private filterByProfile(progetti: ProgettoModel[], role: string): ProgettoModel[] {
        const indici = INDICI_PER_PROFILO[role];
        if (!indici) {
            return progetti;
        }
        return indici.map((i) => progetti[i]).filter((p): p is ProgettoModel => !!p);
    }

}