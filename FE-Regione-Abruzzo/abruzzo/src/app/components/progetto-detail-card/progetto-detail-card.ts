import { Component, Input } from '@angular/core';
import { RichiestaModel } from '../../model/richiestaModel';
import { ServizioModel } from '../../model/servizioModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-progetto-detail-card',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './progetto-detail-card.html',
  styleUrl: './progetto-detail-card.css',
})
export class ProgettoDetailCard {
  @Input() nome: String = '';
  @Input() link: String = '';
  @Input() descrizione: String = '';
  @Input() richiesta?: RichiestaModel;
  @Input() servizio?: ServizioModel;
}
