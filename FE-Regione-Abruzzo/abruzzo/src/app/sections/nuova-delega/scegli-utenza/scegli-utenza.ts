import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-scegli-utenza',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './scegli-utenza.html',
  styleUrl: './scegli-utenza.css',
})
export class ScegliUtenza {
  @Input({ required: true })
  formGroup!: FormGroup;

  utenteForm = new FormGroup({
    utente: new FormControl(''),
  });

  cercaUtente() {

  }
}
