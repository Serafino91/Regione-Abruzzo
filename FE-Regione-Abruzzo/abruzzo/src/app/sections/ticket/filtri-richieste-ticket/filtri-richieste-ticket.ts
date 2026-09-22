import { Component, OnInit, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RequestState } from '../../../constants/request-state-constants';

import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaModel } from '../../../model/categoria.model';
import { ServiziService } from '../../../services/servizi.service';
import { ServizioModel } from '../../../model/servizioModel';

import { SpinnerCard } from '../../../components/spinner-card/spinner-card';

@Component({
	selector: 'app-filtri-richieste-ticket',
	imports: [FormsModule, ReactiveFormsModule, SpinnerCard],
	standalone: true,
	templateUrl: './filtri-richieste-ticket.html',
	styleUrl: './filtri-richieste-ticket.css',
})

export class FiltriRichiesteTicket implements OnInit {

	isLoading = signal(false);

	private formBuilder: FormBuilder = inject(FormBuilder);
	private categoriaService: CategoriaService = inject(CategoriaService);
	private serviziService: ServiziService = inject(ServiziService);
	private destroyRef = inject(DestroyRef);

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
	statiRichiesta = Object.entries(RequestState).map(([key, value]) => ({
		key,
		value,
	}));

	ngOnInit(): void {
		this.getCategorie();
	}

	getCategorie(): void {
		this.isLoading.set(true);
		this.categoriaService.getCategorie().pipe(

			takeUntilDestroyed(this.destroyRef),
			finalize(() => this.isLoading.set(false))

		).subscribe({
			next: (response) => {
				this.categorie = response;
				this.formRichiesteTicket.get('servizio')!.disable();
			}
		});
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
		this.isLoading.set(true);
		this.serviziService.getServiziDaCategoria(this.idCategoria).pipe(

			takeUntilDestroyed(this.destroyRef),
			finalize(() => this.isLoading.set(false))

		).subscribe({
			next: (response) => {
				this.servizi = response;
				this.formRichiesteTicket.get('servizio')!.enable();
			}
		});
	}

	eliminaFiltri(): void {
	}

	applicaFiltri(): void {
	}

}
