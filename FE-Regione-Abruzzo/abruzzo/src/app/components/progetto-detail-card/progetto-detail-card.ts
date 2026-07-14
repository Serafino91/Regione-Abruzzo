import { Component, Input } from '@angular/core';
import { RichiestaModel } from '../../model/richiestaModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-progetto-detail-card',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './progetto-detail-card.html',
  styleUrl: './progetto-detail-card.css',
})
export class ProgettoDetailCard {
  @Input() nome?: string = '';
  @Input() link?: string = '';
  @Input() descrizione?: string = '';
  @Input() numeroServizi?: number;
  @Input() createdAt?: string;
  @Input() idProgetto?: number;
  @Input() nuovaRichiesta?: boolean;
}
