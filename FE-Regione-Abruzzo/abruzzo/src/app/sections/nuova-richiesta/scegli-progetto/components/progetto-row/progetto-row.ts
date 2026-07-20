import { Component, Input } from '@angular/core';
import { ProgettoModel } from '../../../../../model/progetto.model';

@Component({
  selector: 'app-progetto-row',
  imports: [],
  templateUrl: './progetto-row.html',
  styleUrl: './progetto-row.css',
  standalone: true,
})


export class ProgettoRow {
  @Input() progetti!: ProgettoModel[];
  paginated: ProgettoModel[] = [];



}
