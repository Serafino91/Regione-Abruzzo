import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-servizio-card',
  imports: [],
  templateUrl: './servizio-card.html',
  styleUrl: './servizio-card.css',
})

export class ServizioCard {
  @Input() servizio!: any;
}
