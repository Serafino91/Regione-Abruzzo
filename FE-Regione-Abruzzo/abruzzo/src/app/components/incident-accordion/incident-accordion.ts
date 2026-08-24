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
  stateConfigMap: Record<
    string,
    { colorBorder: string; colorBg: string; colorText: string; label: string }
  > = {
    APERTO: { colorBorder: '#004D99', colorBg: '#BFDFFF', colorText: '#000000', label: 'Aperto' },
    CHIUSO: { colorBorder: '#5cb85c', colorBg: '#e8f5e9', colorText: '#000000', label: 'Chiuso' },
    IN_LAVORAZIONE: { colorBorder: '#CC7A00', colorBg: '#FBF1E3', colorText: '#000000', label: 'In lavorazione'},
  };

  getStateConfig(stateName: string) {
    const key = (stateName ?? '').trim().toUpperCase().replace(/\s+/g, '_'); // sostituisce uno o più spazi con underscore

    return (
      this.stateConfigMap[key] ?? {
        colorBorder: '#ccc',
        colorBg: '#f5f5f5',
        colorText: '#666',
        label: stateName,
      }
    );
  }

  @Input({ required: true }) incident!: TicketModel;
  expanded = false;

  constructor(private router: Router) {}

  toggle(): void {
    this.expanded = !this.expanded;
  }


  apriDettaglio() {
    this.router.navigate(['/home/incident/dettaglio-incident', this.incident.code]);
  }
}
