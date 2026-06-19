import { Component, Input } from '@angular/core';
import { ServizioModel } from '../../../../../model/servizioModel';
import { Card } from '../../../../../components/card/card';

@Component({
  selector: 'app-servizio-card',
  imports: [Card],
  templateUrl: './servizio-card.html',
  styleUrl: './servizio-card.css',
})
export class ServizioCard {
  @Input() servizio!: ServizioModel;
}
