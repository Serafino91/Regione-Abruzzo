import { Component, Input } from '@angular/core';
import { ServizioModel } from '../../../../../model/servizioModel';

@Component({
  selector: 'app-servizio-card',
  imports: [],
  templateUrl: './servizio-card.html',
  styleUrl: './servizio-card.css',
  standalone: true,
})
export class ServizioCard {
  @Input() servizio!: ServizioModel;
  descrizione: String = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
