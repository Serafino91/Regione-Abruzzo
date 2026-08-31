import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-filtri-deleghe',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri-deleghe.html',
  styleUrl: './filtri-deleghe.css',
})
export class FiltriDeleghe {
  filtersForm = new FormGroup({
    utente: new FormControl(''),
    idProgetto: new FormControl(''),
    idServizio: new FormControl(''),
  });

  cercaDeleghe() {}
}
