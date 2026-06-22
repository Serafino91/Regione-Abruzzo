import { Component, Input } from '@angular/core';
import { ServizioModel } from '../../../../../model/servizioModel';

@Component({
  selector: 'app-servizio-card',
  imports: [],
  templateUrl: './servizio-card.html',
  styleUrl: './servizio-card.css',
})
export class ServizioCard {
  @Input() servizio!: ServizioModel;
}
