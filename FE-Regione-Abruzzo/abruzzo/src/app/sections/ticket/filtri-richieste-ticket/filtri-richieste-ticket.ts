import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import { Subscription, tap } from 'rxjs';

import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaModel } from '../../../model/categoria.model';
import { ServiziService } from '../../../services/servizi.service';
import { ServizioModel } from '../../../model/servizioModel';

@Component({
	selector: 'app-filtri-richieste-ticket',
	imports: [
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './filtri-richieste-ticket.html',
	styleUrl: './filtri-richieste-ticket.css',
})

export class FiltriRichiesteTicket implements OnInit, OnDestroy {

	private formBuilder: FormBuilder = inject(FormBuilder);
	private subscriptions: Subscription[] = [];
	private categoriaService: CategoriaService = inject(CategoriaService);
	private serviziService: ServiziService = inject(ServiziService);

	formRichiesteTicket: FormGroup = this.formBuilder.group({
		idRichiesta: ['', Validators.nullValidator],
		categoria: [0, Validators.nullValidator],
		servizio: [0, Validators.nullValidator],
		statoRichiesta: [0, Validators.nullValidator],
		dataInvioDa: [null, Validators.nullValidator],
		dataInvioA: [null, Validators.nullValidator]
	});

	categorie: CategoriaModel[] = [];
	idCategoria = 0;
	servizi: ServizioModel[] = [];
	statiRichiesta = [
		{ id: 1, content: "stato 1" }
	];

	ngOnInit(): void {
		this.getCategorie();
	}

	getCategorie(): void {
		this.subscriptions.push(
			this.categoriaService.getCategorie().pipe(
				tap((categorie: CategoriaModel[]) => {
					this.categorie = categorie;
					this.formRichiesteTicket.get('servizio')!.disable();
				})
			).subscribe()
		)
	}

	setIdCategoria(): void {
		this.idCategoria = this.formRichiesteTicket.controls["categoria"].value;
		this.formRichiesteTicket.controls["servizio"].setValue(0);

		if (this.idCategoria && this.idCategoria > 0) {
			this.getServiziDaCategoria()
		} else {
			this.formRichiesteTicket.get('servizio')!.disable();
			this.servizi = [];
		}
	}

	getServiziDaCategoria(): void {
		this.subscriptions.push(
			this.serviziService.getServiziDaCategoria(this.idCategoria).pipe(
				tap((servizi: ServizioModel[]) => {
					this.servizi = servizi;
					this.formRichiesteTicket.get('servizio')!.enable();
				})
			).subscribe()
		)
	}

	eliminaFiltri(): void {
		
	}

	applicaFiltri(): void {
		
	}

	ngOnDestroy(): void {
		this.subscriptions.map((s: Subscription) => s.unsubscribe());
	}

}