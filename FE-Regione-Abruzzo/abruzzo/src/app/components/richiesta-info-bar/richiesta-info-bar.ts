import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RichiestaModel } from '../../model/richiestaModel';

@Component({
  selector: 'app-richiesta-info-bar',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './richiesta-info-bar.html',
  styleUrl: './richiesta-info-bar.css',
})
export class RichiestaInfoBar {
  @Input() richiesta!: RichiestaModel;
}
