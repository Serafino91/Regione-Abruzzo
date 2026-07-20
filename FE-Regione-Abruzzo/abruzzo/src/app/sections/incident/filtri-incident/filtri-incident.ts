import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtri-incident',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri-incident.html',
  styleUrl: './filtri-incident.css',
})
export class FiltriIncident {
  filtersForm = new FormGroup({
    codice: new FormControl(''),
    categoria: new FormControl(null),
    sottocategoria: new FormControl(null),
    stato: new FormControl(null),
    dataDa: new FormControl(null),
    dataA: new FormControl(null),
    richiedente: new FormControl(null),
  });

  eliminaFiltri() {}
  applicaFiltri() {}
}
