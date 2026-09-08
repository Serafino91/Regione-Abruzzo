import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
    selector: 'app-nuovo-servizio',
    imports: [PageHeader],
    templateUrl: './nuovo-servizio.html',
    styleUrl: './nuovo-servizio.css',
})

export class NuovoServizio {

    private router = inject(Router);

    goBack(): void {
        this.router.navigateByUrl("home/catalogo");
    }

}