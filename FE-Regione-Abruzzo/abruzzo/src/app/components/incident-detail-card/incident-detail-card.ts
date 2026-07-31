import { Component, Input } from '@angular/core';
import { TicketModel } from '../../model/ticket.model';
import { RichiedenteCard } from '../richiedente-card/richiedente-card';

@Component({
  selector: 'app-incident-detail-card',
  imports: [RichiedenteCard],
  standalone: true,
  templateUrl: './incident-detail-card.html',
  styleUrl: './incident-detail-card.css',
})
export class IncidentDetailCard {
  @Input() incidentDetail!: TicketModel;
}
