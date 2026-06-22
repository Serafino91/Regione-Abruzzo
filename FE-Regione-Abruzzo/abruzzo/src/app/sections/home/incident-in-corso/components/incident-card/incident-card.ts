import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-card',
  imports: [],
  templateUrl: './incident-card.html',
  styleUrl: './incident-card.css',
})
export class IncidentCard {
  titolo: string = 'No Incident';
  descrizione: string = 'Al momento non ci sono Incidenti in corso. Ti invitiamo a controllare periodicamente questa sezione per eventuali aggiornamenti.';
  servizio: string = 'Nessun Servizio';
  data: string = '2026-06-22';
  stato: string = 'Aggiornato';

}
