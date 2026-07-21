import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-seleziona-progetti',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './seleziona-progetti.html',
  styleUrl: './seleziona-progetti.css',
})
export class SelezionaProgetti {
  @Input({ required: true })
  formGroup!: FormGroup;

  progettiForm = new FormGroup({
    progetto: new FormControl(''),
  });

  cercaProgetto() {}
}
