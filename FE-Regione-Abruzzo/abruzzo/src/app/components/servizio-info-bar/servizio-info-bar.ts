import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-servizio-info-bar',
  imports: [],
  standalone: true,
  templateUrl: './servizio-info-bar.html',
  styleUrl: './servizio-info-bar.css',
})
export class ServizioInfoBar {
  @Input() idServizio!: string;
  @Input() servizio!: string;
  @Input() Categoria!: string;
}
