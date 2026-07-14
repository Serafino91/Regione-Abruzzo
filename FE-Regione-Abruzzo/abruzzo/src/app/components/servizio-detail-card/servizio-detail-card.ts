import { Component, Input } from '@angular/core';
import { ServizioModel } from '../../model/servizioModel';

@Component({
  selector: 'app-servizio-detail-card',
  imports: [],
  standalone: true,
  templateUrl: './servizio-detail-card.html',
  styleUrl: './servizio-detail-card.css',
})
export class ServizioDetailCard {
  @Input() servizio?: ServizioModel;
}
