import { Component, numberAttribute } from '@angular/core';
import { Url } from '../../components/url/url';
import { ActivatedRoute } from '@angular/router';
import {RichiesteService} from "../../services/richieste.service";
import {ProgettoDetailCard} from "../../components/progetto-detail-card/progetto-detail-card";
import {RichiestaModel} from "../../model/richiestaModel";
import {ProgettoModel} from "../../model/progetto.model";
import {ProgettiService} from "../../services/progetti.service";

@Component({
  selector: 'app-dettaglio-richiesta',
  imports: [Url],
  templateUrl: './dettaglio-richiesta.html',
  styleUrl: './dettaglio-richiesta.css',
  standalone: true,
})
export class DettaglioRichiesta {

  richiestaId!: string;
  richiesta!: RichiestaModel;
  progetto!: ProgettoModel;

  constructor(
    private route: ActivatedRoute,
    private richiestaService: RichiesteService,
    private progettoService: ProgettiService
    ) {}

  ngOnInit() {
    this.richiestaId = this.route.snapshot.paramMap.get('id')!;
    this.getRichiesta(this.richiestaId);
    console.log(this.richiestaId);
    console.log()
  }


  getRichiesta(id: string) {
    this.richiestaService.getRichiesta(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.richiesta = resp;
      },
    });
  }
}
