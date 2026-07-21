import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-controlla-dati',
  imports: [],
  standalone: true,
  templateUrl: './controlla-dati.html',
  styleUrl: './controlla-dati.css',
})
export class ControllaDati {
  @Input({ required: true })
  formGroup!: FormGroup;
}
