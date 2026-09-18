import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {tap, finalize } from 'rxjs';

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
		this.isLoading.set(true);
    this.categoriaService.getCategorie().pipe(

      tap((categorie: CategoriaModel[]) => {
					this.categorie = categorie;
					this.formRichiesteTicket.get('servizio')!.disable();
      }),
      finalize(() => this.isLoading.set(false))
			).subscribe();
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
      tap((servizi: ServizioModel[]) => {
        this.servizi = servizi;
        this.formRichiesteTicket.get('servizio')!.enable();
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
	}

	eliminaFiltri(): void {
	}

	applicaFiltri(): void {
	}

}
