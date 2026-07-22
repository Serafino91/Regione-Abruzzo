import { Component, Input } from '@angular/core';
import {AlertType} from '../../constants/alert-type';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-alert',
  imports: [NgClass],
  standalone: true,
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {

  @Input() type!: AlertType ;

  get titolo(): string {
    switch (this.type) {
      case 'error':
        return 'Si è verificato un errore del sistema';

      case 'empty':
        return 'Attualmente non sono presenti elementi da visualizzare';

      case 'warning':
        return 'La ricerca non ha prodotto risultati';

      default:
        return '';
    }
  }

  get messaggi(): string[] {
    switch (this.type) {
      case 'error':
        return ['Ricaricare la pagina'];

      case 'warning':
        return ['Assicurarsi che tutte le parole siano state digitate correttamente',
        'Provare con una combinazione diversa di filtri'];

      case 'empty':
        return [];


      default:
        return [''];
    }
  }

  get icon(): string {
    switch (this.type) {
      case 'error':
        return 'it-error';

      case 'empty':
        return 'it-info-circle';

      case 'warning':
        return 'it-warning-circle';

      default:
        return '';
    }
  }

  get suggerimento(): string {
    switch (this.type) {
      case 'error':
        return 'Suggerimenti:';

      case 'warning':
        return 'Suggerimenti:';

      case 'empty':
        return '';

      default:
        return '';
    }
  }
}
