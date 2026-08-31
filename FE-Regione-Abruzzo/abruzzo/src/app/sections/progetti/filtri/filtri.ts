import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtri',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri.html',
  styleUrl: './filtri.css',
})
export class Filtri {

  filtersForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('')

  });

  cercaProgetti() {

  }


}
