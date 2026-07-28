import { Component } from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {InfoBar} from '../../components/info-bar/info-bar';
import {PermessiCard} from '../../components/permessi-card/permessi-card';

@Component({
  selector: 'app-dettaglio-delega',
  imports: [PageHeader, InfoBar, PermessiCard],
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
