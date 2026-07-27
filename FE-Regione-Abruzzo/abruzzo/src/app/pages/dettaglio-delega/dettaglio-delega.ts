import { Component } from '@angular/core';

@Component({
  selector: 'app-dettaglio-delega',
  imports: [],
  standalone: true,
  templateUrl: './dettaglio-delega.html',
  styleUrl: './dettaglio-delega.css',
})
export class DettaglioDelega {

  info = [
    {
      label: 'ID Delegato',
      value: '9743905843',
      icon: 'it-file',
    },
    {
      label: 'Nome e Cognome',
      value: 'Gianni Pippo',
      icon: 'it-user',
    },
    {
      label: 'Data avvio delega',
      value: 'GG/MM/AAAA',
      icon: 'it-calendar',
    },
  ];
}
