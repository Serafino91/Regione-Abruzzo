import { Component, Input } from '@angular/core';
import { TicketModel } from '../../model/ticket.model';

@Component({
  selector: 'app-incident-detail-card',
  imports: [],
  standalone: true,
  templateUrl: './incident-detail-card.html',
  styleUrl: './incident-detail-card.css',
})

export class IncidentDetailCard {
  @Input() incidentDetail!: TicketModel;
}
