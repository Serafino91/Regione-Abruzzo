import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seleziona-progetti',
  imports: [],
  standalone: true,
  templateUrl: './seleziona-progetti.html',
  styleUrl: './seleziona-progetti.css',
})
export class SelezionaProgetti {
  @Input({ required: true })
  formGroup!: FormGroup;
}
