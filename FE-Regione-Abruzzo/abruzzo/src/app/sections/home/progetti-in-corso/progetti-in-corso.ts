import { Component, ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { ProjectCard } from './components/project-card/project-card';
import { ProgettoModel } from '../../../model/progetto.model';
import { ProgettiService } from '../../../services/progetti.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SectionHeader } from '../../../components/section-header/section-header';
import { map, finalize } from 'rxjs';
import { SpinnerCard } from '../../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-progetti-in-corso',
    imports: [ProjectCard, SectionHeader, SpinnerCard],
    templateUrl: './progetti-in.corso.html',
    styleUrl: './progetti-in-corso.css',
    standalone: true,
})

export class ProgettiInCorso {

    progetti: ProgettoModel[] = [];
    richieste: number[] = [1, 2, 1];
    isLoading = signal(false);

    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);

    constructor(private progettiService: ProgettiService) { }

    ngOnInit(): void {
        this.getProgetti();
    }

    private getProgetti(): void {
        this.progettiService.getProgetti().pipe(

            map((resp: ProgettoModel[]) => resp.slice(0, 3)), //prende massimo 3 progetti per la sezione in home
            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.isLoading.set(false))

        ).subscribe({
            next: (resp: any[]) => {
                // mapping repsonse dal backend
                console.log(resp);
                this.progetti = resp.map((p) => ({
                    idProgetto: p.id,
                    nome: p.name,
                    destinationLink: p.destinationLink,
                    description: p.description,
                    dataCreazione: p.createAt,
                    dataUltimaModifica: p.updateAt,
                    servizi: p.services
                }));
                this.cdr.detectChanges();
            }
        });
    }
}