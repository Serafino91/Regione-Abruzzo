import { Component, Input } from '@angular/core';
import { TicketModel } from '../../model/ticket.model';
import { Router } from '@angular/router';
import { STATO_INCIDENT_CONFIG } from '../../constants/request-state-badge.constants';

@Component({
  selector: 'app-incident-accordion',
  imports: [],
  standalone: true,
  templateUrl: './incident-accordion.html',
  styleUrl: './incident-accordion.css',
})
export class IncidentAccordion {
  @Input({ required: true }) incident!: TicketModel;
  expanded = false;

  constructor(private router: Router) {}

  getStateConfig(stateName: string) {
    const key = (stateName ?? '').trim().toUpperCase().replace(/\s+/g, '_');
    return STATO_INCIDENT_CONFIG[key];
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }

  apriDettaglio() {
    this.router.navigate(['/home/incident/dettaglio-incident', this.incident.code]);
  }
}
