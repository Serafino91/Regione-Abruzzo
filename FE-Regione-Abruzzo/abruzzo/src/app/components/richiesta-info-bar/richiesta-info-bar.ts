import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-richiesta-info-bar',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './richiesta-info-bar.html',
  styleUrl: './richiesta-info-bar.css',
})
export class RichiestaInfoBar {
  @Input() idRichiesta!: string;
  @Input() stato!: string;
  @Input() createdAt!: string;

}
