import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-card',
  imports: [],
  templateUrl: './incident-card.html',
  styleUrl: './incident-card.css',
})
export class IncidentCard {
  titolo: string = 'Incident 1';
  descrizione: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus eleifend egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum eget ante sit amet dolor tristique lacinia. Etiam vel urna sed elit semper suscipit. Sed dignissim bibendum lectus at faucibus. Proin feugiat lacinia egestas. Etiam at porta dolor. Vestibulum accumsan ex ut tortor imperdiet, et feugiat velit gravida.';
  servizio: string = 'Servizio 1';
  data: string = '2023-10-01';
  stato: string = 'In corso';

}
