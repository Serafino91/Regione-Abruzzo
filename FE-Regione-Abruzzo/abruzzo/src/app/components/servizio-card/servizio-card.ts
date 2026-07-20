import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServizioModel } from '../../model/servizioModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servizio-card',
  imports: [],
  templateUrl: './servizio-card.html',
  styleUrl: './servizio-card.css',
  standalone: true,
})
export class ServizioCard {
  @Input() servizio!: ServizioModel;
  constructor(private router: Router) {}

  apriDettaglio() {
    this.router.navigate(['/home/catalogo/dettaglio-servizio', this.servizio.id]);
  }
  descrizione: String = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}
