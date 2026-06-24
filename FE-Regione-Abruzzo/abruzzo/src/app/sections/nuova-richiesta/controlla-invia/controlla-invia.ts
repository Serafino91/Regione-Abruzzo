import { Component, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-controlla-invia',
  imports: [],
  templateUrl: './controlla-invia.html',
  styleUrl: './controlla-invia.css',
  standalone: true,
})
export class ControllaInvia {
  @Input() formGroup!: FormGroup;

  get servizio() {
    return this.formGroup.get('servizio')?.value;
  }

  get params() {
    return this.formGroup.get('servizio')?.get('params')?.value;
  }
  get paramsEntries() {
    return Object.entries(this.params || {});
  }
}
