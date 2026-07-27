import { Component, Input } from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-controlla-dati',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './controlla-dati.html',
  styleUrl: './controlla-dati.css',
})
export class ControllaDati {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) noteForm!: FormGroup;

  ngOnInit() {
    console.log('formGroup:', this.formGroup);
    console.log('formGroup value:', this.formGroup.value);
    console.log('progetti:', this.formGroup.get('progetti'));
  }

  get progetti(): FormArray {
    return this.formGroup.get('progetti') as FormArray;
  }

  readonly maxNoteLength = 500;
}
