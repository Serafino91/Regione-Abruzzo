import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { TicketModel } from '../../model/ticket.model';
import { Router } from '@angular/router';
import { StatoTicket } from '../../constants/request-state-badge.constants';

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

  toggle(): void {
    this.expanded = !this.expanded;
  }



  iconForType(type: string): string {
    const t = type?.toLowerCase() ?? '';
    if (t.includes('storage') || t.includes('disco') || t.includes('backup')) {
      return 'it-database';
    }
    if (t.includes('rete') || t.includes('vlan') || t.includes('network')) {
      return 'it-share';
    }
    return 'it-box';
  }


  apriDettaglio() {
    this.router.navigate(['/home/incident/dettaglio-incident', this.incident.code]);
  }
}
