import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-servizio',
  imports: [],
  standalone: true,
  templateUrl: './label-servizio.html',
  styleUrl: './label-servizio.css',
})
export class LabelServizio {
  @Input({ required: true })
  categoryId!: number;

}
